import { useState, useEffect } from 'react';
import { ArrowLeft, Heart, TrendingUp, Sparkles, Users, Lightbulb } from 'lucide-react';
import { Button } from './ui/button';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { getUserId, getTestResults, TestResult } from '../utils/storage';
import { loveLanguages } from '../data/loveLanguages';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend } from 'recharts';
import { motion } from 'motion/react';

interface CoupleComparisonProps {
  onNavigate: (page: string) => void;
  coupleId: string;
}

interface CoupleLink {
  id: string;
  code: string;
  user1Id: string;
  user1Name: string;
  user1LatestResultId?: string;
  user2Id?: string;
  user2Name?: string;
  user2LatestResultId?: string;
  status: 'waiting' | 'linked';
  createdAt: number;
}

export function CoupleComparison({ onNavigate, coupleId }: CoupleComparisonProps) {
  const [couple, setCouple] = useState<CoupleLink | null>(null);
  const [user1Result, setUser1Result] = useState<TestResult | null>(null);
  const [user2Result, setUser2Result] = useState<TestResult | null>(null);
  const [loading, setLoading] = useState(true);
  
  const userId = getUserId();

  useEffect(() => {
    loadCoupleData();
  }, [coupleId]);

  const loadCoupleData = async () => {
    setLoading(true);
    
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b0056f59/couple/${coupleId}`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      const data = await response.json();
      
      if (data.success && data.couple) {
        setCouple(data.couple);

        // Load results from local storage
        const allResults = getTestResults();
        
        if (data.couple.user1LatestResultId) {
          const result1 = allResults.find(r => r.id === data.couple.user1LatestResultId);
          setUser1Result(result1 || null);
        }
        
        if (data.couple.user2LatestResultId) {
          const result2 = allResults.find(r => r.id === data.couple.user2LatestResultId);
          setUser2Result(result2 || null);
        }
      }
    } catch (err) {
      console.error('Error loading couple data:', err);
    } finally {
      setLoading(false);
    }
  };

  const getRecommendations = () => {
    if (!couple || !user1Result || !user2Result) return [];

    const isUser1 = couple.user1Id === userId;
    const myResult = isUser1 ? user1Result : user2Result;
    const partnerResult = isUser1 ? user2Result : user1Result;
    const partnerName = isUser1 ? couple.user2Name : couple.user1Name;

    const partnerPrimaryLang = loveLanguages.find(l => l.id === partnerResult.primaryLanguageId);

    if (!partnerPrimaryLang) return [];

    const recommendations: { title: string; description: string; icon: string }[] = [];

    // Recommendations based on partner's primary language
    switch (partnerResult.primaryLanguageId) {
      case 'words':
        recommendations.push(
          {
            title: `Exprimez votre appréciation à ${partnerName}`,
            description: 'Dites-lui ce que vous aimez chez elle/lui. Un compliment sincère peut illuminer sa journée.',
            icon: '💬',
          },
          {
            title: 'Laissez des petits mots',
            description: 'Un message vocal, une note sur le frigo, ou un SMS affectueux fait toute la différence.',
            icon: '📝',
          }
        );
        break;

      case 'quality-time':
        recommendations.push(
          {
            title: `Planifiez du temps ensemble avec ${partnerName}`,
            description: 'Mettez de côté votre téléphone et accordez-lui votre attention complète.',
            icon: '⏰',
          },
          {
            title: 'Créez des moments privilégiés',
            description: 'Une balade, un café en tête-à-tête, ou simplement discuter sans distraction.',
            icon: '☕',
          }
        );
        break;

      case 'gifts':
        recommendations.push(
          {
            title: `Offrez de petites attentions à ${partnerName}`,
            description: 'Ce n\'est pas la valeur qui compte, mais le fait d\'avoir pensé à elle/lui.',
            icon: '🎁',
          },
          {
            title: 'Souvenirs et surprises',
            description: 'Rapportez sa friandise préférée ou un objet qui vous a fait penser à elle/lui.',
            icon: '✨',
          }
        );
        break;

      case 'acts':
        recommendations.push(
          {
            title: `Aidez ${partnerName} dans ses tâches`,
            description: 'Prenez en charge quelque chose qui lui pèse ou facilitez sa journée.',
            icon: '🤝',
          },
          {
            title: 'Actions concrètes',
            description: 'Préparez le café, faites la vaisselle, ou gérez une course. Les actions parlent.',
            icon: '💪',
          }
        );
        break;

      case 'touch':
        recommendations.push(
          {
            title: `Contact physique avec ${partnerName}`,
            description: 'Un câlin, tenir la main, ou un massage montrent votre affection.',
            icon: '🤗',
          },
          {
            title: 'Proximité physique',
            description: 'S\'asseoir près d\'elle/lui, une main sur l\'épaule, ces gestes comptent énormément.',
            icon: '💕',
          }
        );
        break;
    }

    return recommendations;
  };

  const getComparisonData = () => {
    if (!user1Result || !user2Result) return [];

    return loveLanguages.map(lang => ({
      language: lang.name,
      [couple?.user1Name || 'Personne 1']: user1Result.scores[lang.id] || 0,
      [couple?.user2Name || 'Personne 2']: user2Result.scores[lang.id] || 0,
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block p-4 bg-white rounded-full shadow-lg mb-4">
            <Users className="h-12 w-12 text-purple-500 animate-pulse" />
          </div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!couple || couple.status !== 'linked') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 pb-8">
        <div className="max-w-2xl mx-auto px-6 pt-8">
          <div className="bg-white rounded-3xl p-8 shadow-xl text-center">
            <h2 className="text-gray-900 mb-4">Lien non trouvé</h2>
            <Button onClick={() => onNavigate('couple-setup')}>
              Retour
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const recommendations = getRecommendations();
  const comparisonData = getComparisonData();
  const bothHaveResults = user1Result && user2Result;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 pb-8">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
        <div className="max-w-2xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('couple-setup')}
              className="p-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-gray-900">Comparaison de couple</h1>
              <p className="text-sm text-gray-600">
                {couple.user1Name} & {couple.user2Name}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-6 pt-8 space-y-6">
        {/* Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl p-8 text-white text-center shadow-xl"
        >
          <div className="inline-block p-3 bg-white/20 rounded-full mb-4">
            <Heart className="h-10 w-10" />
          </div>
          <h2 className="text-white mb-2">Vous êtes connectés ! 💕</h2>
          <p className="text-white/90">
            Découvrez comment mieux communiquer votre amour
          </p>
        </motion.div>

        {bothHaveResults ? (
          <>
            {/* Radar Chart Comparison */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl p-6 shadow-xl"
            >
              <h3 className="text-gray-900 mb-6 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-purple-500" />
                Comparaison visuelle
              </h3>
              
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={comparisonData}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis 
                    dataKey="language" 
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                  />
                  <PolarRadiusAxis angle={90} domain={[0, 'auto']} />
                  <Radar
                    name={couple.user1Name}
                    dataKey={couple.user1Name}
                    stroke="#a855f7"
                    fill="#a855f7"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                  <Radar
                    name={couple.user2Name}
                    dataKey={couple.user2Name}
                    stroke="#ec4899"
                    fill="#ec4899"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Primary Languages */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              {/* User 1 */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <p className="text-sm text-gray-600 mb-3">{couple.user1Name}</p>
                <div className="text-center">
                  {loveLanguages.find(l => l.id === user1Result.primaryLanguageId) && (
                    <>
                      <div className="text-4xl mb-2">
                        {loveLanguages.find(l => l.id === user1Result.primaryLanguageId)?.icon}
                      </div>
                      <p className="text-sm text-gray-900">
                        {loveLanguages.find(l => l.id === user1Result.primaryLanguageId)?.name}
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* User 2 */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <p className="text-sm text-gray-600 mb-3">{couple.user2Name}</p>
                <div className="text-center">
                  {loveLanguages.find(l => l.id === user2Result.primaryLanguageId) && (
                    <>
                      <div className="text-4xl mb-2">
                        {loveLanguages.find(l => l.id === user2Result.primaryLanguageId)?.icon}
                      </div>
                      <p className="text-sm text-gray-900">
                        {loveLanguages.find(l => l.id === user2Result.primaryLanguageId)?.name}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Recommendations */}
            {recommendations.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-3xl p-6 shadow-xl"
              >
                <h3 className="text-gray-900 mb-6 flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-purple-500" />
                  Recommandations pour vous
                </h3>

                <div className="space-y-4">
                  {recommendations.map((rec, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-5 border border-purple-100"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl flex-shrink-0">{rec.icon}</span>
                        <div className="flex-1">
                          <h4 className="text-gray-900 mb-1">{rec.title}</h4>
                          <p className="text-sm text-gray-600">{rec.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Understanding Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-3xl p-6 shadow-xl"
            >
              <h3 className="text-gray-900 mb-4 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-500" />
                Comprendre vos différences
              </h3>
              
              <div className="space-y-3 text-sm text-gray-700">
                <p>
                  💡 Vos langages d'amour peuvent être différents, et c'est normal ! 
                  L'important est de comprendre comment l'autre préfère recevoir l'amour.
                </p>
                <p>
                  🎯 Essayez de parler le langage de votre partenaire, même si ce n'est 
                  pas votre langage naturel. C'est un acte d'amour en soi.
                </p>
                <p>
                  💕 Communiquez ouvertement sur vos besoins. Partagez ce qui vous fait 
                  sentir aimé(e) et demandez à votre partenaire de faire de même.
                </p>
              </div>
            </motion.div>
          </>
        ) : (
          /* Missing Results */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-8 shadow-xl text-center"
          >
            <div className="inline-block p-4 bg-yellow-100 rounded-full mb-4">
              <Sparkles className="h-12 w-12 text-yellow-600" />
            </div>
            <h2 className="text-gray-900 mb-2">Résultats incomplets</h2>
            <p className="text-gray-600 mb-6">
              {!user1Result && !user2Result ? (
                <>Les deux personnes doivent passer le quiz pour voir la comparaison</>
              ) : !user1Result ? (
                <>{couple.user1Name} doit passer le quiz</>
              ) : (
                <>{couple.user2Name} doit passer le quiz</>
              )}
            </p>
            
            {(userId === couple.user1Id && !user1Result) || 
             (userId === couple.user2Id && !user2Result) ? (
              <Button
                onClick={() => onNavigate('quiz')}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                Passer le quiz maintenant
              </Button>
            ) : (
              <p className="text-sm text-gray-500">
                Partagez le code avec votre partenaire pour qu'il/elle puisse passer le quiz
              </p>
            )}
          </motion.div>
        )}

        {/* Actions */}
        <div className="space-y-3">
          <Button
            onClick={() => onNavigate('suggestions')}
            variant="outline"
            className="w-full py-6 rounded-2xl border-2 border-purple-200 hover:bg-purple-50"
          >
            Voir toutes les suggestions
          </Button>
          
          <Button
            onClick={() => onNavigate('dashboard')}
            variant="ghost"
            className="w-full py-6 text-gray-600"
          >
            Retour à l'accueil
          </Button>
        </div>
      </div>
    </div>
  );
}