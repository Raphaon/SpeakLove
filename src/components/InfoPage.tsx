import { ArrowLeft, BookOpen } from 'lucide-react';
import { Button } from './ui/button';
import { loveLanguages } from '../data/loveLanguages';
import { motion } from 'motion/react';

interface InfoPageProps {
  onNavigate: (page: string) => void;
}

export function InfoPage({ onNavigate }: InfoPageProps) {
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
            <h1 className="text-gray-900">Les 5 langages de l'amour</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-6 pt-6">
        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl p-6 mb-6 text-white shadow-xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="h-6 w-6" />
            <h2 className="text-white">Qu'est-ce qu'un langage d'amour ?</h2>
          </div>
          <p className="text-white/90 leading-relaxed">
            Les 5 langages de l'amour, concept développé par Gary Chapman, représentent 
            les différentes façons dont nous exprimons et recevons l'amour. Chaque personne 
            a un langage principal qui la fait se sentir particulièrement aimée et appréciée.
          </p>
        </motion.div>

        {/* Why it matters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-gray-100"
        >
          <h3 className="text-gray-900 mb-3">Pourquoi c'est important ?</h3>
          <div className="space-y-3 text-gray-700">
            <div className="flex gap-3">
              <span className="text-purple-500 flex-shrink-0 mt-1">•</span>
              <p>
                <span className="font-medium">Mieux se comprendre :</span> Identifier votre langage 
                vous aide à reconnaître vos besoins émotionnels.
              </p>
            </div>
            <div className="flex gap-3">
              <span className="text-purple-500 flex-shrink-0 mt-1">•</span>
              <p>
                <span className="font-medium">Améliorer vos relations :</span> Connaître le langage 
                des autres vous permet de les aimer de la façon qui résonne le plus avec eux.
              </p>
            </div>
            <div className="flex gap-3">
              <span className="text-purple-500 flex-shrink-0 mt-1">•</span>
              <p>
                <span className="font-medium">Éviter les malentendus :</span> Parfois, l'amour est 
                exprimé mais pas reçu parce que les langages sont différents.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Love Languages Details */}
        <div className="mb-6">
          <h3 className="text-gray-900 mb-4">Les 5 langages expliqués</h3>
          <div className="space-y-4">
            {loveLanguages.map((language, index) => (
              <motion.div
                key={language.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
              >
                <div className="flex items-start gap-4 mb-3">
                  <div className="text-4xl flex-shrink-0">{language.icon}</div>
                  <div className="flex-1">
                    <h4 
                      className="text-gray-900 mb-1"
                      style={{ color: language.color }}
                    >
                      {language.name}
                    </h4>
                    <p className="text-sm text-gray-600 mb-3">
                      {language.description}
                    </p>
                  </div>
                </div>
                <div className="pl-14">
                  <p className="text-gray-700">{language.fullDescription}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* How to use */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-purple-50 rounded-2xl p-6 mb-6 border border-purple-100"
        >
          <h3 className="text-purple-900 mb-3">Comment utiliser cette application ?</h3>
          <div className="space-y-3 text-purple-900">
            <div className="flex gap-3">
              <span className="flex-shrink-0">1️⃣</span>
              <p>
                <span className="font-medium">Passez le quiz</span> pour découvrir votre langage 
                d'amour principal et la répartition de tous vos langages.
              </p>
            </div>
            <div className="flex gap-3">
              <span className="flex-shrink-0">2️⃣</span>
              <p>
                <span className="font-medium">Explorez les suggestions</span> de gestes adaptés 
                à chaque langage et type de relation.
              </p>
            </div>
            <div className="flex gap-3">
              <span className="flex-shrink-0">3️⃣</span>
              <p>
                <span className="font-medium">Utilisez les questions</span> pour approfondir 
                vos conversations et mieux connaître vos proches.
              </p>
            </div>
            <div className="flex gap-3">
              <span className="flex-shrink-0">4️⃣</span>
              <p>
                <span className="font-medium">Partagez vos résultats</span> avec votre partenaire, 
                famille ou amis pour améliorer votre communication mutuelle.
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <div className="space-y-3">
          <Button
            onClick={() => onNavigate('quiz')}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-6 rounded-2xl shadow-lg"
          >
            Découvrir mon langage d'amour
          </Button>
          <Button
            onClick={() => onNavigate('home')}
            variant="outline"
            className="w-full py-6 rounded-2xl border-2 border-purple-200 hover:bg-purple-50"
          >
            Retour à l'accueil
          </Button>
        </div>
      </div>
    </div>
  );
}
