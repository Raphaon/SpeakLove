export interface PartnerQuizQuestion {
  id: number;
  question: string;
  level: 'easy' | 'medium' | 'hard';
  category: string;
  options: string[];
  relatedToLoveLanguage?: string;
}

export const partnerQuizQuestions: PartnerQuizQuestion[] = [
  // ========== NIVEAU FACILE (Quotidien) ==========
  {
    id: 1,
    question: "Quelle est sa boisson préférée ?",
    level: 'easy',
    category: 'quotidien',
    options: ['Café', 'Thé', 'Jus de fruits', 'Eau', 'Soda']
  },
  {
    id: 2,
    question: "Quel type de film préfère-t-il/elle ?",
    level: 'easy',
    category: 'quotidien',
    options: ['Action', 'Romance', 'Drame', 'Comédie', 'Documentaire']
  },
  {
    id: 3,
    question: "Est-il/elle plutôt du matin ou du soir ?",
    level: 'easy',
    category: 'quotidien',
    options: ['Totalement du matin', 'Plutôt du matin', 'Entre les deux', 'Plutôt du soir', 'Totalement du soir']
  },
  {
    id: 4,
    question: "Quelle est sa saison préférée ?",
    level: 'easy',
    category: 'quotidien',
    options: ['Printemps', 'Été', 'Automne', 'Hiver', 'Aucune préférence']
  },
  {
    id: 5,
    question: "Préfère-t-il/elle appeler ou écrire ?",
    level: 'easy',
    category: 'communication',
    options: ['Toujours appeler', 'Plutôt appeler', 'Les deux', 'Plutôt écrire', 'Toujours écrire']
  },
  {
    id: 6,
    question: "Quelle est sa cuisine préférée ?",
    level: 'easy',
    category: 'quotidien',
    options: ['Italienne', 'Asiatique', 'Française', 'Mexicaine', 'Autre']
  },
  {
    id: 7,
    question: "Quel est son animal préféré ?",
    level: 'easy',
    category: 'quotidien',
    options: ['Chat', 'Chien', 'Oiseau', 'Aucun', 'Autre']
  },
  {
    id: 8,
    question: "Préfère-t-il/elle la mer ou la montagne ?",
    level: 'easy',
    category: 'quotidien',
    options: ['Totalement mer', 'Plutôt mer', 'Les deux', 'Plutôt montagne', 'Totalement montagne']
  },
  {
    id: 9,
    question: "Quel est son genre de musique préféré ?",
    level: 'easy',
    category: 'quotidien',
    options: ['Pop', 'Rock', 'Hip-hop/Rap', 'Classique', 'Électro']
  },
  {
    id: 10,
    question: "Préfère-t-il/elle sortir ou rester à la maison ?",
    level: 'easy',
    category: 'quotidien',
    options: ['Toujours sortir', 'Plutôt sortir', 'Les deux', 'Plutôt rester', 'Toujours rester']
  },
  {
    id: 11,
    question: "Quelle couleur préfère-t-il/elle ?",
    level: 'easy',
    category: 'quotidien',
    options: ['Bleu', 'Rouge', 'Vert', 'Noir', 'Rose']
  },
  {
    id: 12,
    question: "Quel est son dessert préféré ?",
    level: 'easy',
    category: 'quotidien',
    options: ['Chocolat', 'Glace', 'Gâteau', 'Fruits', 'Aucun']
  },
  {
    id: 13,
    question: "Préfère-t-il/elle lire ou regarder des séries ?",
    level: 'easy',
    category: 'quotidien',
    options: ['Toujours lire', 'Plutôt lire', 'Les deux', 'Plutôt séries', 'Toujours séries']
  },
  {
    id: 14,
    question: "Quelle est sa position préférée pour dormir ?",
    level: 'easy',
    category: 'quotidien',
    options: ['Sur le dos', 'Sur le ventre', 'Sur le côté droit', 'Sur le côté gauche', 'Change souvent']
  },
  {
    id: 15,
    question: "Aime-t-il/elle cuisiner ?",
    level: 'easy',
    category: 'quotidien',
    options: ['Adore', 'Aime bien', 'Neutre', 'Pas vraiment', 'Déteste']
  },

  // ========== NIVEAU MOYEN (Émotionnel & Habitudes) ==========
  {
    id: 16,
    question: "Comment exprime-t-il/elle son amour ?",
    level: 'medium',
    category: 'amour',
    relatedToLoveLanguage: 'all',
    options: ['Paroles valorisantes', 'Services rendus', 'Cadeaux', 'Moments de qualité', 'Toucher physique']
  },
  {
    id: 17,
    question: "Que fait-il/elle quand il/elle est stressé(e) ?",
    level: 'medium',
    category: 'émotions',
    options: ['Parle de ses problèmes', 'Se renferme', 'Pleure', 'Sort se promener', 'Évite la situation']
  },
  {
    id: 18,
    question: "Comment préfère-t-il/elle recevoir de l'affection ?",
    level: 'medium',
    category: 'amour',
    relatedToLoveLanguage: 'all',
    options: ['Mots doux', 'Actes de service', 'Petits cadeaux', 'Temps ensemble', 'Câlins et bisous']
  },
  {
    id: 19,
    question: "Comment gère-t-il/elle les conflits ?",
    level: 'medium',
    category: 'communication',
    options: ['Discute calmement', 'A besoin de temps', 'Évite le conflit', 'Confronte directement', 'Cherche un compromis']
  },
  {
    id: 20,
    question: "Qu'est-ce qui le/la rend vraiment heureux/heureuse ?",
    level: 'medium',
    category: 'émotions',
    options: ['Réussir un projet', 'Être avec ses proches', 'Découvrir du nouveau', 'Se sentir apprécié(e)', 'Avoir du temps libre']
  },
  {
    id: 21,
    question: "Comment se ressource-t-il/elle ?",
    level: 'medium',
    category: 'bien-être',
    options: ['En étant seul(e)', 'Avec des amis', 'En faisant du sport', 'En créant quelque chose', 'En se reposant']
  },
  {
    id: 22,
    question: "Quelle est sa plus grande qualité ?",
    level: 'medium',
    category: 'personnalité',
    options: ['Générosité', 'Honnêteté', 'Humour', 'Empathie', 'Détermination']
  },
  {
    id: 23,
    question: "Comment réagit-il/elle aux surprises ?",
    level: 'medium',
    category: 'personnalité',
    options: ['Adore ça', 'Aime bien', 'Neutre', 'Préfère savoir', 'N\'aime pas du tout']
  },
  {
    id: 24,
    question: "Qu'est-ce qui le/la motive au quotidien ?",
    level: 'medium',
    category: 'valeurs',
    options: ['Ses objectifs personnels', 'Sa famille', 'Son couple', 'Sa carrière', 'Ses passions']
  },
  {
    id: 25,
    question: "Comment préfère-t-il/elle passer un dimanche ?",
    level: 'medium',
    category: 'quotidien',
    options: ['Grasse matinée et détente', 'Activité en couple', 'Voir des amis', 'Sport ou sortie', 'Projets personnels']
  },
  {
    id: 26,
    question: "Quel est son plus grand besoin dans le couple ?",
    level: 'medium',
    category: 'amour',
    options: ['Se sentir compris(e)', 'Se sentir soutenu(e)', 'Se sentir désiré(e)', 'Avoir de l\'espace', 'Partager des moments']
  },
  {
    id: 27,
    question: "Comment aime-t-il/elle célébrer les occasions spéciales ?",
    level: 'medium',
    category: 'amour',
    relatedToLoveLanguage: 'MQ',
    options: ['Dîner romantique', 'Aventure/activité', 'Soirée intime à la maison', 'Fête avec des amis', 'Cadeau significatif']
  },
  {
    id: 28,
    question: "Quelle est sa façon de montrer son soutien ?",
    level: 'medium',
    category: 'communication',
    relatedToLoveLanguage: 'SR',
    options: ['Écouter activement', 'Donner des conseils', 'Aider concrètement', 'Être présent(e)', 'Encourager avec des mots']
  },
  {
    id: 29,
    question: "Qu'apprécie-t-il/elle le plus chez vous ?",
    level: 'medium',
    category: 'amour',
    options: ['Votre humour', 'Votre écoute', 'Votre soutien', 'Votre affection', 'Votre honnêteté']
  },
  {
    id: 30,
    question: "Comment exprime-t-il/elle sa gratitude ?",
    level: 'medium',
    category: 'communication',
    relatedToLoveLanguage: 'PV',
    options: ['Dit merci sincèrement', 'Rend la pareille', 'Offre quelque chose', 'Fait un geste tendre', 'Passe du temps avec vous']
  },

  // ========== NIVEAU DIFFICILE (Profond & Intime) ==========
  {
    id: 31,
    question: "Quel est son plus grand rêve personnel ?",
    level: 'hard',
    category: 'rêves',
    options: ['Construire quelque chose de grand', 'Voyager partout dans le monde', 'Aider sa famille/proches', 'Devenir indépendant(e)', 'Réussir sa carrière']
  },
  {
    id: 32,
    question: "Quelle blessure émotionnelle l'a le plus marqué(e) ?",
    level: 'hard',
    category: 'émotions',
    options: ['Sentiment de rejet', 'Peur de l\'abandon', 'Expérience de trahison', 'Moment d\'humiliation', 'Vécu d\'injustice']
  },
  {
    id: 33,
    question: "Qu'est-ce qui lui fait le plus peur dans la vie ?",
    level: 'hard',
    category: 'émotions',
    options: ['L\'échec', 'La solitude', 'Perdre un être cher', 'Ne pas être à la hauteur', 'Perdre son autonomie']
  },
  {
    id: 34,
    question: "Quelle valeur ne compromettrait-il/elle jamais ?",
    level: 'hard',
    category: 'valeurs',
    options: ['L\'honnêteté', 'La loyauté', 'La liberté', 'La famille', 'L\'authenticité']
  },
  {
    id: 35,
    question: "Comment définit-il/elle le bonheur ?",
    level: 'hard',
    category: 'valeurs',
    options: ['Paix intérieure', 'Amour et connexion', 'Réalisation personnelle', 'Liberté de choix', 'Aider les autres']
  },
  {
    id: 36,
    question: "Quel souvenir d'enfance l'a façonné(e) ?",
    level: 'hard',
    category: 'histoire',
    options: ['Moment avec sa famille', 'Épreuve difficile', 'Grande fierté', 'Perte importante', 'Découverte marquante']
  },
  {
    id: 37,
    question: "Qu'est-ce qui lui manque le plus dans votre relation ?",
    level: 'hard',
    category: 'amour',
    options: ['Plus de communication', 'Plus d\'affection physique', 'Plus de temps ensemble', 'Plus de reconnaissance', 'Plus de spontanéité']
  },
  {
    id: 38,
    question: "Comment voudrait-il/elle être rappelé(e) dans 50 ans ?",
    level: 'hard',
    category: 'valeurs',
    options: ['Personne aimante', 'Personne qui a réussi', 'Personne qui a aidé', 'Personne authentique', 'Personne courageuse']
  },
  {
    id: 39,
    question: "Quelle leçon de vie lui a été la plus difficile à apprendre ?",
    level: 'hard',
    category: 'histoire',
    options: ['Accepter l\'échec', 'Lâcher prise', 'Demander de l\'aide', 'Dire non', 'Pardonner']
  },
  {
    id: 40,
    question: "Qu'est-ce qui le/la fait se sentir vraiment vivant(e) ?",
    level: 'hard',
    category: 'émotions',
    options: ['Prendre des risques', 'Créer quelque chose', 'Connexions profondes', 'Dépasser ses limites', 'Aider quelqu\'un']
  },
  {
    id: 41,
    question: "Quel regret porte-t-il/elle encore ?",
    level: 'hard',
    category: 'histoire',
    options: ['Une relation perdue', 'Une opportunité manquée', 'Des mots non dits', 'Un choix passé', 'Du temps perdu']
  },
  {
    id: 42,
    question: "Qu'est-ce qui donne vraiment du sens à sa vie ?",
    level: 'hard',
    category: 'valeurs',
    options: ['Ses relations', 'Son impact', 'Sa croissance', 'Ses passions', 'Sa spiritualité']
  },
  {
    id: 43,
    question: "Comment gère-t-il/elle la vulnérabilité ?",
    level: 'hard',
    category: 'émotions',
    options: ['S\'ouvre facilement', 'Avec difficulté mais essaie', 'Seulement avec des proches', 'Évite de montrer', 'Lutte pour l\'accepter']
  },
  {
    id: 44,
    question: "Quelle est sa plus grande insécurité ?",
    level: 'hard',
    category: 'émotions',
    options: ['Ne pas être assez', 'Être abandonné(e)', 'Ne pas être aimé(e)', 'Échouer', 'Être jugé(e)']
  },
  {
    id: 45,
    question: "Si il/elle pouvait changer une chose dans sa vie, ce serait ?",
    level: 'hard',
    category: 'rêves',
    options: ['Son passé', 'Sa carrière', 'Ses relations', 'Sa confiance en soi', 'Rien du tout']
  }
];

// Helper pour obtenir des questions aléatoires
export function getRandomQuestions(count: number = 15, level?: 'easy' | 'medium' | 'hard'): PartnerQuizQuestion[] {
  let questions = level 
    ? partnerQuizQuestions.filter(q => q.level === level)
    : partnerQuizQuestions;
  
  // Mélanger et prendre 'count' questions
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// Helper pour obtenir un mix équilibré
export function getBalancedQuestions(): PartnerQuizQuestion[] {
  const easy = partnerQuizQuestions.filter(q => q.level === 'easy').sort(() => Math.random() - 0.5).slice(0, 5);
  const medium = partnerQuizQuestions.filter(q => q.level === 'medium').sort(() => Math.random() - 0.5).slice(0, 6);
  const hard = partnerQuizQuestions.filter(q => q.level === 'hard').sort(() => Math.random() - 0.5).slice(0, 4);
  
  return [...easy, ...medium, ...hard].sort(() => Math.random() - 0.5);
}
