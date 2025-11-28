import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Clock, Users, Check, X, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface PartnerQuizGameProps {
  sessionId: string;
  partnerId: string;
  partnerName: string;
  onNavigate: (page: string) => void;
  onFinish: (sessionId: string) => void;
}

interface Question {
  id: number;
  question: string;
  level: 'easy' | 'medium' | 'hard';
  category: string;
  options: string[];
}

interface QuizSession {
  id: string;
  code: string;
  partnerAId: string;
  partnerAName: string;
  partnerBId?: string;
  partnerBName?: string;
  questions: Question[];
  currentQuestionIndex: number;
  answers: {
    [questionId: string]: {
      partnerA?: string;
      partnerB?: string;
      partnerATime?: number;
      partnerBTime?: number;
    };
  };
  score: number;
  status: 'waiting' | 'playing' | 'finished';
}

export function PartnerQuizGame({ sessionId, partnerId, partnerName, onNavigate, onFinish }: PartnerQuizGameProps) {
  const [session, setSession] = useState<QuizSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [hasAnswered, setHasAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [timeSpent, setTimeSpent] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [bothAnswered, setBothAnswered] = useState(false);

  const currentQuestion = session?.questions[session.currentQuestionIndex];
  const isPartnerA = partnerId === session?.partnerAId;
  const currentAnswers = currentQuestion ? session?.answers[currentQuestion.id] : null;
  const myAnswer = isPartnerA ? currentAnswers?.partnerA : currentAnswers?.partnerB;
  const partnerAnswer = isPartnerA ? currentAnswers?.partnerB : currentAnswers?.partnerA;
  const otherPartnerName = isPartnerA ? session?.partnerBName : session?.partnerAName;

  // Fetch session data
  const fetchSession = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b0056f59/partner-quiz/${sessionId}`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setSession(data.session);
        
        // Check if current question has been answered by me
        const currentQ = data.session.questions[data.session.currentQuestionIndex];
        if (currentQ) {
          const answers = data.session.answers[currentQ.id];
          const myAns = isPartnerA ? answers?.partnerA : answers?.partnerB;
          const partAns = isPartnerA ? answers?.partnerB : answers?.partnerA;
          
          if (myAns) {
            setHasAnswered(true);
            setSelectedAnswer(myAns);
          }
          
          if (myAns && partAns) {
            setBothAnswered(true);
          }
        }

        // Check if finished
        if (data.session.status === 'finished') {
          onFinish(sessionId);
        }
      }
    } catch (err) {
      console.error('Error fetching session:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSession();
    const interval = setInterval(fetchSession, 2000);
    return () => clearInterval(interval);
  }, [sessionId]);

  // Timer countdown
  useEffect(() => {
    if (!hasAnswered && timeLeft > 0 && session?.status === 'playing') {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
        setTimeSpent(timeSpent + 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !hasAnswered) {
      // Time's up - auto submit with no answer
      handleAnswer('');
    }
  }, [timeLeft, hasAnswered]);

  // Reset for new question
  useEffect(() => {
    if (session && currentQuestion) {
      const answers = session.answers[currentQuestion.id];
      const myAns = isPartnerA ? answers?.partnerA : answers?.partnerB;
      
      if (!myAns) {
        setHasAnswered(false);
        setSelectedAnswer('');
        setTimeLeft(30);
        setTimeSpent(0);
        setShowResult(false);
        setBothAnswered(false);
      }
    }
  }, [session?.currentQuestionIndex]);

  const handleAnswer = async (answer: string) => {
    if (hasAnswered || !currentQuestion) return;

    setSelectedAnswer(answer);
    setHasAnswered(true);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b0056f59/partner-quiz/${sessionId}/answer`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            partnerId,
            questionId: currentQuestion.id,
            answer,
            timeSpent,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setSession(data.session);
        if (data.bothAnswered) {
          setBothAnswered(true);
          setShowResult(true);
        }
      }
    } catch (err) {
      console.error('Error submitting answer:', err);
    }
  };

  const handleNext = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b0056f59/partner-quiz/${sessionId}/next`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setSession(data.session);
        if (data.session.status === 'finished') {
          // Add XP for completing partner quiz
          const score = data.session.score;
          const totalQuestions = data.session.questions.length;
          const percentage = (score / totalQuestions) * 100;
          
          import('../utils/progressionHelper').then(({ addXP, showXPNotification }) => {
            if (percentage === 100) {
              addXP('partner_quiz_100').then(result => {
                if (result.success) {
                  showXPNotification(result.xpGained, 'partner_quiz_100');
                }
              });
            } else if (percentage >= 80) {
              addXP('partner_quiz_80plus').then(result => {
                if (result.success) {
                  showXPNotification(result.xpGained, 'partner_quiz_80plus');
                }
              });
            } else {
              addXP('partner_quiz_complete').then(result => {
                if (result.success) {
                  showXPNotification(result.xpGained, 'partner_quiz_complete');
                }
              });
            }
          });
          
          onFinish(sessionId);
        }
      }
    } catch (err) {
      console.error('Error moving to next:', err);
    }
  };

  if (loading || !session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FFF5F7] via-[#FFE4E8] to-[#FFF5F7] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-[#E91E63] animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Chargement du quiz...</p>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FFF5F7] via-[#FFE4E8] to-[#FFF5F7] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Erreur: Question introuvable</p>
        </div>
      </div>
    );
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'easy': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getLevelLabel = (level: string) => {
    switch (level) {
      case 'easy': return 'Facile';
      case 'medium': return 'Moyen';
      case 'hard': return 'Difficile';
      default: return level;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5F7] via-[#FFE4E8] to-[#FFF5F7]">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Heart className="h-6 w-6 text-[#E91E63] fill-current" />
              <div>
                <p className="text-sm text-gray-600">Question {session.currentQuestionIndex + 1}/{session.questions.length}</p>
                <p className="text-xs text-gray-400">{otherPartnerName} vs {partnerName}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className={`px-3 py-1 rounded-full text-xs text-white ${getLevelColor(currentQuestion.level)}`}>
                {getLevelLabel(currentQuestion.level)}
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="h-5 w-5" />
                <span className={timeLeft <= 10 ? 'text-red-500' : ''}>{timeLeft}s</span>
              </div>
            </div>
          </div>
          {/* Progress bar */}
          <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((session.currentQuestionIndex + 1) / session.questions.length) * 100}%` }}
              className="h-full bg-gradient-to-r from-[#E91E63] to-[#F06292] rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key="question"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Question */}
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <h2 className="text-gray-900 text-center mb-6">
                  {currentQuestion.question}
                </h2>

                {/* Timer bar */}
                <div className="mb-6">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: '100%' }}
                      animate={{ width: `${(timeLeft / 30) * 100}%` }}
                      className={`h-full rounded-full transition-colors ${
                        timeLeft <= 10 ? 'bg-red-500' : 'bg-gradient-to-r from-[#E91E63] to-[#F06292]'
                      }`}
                    />
                  </div>
                </div>

                {/* Options */}
                <div className="space-y-3">
                  {currentQuestion.options.map((option, index) => (
                    <motion.button
                      key={index}
                      whileHover={!hasAnswered ? { scale: 1.02 } : {}}
                      whileTap={!hasAnswered ? { scale: 0.98 } : {}}
                      onClick={() => !hasAnswered && handleAnswer(option)}
                      disabled={hasAnswered}
                      className={`w-full p-5 rounded-2xl border-2 transition-all text-left ${
                        selectedAnswer === option
                          ? 'bg-[#FFE4E8] border-[#E91E63] shadow-md'
                          : 'bg-[#FFF5F7] border-gray-200 hover:border-[#F06292]'
                      } ${hasAnswered ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-gray-900">{option}</span>
                        {selectedAnswer === option && hasAnswered && (
                          <Check className="h-5 w-5 text-[#E91E63]" />
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Status */}
                {hasAnswered && (
                  <div className="mt-6 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border-2 border-green-200 rounded-full">
                      <Check className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-700">
                        {bothAnswered
                          ? `${otherPartnerName} a aussi répondu !`
                          : `En attente de ${otherPartnerName}...`
                        }
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="space-y-6"
            >
              {/* Result comparison */}
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <div className="text-center mb-6">
                  {myAnswer === partnerAnswer ? (
                    <>
                      <div className="text-6xl mb-4">✅</div>
                      <h2 className="text-gray-900 mb-2">Parfaite synchronisation !</h2>
                      <p className="text-gray-600">Vous avez donné la même réponse</p>
                    </>
                  ) : (
                    <>
                      <div className="text-6xl mb-4">❌</div>
                      <h2 className="text-gray-900 mb-2">Réponses différentes</h2>
                      <p className="text-gray-600">Vous avez des points de vue différents</p>
                    </>
                  )}
                </div>

                <div className="space-y-4">
                  {/* My answer */}
                  <div className="p-4 rounded-2xl bg-[#FFE4E8] border-2 border-[#E91E63]">
                    <p className="text-sm text-gray-600 mb-1">{partnerName} (vous)</p>
                    <p className="text-gray-900">{myAnswer || 'Pas de réponse'}</p>
                  </div>

                  {/* Partner answer */}
                  <div className="p-4 rounded-2xl bg-blue-50 border-2 border-blue-300">
                    <p className="text-sm text-gray-600 mb-1">{otherPartnerName}</p>
                    <p className="text-gray-900">{partnerAnswer || 'Pas de réponse'}</p>
                  </div>
                </div>

                {/* Score */}
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600 mb-2">Score actuel</p>
                  <div className="inline-flex items-center gap-2 text-3xl text-[#E91E63]">
                    <Heart className="h-8 w-8 fill-current" />
                    <span>{session.score}/{session.currentQuestionIndex + 1}</span>
                  </div>
                </div>

                <Button
                  onClick={handleNext}
                  className="w-full mt-6 py-6 rounded-2xl bg-gradient-to-r from-[#E91E63] to-[#F06292] hover:shadow-lg transition-all"
                >
                  {session.currentQuestionIndex + 1 >= session.questions.length
                    ? 'Voir les résultats 🎉'
                    : 'Question suivante ➡️'
                  }
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
