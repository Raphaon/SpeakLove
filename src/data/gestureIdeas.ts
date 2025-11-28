import { LoveLanguageCode } from './loveLanguages';

export type RelationshipType = 
  | 'conjoint' 
  | 'petitAmi' 
  | 'fiance' 
  | 'ami' 
  | 'parent' 
  | 'enfant' 
  | 'collegue';

export type GestureCategory = 
  | 'cadeau' 
  | 'moment' 
  | 'service' 
  | 'message' 
  | 'physique';

export interface GestureIdea {
  id: string;
  title: string;
  description: string;
  codeLangage: LoveLanguageCode;
  relationshipTypes: RelationshipType[];
  categorie: GestureCategory;
}

export const gestureIdeas: GestureIdea[] = [
  // Moments de qualité (MQ)
  {
    id: 'mq_1',
    title: 'Soirée sans téléphone',
    description: 'Planifiez une soirée où vous éteignez tous les deux vos téléphones et consacrez toute votre attention l\'un à l\'autre.',
    codeLangage: 'MQ',
    relationshipTypes: ['conjoint', 'petitAmi', 'fiance'],
    categorie: 'moment'
  },
  {
    id: 'mq_2',
    title: 'Balade et discussion',
    description: 'Allez marcher ensemble dans un parc ou en nature, sans but précis, juste pour parler et être ensemble.',
    codeLangage: 'MQ',
    relationshipTypes: ['conjoint', 'petitAmi', 'fiance', 'ami', 'parent'],
    categorie: 'moment'
  },
  {
    id: 'mq_3',
    title: 'Cours ou activité à deux',
    description: 'Inscrivez-vous ensemble à un cours (cuisine, danse, sport) pour créer des souvenirs communs.',
    codeLangage: 'MQ',
    relationshipTypes: ['conjoint', 'petitAmi', 'fiance', 'ami'],
    categorie: 'moment'
  },
  {
    id: 'mq_4',
    title: 'Rendez-vous café hebdomadaire',
    description: 'Instaurez un rituel : un café par semaine ensemble, juste pour discuter et se retrouver.',
    codeLangage: 'MQ',
    relationshipTypes: ['conjoint', 'petitAmi', 'fiance', 'ami', 'parent', 'enfant'],
    categorie: 'moment'
  },
  {
    id: 'mq_5',
    title: 'Écoute active',
    description: 'Posez-lui des questions sur sa journée, ses projets, ses rêves, et écoutez vraiment sans regarder votre téléphone.',
    codeLangage: 'MQ',
    relationshipTypes: ['conjoint', 'petitAmi', 'fiance', 'ami', 'parent', 'enfant', 'collegue'],
    categorie: 'moment'
  },
  {
    id: 'mq_6',
    title: 'Voyage ou week-end surprise',
    description: 'Organisez une escapade, même courte, pour vous créer des souvenirs mémorables ensemble.',
    codeLangage: 'MQ',
    relationshipTypes: ['conjoint', 'petitAmi', 'fiance', 'ami'],
    categorie: 'moment'
  },

  // Services rendus (SR)
  {
    id: 'sr_1',
    title: 'Préparer le petit-déjeuner',
    description: 'Levez-vous un peu plus tôt et préparez-lui son petit-déjeuner préféré.',
    codeLangage: 'SR',
    relationshipTypes: ['conjoint', 'petitAmi', 'fiance', 'parent', 'enfant'],
    categorie: 'service'
  },
  {
    id: 'sr_2',
    title: 'Gérer une corvée détestée',
    description: 'Prenez en charge une tâche qu\'il/elle déteste particulièrement (ménage, administratif, courses...).',
    codeLangage: 'SR',
    relationshipTypes: ['conjoint', 'petitAmi', 'fiance', 'parent'],
    categorie: 'service'
  },
  {
    id: 'sr_3',
    title: 'Faire les courses sans qu\'on demande',
    description: 'Remarquez ce qui manque et allez faire les courses sans attendre qu\'on vous le demande.',
    codeLangage: 'SR',
    relationshipTypes: ['conjoint', 'petitAmi', 'fiance', 'parent'],
    categorie: 'service'
  },
  {
    id: 'sr_4',
    title: 'Réparer ou installer quelque chose',
    description: 'Cette étagère à monter ou ce robinet qui fuit ? Prenez l\'initiative de vous en occuper.',
    codeLangage: 'SR',
    relationshipTypes: ['conjoint', 'petitAmi', 'fiance', 'parent', 'ami'],
    categorie: 'service'
  },
  {
    id: 'sr_5',
    title: 'Prendre en charge les enfants',
    description: 'Donnez-lui une soirée ou matinée off en gérant seul(e) les enfants pour qu\'il/elle puisse souffler.',
    codeLangage: 'SR',
    relationshipTypes: ['conjoint', 'fiance'],
    categorie: 'service'
  },
  {
    id: 'sr_6',
    title: 'Aider dans un projet',
    description: 'Offrez votre aide concrète pour un projet qui lui tient à cœur (déménagement, rénovation, création...).',
    codeLangage: 'SR',
    relationshipTypes: ['conjoint', 'petitAmi', 'fiance', 'ami', 'parent', 'enfant', 'collegue'],
    categorie: 'service'
  },

  // Paroles valorisantes (PQ)
  {
    id: 'pq_1',
    title: 'Compliment sincère quotidien',
    description: 'Chaque jour, faites-lui un compliment sincère sur qui il/elle est ou ce qu\'il/elle fait.',
    codeLangage: 'PQ',
    relationshipTypes: ['conjoint', 'petitAmi', 'fiance', 'ami', 'parent', 'enfant', 'collegue'],
    categorie: 'message'
  },
  {
    id: 'pq_2',
    title: 'Lettre d\'amour manuscrite',
    description: 'Écrivez une vraie lettre à la main exprimant ce que vous ressentez et admirez chez lui/elle.',
    codeLangage: 'PQ',
    relationshipTypes: ['conjoint', 'petitAmi', 'fiance', 'parent'],
    categorie: 'message'
  },
  {
    id: 'pq_3',
    title: 'Reconnaissance publique',
    description: 'Devant d\'autres personnes, exprimez votre fierté ou gratitude envers lui/elle.',
    codeLangage: 'PQ',
    relationshipTypes: ['conjoint', 'petitAmi', 'fiance', 'ami', 'enfant', 'collegue'],
    categorie: 'message'
  },
  {
    id: 'pq_4',
    title: 'Message d\'encouragement',
    description: 'Envoyez un SMS ou message vocal pour l\'encourager avant un moment important.',
    codeLangage: 'PQ',
    relationshipTypes: ['conjoint', 'petitAmi', 'fiance', 'ami', 'parent', 'enfant', 'collegue'],
    categorie: 'message'
  },
  {
    id: 'pq_5',
    title: '"Je suis fier(e) de toi"',
    description: 'Dites-lui explicitement que vous êtes fier(e) de lui/elle, même pour les petites victoires.',
    codeLangage: 'PQ',
    relationshipTypes: ['conjoint', 'petitAmi', 'fiance', 'ami', 'parent', 'enfant'],
    categorie: 'message'
  },
  {
    id: 'pq_6',
    title: 'Liste de qualités',
    description: 'Faites-lui une liste écrite de 10 qualités que vous aimez chez lui/elle.',
    codeLangage: 'PQ',
    relationshipTypes: ['conjoint', 'petitAmi', 'fiance', 'ami', 'enfant'],
    categorie: 'message'
  },

  // Cadeaux (CD)
  {
    id: 'cd_1',
    title: 'Cadeau "j\'ai pensé à toi"',
    description: 'Ramenez quelque chose de simple qui vous a fait penser à lui/elle (livre, chocolat préféré, objet rigolo).',
    codeLangage: 'CD',
    relationshipTypes: ['conjoint', 'petitAmi', 'fiance', 'ami', 'parent', 'enfant', 'collegue'],
    categorie: 'cadeau'
  },
  {
    id: 'cd_2',
    title: 'Cadeau personnalisé',
    description: 'Offrez quelque chose de personnalisé avec son nom, une photo ou un message spécial.',
    codeLangage: 'CD',
    relationshipTypes: ['conjoint', 'petitAmi', 'fiance', 'ami', 'parent', 'enfant'],
    categorie: 'cadeau'
  },
  {
    id: 'cd_3',
    title: 'Fleurs sans raison',
    description: 'Offrez des fleurs un jour ordinaire, juste pour faire plaisir.',
    codeLangage: 'CD',
    relationshipTypes: ['conjoint', 'petitAmi', 'fiance', 'ami', 'parent'],
    categorie: 'cadeau'
  },
  {
    id: 'cd_4',
    title: 'Souvenir de voyage',
    description: 'Ramenez-lui un petit souvenir de vos déplacements pour montrer que vous pensez à lui/elle.',
    codeLangage: 'CD',
    relationshipTypes: ['conjoint', 'petitAmi', 'fiance', 'ami', 'parent', 'enfant', 'collegue'],
    categorie: 'cadeau'
  },
  {
    id: 'cd_5',
    title: 'Cadeau surprise pour passion',
    description: 'Trouvez quelque chose en lien avec sa passion ou hobby que vous avez remarqué.',
    codeLangage: 'CD',
    relationshipTypes: ['conjoint', 'petitAmi', 'fiance', 'ami', 'parent', 'enfant'],
    categorie: 'cadeau'
  },
  {
    id: 'cd_6',
    title: 'Album photo ou scrapbook',
    description: 'Créez un album de vos souvenirs ensemble - c\'est un cadeau émotionnel très fort.',
    codeLangage: 'CD',
    relationshipTypes: ['conjoint', 'petitAmi', 'fiance', 'ami', 'parent'],
    categorie: 'cadeau'
  },

  // Toucher physique (TP)
  {
    id: 'tp_1',
    title: 'Câlin prolongé',
    description: 'Donnez un vrai câlin d\'au moins 20 secondes, sans être pressé.',
    codeLangage: 'TP',
    relationshipTypes: ['conjoint', 'petitAmi', 'fiance', 'parent', 'enfant', 'ami'],
    categorie: 'physique'
  },
  {
    id: 'tp_2',
    title: 'Tenir la main',
    description: 'En marchant, en voiture, devant la télé... prenez sa main spontanément.',
    codeLangage: 'TP',
    relationshipTypes: ['conjoint', 'petitAmi', 'fiance'],
    categorie: 'physique'
  },
  {
    id: 'tp_3',
    title: 'Massage impromptu',
    description: 'Offrez un massage des épaules, du dos ou des pieds sans raison particulière.',
    codeLangage: 'TP',
    relationshipTypes: ['conjoint', 'petitAmi', 'fiance'],
    categorie: 'physique'
  },
  {
    id: 'tp_4',
    title: 'Baiser de bonjour/au revoir',
    description: 'Ne négligez jamais le baiser ou câlin en arrivant et en partant.',
    codeLangage: 'TP',
    relationshipTypes: ['conjoint', 'petitAmi', 'fiance', 'parent', 'enfant'],
    categorie: 'physique'
  },
  {
    id: 'tp_5',
    title: 'Se blottir sur le canapé',
    description: 'Regardez un film ou série collés l\'un contre l\'autre.',
    codeLangage: 'TP',
    relationshipTypes: ['conjoint', 'petitAmi', 'fiance'],
    categorie: 'physique'
  },
  {
    id: 'tp_6',
    title: 'Toucher affectueux en passant',
    description: 'Une main sur l\'épaule, caresser les cheveux en passant, un petit contact régulier.',
    codeLangage: 'TP',
    relationshipTypes: ['conjoint', 'petitAmi', 'fiance', 'parent', 'enfant'],
    categorie: 'physique'
  }
];

export const getGesturesByLanguage = (code: LoveLanguageCode): GestureIdea[] => {
  return gestureIdeas.filter(g => g.codeLangage === code);
};

export const getGesturesByLanguageAndRelation = (
  code: LoveLanguageCode, 
  relation: RelationshipType
): GestureIdea[] => {
  return gestureIdeas.filter(
    g => g.codeLangage === code && g.relationshipTypes.includes(relation)
  );
};

export const relationshipTypeLabels: Record<RelationshipType, string> = {
  conjoint: 'Conjoint(e) / Mari / Femme',
  petitAmi: 'Petit(e) ami(e)',
  fiance: 'Fiancé(e)',
  ami: 'Ami(e)',
  parent: 'Parent',
  enfant: 'Enfant',
  collegue: 'Collègue'
};
