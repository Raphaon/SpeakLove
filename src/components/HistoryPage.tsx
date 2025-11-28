import { useState } from 'react';
import { ArrowLeft, Calendar, Trash2, TrendingUp, History as HistoryIcon } from 'lucide-react';
import { Button } from './ui/button';
import { getTestResults, clearTestResults, TestResult } from '../utils/storage';
import { loveLanguages } from '../data/loveLanguages';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { motion } from 'motion/react';

interface HistoryPageProps {
  onNavigate: (page: string) => void;
}

export function HistoryPage({ onNavigate }: HistoryPageProps) {
  const [results, setResults] = useState<TestResult[]>(getTestResults());

  const handleClearHistory = () => {
    if (confirm('Êtes-vous sûr(e) de vouloir supprimer tout l\'historique ? Cette action est irréversible.')) {
      clearTestResults();
      setResults([]);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  };

  const formatShortDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
    }).format(date);
  };

  // Prepare data for evolution chart
  const chartData = results.map((result, index) => {
    const data: any = {
      name: formatShortDate(result.date),
      date: result.date,
    };
    
    // Add scores for each language
    Object.entries(result.scores).forEach(([langId, score]) => {
      const lang = loveLanguages.find(l => l.id === langId);
      if (lang) {
        data[lang.name] = score;
      }
    });
    
    return data;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 pb-8">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
        <div className="max-w-2xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavigate('home')}
                className="p-2"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-gray-900">Historique</h1>
                <p className="text-sm text-gray-600">
                  {results.length} test{results.length > 1 ? 's' : ''} effectué{results.length > 1 ? 's' : ''}
                </p>
              </div>
            </div>
            
            {results.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearHistory}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-6 pt-8 space-y-6">
        {results.length === 0 ? (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-12 text-center shadow-xl"
          >
            <div className="inline-block p-4 bg-purple-100 rounded-full mb-4">
              <HistoryIcon className="h-12 w-12 text-purple-600" />
            </div>
            <h2 className="text-gray-900 mb-2">Aucun test enregistré</h2>
            <p className="text-gray-600 mb-6">
              Passez le quiz des 5 langages de l'amour pour commencer à suivre votre évolution !
            </p>
            <Button
              onClick={() => onNavigate('quiz')}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              Passer le quiz
            </Button>
          </motion.div>
        ) : (
          <>
            {/* Evolution Chart (only if 2+ tests) */}
            {results.length >= 2 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl p-6 shadow-xl"
              >
                <div className="flex items-center gap-2 mb-6">
                  <TrendingUp className="h-5 w-5 text-purple-500" />
                  <h3 className="text-gray-900">Évolution de vos langages</h3>
                </div>
                
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fontSize: 12 }}
                      stroke="#9ca3af"
                    />
                    <YAxis 
                      tick={{ fontSize: 12 }}
                      stroke="#9ca3af"
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '12px',
                        padding: '12px',
                      }}
                    />
                    <Legend 
                      wrapperStyle={{ fontSize: '12px' }}
                      iconType="line"
                    />
                    {loveLanguages.map((lang) => (
                      <Line
                        key={lang.id}
                        type="monotone"
                        dataKey={lang.name}
                        stroke={lang.color}
                        strokeWidth={2}
                        dot={{ fill: lang.color, r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>

                <p className="text-xs text-gray-500 mt-4 text-center">
                  💡 Ce graphique montre comment vos langages d'amour évoluent au fil du temps
                </p>
              </motion.div>
            )}

            {/* Tests List */}
            <div className="space-y-4">
              <h3 className="text-gray-900 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-purple-500" />
                Tous vos tests
              </h3>

              {results.slice().reverse().map((result, index) => {
                const primaryLang = loveLanguages.find(l => l.id === result.primaryLanguageId);
                const sortedScores = Object.entries(result.scores)
                  .map(([langId, score]) => ({
                    langId,
                    score,
                    lang: loveLanguages.find(l => l.id === langId),
                  }))
                  .sort((a, b) => b.score - a.score);

                return (
                  <motion.div
                    key={result.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{formatDate(result.date)}</span>
                        </div>
                        {index === 0 && (
                          <span className="inline-block text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full mt-1">
                            Plus récent
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Primary Language */}
                    {primaryLang && (
                      <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-4 text-white mb-4">
                        <p className="text-sm opacity-90 mb-2">Langage principal</p>
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{primaryLang.icon}</span>
                          <div className="flex-1">
                            <h4 className="text-white">{primaryLang.name}</h4>
                            <p className="text-sm text-white/80">{result.scores[result.primaryLanguageId]} points</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* All Scores */}
                    <details className="mt-4">
                      <summary className="text-sm text-gray-600 cursor-pointer hover:text-gray-900">
                        Voir tous les scores
                      </summary>
                      <div className="mt-3 space-y-2">
                        {sortedScores.map(({ langId, score, lang }) => {
                          if (!lang) return null;
                          const maxScore = sortedScores[0].score;
                          const percentage = (score / maxScore) * 100;

                          return (
                            <div key={langId} className="space-y-1">
                              <div className="flex items-center justify-between text-sm">
                                <span className="flex items-center gap-2">
                                  <span>{lang.icon}</span>
                                  <span className="text-gray-700">{lang.name}</span>
                                </span>
                                <span className="text-gray-600">{score} pts</span>
                              </div>
                              <div className="w-full bg-gray-100 rounded-full h-2">
                                <div
                                  className="h-2 rounded-full transition-all"
                                  style={{
                                    width: `${percentage}%`,
                                    backgroundColor: lang.color,
                                  }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </details>
                  </motion.div>
                );
              })}
            </div>

            {/* Stats Summary */}
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
              <h3 className="text-gray-900 mb-3">📊 Statistiques</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Total de tests</p>
                  <p className="text-2xl text-purple-600">{results.length}</p>
                </div>
                <div>
                  <p className="text-gray-600">Premier test</p>
                  <p className="text-sm text-gray-900">{formatShortDate(results[0].date)}</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
