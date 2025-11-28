import { useState, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { ArrowLeft, Heart, CheckCircle } from 'lucide-react';
import { quizQuestions } from '../data/quizQuestions';
import { saveTestResult, TestResult, getUserId, getCoupleId } from '../utils/storage';
import { loveLanguages } from '../data/loveLanguages';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { toast } from 'sonner@2.0.3';

interface QuizProps {
  onComplete: (results: Record<string, number>) => void;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function Quiz({ onComplete }: QuizProps) {
  const history = useHistory();

  const selectedQuestions = useMemo(() => {
    const shuffled = shuffleArray(quizQuestions);
    const selected = shuffled.slice(0, 15);
    
    return selected.map(q => ({
      ...q,
      options: shuffleArray(q.options)
    }));
  }, []);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selectedOption, setSelectedOption] = useState<number>(-1);

  const progress = ((currentQuestion + 1) / selectedQuestions.length) * 100;
  const question = selectedQuestions[currentQuestion];

  const handleAnswer = async () => {
    if (selectedOption === -1) {
      toast.warning('Veuillez sélectionner une réponse');
      return;
    }

    const option = question.options[selectedOption];
    const language = option.language;

    const newAnswers = { ...answers };
    newAnswers[language] = (newAnswers[language] || 0) + 1;
    setAnswers(newAnswers);

    if (currentQuestion < selectedQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(-1);
    } else {
      // Quiz terminé
      const primaryLanguageId = Object.keys(newAnswers).reduce((a, b) => 
        newAnswers[a] > newAnswers[b] ? a : b
      );
      
      const primaryLangData = loveLanguages.find(l => l.id === primaryLanguageId);
      
      const testResult: TestResult = {
        id: `test_${Date.now()}_${Math.random().toString(36).substring(7)}`,
        date: new Date().toISOString(),
        scores: newAnswers,
        primaryLanguage: primaryLangData?.name || primaryLanguageId,
        primaryLanguageId: primaryLanguageId,
      };
      
      saveTestResult(testResult);

      // Update couple link if user is in a couple
      const coupleId = getCoupleId();
      if (coupleId) {
        updateCoupleResult(coupleId, getUserId(), testResult.id, testResult);
      }

      // Add XP
      import('../utils/progressionHelper').then(({ addXP, showXPNotification, showLevelUpNotification }) => {
        addXP('quiz_complete').then(result => {
          if (result.success) {
            showXPNotification(result.xpGained, 'quiz_complete');
            if (result.leveledUp) {
              showLevelUpNotification(0);
            }
          }
        });
      });

      onComplete(newAnswers);
      
      toast.success('🎉 Quiz complété ! +100 XP');

      setTimeout(() => {
        history.push('/results');
      }, 500);
    }
  };

  const updateCoupleResult = async (coupleId: string, userId: string, resultId: string, result: TestResult) => {
    try {
      await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b0056f59/couple/${coupleId}/update-result`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            userId,
            resultId,
            result,
          }),
        }
      );
    } catch (error) {
      console.error('Error updating couple result:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-pink-100">
        <div className="max-w-3xl mx-auto px-3 sm:px-4 py-2 sm:py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => history.push('/dashboard')}
              className="p-1.5 sm:p-2 hover:bg-pink-50 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-pink-600" />
            </button>
            
            <h1 className="text-sm sm:text-lg font-semibold text-gray-900">Quiz des 5 Langages</h1>
            
            <div className="px-2 sm:px-3 py-0.5 sm:py-1 bg-pink-100 text-pink-700 rounded-full text-xs sm:text-sm font-medium">
              {currentQuestion + 1}/{selectedQuestions.length}
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="h-0.5 sm:h-1 bg-pink-100">
          <div
            className="h-full bg-gradient-to-r from-pink-500 to-rose-400 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-3 sm:px-4 py-3 sm:py-6 md:py-8">
        {/* Question Card */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-3.5 sm:p-5 md:p-6 mb-3 sm:mb-4">
          <div className="text-[10px] sm:text-xs uppercase tracking-wide text-pink-600 font-semibold mb-1.5 sm:mb-2">
            Question {currentQuestion + 1} sur {selectedQuestions.length}
          </div>
          <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 leading-snug">
            {question.question}
          </h2>
        </div>

        {/* Options */}
        <div className="space-y-2 sm:space-y-2.5 mb-4 sm:mb-6">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => setSelectedOption(index)}
              className={`
                w-full text-left p-3 sm:p-3.5 md:p-4 rounded-lg sm:rounded-xl border-2 transition-all
                ${selectedOption === index 
                  ? 'border-pink-500 bg-pink-50 shadow-md' 
                  : 'border-gray-200 bg-white hover:border-pink-300 hover:shadow-sm'
                }
              `}
            >
              <div className="flex items-start gap-2 sm:gap-3">
                <div className={`
                  flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 mt-0.5 flex items-center justify-center
                  ${selectedOption === index 
                    ? 'border-pink-500 bg-pink-500' 
                    : 'border-gray-300'
                  }
                `}>
                  {selectedOption === index && (
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white" />
                  )}
                </div>
                <span className="flex-1 text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed">
                  {option.text}
                </span>
                {selectedOption === index && (
                  <CheckCircle className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 text-pink-500" />
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleAnswer}
          disabled={selectedOption === -1}
          className={`
            w-full py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold text-base sm:text-lg flex items-center justify-center gap-1.5 sm:gap-2
            transition-all shadow-lg
            ${selectedOption === -1
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-pink-500 to-rose-400 text-white hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]'
            }
          `}
        >
          {currentQuestion < selectedQuestions.length - 1 ? (
            <>
              Suivant
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
            </>
          ) : (
            <>
              Terminer
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
            </>
          )}
        </button>

        {/* Progress Text */}
        <div className="text-center mt-3 sm:mt-4 text-xs sm:text-sm text-gray-500 pb-2">
          {Math.round(progress)}% complété
        </div>
      </main>
    </div>
  );
}
