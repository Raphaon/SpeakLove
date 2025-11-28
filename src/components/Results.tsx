import { useNavigate } from 'react-router-dom';
import { 
  Heart,
  Share2,
  Trophy,
  Sparkles,
  Home,
  CheckCircle,
  ArrowLeft,
  TrendingUp,
  Gift
} from 'lucide-react';
import { loveLanguages } from '../data/loveLanguages';
import { toast } from 'sonner@2.0.3';

interface ResultsProps {
  results: Record<string, number> | null;
}

export function Results({ results }: ResultsProps) {
  const navigate = useNavigate();
  
  if (!results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">❓</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Aucun résultat</h2>
          <p className="text-gray-600 mb-6">Passez le quiz pour découvrir votre langage d'amour !</p>
          <button
            onClick={() => navigate('/quiz')}
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-400 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            Commencer le quiz
          </button>
        </div>
      </div>
    );
  }

  const totalAnswers = Object.values(results).reduce((sum, count) => sum + count, 0);
  const primaryLanguageId = Object.keys(results).reduce((a, b) => 
    results[a] > results[b] ? a : b
  );
  const primaryLanguage = loveLanguages.find(l => l.id === primaryLanguageId);
  
  const sortedResults = Object.entries(results)
    .map(([id, count]) => ({
      language: loveLanguages.find(l => l.id === id)!,
      count,
      percentage: Math.round((count / totalAnswers) * 100),
    }))
    .sort((a, b) => b.count - a.count);

  const handleShare = async () => {
    const text = `Mon langage d'amour principal est ${primaryLanguage?.icon} ${primaryLanguage?.name} ! Découvrez le vôtre sur LoveLingua 💕`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Mon Langage d\'Amour',
          text,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(text);
      toast.success('Résultat copié dans le presse-papiers !');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-pink-100">
        <div className="max-w-3xl mx-auto px-3 sm:px-4 py-2 sm:py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-1.5 sm:p-2 hover:bg-pink-50 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-pink-600" />
            </button>
            
            <h1 className="text-sm sm:text-lg font-semibold text-gray-900">Vos Résultats</h1>
            
            <button
              onClick={handleShare}
              className="p-1.5 sm:p-2 hover:bg-pink-50 rounded-full transition-colors"
            >
              <Share2 className="w-5 h-5 sm:w-6 sm:h-6 text-pink-600" />
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-8">
        {/* Hero Card */}
        <div className="bg-gradient-to-br from-pink-500 to-rose-400 text-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 mb-4 sm:mb-6 shadow-2xl text-center">
          <div className="text-5xl sm:text-7xl md:text-8xl mb-3 sm:mb-4">{primaryLanguage?.icon}</div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1.5 sm:mb-2">{primaryLanguage?.name}</h1>
          <p className="text-white/90 text-sm sm:text-lg mb-3 sm:mb-4">Votre langage d'amour principal</p>
          <div className="inline-block px-4 sm:px-6 py-1.5 sm:py-2 bg-white/20 backdrop-blur-sm rounded-full text-xl sm:text-2xl font-bold">
            {sortedResults[0].percentage}%
          </div>
        </div>

        {/* Celebration */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6 text-center">
          <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-500 mx-auto mb-2 sm:mb-3" />
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1.5 sm:mb-2">🎉 Félicitations !</h2>
          <p className="text-sm sm:text-base text-gray-600">
            Vous avez découvert votre langage d'amour principal. Cela va vous aider à mieux comprendre vos besoins émotionnels et ceux de votre partenaire.
          </p>
        </div>

        {/* Description */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
            <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-pink-500" />
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Ce que cela signifie</h2>
          </div>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{primaryLanguage?.description}</p>
        </div>

        {/* All Results */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex items-center gap-1.5 sm:gap-2 mb-4 sm:mb-5">
            <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-pink-500" />
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Tous vos résultats</h2>
          </div>
          
          <div className="space-y-3 sm:space-y-4">
            {sortedResults.map((result, index) => (
              <div key={result.language.id} className="group">
                <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="text-2xl sm:text-3xl">{result.language.icon}</span>
                    <div>
                      <h3 className="text-sm sm:text-base font-semibold text-gray-900">{result.language.name}</h3>
                      {index === 0 && (
                        <span className="inline-flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-xs text-pink-600 font-medium">
                          <Trophy className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                          Principal
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl sm:text-2xl font-bold text-pink-600">{result.percentage}%</div>
                    <div className="text-[10px] sm:text-xs text-gray-500">{result.count} réponses</div>
                  </div>
                </div>
                
                <div className="h-2 sm:h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      index === 0 
                        ? 'bg-gradient-to-r from-pink-500 to-rose-400' 
                        : 'bg-gray-300'
                    }`}
                    style={{ width: `${result.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <button
            onClick={() => navigate('/suggestions')}
            className="bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-all text-left group"
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-pink-100 flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                <Gift className="w-6 h-6 sm:w-7 sm:h-7 text-pink-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-0.5 sm:mb-1">Idées de gestes</h3>
                <p className="text-xs sm:text-sm text-gray-600">Adaptés à votre langage</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => navigate('/couple-comparison')}
            className="bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-all text-left group"
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-purple-100 flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                <Heart className="w-6 h-6 sm:w-7 sm:h-7 text-purple-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-0.5 sm:mb-1">Comparer avec mon partenaire</h3>
                <p className="text-xs sm:text-sm text-gray-600">Mieux vous comprendre</p>
              </div>
            </div>
          </button>
        </div>

        {/* Home Button */}
        <button
          onClick={() => navigate('/dashboard')}
          className="w-full py-3 sm:py-4 bg-gradient-to-r from-pink-500 to-rose-400 text-white rounded-lg sm:rounded-xl font-semibold text-base sm:text-lg flex items-center justify-center gap-1.5 sm:gap-2 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <Home className="w-5 h-5 sm:w-6 sm:h-6" />
          Retour à l'accueil
        </button>

        {/* Footer */}
        <div className="text-center text-gray-400 text-xs sm:text-sm mt-6 sm:mt-8 pb-2">
          Fait avec 💕 pour votre relation
        </div>
      </main>
    </div>
  );
}
