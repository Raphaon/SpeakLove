export interface LoveLanguage {
  id: string;
  name: string;
  icon: string;
  description: string;
  fullDescription: string;
  color: string;
}

export const loveLanguages: LoveLanguage[] = [
  {
    id: 'words',
    name: 'Paroles valorisantes',
    icon: '💬',
    description: 'Les compliments et encouragements sont essentiels',
    fullDescription: 'Pour vous, les mots comptent énormément. Un compliment sincère, un message d\'encouragement ou un "je t\'aime" bien placé vous touche profondément. Vous appréciez quand votre partenaire exprime verbalement ses sentiments et reconnaît vos efforts.',
    color: '#E57373'
  },
  {
    id: 'quality-time',
    name: 'Moments de qualité',
    icon: '⏰',
    description: 'Partager du temps ensemble de façon attentive',
    fullDescription: 'Rien ne vaut pour vous un moment d\'attention complète où votre partenaire est pleinement présent. Vous aimez les conversations profondes, les activités partagées et sentir que vous êtes la priorité de l\'autre dans ces moments.',
    color: '#81C784'
  },
  {
    id: 'gifts',
    name: 'Cadeaux',
    icon: '🎁',
    description: 'Les présents symbolisent l\'amour et l\'attention',
    fullDescription: 'Pour vous, un cadeau n\'est pas qu\'un objet matériel, c\'est un symbole tangible de l\'amour. Vous appréciez la pensée derrière le geste, le fait que quelqu\'un ait pensé à vous et ait pris le temps de choisir quelque chose de spécial.',
    color: '#64B5F6'
  },
  {
    id: 'acts',
    name: 'Services rendus',
    icon: '🤝',
    description: 'Les actions concrètes montrent l\'amour',
    fullDescription: 'Pour vous, les actes parlent plus que les mots. Quand quelqu\'un vous aide avec une tâche, fait quelque chose pour vous faciliter la vie ou prend en charge une responsabilité, c\'est sa façon de montrer son amour.',
    color: '#FFB74D'
  },
  {
    id: 'touch',
    name: 'Contact physique',
    icon: '🤗',
    description: 'Le toucher exprime l\'affection et la connexion',
    fullDescription: 'Le contact physique est essentiel pour vous sentir aimé. Les câlins, les baisers, tenir la main, une main sur l\'épaule... Ces gestes vous procurent un sentiment de sécurité et de connexion émotionnelle profonde.',
    color: '#BA68C8'
  }
];
