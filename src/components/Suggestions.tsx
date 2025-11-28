import { useState } from 'react';
import { ArrowLeft, Sparkles, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';
import { loveLanguages } from '../data/loveLanguages';
import { suggestions } from '../data/suggestions';
import { motion, AnimatePresence } from 'motion/react';

interface SuggestionsProps {
  onNavigate: (page: string) => void;
}

export function Suggestions({ onNavigate }: SuggestionsProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('words');
  const [selectedRelationType, setSelectedRelationType] = useState<string>('romantic');
  const [currentSuggestionIndex, setCurrentSuggestionIndex] = useState(0);

  const relationTypes = [
    { id: 'romantic', label: 'Couple', icon: '💑' },
    { id: 'friendship', label: 'Amitié', icon: '👫' },
    { id: 'family', label: 'Famille', icon: '👨‍👩‍👧‍👦' }
  ];

  const currentLanguage = loveLanguages.find(l => l.id === selectedLanguage);
  const currentSuggestions = suggestions.find(
    s => s.language === selectedLanguage && s.relationshipType === selectedRelationType
  )?.suggestions || [];

  const handleNextSuggestion = () => {
    setCurrentSuggestionIndex((prev) => (prev + 1) % currentSuggestions.length);
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
            <h1 className="text-gray-900">Gestes & Idées</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-6 pt-6">
        {/* Language Selector */}
        <div className="mb-6">
          <h3 className="text-gray-700 mb-3">Choisissez un langage d'amour</h3>
          <div className="grid grid-cols-2 gap-3">
            {loveLanguages.map((language) => (
              <button
                key={language.id}
                onClick={() => {
                  setSelectedLanguage(language.id);
                  setCurrentSuggestionIndex(0);
                }}
                className={`p-4 rounded-2xl transition-all duration-300 ${
                  selectedLanguage === language.id
                    ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg scale-[0.98]'
                    : 'bg-white text-gray-700 hover:shadow-md border border-gray-200'
                }`}
              >
                <div className="text-3xl mb-2">{language.icon}</div>
                <div className="text-sm">{language.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Relation Type Selector */}
        <div className="mb-6">
          <h3 className="text-gray-700 mb-3">Type de relation</h3>
          <div className="flex gap-2">
            {relationTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => {
                  setSelectedRelationType(type.id);
                  setCurrentSuggestionIndex(0);
                }}
                className={`flex-1 py-3 px-4 rounded-xl transition-all duration-300 ${
                  selectedRelationType === type.id
                    ? 'bg-purple-100 text-purple-700 border-2 border-purple-400'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-purple-200'
                }`}
              >
                <div className="text-2xl mb-1">{type.icon}</div>
                <div className="text-sm">{type.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Current Language Info */}
        {currentLanguage && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-5 mb-6 border border-gray-100"
          >
            <div className="flex items-start gap-4">
              <div className="text-4xl">{currentLanguage.icon}</div>
              <div className="flex-1">
                <h3 className="text-gray-900 mb-2">{currentLanguage.name}</h3>
                <p className="text-sm text-gray-600">{currentLanguage.description}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Suggestion Card */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-gray-700 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-500" />
              Suggestion du moment
            </h3>
            <span className="text-sm text-gray-500">
              {currentSuggestionIndex + 1} / {currentSuggestions.length}
            </span>
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedLanguage}-${selectedRelationType}-${currentSuggestionIndex}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl p-8 text-white shadow-xl min-h-[200px] flex items-center justify-center"
            >
              <p className="text-center text-lg leading-relaxed">
                {currentSuggestions[currentSuggestionIndex]}
              </p>
            </motion.div>
          </AnimatePresence>

          <Button
            onClick={handleNextSuggestion}
            className="w-full mt-4 bg-white hover:bg-gray-50 text-purple-600 py-6 rounded-2xl shadow-md border border-purple-100"
          >
            <RefreshCw className="mr-2 h-5 w-5" />
            Autre suggestion
          </Button>
        </div>

        {/* All Suggestions List */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="text-gray-900 mb-4">Toutes les suggestions</h3>
          <div className="space-y-2">
            {currentSuggestions.map((suggestion, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentSuggestionIndex(index)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`w-full text-left p-4 rounded-xl transition-all duration-200 ${
                  currentSuggestionIndex === index
                    ? 'bg-purple-50 border-2 border-purple-300'
                    : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-purple-500 flex-shrink-0 mt-1">•</span>
                  <span className="text-sm text-gray-700">{suggestion}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-6 p-4 bg-purple-50 rounded-2xl border border-purple-100">
          <p className="text-sm text-purple-900">
            💡 <span className="font-medium">Astuce :</span> Les petits gestes réguliers 
            ont souvent plus d'impact que les grandes occasions ponctuelles !
          </p>
        </div>
      </div>
    </div>
  );
}
