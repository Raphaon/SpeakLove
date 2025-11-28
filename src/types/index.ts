// Types de base pour l'application des 5 langages de l'amour

export type LoveLanguageCode = 'MQ' | 'SR' | 'PQ' | 'CD' | 'TP';

export interface LoveLanguage {
  code: LoveLanguageCode;
  label: string;
  descriptionCourte: string;
  descriptionDetaillee: string;
  icon: string;
  color: string;
}

export type RelationType = 
  | 'celibataire'
  | 'en_couple'
  | 'fiance'
  | 'marie'
  | 'parent'
  | 'ami'
  | 'enfant'
  | 'collegue';

export interface Question {
  id: string;
  texte: string;
  ordre: number;
  actif: boolean;
}

export interface QuestionOption {
  id: string;
  label: string;
  texte: string;
  codeLangage: LoveLanguageCode;
}

export interface QuizQuestion {
  id: string;
  texte: string;
  options: QuestionOption[];
}

export interface TestResult {
  scores: Record<LoveLanguageCode, number>;
  langagePrincipal: LoveLanguageCode;
  langageSecondaire: LoveLanguageCode | null;
  date: Date;
}

export interface GestureIdea {
  id: string;
  title: string;
  description: string;
  codeLangage: LoveLanguageCode;
  relationshipTypes: RelationType[];
  categorie: 'cadeau' | 'service' | 'moment' | 'message' | 'physique';
}

export type QuestionTheme =
  | 'enfance'
  | 'valeurs'
  | 'relations'
  | 'travail'
  | 'reves'
  | 'personnalite'
  | 'spiritualite'
  | 'loisirs'
  | 'quotidien'
  | 'fun';

export type QuestionDepth = 'light' | 'medium' | 'deep';

export interface ConversationQuestion {
  id: string;
  texte: string;
  theme: QuestionTheme;
  depth: QuestionDepth;
  tags?: string[];
  actif: boolean;
}

export interface UserProfile {
  prenom?: string;
  typeRelationParDefaut?: RelationType;
}
