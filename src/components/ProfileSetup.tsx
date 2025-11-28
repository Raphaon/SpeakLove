import { useState } from 'react';
import { Heart, User, Calendar, Users as UsersIcon } from 'lucide-react';
import { saveUserProfile, UserProfile } from '../utils/storage';
import { toast } from 'sonner@2.0.3';

interface ProfileSetupProps {
  onComplete?: () => void;
}

export function ProfileSetup({ onComplete }: ProfileSetupProps) {
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    firstName: '',
    birthDate: '',
    gender: '',
    relationshipStatus: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!profile.firstName || !profile.birthDate || !profile.gender || !profile.relationshipStatus) {
      toast.warning('Veuillez remplir tous les champs');
      return;
    }

    const userProfile: Partial<UserProfile> = {
      firstName: profile.firstName,
      birthDate: profile.birthDate,
      gender: profile.gender,
      relationshipStatus: profile.relationshipStatus,
      createdAt: new Date().toISOString(),
    };

    saveUserProfile(userProfile);

    toast.success('✨ Profil créé avec succès !');

    setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">
            <User className="w-20 h-20 mx-auto text-pink-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Bienvenue sur LoveLingua 💕
          </h1>
          <p className="text-gray-600">Créons ton profil pour commencer</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl p-6 md:p-8 space-y-6">
          {/* Prénom */}
          <div>
            <label className="block text-sm font-semibold text-pink-600 mb-2">
              Prénom
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={profile.firstName}
                onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                placeholder="Ton prénom"
                className="w-full pl-10 pr-4 py-3 bg-pink-50 border-2 border-transparent rounded-xl focus:border-pink-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Date de naissance */}
          <div>
            <label className="block text-sm font-semibold text-pink-600 mb-2">
              Date de naissance
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="date"
                value={profile.birthDate}
                onChange={(e) => setProfile({ ...profile, birthDate: e.target.value })}
                className="w-full pl-10 pr-4 py-3 bg-pink-50 border-2 border-transparent rounded-xl focus:border-pink-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Genre */}
          <div>
            <label className="block text-sm font-semibold text-pink-600 mb-3">
              Genre
            </label>
            <div className="space-y-2">
              {[
                { value: 'female', label: 'Femme', emoji: '👩' },
                { value: 'male', label: 'Homme', emoji: '👨' },
                { value: 'other', label: 'Autre / Non-binaire', emoji: '🧑' }
              ].map(option => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setProfile({ ...profile, gender: option.value })}
                  className={`w-full p-4 rounded-xl border-2 flex items-center gap-3 transition-all ${
                    profile.gender === option.value
                      ? 'border-pink-500 bg-pink-50 shadow-md'
                      : 'border-gray-200 bg-white hover:border-pink-300'
                  }`}
                >
                  <span className="text-2xl">{option.emoji}</span>
                  <span className="font-medium text-gray-700">{option.label}</span>
                  {profile.gender === option.value && (
                    <Heart className="ml-auto w-5 h-5 text-pink-500 fill-current" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Statut relationnel */}
          <div>
            <label className="block text-sm font-semibold text-pink-600 mb-2">
              Statut relationnel
            </label>
            <div className="relative">
              <UsersIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={profile.relationshipStatus}
                onChange={(e) => setProfile({ ...profile, relationshipStatus: e.target.value })}
                className="w-full pl-10 pr-4 py-3 bg-pink-50 border-2 border-transparent rounded-xl focus:border-pink-500 focus:outline-none transition-colors appearance-none"
              >
                <option value="">Sélectionner</option>
                <option value="single">Célibataire</option>
                <option value="dating">En couple</option>
                <option value="engaged">Fiancé(e)</option>
                <option value="married">Marié(e)</option>
                <option value="complicated">C'est compliqué</option>
                <option value="prefer-not-say">Préfère ne pas dire</option>
              </select>
            </div>
          </div>

          {/* Info Card */}
          <div className="bg-pink-50 rounded-xl p-4 flex gap-3">
            <Heart className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-gray-600">
              <strong>Confidentialité :</strong> Tes informations restent privées et ne sont utilisées que pour personnaliser ton expérience.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-rose-400 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <Heart className="w-5 h-5" />
            Créer mon profil
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProfileSetup;
