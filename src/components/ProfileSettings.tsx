import { useState, useEffect } from 'react';
import { ArrowLeft, User, Heart, Target, Trash2, Save, BookOpen } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { getUserProfile, saveUserProfile, clearUserProfile, clearTestResults, clearCoupleId, UserProfile } from '../utils/storage';
import { motion } from 'motion/react';

interface ProfileSettingsProps {
  onNavigate: (page: string) => void;
}

export function ProfileSettings({ onNavigate }: ProfileSettingsProps) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [firstName, setFirstName] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | 'other' | 'prefer-not-to-say' | ''>('');
  const [relationshipStatus, setRelationshipStatus] = useState<'single' | 'dating' | 'married' | 'complicated' | ''>('');
  const [goal, setGoal] = useState<'self-discovery' | 'improve-relationship' | 'prepare-future' | 'help-others' | 'curiosity' | ''>('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const userProfile = getUserProfile();
    if (userProfile) {
      setProfile(userProfile);
      setFirstName(userProfile.firstName);
      setGender(userProfile.gender || '');
      setRelationshipStatus(userProfile.relationshipStatus);
      setGoal(userProfile.goal);
    }
  }, []);

  const handleSave = () => {
    if (!profile || !firstName.trim() || !relationshipStatus || !goal) return;

    const updatedProfile: UserProfile = {
      ...profile,
      firstName: firstName.trim(),
      gender: gender || undefined,
      relationshipStatus: relationshipStatus as any,
      goal: goal as any,
      updatedAt: new Date().toISOString(),
    };

    saveUserProfile(updatedProfile);
    setProfile(updatedProfile);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleResetAll = () => {
    if (confirm('⚠️ Êtes-vous sûr(e) de vouloir tout réinitialiser ? Cela supprimera :\n- Votre profil\n- Tous vos résultats de test\n- Votre lien couple\n\nCette action est irréversible.')) {
      clearUserProfile();
      clearTestResults();
      clearCoupleId();
      window.location.reload();
    }
  };

  const handleReviewOnboarding = () => {
    localStorage.removeItem('hasSeenOnboarding');
    window.location.reload();
  };

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#FFF5F7] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Chargement du profil...</p>
        </div>
      </div>
    );
  }

  const getRelationshipLabel = (status: string) => {
    const labels: Record<string, string> = {
      'single': 'Célibataire',
      'dating': 'En couple',
      'married': 'Marié(e)',
      'complicated': 'C\'est compliqué',
    };
    return labels[status] || status;
  };

  const getGoalLabel = (goalValue: string) => {
    const labels: Record<string, string> = {
      'self-discovery': 'Mieux me connaître',
      'improve-relationship': 'Améliorer ma relation',
      'prepare-future': 'Préparer un couple futur',
      'help-others': 'Aider les autres',
      'curiosity': 'Simple curiosité',
    };
    return labels[goalValue] || goalValue;
  };

  return (
    <div className="min-h-screen bg-[#FFF5F7] pb-8">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
        <div className="max-w-2xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('dashboard')}
              className="p-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-gray-900">Paramètres du profil</h1>
              <p className="text-sm text-gray-600">Gérez vos informations personnelles</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-6 pt-8 space-y-6">
        {/* Profile Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-6 shadow-xl"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <User className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-gray-900">{profile.firstName}</h2>
              <p className="text-sm text-gray-600">
                Membre depuis {new Date(profile.createdAt).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
              </p>
            </div>
          </div>

          {/* Name */}
          <div className="mb-6">
            <label className="block text-sm text-gray-700 mb-2">Prénom</label>
            <Input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Votre prénom"
              className="w-full"
            />
          </div>

          {/* Gender */}
          <div className="mb-6">
            <label className="block text-sm text-gray-700 mb-3">Genre (optionnel)</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: 'male', label: 'Homme', emoji: '👨' },
                { value: 'female', label: 'Femme', emoji: '👩' },
                { value: 'other', label: 'Autre', emoji: '✨' },
                { value: 'prefer-not-to-say', label: 'Ne pas dire', emoji: '🤐' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setGender(option.value as any)}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    gender === option.value
                      ? 'bg-purple-100 border-purple-400'
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <span>{option.emoji}</span>
                    <span className="text-sm text-gray-900">{option.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Relationship Status */}
          <div className="mb-6">
            <label className="block text-sm text-gray-700 mb-3 flex items-center gap-2">
              <Heart className="h-4 w-4 text-purple-500" />
              Situation amoureuse
            </label>
            <div className="space-y-2">
              {[
                { value: 'single', label: 'Célibataire', emoji: '🦋' },
                { value: 'dating', label: 'En couple', emoji: '💕' },
                { value: 'married', label: 'Marié(e)', emoji: '💍' },
                { value: 'complicated', label: 'C\'est compliqué', emoji: '🤔' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setRelationshipStatus(option.value as any)}
                  className={`w-full p-3 rounded-xl border-2 transition-all text-left ${
                    relationshipStatus === option.value
                      ? 'bg-purple-100 border-purple-400'
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{option.emoji}</span>
                    <span className="text-sm text-gray-900">{option.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Goal */}
          <div className="mb-6">
            <label className="block text-sm text-gray-700 mb-3 flex items-center gap-2">
              <Target className="h-4 w-4 text-purple-500" />
              Objectif
            </label>
            <div className="space-y-2">
              {[
                { value: 'self-discovery', label: 'Mieux me connaître', emoji: '🔍' },
                { value: 'improve-relationship', label: 'Améliorer ma relation', emoji: '💞' },
                { value: 'prepare-future', label: 'Préparer un couple futur', emoji: '🌟' },
                { value: 'help-others', label: 'Aider les autres', emoji: '🤝' },
                { value: 'curiosity', label: 'Simple curiosité', emoji: '🎯' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setGoal(option.value as any)}
                  className={`w-full p-3 rounded-xl border-2 transition-all text-left ${
                    goal === option.value
                      ? 'bg-purple-100 border-purple-400'
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{option.emoji}</span>
                    <span className="text-sm text-gray-900">{option.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <Button
            onClick={handleSave}
            disabled={!firstName.trim() || !relationshipStatus || !goal}
            className="w-full py-6 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50"
          >
            {saved ? (
              <>
                <Save className="mr-2 h-5 w-5" />
                Enregistré !
              </>
            ) : (
              <>
                <Save className="mr-2 h-5 w-5" />
                Enregistrer les modifications
              </>
            )}
          </Button>
        </motion.div>

        {/* Onboarding */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-blue-50 rounded-3xl p-6 border-2 border-blue-200"
        >
          <h3 className="text-blue-900 mb-3 flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Tutoriel
          </h3>
          <p className="text-sm text-blue-700 mb-4">
            Revoir la présentation de l'application et découvrir toutes ses fonctionnalités.
          </p>
          <Button
            onClick={handleReviewOnboarding}
            variant="outline"
            className="w-full py-4 rounded-2xl border-2 border-blue-300 text-blue-700 hover:bg-blue-100"
          >
            <BookOpen className="mr-2 h-4 w-4" />
            Revoir le tutoriel
          </Button>
        </motion.div>

        {/* Danger Zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-red-50 rounded-3xl p-6 border-2 border-red-200"
        >
          <h3 className="text-red-900 mb-3 flex items-center gap-2">
            <Trash2 className="h-5 w-5" />
            Zone de danger
          </h3>
          <p className="text-sm text-red-700 mb-4">
            Cette action est irréversible. Toutes vos données seront définitivement supprimées.
          </p>
          <Button
            onClick={handleResetAll}
            variant="outline"
            className="w-full py-4 rounded-2xl border-2 border-red-300 text-red-700 hover:bg-red-100"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Réinitialiser toutes les données
          </Button>
        </motion.div>

        {/* Info */}
        <div className="bg-purple-50 rounded-2xl p-5 border border-purple-200">
          <p className="text-sm text-purple-900">
            💡 <strong>Bon à savoir :</strong> Vos données sont stockées localement sur votre appareil. 
            Aucune information n'est envoyée à des serveurs externes.
          </p>
        </div>
      </div>
    </div>
  );
}
