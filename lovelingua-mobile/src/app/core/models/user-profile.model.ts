export interface UserProfile {
  id: string;
  firstName: string;
  birthDate: string;
  gender: 'female' | 'male' | 'other';
  relationshipStatus: string;
  primaryLanguage?: string;
  primaryLanguageId?: string;
  createdAt: string;
}
