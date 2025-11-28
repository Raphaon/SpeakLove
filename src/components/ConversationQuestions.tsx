import { useState, useMemo } from 'react';
import { ArrowLeft, Shuffle, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { conversationQuestions, themes, depths } from '../data/conversationQuestions';
import { motion, AnimatePresence } from 'motion/react';

interface ConversationQuestionsProps {
  onNavigate: (page: string) => void;
}

export function ConversationQuestions({ onNavigate }: ConversationQuestionsProps) {
  const [selectedTheme, setSelectedTheme] = useState('all');
  const [selectedDepth, setSelectedDepth] = useState('all');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [savedQuestions, setSavedQuestions] = useState<number[]>([]);

  const filteredQuestions = useMemo(() => {
    let filtered = conversationQuestions;
    
    if (selectedTheme !== 'all') {
      filtered = filtered.filter(q => q.theme === selectedTheme);
    }
    
    if (selectedDepth !== 'all') {
      filtered = filtered.filter(q => q.depth === selectedDepth);
    }
    
    return filtered;
  }, [selectedTheme, selectedDepth]);

  const currentQuestion = filteredQuestions[currentQuestionIndex];

  const handleRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
    setCurrentQuestionIndex(randomIndex);
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prev) => (prev + 1) % filteredQuestions.length);
  };

  const toggleSaveQuestion = () => {
    if (!currentQuestion) return;
    
    if (savedQuestions.includes(currentQuestion.id)) {
      setSavedQuestions(savedQuestions.filter(id => id !== currentQuestion.id));
    } else {
      setSavedQuestions([...savedQuestions, currentQuestion.id]);
    }
  };

  const getDepthColor = (depth: string) => {
    switch (depth) {
      case 'light': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'medium': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'deep': return 'bg-pink-100 text-pink-700 border-pink-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getDepthLabel = (depth: string) => {
    switch (depth) {
      case 'light': return 'Léger';
      case 'medium': return 'Moyen';
      case 'deep': return 'Profond';
      default: return depth;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 pb-8">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
        <div className="max-w-2xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('home')}
              className="p-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-gray-900">Questions de conversation</h1>
              <p className="text-sm text-gray-600">
                {filteredQuestions.length} question{filteredQuestions.length > 1 ? 's' : ''} disponible{filteredQuestions.length > 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-6 pt-6">
        {/* Theme Filter */}
        <div className="mb-4">
          <h3 className="text-sm text-gray-700 mb-2">Thème</h3>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => {
                  setSelectedTheme(theme.id);
                  setCurrentQuestionIndex(0);
                }}
                className={`flex-shrink-0 px-4 py-2 rounded-full transition-all duration-300 ${
                  selectedTheme === theme.id
                    ? 'bg-purple-500 text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-purple-300'
                }`}
              >
                <span className="mr-2">{theme.icon}</span>
                {theme.label}
              </button>
            ))}
          </div>
        </div>

        {/* Depth Filter */}
        <div className="mb-6">
          <h3 className="text-sm text-gray-700 mb-2">Niveau de profondeur</h3>
          <div className="flex gap-2">
            {depths.map((depth) => (
              <button
                key={depth.id}
                onClick={() => {
                  setSelectedDepth(depth.id);
                  setCurrentQuestionIndex(0);
                }}
                className={`flex-1 py-2 px-3 rounded-xl transition-all duration-300 text-sm ${
                  selectedDepth === depth.id
                    ? 'bg-purple-500 text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-purple-300'
                }`}
              >
                {depth.label}
              </button>
            ))}
          </div>
        </div>

        {/* Question Card */}
        {currentQuestion ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="mb-6"
            >
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl p-8 text-white shadow-xl min-h-[280px] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className={`px-3 py-1 rounded-full text-xs border ${getDepthColor(currentQuestion.depth)} bg-white`}>
                      {getDepthLabel(currentQuestion.depth)}
                    </span>
                    <button
                      onClick={toggleSaveQuestion}
                      className="p-2 rounded-full hover:bg-white/20 transition-colors"
                    >
                      <Heart 
                        className={`h-5 w-5 ${
                          savedQuestions.includes(currentQuestion.id) 
                            ? 'fill-white' 
                            : ''
                        }`} 
                      />
                    </button>
                  </div>
                  <p className="text-2xl leading-relaxed">
                    {currentQuestion.question}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-6 text-white/80 text-sm">
                  <span>
                    {themes.find(t => t.id === currentQuestion.theme)?.icon}{' '}
                    {themes.find(t => t.id === currentQuestion.theme)?.label}
                  </span>
                  <span>
                    {currentQuestionIndex + 1} / {filteredQuestions.length}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="bg-white rounded-3xl p-8 text-center mb-6">
            <p className="text-gray-500">Aucune question disponible avec ces filtres</p>
          </div>
        )}

        {/* Action Buttons */}
        {currentQuestion && (
          <div className="grid grid-cols-2 gap-3 mb-6">
            <Button
              onClick={handleRandomQuestion}
              className="bg-white hover:bg-gray-50 text-purple-600 py-6 rounded-2xl shadow-md border border-purple-100"
            >
              <Shuffle className="mr-2 h-5 w-5" />
              Aléatoire
            </Button>
            <Button
              onClick={handleNextQuestion}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-6 rounded-2xl shadow-lg"
            >
              Suivante
            </Button>
          </div>
        )}

        {/* Saved Questions */}
        {savedQuestions.length > 0 && (
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h3 className="text-gray-900 mb-3 flex items-center gap-2">
              <Heart className="h-5 w-5 text-pink-500 fill-pink-500" />
              Questions sauvegardées ({savedQuestions.length})
            </h3>
            <div className="space-y-2">
              {conversationQuestions
                .filter(q => savedQuestions.includes(q.id))
                .map((question) => (
                  <div
                    key={question.id}
                    className="p-3 bg-gray-50 rounded-xl text-sm text-gray-700"
                  >
                    {question.question}
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Info Box */}
        <div className="mt-6 p-4 bg-purple-50 rounded-2xl border border-purple-100">
          <p className="text-sm text-purple-900">
            💡 <span className="font-medium">Astuce :</span> Commencez par des questions 
            légères pour établir la confiance, puis progressez vers des sujets plus profonds.
          </p>
        </div>
      </div>
    </div>
  );
}
