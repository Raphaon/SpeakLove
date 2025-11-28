import { useState } from 'react';
import {
  IonContent,
  IonPage,
  IonButton,
  IonIcon,
} from '@ionic/react';
import {
  arrowForward,
  heartCircle,
  sparkles,
  people,
  chatbubbles,
  rocket,
} from 'ionicons/icons';
import './OnboardingIonic.css';

interface OnboardingIonicProps {
  onComplete: () => void;
}

const onboardingSteps = [
  {
    id: 1,
    title: "Bienvenue sur",
    subtitle: "LoveLingua",
    description: "Découvre ton langage d'amour et transforme tes relations",
    gradient: "linear-gradient(135deg, #E91E63 0%, #FF6B9D 100%)",
    emoji: "💝",
    features: [
      { icon: heartCircle, text: "Quiz personnalisé des 5 langages" },
      { icon: sparkles, text: "Conseils adaptés à ton profil" },
      { icon: people, text: "Outils pour couples & célibataires" },
    ]
  },
  {
    id: 2,
    title: "Les 5 Langages",
    subtitle: "d'Amour",
    description: "Comprends comment tu aimes et comment être aimé(e)",
    gradient: "linear-gradient(135deg, #FF6B9D 0%, #FFA4C0 100%)",
    emoji: "❤️",
    languages: [
      { emoji: "💬", name: "Paroles valorisantes", color: "#E91E63" },
      { emoji: "⏰", name: "Moments de qualité", color: "#F06292" },
      { emoji: "🎁", name: "Cadeaux", color: "#FF6B9D" },
      { emoji: "🤝", name: "Services rendus", color: "#F48FB1" },
      { emoji: "🤗", name: "Toucher physique", color: "#FFA4C0" },
    ]
  },
  {
    id: 3,
    title: "Renforce",
    subtitle: "votre connexion",
    description: "Des outils puissants pour cultiver votre amour au quotidien",
    gradient: "linear-gradient(135deg, #FFA4C0 0%, #FFCCE0 100%)",
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
    gradient: "linear-gradient(135deg, #FFCCE0 0%, #FFE4E8 100%)",
    emoji: "🚀",
    steps: [
      "Passe le quiz en 5 minutes",
      "Découvre ton langage principal",
      "Explore tes gestes d'amour",
      "Crée un lien couple (optionnel)",
    ]
  }
];

export function OnboardingIonic({ onComplete }: OnboardingIonicProps) {
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
    <IonPage>
      <IonContent fullscreen className="onboarding-modern-content">
        <div className="onboarding-modern-container">
          {/* Background avec gradient animé */}
          <div 
            className="onboarding-background"
            style={{ background: step.gradient }}
          />

          {/* Skip Button */}
          {!isLastStep && (
            <button onClick={handleSkip} className="skip-btn">
              Passer
            </button>
          )}

          {/* Dots Indicator */}
          <div className="dots-indicator">
            {onboardingSteps.map((_, index) => (
              <div
                key={index}
                className={`dot ${index === currentStep ? 'active' : ''}`}
              />
            ))}
          </div>

          {/* Main Content */}
          <div className="onboarding-content-wrapper">
            {/* Hero Section */}
            <div className="hero-section">
              <div className="emoji-hero">{step.emoji}</div>
              <h1 className="title-main">{step.title}</h1>
              <h2 className="title-gradient">{step.subtitle}</h2>
              <p className="description-main">{step.description}</p>
            </div>

            {/* Dynamic Content Based on Step */}
            <div className="content-section">
              {/* Step 1: Features */}
              {step.id === 1 && step.features && (
                <div className="features-grid">
                  {step.features.map((feature, index) => (
                    <div key={index} className="feature-item">
                      <IonIcon icon={feature.icon} className="feature-icon-ion" />
                      <span>{feature.text}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Step 2: Languages */}
              {step.id === 2 && step.languages && (
                <div className="languages-list">
                  {step.languages.map((lang, index) => (
                    <div 
                      key={index} 
                      className="language-card"
                      style={{ 
                        animationDelay: `${index * 0.1}s`,
                        borderLeftColor: lang.color 
                      }}
                    >
                      <span className="lang-emoji">{lang.emoji}</span>
                      <span className="lang-name">{lang.name}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Step 3: Tools */}
              {step.id === 3 && step.tools && (
                <div className="tools-grid">
                  {step.tools.map((tool, index) => (
                    <div 
                      key={index} 
                      className="tool-card"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="tool-emoji">{tool.emoji}</div>
                      <div className="tool-info">
                        <div className="tool-title">{tool.title}</div>
                        <div className="tool-subtitle">{tool.subtitle}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Step 4: Final Steps */}
              {step.id === 4 && step.steps && (
                <div className="final-steps">
                  {step.steps.map((stepText, index) => (
                    <div 
                      key={index} 
                      className="final-step-item"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="step-number">{index + 1}</div>
                      <span>{stepText}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Navigation Button */}
          <div className="nav-button-container">
            <IonButton
              expand="block"
              size="large"
              onClick={handleNext}
              className="next-btn-modern"
            >
              {isLastStep ? (
                <>
                  Commencer l'aventure
                  <IonIcon slot="end" icon={rocket} />
                </>
              ) : (
                <>
                  Suivant
                  <IonIcon slot="end" icon={arrowForward} />
                </>
              )}
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default OnboardingIonic;
