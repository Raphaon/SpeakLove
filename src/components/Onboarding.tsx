import { useState } from 'react';
import { ArrowRight, Heart, Sparkles, Users, MessageCircle } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

const onboardingSteps = [
  {
    id: 1,
    title: "Bienvenue sur",
    subtitle: "LoveLingua",
    description: "Découvre ton langage d'amour et transforme tes relations",
    gradient: "from-pink-500 to-pink-400",
    emoji: "💝",
    features: [
      { icon: Heart, text: "Quiz personnalisé des 5 langages" },
      { icon: Sparkles, text: "Conseils adaptés à ton profil" },
      { icon: Users, text: "Outils pour couples & célibataires" },
    ]
  },
  {
    id: 2,
    title: "Les 5 Langages",
    subtitle: "d'Amour",
    description: "Comprends comment tu aimes et comment être aimé(e)",
    gradient: "from-pink-400 to-rose-400",
    emoji: "❤️",
    languages: [
      { emoji: "💬", name: "Paroles valorisantes", color: "bg-pink-500" },
      { emoji: "⏰", name: "Moments de qualité", color: "bg-pink-400" },
      { emoji: "🎁", name: "Cadeaux", color: "bg-rose-400" },
      { emoji: "🤝", name: "Services rendus", color: "bg-rose-300" },
      { emoji: "🤗", name: "Toucher physique", color: "bg-pink-300" },
    ]
  },
  {
    id: 3,
    title: "Renforce",
    subtitle: "votre connexion",
    description: "Des outils puissants pour cultiver votre amour au quotidien",
    gradient: "from-rose-400 to-pink-300",
    emoji: "💑",
    tools: [
      { emoji: "❤️", title: "Réservoir d'Amour", subtitle: "Suivez votre connexion" },
      { emoji: "🎯", title: "Quêtes quotidiennes", subtitle: "Défis personnalisés" },
      { emoji: "💭", title: "200 Questions", subtitle: "Conversations profondes" },
      { emoji: "⭐", title: "Liste d'envies", subtitle: "Partagez vos désirs" },
    ]
  },
  {
    id: 4,
    title: "Prêt(e) à",
    subtitle: "commencer ?",
    description: "Ton voyage vers de meilleures relations commence maintenant",
    gradient: "from-pink-300 to-pink-100",
    emoji: "🚀",
    steps: [
      "Passe le quiz en 5 minutes",
      "Découvre ton langage principal",
      "Explore tes gestes d'amour",
      "Crée un lien couple (optionnel)",
    ]
  }
];

export function Onboarding({ onComplete }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const step = onboardingSteps[currentStep];
  const isLastStep = currentStep === onboardingSteps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      onComplete();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} transition-all duration-700`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.2),transparent_50%)] animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.15),transparent_60%)] animate-pulse delay-300" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Skip Button */}
        {!isLastStep && (
          <div className="absolute top-6 right-6">
            <button
              onClick={handleSkip}
              className="px-4 py-2 text-white/90 hover:text-white text-sm font-medium transition-colors"
            >
              Passer
            </button>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
          {/* Emoji */}
          <div className="text-8xl mb-8 animate-bounce">
            {step.emoji}
          </div>

          {/* Title */}
          <div className="text-center mb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {step.title}
            </h1>
            <h2 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
              {step.subtitle}
            </h2>
          </div>

          {/* Description */}
          <p className="text-center text-white/95 text-lg md:text-xl mb-12 max-w-md">
            {step.description}
          </p>

          {/* Step-specific content */}
          <div className="w-full max-w-md mb-12">
            {step.features && (
              <div className="space-y-4">
                {step.features.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-white/20 backdrop-blur-md rounded-2xl p-4 flex items-center gap-4 animate-slide-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-12 h-12 rounded-full bg-white/30 flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-white font-medium">{feature.text}</span>
                  </div>
                ))}
              </div>
            )}

            {step.languages && (
              <div className="space-y-3">
                {step.languages.map((lang, index) => (
                  <div
                    key={index}
                    className="bg-white/20 backdrop-blur-md rounded-2xl p-4 flex items-center gap-3 animate-slide-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <span className="text-3xl">{lang.emoji}</span>
                    <span className="text-white font-medium">{lang.name}</span>
                  </div>
                ))}
              </div>
            )}

            {step.tools && (
              <div className="grid grid-cols-2 gap-3">
                {step.tools.map((tool, index) => (
                  <div
                    key={index}
                    className="bg-white/20 backdrop-blur-md rounded-2xl p-4 text-center animate-scale-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="text-4xl mb-2">{tool.emoji}</div>
                    <div className="text-white font-semibold text-sm mb-1">{tool.title}</div>
                    <div className="text-white/80 text-xs">{tool.subtitle}</div>
                  </div>
                ))}
              </div>
            )}

            {step.steps && (
              <div className="space-y-3">
                {step.steps.map((stepText, index) => (
                  <div
                    key={index}
                    className="bg-white/20 backdrop-blur-md rounded-2xl p-4 flex items-start gap-3 animate-slide-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">{index + 1}</span>
                    </div>
                    <span className="text-white font-medium pt-0.5">{stepText}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="pb-12 px-6">
          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mb-8">
            {onboardingSteps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentStep
                    ? 'w-8 bg-white'
                    : 'w-2 bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="w-full max-w-md mx-auto block bg-white text-pink-600 font-bold py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="flex items-center justify-center gap-2">
              <span className="text-lg">
                {isLastStep ? "C'est parti !" : 'Suivant'}
              </span>
              <ArrowRight className="w-5 h-5" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
