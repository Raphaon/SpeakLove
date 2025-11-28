import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonIcon,
  IonButtons,
  IonCard,
  IonCardContent,
  IonInput,
  IonSpinner,
  IonText,
  useIonRouter,
} from '@ionic/react';
import {
  arrowBack,
  people,
  add,
  enterOutline,
  copy,
  checkmark,
} from 'ionicons/icons';
import { useState, useEffect } from 'react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { getUserId, getUserProfile } from '../../utils/storage';
import './PartnerQuizLobbyIonic.css';

interface PartnerQuizLobbyIonicProps {
  onGameStart: (sessionId: string, partnerId: string, partnerName: string) => void;
}

export function PartnerQuizLobbyIonic({ onGameStart }: PartnerQuizLobbyIonicProps) {
  const router = useIonRouter();
  const [mode, setMode] = useState<'select' | 'create' | 'join'>('select');
  const [code, setCode] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [createdSessionId, setCreatedSessionId] = useState('');

  const profile = getUserProfile();
  const userId = getUserId();
  const userName = profile?.firstName || 'Utilisateur';

  const handleCreate = async () => {
    setLoading(true);
    setError('');

    try {
      const { getBalancedQuestions } = await import('../../data/partnerQuizQuestions');
      const questions = getBalancedQuestions();

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b0056f59/partner-quiz/create`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            partnerId: userId,
            partnerName: userName,
            questions,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setCode(data.code);
        setCreatedSessionId(data.sessionId);
        setMode('create');
      } else {
        setError(data.error || 'Erreur lors de la création du quiz');
      }
    } catch (err) {
      console.error('Error creating quiz:', err);
      setError('Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  const handleJoin = async () => {
    if (!joinCode.trim()) {
      setError('Veuillez entrer un code');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b0056f59/partner-quiz/join`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            code: joinCode.trim().toUpperCase(),
            partnerId: userId,
            partnerName: userName,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        onGameStart(data.sessionId, userId, userName);
        router.push('/partner-quiz-game');
      } else {
        setError(data.error || 'Code invalide');
      }
    } catch (err) {
      console.error('Error joining quiz:', err);
      setError('Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const checkForPartner = async () => {
    if (!createdSessionId) return;

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b0056f59/partner-quiz/${createdSessionId}`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.session?.partnerBId) {
          onGameStart(data.session.id, userId, userName);
          router.push('/partner-quiz-game');
        }
      }
    } catch (err) {
      console.error('Error checking for partner:', err);
    }
  };

  useEffect(() => {
    if (mode === 'create' && createdSessionId) {
      const interval = setInterval(checkForPartner, 2000);
      return () => clearInterval(interval);
    }
  }, [mode, createdSessionId]);

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => router.push('/dashboard')}>
              <IonIcon icon={arrowBack} />
            </IonButton>
          </IonButtons>
          <IonTitle>Quiz Couple</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <div className="text-center mb-6 mt-4">
          <div className="text-6xl mb-3">💕</div>
          <h2 className="text-gray-800 mb-2">Vous connaissez-vous vraiment ?</h2>
          <p className="text-gray-600 text-sm">
            Un jeu à deux pour tester votre complicité
          </p>
        </div>

        {mode === 'select' && (
          <div className="space-y-3 max-w-md mx-auto">
            <IonCard button onClick={handleCreate} disabled={loading}>
              <IonCardContent className="ion-padding">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
                    <IonIcon icon={add} color="primary" className="text-2xl" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="m-0 mb-1">Créer une partie</h3>
                    <p className="text-gray-600 text-sm m-0">
                      Générez un code et invitez votre partenaire
                    </p>
                  </div>
                </div>
              </IonCardContent>
            </IonCard>

            <IonCard button onClick={() => setMode('join')} disabled={loading}>
              <IonCardContent className="ion-padding">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <IonIcon icon={enterOutline} color="secondary" className="text-2xl" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="m-0 mb-1">Rejoindre une partie</h3>
                    <p className="text-gray-600 text-sm m-0">
                      Entrez le code partagé par votre partenaire
                    </p>
                  </div>
                </div>
              </IonCardContent>
            </IonCard>

            {loading && (
              <div className="text-center mt-4">
                <IonSpinner />
              </div>
            )}
          </div>
        )}

        {mode === 'create' && (
          <div className="max-w-md mx-auto">
            <IonCard className="gradient-primary text-white">
              <IonCardContent className="ion-padding text-center">
                <div className="text-4xl mb-4">🎮</div>
                <h3 className="text-white mb-2">Partie créée !</h3>
                <p className="text-white opacity-90 text-sm mb-4">
                  Partagez ce code avec votre partenaire
                </p>
                
                <div className="bg-white rounded-2xl p-4 mb-4">
                  <div className="text-4xl text-primary tracking-widest mb-2">
                    {code}
                  </div>
                  <IonButton
                    expand="block"
                    fill="outline"
                    onClick={handleCopy}
                    color="primary"
                  >
                    <IonIcon icon={copied ? checkmark : copy} slot="start" />
                    {copied ? 'Copié !' : 'Copier le code'}
                  </IonButton>
                </div>

                <div className="flex items-center justify-center gap-2 text-white opacity-80">
                  <IonSpinner color="light" />
                  <span className="text-sm">En attente de votre partenaire...</span>
                </div>
              </IonCardContent>
            </IonCard>

            <div className="text-center mt-4">
              <IonButton fill="clear" onClick={() => setMode('select')}>
                Annuler
              </IonButton>
            </div>
          </div>
        )}

        {mode === 'join' && (
          <div className="max-w-md mx-auto">
            <IonCard>
              <IonCardContent className="ion-padding">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-3">🔑</div>
                  <h3 className="mb-2">Entrez le code</h3>
                  <p className="text-gray-600 text-sm">
                    Code à 4 lettres partagé par votre partenaire
                  </p>
                </div>

                <IonInput
                  value={joinCode}
                  onIonInput={(e) => setJoinCode(e.detail.value?.toUpperCase() || '')}
                  placeholder="ABCD"
                  maxlength={4}
                  className="text-center text-2xl tracking-widest mb-4 uppercase"
                  clearInput
                />

                {error && (
                  <IonText color="danger" className="text-sm block text-center mb-3">
                    {error}
                  </IonText>
                )}

                <IonButton
                  expand="block"
                  onClick={handleJoin}
                  disabled={loading || joinCode.length !== 4}
                  size="large"
                >
                  {loading ? <IonSpinner /> : 'Rejoindre'}
                </IonButton>
              </IonCardContent>
            </IonCard>

            <div className="text-center mt-4">
              <IonButton fill="clear" onClick={() => setMode('select')}>
                Retour
              </IonButton>
            </div>
          </div>
        )}

        {/* Info Card */}
        <IonCard className="mt-6 max-w-md mx-auto">
          <IonCardContent>
            <h3 className="flex items-center gap-2 mb-3">
              <IonIcon icon={people} color="primary" />
              <span>Comment ça marche ?</span>
            </h3>
            <ol className="text-sm text-gray-600 space-y-2 m-0 pl-4">
              <li>Une personne crée la partie et partage le code</li>
              <li>L'autre personne rejoint avec le code</li>
              <li>Vous répondez à tour de rôle aux questions</li>
              <li>Découvrez à quel point vous vous connaissez !</li>
            </ol>
          </IonCardContent>
        </IonCard>

        <div className="h-8" />
      </IonContent>
    </IonPage>
  );
}
