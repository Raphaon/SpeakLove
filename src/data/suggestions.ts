export interface Suggestion {
  language: string;
  relationshipType: string;
  suggestions: string[];
}

export const suggestions: Suggestion[] = [
  // Paroles valorisantes
  {
    language: 'words',
    relationshipType: 'romantic',
    suggestions: [
      'Envoyez un message tendre le matin pour bien commencer la journée',
      'Complimentez votre partenaire sur quelque chose de spécifique',
      'Dites "Je t\'aime" de façon inattendue',
      'Écrivez une lettre d\'amour à la main',
      'Remerciez votre partenaire pour quelque chose qu\'il/elle fait régulièrement',
      'Partagez ce que vous admirez le plus chez votre partenaire',
      'Encouragez votre partenaire dans un défi qu\'il/elle relève',
      'Exprimez votre fierté pour ses accomplissements'
    ]
  },
  {
    language: 'words',
    relationshipType: 'friendship',
    suggestions: [
      'Envoyez un message pour dire combien vous appréciez votre ami(e)',
      'Complimentez ses qualités uniques',
      'Remerciez votre ami(e) pour être là dans les moments difficiles',
      'Partagez un souvenir positif que vous avez ensemble',
      'Encouragez votre ami(e) dans ses projets',
      'Dites explicitement pourquoi cette amitié est importante pour vous',
      'Faites un compliment sincère sur ses talents ou compétences'
    ]
  },
  {
    language: 'words',
    relationshipType: 'family',
    suggestions: [
      'Dites à un membre de votre famille combien il compte pour vous',
      'Remerciez vos parents pour leur soutien',
      'Exprimez votre fierté envers un frère ou une sœur',
      'Partagez des souvenirs d\'enfance positifs',
      'Reconnaissez les efforts de votre famille',
      'Dites "merci" pour les petites choses du quotidien',
      'Exprimez votre gratitude pour les valeurs transmises'
    ]
  },
  // Moments de qualité
  {
    language: 'quality-time',
    relationshipType: 'romantic',
    suggestions: [
      'Planifiez une soirée sans téléphone ni distraction',
      'Cuisinez un repas ensemble',
      'Allez vous promener main dans la main',
      'Regardez le coucher du soleil ensemble',
      'Faites une activité nouvelle ensemble',
      'Prenez le temps d\'une vraie conversation au dîner',
      'Organisez un week-end en tête-à-tête',
      'Créez un rituel quotidien rien que pour vous deux'
    ]
  },
  {
    language: 'quality-time',
    relationshipType: 'friendship',
    suggestions: [
      'Organisez un café en tête-à-tête',
      'Faites une activité que vous aimiez faire ensemble avant',
      'Planifiez une sortie découverte',
      'Accordez-vous une journée complète ensemble',
      'Essayez un nouveau restaurant ou café',
      'Faites une balade dans un endroit significatif',
      'Organisez une soirée jeux ou film sans distraction'
    ]
  },
  {
    language: 'quality-time',
    relationshipType: 'family',
    suggestions: [
      'Organisez un repas de famille sans téléphones',
      'Planifiez une sortie familiale régulière',
      'Créez un rituel hebdomadaire (ex: dimanche en famille)',
      'Faites une activité que toute la famille apprécie',
      'Prenez le temps de conversations individuelles',
      'Organisez une soirée jeux de société',
      'Partagez un passe-temps avec un membre de la famille'
    ]
  },
  // Cadeaux
  {
    language: 'gifts',
    relationshipType: 'romantic',
    suggestions: [
      'Offrez son dessert ou snack préféré sans raison',
      'Créez une playlist personnalisée',
      'Offrez un livre qui lui fait penser à vous',
      'Achetez quelque chose qu\'il/elle a mentionné en passant',
      'Faites un album photo de vos moments ensemble',
      'Offrez des fleurs sans occasion spéciale',
      'Préparez une boîte surprise avec plusieurs petites attentions',
      'Offrez un bijou ou accessoire avec une signification spéciale'
    ]
  },
  {
    language: 'gifts',
    relationshipType: 'friendship',
    suggestions: [
      'Apportez son café préféré lors d\'une rencontre',
      'Offrez un objet lié à une blague interne',
      'Trouvez quelque chose qui correspond à sa passion',
      'Créez un cadeau personnalisé (photo, dessin, etc.)',
      'Offrez un livre que vous avez aimé',
      'Ramenez un souvenir d\'un voyage',
      'Faites une surprise avec son snack favori'
    ]
  },
  {
    language: 'gifts',
    relationshipType: 'family',
    suggestions: [
      'Ramenez le dessert préféré d\'un membre de la famille',
      'Offrez des fleurs à votre mère sans raison',
      'Trouvez un cadeau lié à un hobby familial',
      'Créez un album photo de famille',
      'Offrez quelque chose de nostalgique',
      'Ramenez un souvenir de voyage pour chacun',
      'Faites un cadeau fait main'
    ]
  },
  // Services rendus
  {
    language: 'acts',
    relationshipType: 'romantic',
    suggestions: [
      'Préparez le petit-déjeuner au lit',
      'Occupez-vous d\'une tâche qu\'il/elle déteste',
      'Faites le ménage avant qu\'il/elle ne le demande',
      'Préparez son repas préféré',
      'Lavez sa voiture ou faites une course pour lui/elle',
      'Organisez quelque chose dont il/elle s\'occupe habituellement',
      'Aidez avec un projet important',
      'Prenez en charge une responsabilité pour la journée'
    ]
  },
  {
    language: 'acts',
    relationshipType: 'friendship',
    suggestions: [
      'Aidez votre ami(e) lors d\'un déménagement',
      'Proposez de garder ses animaux ou plantes',
      'Offrez votre aide pour un projet',
      'Conduisez votre ami(e) à un rendez-vous',
      'Aidez avec les courses ou une tâche pratique',
      'Proposez votre expertise dans un domaine',
      'Soyez disponible quand il/elle a besoin d\'aide'
    ]
  },
  {
    language: 'acts',
    relationshipType: 'family',
    suggestions: [
      'Faites une tâche ménagère sans qu\'on vous le demande',
      'Aidez avec les courses de la semaine',
      'Proposez de garder les enfants pour donner du répit',
      'Occupez-vous d\'une réparation nécessaire',
      'Préparez un repas pour toute la famille',
      'Aidez un membre de la famille avec un projet',
      'Prenez en charge une responsabilité familiale'
    ]
  },
  // Contact physique
  {
    language: 'touch',
    relationshipType: 'romantic',
    suggestions: [
      'Faites un câlin spontané pendant la journée',
      'Tenez la main lors d\'une promenade',
      'Offrez un massage après une longue journée',
      'Embrassez votre partenaire avant de partir',
      'Blottissez-vous ensemble devant un film',
      'Touchez doucement son bras pendant une conversation',
      'Dansez ensemble dans le salon',
      'Dormez enlacés'
    ]
  },
  {
    language: 'touch',
    relationshipType: 'friendship',
    suggestions: [
      'Offrez un câlin lors des retrouvailles',
      'Une tape amicale dans le dos',
      'Un high-five lors d\'une célébration',
      'Une accolade chaleureuse lors des adieux',
      'Un geste réconfortant sur l\'épaule',
      'Marchez bras dessus bras dessous',
      'Une poignée de main chaleureuse'
    ]
  },
  {
    language: 'touch',
    relationshipType: 'family',
    suggestions: [
      'Faites des câlins réguliers',
      'Tenez la main de vos parents ou grands-parents',
      'Une tape affectueuse dans le dos',
      'Un massage des épaules après une longue journée',
      'Des câlins de groupe en famille',
      'Une main sur l\'épaule en signe de soutien',
      'Des gestes affectueux appropriés à chaque membre'
    ]
  }
];
