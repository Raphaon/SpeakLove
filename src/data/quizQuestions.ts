export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    language: string;
  }[];
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Qu'est-ce qui vous touche le plus ?",
    options: [
      { text: "Recevoir un compliment sincère", language: "words" },
      { text: "Passer une soirée en tête-à-tête", language: "quality-time" },
      { text: "Recevoir un petit cadeau surprise", language: "gifts" },
      { text: "Que quelqu'un fasse une tâche pour vous", language: "acts" },
      { text: "Un câlin chaleureux", language: "touch" }
    ]
  },
  {
    id: 2,
    question: "Comment préférez-vous exprimer votre amour ?",
    options: [
      { text: "En disant des mots doux", language: "words" },
      { text: "En passant du temps ensemble", language: "quality-time" },
      { text: "En offrant des cadeaux réfléchis", language: "gifts" },
      { text: "En aidant avec les tâches quotidiennes", language: "acts" },
      { text: "Par des gestes affectueux", language: "touch" }
    ]
  },
  {
    id: 3,
    question: "Qu'est-ce qui vous blesse le plus dans une relation ?",
    options: [
      { text: "Les critiques ou manque de reconnaissance", language: "words" },
      { text: "Le manque d'attention ou les distractions", language: "quality-time" },
      { text: "L'oubli d'occasions spéciales", language: "gifts" },
      { text: "La paresse ou le manque d'aide", language: "acts" },
      { text: "Le manque de contact physique", language: "touch" }
    ]
  },
  {
    id: 4,
    question: "Qu'appréciez-vous le plus après une journée difficile ?",
    options: [
      { text: "Entendre 'Tu as fait du bon travail'", language: "words" },
      { text: "Avoir une conversation profonde", language: "quality-time" },
      { text: "Recevoir une petite surprise", language: "gifts" },
      { text: "Que quelqu'un s'occupe du dîner", language: "acts" },
      { text: "Un massage ou un câlin", language: "touch" }
    ]
  },
  {
    id: 5,
    question: "Quel type de rendez-vous préférez-vous ?",
    options: [
      { text: "Où on se parle de nos rêves et aspirations", language: "words" },
      { text: "Une activité qu'on fait ensemble sans distraction", language: "quality-time" },
      { text: "Où on s'offre de petites attentions", language: "gifts" },
      { text: "Où on accomplit quelque chose ensemble", language: "acts" },
      { text: "Romantique avec beaucoup de proximité", language: "touch" }
    ]
  },
  {
    id: 6,
    question: "Comment aimez-vous célébrer les occasions spéciales ?",
    options: [
      { text: "Avec des mots d'amour et des déclarations", language: "words" },
      { text: "En passant toute la journée ensemble", language: "quality-time" },
      { text: "Avec des cadeaux significatifs", language: "gifts" },
      { text: "Que tout soit organisé et pris en charge", language: "acts" },
      { text: "Avec beaucoup de câlins et d'affection", language: "touch" }
    ]
  },
  {
    id: 7,
    question: "Qu'est-ce qui vous fait sentir le plus aimé(e) au quotidien ?",
    options: [
      { text: "Des messages tendres pendant la journée", language: "words" },
      { text: "Que mon partenaire délaisse son téléphone pour me parler", language: "quality-time" },
      { text: "De petites surprises inattendues", language: "gifts" },
      { text: "Que des choses soient faites sans que j'aie à demander", language: "acts" },
      { text: "Des contacts physiques spontanés", language: "touch" }
    ]
  },
  {
    id: 8,
    question: "Si vous deviez choisir un seul de ces gestes, lequel serait-ce ?",
    options: [
      { text: "Une lettre d'amour écrite à la main", language: "words" },
      { text: "Un week-end sans distraction ensemble", language: "quality-time" },
      { text: "Un cadeau qui montre qu'on me connaît bien", language: "gifts" },
      { text: "Que mon partenaire termine un projet que j'ai commencé", language: "acts" },
      { text: "Des câlins spontanés tout au long de la journée", language: "touch" }
    ]
  },
  {
    id: 9,
    question: "Qu'est-ce qui renforce le plus votre connexion émotionnelle ?",
    options: [
      { text: "Des conversations profondes sur nos sentiments", language: "words" },
      { text: "Des expériences partagées et des souvenirs", language: "quality-time" },
      { text: "Des symboles tangibles de notre amour", language: "gifts" },
      { text: "Le travail d'équipe et le soutien mutuel", language: "acts" },
      { text: "L'intimité physique et la proximité", language: "touch" }
    ]
  },
  {
    id: 10,
    question: "Quel manque vous affecte le plus dans une relation ?",
    options: [
      { text: "Le manque d'affirmation verbale", language: "words" },
      { text: "Le manque de temps de qualité ensemble", language: "quality-time" },
      { text: "L'absence de gestes symboliques", language: "gifts" },
      { text: "Le manque d'aide et de support pratique", language: "acts" },
      { text: "Le manque de contact et d'affection physique", language: "touch" }
    ]
  },
  {
    id: 11,
    question: "Quelle phrase vous réconforte le plus ?",
    options: [
      { text: "Je suis fier(e) de toi", language: "words" },
      { text: "Prenons du temps pour nous deux", language: "quality-time" },
      { text: "Je t'ai acheté quelque chose", language: "gifts" },
      { text: "Je m'en occupe, ne t'inquiète pas", language: "acts" },
      { text: "Viens dans mes bras", language: "touch" }
    ]
  },
  {
    id: 12,
    question: "Comment préférez-vous recevoir des excuses ?",
    options: [
      { text: "Des mots sincères expliquant les regrets", language: "words" },
      { text: "Du temps passé ensemble pour se reconnecter", language: "quality-time" },
      { text: "Un geste symbolique de réconciliation", language: "gifts" },
      { text: "Des actions concrètes pour réparer", language: "acts" },
      { text: "Un câlin réconfortant", language: "touch" }
    ]
  },
  {
    id: 13,
    question: "Qu'est-ce qui compte le plus pour vous dans l'amitié ?",
    options: [
      { text: "Les encouragements et le soutien verbal", language: "words" },
      { text: "Passer du temps de qualité ensemble", language: "quality-time" },
      { text: "Se faire de petits cadeaux", language: "gifts" },
      { text: "S'entraider dans les moments difficiles", language: "acts" },
      { text: "Les accolades et gestes affectueux", language: "touch" }
    ]
  },
  {
    id: 14,
    question: "Quelle surprise vous toucherait le plus ?",
    options: [
      { text: "Une déclaration d'amour publique", language: "words" },
      { text: "Une journée planifiée rien que pour nous", language: "quality-time" },
      { text: "Un objet que je désirais depuis longtemps", language: "gifts" },
      { text: "Que toutes mes corvées soient faites", language: "acts" },
      { text: "Un spa ou massage surprise", language: "touch" }
    ]
  },
  {
    id: 15,
    question: "Comment aimez-vous montrer votre soutien ?",
    options: [
      { text: "En donnant des conseils et des mots d'encouragement", language: "words" },
      { text: "En étant présent(e) et disponible", language: "quality-time" },
      { text: "En offrant quelque chose d'utile", language: "gifts" },
      { text: "En proposant mon aide concrète", language: "acts" },
      { text: "En offrant du réconfort physique", language: "touch" }
    ]
  },
  {
    id: 16,
    question: "Qu'attendez-vous lors d'un anniversaire ?",
    options: [
      { text: "Des messages et des vœux personnalisés", language: "words" },
      { text: "Une fête avec mes proches", language: "quality-time" },
      { text: "Des cadeaux réfléchis", language: "gifts" },
      { text: "Que tout soit organisé pour moi", language: "acts" },
      { text: "Beaucoup d'embrassades et de câlins", language: "touch" }
    ]
  },
  {
    id: 17,
    question: "Comment gérez-vous le stress ?",
    options: [
      { text: "En parlant de ce qui me préoccupe", language: "words" },
      { text: "En passant du temps avec mes proches", language: "quality-time" },
      { text: "En me faisant plaisir avec un petit achat", language: "gifts" },
      { text: "En m'occupant pour oublier", language: "acts" },
      { text: "En cherchant du réconfort physique", language: "touch" }
    ]
  },
  {
    id: 18,
    question: "Qu'est-ce qui vous manque le plus en voyage ?",
    options: [
      { text: "Les conversations avec mes proches", language: "words" },
      { text: "Les moments partagés avec ma famille", language: "quality-time" },
      { text: "Mes objets personnels", language: "gifts" },
      { text: "Avoir quelqu'un pour m'aider", language: "acts" },
      { text: "Les câlins et l'affection", language: "touch" }
    ]
  },
  {
    id: 19,
    question: "Comment préférez-vous célébrer une réussite ?",
    options: [
      { text: "Avec des félicitations et de la reconnaissance", language: "words" },
      { text: "En organisant un moment festif avec mes proches", language: "quality-time" },
      { text: "En m'offrant quelque chose de spécial", language: "gifts" },
      { text: "En me reposant pendant que d'autres s'occupent de tout", language: "acts" },
      { text: "Avec des embrassades de joie", language: "touch" }
    ]
  },
  {
    id: 20,
    question: "Qu'est-ce qui vous fait vous sentir apprécié(e) au travail ?",
    options: [
      { text: "Des compliments et de la reconnaissance", language: "words" },
      { text: "Du temps accordé pour m'écouter", language: "quality-time" },
      { text: "Des bonus ou des cadeaux", language: "gifts" },
      { text: "De l'aide sur mes projets", language: "acts" },
      { text: "Des gestes amicaux (poignée de main, tape sur l'épaule)", language: "touch" }
    ]
  },
  {
    id: 21,
    question: "Qu'est-ce qui vous réconforte lors d'une dispute ?",
    options: [
      { text: "Des excuses sincères", language: "words" },
      { text: "Prendre le temps de discuter calmement", language: "quality-time" },
      { text: "Un petit geste de paix", language: "gifts" },
      { text: "Que l'autre fasse un effort pour arranger les choses", language: "acts" },
      { text: "Un câlin de réconciliation", language: "touch" }
    ]
  },
  {
    id: 22,
    question: "Quel geste vous touche le plus au réveil ?",
    options: [
      { text: "Un 'Bonjour mon amour' tendre", language: "words" },
      { text: "Prendre le petit-déjeuner ensemble", language: "quality-time" },
      { text: "Trouver un petit mot ou un cadeau", language: "gifts" },
      { text: "Que le café soit déjà préparé", language: "acts" },
      { text: "Un câlin matinal", language: "touch" }
    ]
  },
  {
    id: 23,
    question: "Comment aimez-vous vous détendre en couple ?",
    options: [
      { text: "En discutant de tout et de rien", language: "words" },
      { text: "En regardant un film ensemble", language: "quality-time" },
      { text: "En s'offrant des petites attentions", language: "gifts" },
      { text: "En faisant le ménage ensemble pour ensuite se reposer", language: "acts" },
      { text: "En se massant mutuellement", language: "touch" }
    ]
  },
  {
    id: 24,
    question: "Qu'appréciez-vous le plus dans une relation à distance ?",
    options: [
      { text: "Les longs messages et appels", language: "words" },
      { text: "Les appels vidéo réguliers", language: "quality-time" },
      { text: "Recevoir des colis surprise", language: "gifts" },
      { text: "Que l'autre organise les visites", language: "acts" },
      { text: "Les retrouvailles physiques", language: "touch" }
    ]
  },
  {
    id: 25,
    question: "Comment voulez-vous être encouragé(e) ?",
    options: [
      { text: "Avec des mots motivants", language: "words" },
      { text: "Par une présence rassurante", language: "quality-time" },
      { text: "Avec un cadeau symbolique", language: "gifts" },
      { text: "Par une aide concrète", language: "acts" },
      { text: "Avec un geste réconfortant", language: "touch" }
    ]
  },
  {
    id: 26,
    question: "Qu'est-ce qui vous fait sentir important(e) ?",
    options: [
      { text: "Entendre 'Tu comptes beaucoup pour moi'", language: "words" },
      { text: "Qu'on me consacre du temps exclusif", language: "quality-time" },
      { text: "Recevoir des attentions personnalisées", language: "gifts" },
      { text: "Qu'on anticipe mes besoins", language: "acts" },
      { text: "Des gestes tendres réguliers", language: "touch" }
    ]
  },
  {
    id: 27,
    question: "Quelle attention vous touche le plus lors d'une maladie ?",
    options: [
      { text: "Des messages de réconfort", language: "words" },
      { text: "De la compagnie pour ne pas être seul(e)", language: "quality-time" },
      { text: "Des petites attentions (fleurs, chocolats)", language: "gifts" },
      { text: "Qu'on s'occupe de moi (médicaments, repas)", language: "acts" },
      { text: "Des câlins doux et réconfortants", language: "touch" }
    ]
  },
  {
    id: 28,
    question: "Comment aimez-vous recevoir des compliments ?",
    options: [
      { text: "De façon détaillée et sincère", language: "words" },
      { text: "Lors d'un moment privilégié ensemble", language: "quality-time" },
      { text: "Accompagnés d'un petit geste", language: "gifts" },
      { text: "Suivis d'une aide ou d'un service", language: "acts" },
      { text: "Avec un contact physique affectueux", language: "touch" }
    ]
  },
  {
    id: 29,
    question: "Qu'est-ce qui vous rend heureux(se) en vacances ?",
    options: [
      { text: "Partager nos impressions et découvertes", language: "words" },
      { text: "Passer chaque instant ensemble", language: "quality-time" },
      { text: "Ramener des souvenirs", language: "gifts" },
      { text: "Que tout soit organisé et sans stress", language: "acts" },
      { text: "Beaucoup de moments intimes", language: "touch" }
    ]
  },
  {
    id: 30,
    question: "Comment aimez-vous commencer la journée ?",
    options: [
      { text: "Avec des mots positifs", language: "words" },
      { text: "En prenant un moment tranquille ensemble", language: "quality-time" },
      { text: "Avec une petite surprise", language: "gifts" },
      { text: "Sans avoir à me soucier de rien", language: "acts" },
      { text: "Avec un contact affectueux", language: "touch" }
    ]
  },
  {
    id: 31,
    question: "Qu'appréciez-vous le plus chez un partenaire attentionné ?",
    options: [
      { text: "Sa capacité à exprimer ses sentiments", language: "words" },
      { text: "Sa présence constante", language: "quality-time" },
      { text: "Ses petites attentions matérielles", language: "gifts" },
      { text: "Son aide dans le quotidien", language: "acts" },
      { text: "Son affection physique", language: "touch" }
    ]
  },
  {
    id: 32,
    question: "Quel type de soutien préférez-vous en cas de déception ?",
    options: [
      { text: "Des paroles rassurantes", language: "words" },
      { text: "Quelqu'un qui m'écoute activement", language: "quality-time" },
      { text: "Un petit cadeau pour me remonter le moral", language: "gifts" },
      { text: "De l'aide pour résoudre le problème", language: "acts" },
      { text: "Un câlin réconfortant", language: "touch" }
    ]
  },
  {
    id: 33,
    question: "Comment préférez-vous exprimer votre gratitude ?",
    options: [
      { text: "Par des mots de remerciement sincères", language: "words" },
      { text: "En passant du temps avec la personne", language: "quality-time" },
      { text: "En offrant un cadeau", language: "gifts" },
      { text: "En rendant service en retour", language: "acts" },
      { text: "Par une accolade chaleureuse", language: "touch" }
    ]
  },
  {
    id: 34,
    question: "Qu'est-ce qui rend une soirée parfaite pour vous ?",
    options: [
      { text: "De belles conversations", language: "words" },
      { text: "Du temps de qualité sans interruption", language: "quality-time" },
      { text: "Échanger des petits cadeaux", language: "gifts" },
      { text: "Ne rien avoir à préparer ou ranger", language: "acts" },
      { text: "Beaucoup de proximité physique", language: "touch" }
    ]
  },
  {
    id: 35,
    question: "Comment voulez-vous être consolé(e) ?",
    options: [
      { text: "Avec des mots apaisants", language: "words" },
      { text: "Avec une présence silencieuse mais présente", language: "quality-time" },
      { text: "Avec une attention particulière", language: "gifts" },
      { text: "En me déchargeant de mes obligations", language: "acts" },
      { text: "Avec des câlins", language: "touch" }
    ]
  },
  {
    id: 36,
    question: "Quelle marque d'affection préférez-vous en public ?",
    options: [
      { text: "Des compliments devant les autres", language: "words" },
      { text: "Qu'on me prête attention malgré la foule", language: "quality-time" },
      { text: "Un petit cadeau offert devant tous", language: "gifts" },
      { text: "Qu'on m'aide ou me soutienne", language: "acts" },
      { text: "Se tenir la main ou s'enlacer", language: "touch" }
    ]
  },
  {
    id: 37,
    question: "Comment aimez-vous terminer la journée ?",
    options: [
      { text: "En échangeant sur notre journée", language: "words" },
      { text: "En passant un moment ensemble", language: "quality-time" },
      { text: "Avec une petite surprise du soir", language: "gifts" },
      { text: "Sans avoir de tâches à faire", language: "acts" },
      { text: "Avec des câlins avant de dormir", language: "touch" }
    ]
  },
  {
    id: 38,
    question: "Qu'est-ce qui vous fait vous sentir aimé(e) profondément ?",
    options: [
      { text: "Entendre 'Je t'aime' régulièrement", language: "words" },
      { text: "Qu'on choisisse de passer du temps avec moi", language: "quality-time" },
      { text: "Des cadeaux qui montrent qu'on me connaît", language: "gifts" },
      { text: "Qu'on fasse des efforts pour me faciliter la vie", language: "acts" },
      { text: "Une intimité physique constante", language: "touch" }
    ]
  },
  {
    id: 39,
    question: "Quel geste romantique vous touche le plus ?",
    options: [
      { text: "Une déclaration d'amour passionnée", language: "words" },
      { text: "Un dîner aux chandelles rien qu'à deux", language: "quality-time" },
      { text: "Des roses ou des bijoux", language: "gifts" },
      { text: "Que tout soit préparé et parfait", language: "acts" },
      { text: "Une danse collée-serrée", language: "touch" }
    ]
  },
  {
    id: 40,
    question: "Comment préférez-vous être motivé(e) ?",
    options: [
      { text: "Par des encouragements verbaux", language: "words" },
      { text: "Par un soutien actif et présent", language: "quality-time" },
      { text: "Par une récompense symbolique", language: "gifts" },
      { text: "Par de l'aide concrète pour avancer", language: "acts" },
      { text: "Par des gestes de soutien physique", language: "touch" }
    ]
  },
  {
    id: 41,
    question: "Qu'est-ce qui vous fait sentir en sécurité ?",
    options: [
      { text: "Entendre des paroles rassurantes", language: "words" },
      { text: "Savoir que l'autre est là pour moi", language: "quality-time" },
      { text: "Avoir des preuves tangibles d'affection", language: "gifts" },
      { text: "Qu'on prenne soin de moi activement", language: "acts" },
      { text: "Le contact physique protecteur", language: "touch" }
    ]
  },
  {
    id: 42,
    question: "Comment aimez-vous célébrer les petites victoires ?",
    options: [
      { text: "Avec des félicitations enthousiastes", language: "words" },
      { text: "En prenant le temps de savourer ensemble", language: "quality-time" },
      { text: "Avec un petit cadeau de célébration", language: "gifts" },
      { text: "En me déchargeant des corvées", language: "acts" },
      { text: "Avec des câlins de joie", language: "touch" }
    ]
  },
  {
    id: 43,
    question: "Qu'attendez-vous d'un partenaire amoureux ?",
    options: [
      { text: "Qu'il/elle me dise souvent ce qu'il/elle ressent", language: "words" },
      { text: "Qu'il/elle passe du temps de qualité avec moi", language: "quality-time" },
      { text: "Qu'il/elle pense à moi avec des petits cadeaux", language: "gifts" },
      { text: "Qu'il/elle m'aide et me soutienne concrètement", language: "acts" },
      { text: "Qu'il/elle soit affectueux(se) physiquement", language: "touch" }
    ]
  },
  {
    id: 44,
    question: "Qu'est-ce qui vous fait sentir privilégié(e) ?",
    options: [
      { text: "Qu'on me dise que je suis spécial(e)", language: "words" },
      { text: "Qu'on me consacre du temps exclusif", language: "quality-time" },
      { text: "Recevoir des cadeaux personnalisés", language: "gifts" },
      { text: "Qu'on fasse des choses spécialement pour moi", language: "acts" },
      { text: "Des marques d'affection physique particulières", language: "touch" }
    ]
  },
  {
    id: 45,
    question: "Comment gérez-vous les moments de solitude ?",
    options: [
      { text: "En échangeant par messages", language: "words" },
      { text: "En anticipant le prochain moment ensemble", language: "quality-time" },
      { text: "En regardant les cadeaux reçus", language: "gifts" },
      { text: "En m'occupant avec des tâches", language: "acts" },
      { text: "En attendant les câlins à venir", language: "touch" }
    ]
  },
  {
    id: 46,
    question: "Qu'est-ce qui rend un moment ordinaire spécial ?",
    options: [
      { text: "Un compliment inattendu", language: "words" },
      { text: "L'attention complète de l'autre", language: "quality-time" },
      { text: "Une petite surprise", language: "gifts" },
      { text: "Qu'on me facilite une tâche", language: "acts" },
      { text: "Un geste tendre spontané", language: "touch" }
    ]
  },
  {
    id: 47,
    question: "Comment aimez-vous recevoir de l'affection ?",
    options: [
      { text: "Par des mots doux", language: "words" },
      { text: "Par de l'attention soutenue", language: "quality-time" },
      { text: "Par des petits gestes matériels", language: "gifts" },
      { text: "Par des services rendus", language: "acts" },
      { text: "Par des contacts physiques", language: "touch" }
    ]
  },
  {
    id: 48,
    question: "Qu'est-ce qui vous rapproche de quelqu'un ?",
    options: [
      { text: "Des conversations intimes", language: "words" },
      { text: "Des expériences partagées", language: "quality-time" },
      { text: "L'échange de cadeaux significatifs", language: "gifts" },
      { text: "L'entraide mutuelle", language: "acts" },
      { text: "Le contact physique", language: "touch" }
    ]
  },
  {
    id: 49,
    question: "Comment exprimez-vous votre joie ?",
    options: [
      { text: "En le disant avec enthousiasme", language: "words" },
      { text: "En voulant partager ce moment", language: "quality-time" },
      { text: "En offrant quelque chose", language: "gifts" },
      { text: "En aidant les autres", language: "acts" },
      { text: "Par des embrassades", language: "touch" }
    ]
  },
  {
    id: 50,
    question: "Qu'est-ce qui vous fait sentir compris(e) ?",
    options: [
      { text: "Qu'on reformule mes sentiments avec justesse", language: "words" },
      { text: "Qu'on prenne le temps de vraiment m'écouter", language: "quality-time" },
      { text: "Qu'on m'offre exactement ce dont j'avais besoin", language: "gifts" },
      { text: "Qu'on agisse sans que j'aie à demander", language: "acts" },
      { text: "Un geste qui montre qu'on me connaît", language: "touch" }
    ]
  },
  {
    id: 51,
    question: "Quelle est votre réaction face à un geste d'amour ?",
    options: [
      { text: "J'exprime ma gratitude avec des mots", language: "words" },
      { text: "Je veux passer plus de temps avec la personne", language: "quality-time" },
      { text: "Je veux offrir quelque chose en retour", language: "gifts" },
      { text: "Je veux rendre service", language: "acts" },
      { text: "Je donne un câlin en retour", language: "touch" }
    ]
  },
  {
    id: 52,
    question: "Qu'est-ce qui vous manque le plus dans une relation ?",
    options: [
      { text: "Les mots doux et attentionnés", language: "words" },
      { text: "Les moments de qualité ensemble", language: "quality-time" },
      { text: "Les petites attentions matérielles", language: "gifts" },
      { text: "L'aide et le soutien pratique", language: "acts" },
      { text: "L'affection physique", language: "touch" }
    ]
  },
  {
    id: 53,
    question: "Comment préférez-vous accueillir quelqu'un ?",
    options: [
      { text: "Avec des mots chaleureux", language: "words" },
      { text: "En lui consacrant du temps", language: "quality-time" },
      { text: "Avec un petit cadeau de bienvenue", language: "gifts" },
      { text: "En préparant tout pour son confort", language: "acts" },
      { text: "Avec une accolade", language: "touch" }
    ]
  },
  {
    id: 54,
    question: "Qu'appréciez-vous lors d'une surprise ?",
    options: [
      { text: "Les mots qui l'accompagnent", language: "words" },
      { text: "Le temps pris pour l'organiser", language: "quality-time" },
      { text: "La surprise elle-même", language: "gifts" },
      { text: "L'effort fait pour me faire plaisir", language: "acts" },
      { text: "Le geste physique qui suit", language: "touch" }
    ]
  },
  {
    id: 55,
    question: "Comment aimez-vous montrer votre amour aux autres ?",
    options: [
      { text: "En leur disant régulièrement", language: "words" },
      { text: "En passant du temps avec eux", language: "quality-time" },
      { text: "En leur offrant des cadeaux", language: "gifts" },
      { text: "En les aidant concrètement", language: "acts" },
      { text: "Par des gestes affectueux", language: "touch" }
    ]
  },
  {
    id: 56,
    question: "Qu'est-ce qui vous touche dans une amitié ?",
    options: [
      { text: "Les confidences et discussions", language: "words" },
      { text: "Le temps passé ensemble", language: "quality-time" },
      { text: "Les petits cadeaux échangés", language: "gifts" },
      { text: "L'entraide mutuelle", language: "acts" },
      { text: "Les gestes d'affection", language: "touch" }
    ]
  },
  {
    id: 57,
    question: "Comment réagissez-vous à une bonne nouvelle ?",
    options: [
      { text: "Je veux en parler avec quelqu'un", language: "words" },
      { text: "Je veux célébrer avec mes proches", language: "quality-time" },
      { text: "Je veux m'offrir quelque chose", language: "gifts" },
      { text: "Je veux aider les autres", language: "acts" },
      { text: "Je cherche des câlins de joie", language: "touch" }
    ]
  },
  {
    id: 58,
    question: "Qu'est-ce qui renforce votre confiance en quelqu'un ?",
    options: [
      { text: "Ses paroles sincères", language: "words" },
      { text: "Le temps qu'il/elle me consacre", language: "quality-time" },
      { text: "Les preuves matérielles de son engagement", language: "gifts" },
      { text: "Ses actions concrètes", language: "acts" },
      { text: "Son affection physique constante", language: "touch" }
    ]
  },
  {
    id: 59,
    question: "Qu'attendez-vous d'une relation équilibrée ?",
    options: [
      { text: "Une communication ouverte et honnête", language: "words" },
      { text: "Du temps de qualité mutuel", language: "quality-time" },
      { text: "Des attentions réciproques", language: "gifts" },
      { text: "Un soutien mutuel dans les tâches", language: "acts" },
      { text: "De l'affection physique partagée", language: "touch" }
    ]
  },
  {
    id: 60,
    question: "Comment préférez-vous passer un dimanche ?",
    options: [
      { text: "En discutant longuement avec quelqu'un", language: "words" },
      { text: "En faisant une activité ensemble", language: "quality-time" },
      { text: "En s'offrant de petits plaisirs", language: "gifts" },
      { text: "En accomplissant des tâches ensemble", language: "acts" },
      { text: "En se câlinant sur le canapé", language: "touch" }
    ]
  },
  {
    id: 61,
    question: "Qu'est-ce qui fait qu'une personne est importante pour vous ?",
    options: [
      { text: "Ce qu'elle me dit", language: "words" },
      { text: "Le temps qu'elle me donne", language: "quality-time" },
      { text: "Les attentions qu'elle a pour moi", language: "gifts" },
      { text: "Ce qu'elle fait pour moi", language: "acts" },
      { text: "Le contact physique qu'on a", language: "touch" }
    ]
  },
  {
    id: 62,
    question: "Comment aimez-vous être rassuré(e) ?",
    options: [
      { text: "Par des mots réconfortants", language: "words" },
      { text: "Par une présence constante", language: "quality-time" },
      { text: "Par un geste symbolique", language: "gifts" },
      { text: "Par des actions concrètes", language: "acts" },
      { text: "Par un contact physique apaisant", language: "touch" }
    ]
  },
  {
    id: 63,
    question: "Qu'est-ce qui vous fait sourire dans une journée ?",
    options: [
      { text: "Un message gentil", language: "words" },
      { text: "Un moment partagé", language: "quality-time" },
      { text: "Une petite surprise", language: "gifts" },
      { text: "Qu'on me facilite une tâche", language: "acts" },
      { text: "Un câlin spontané", language: "touch" }
    ]
  },
  {
    id: 64,
    question: "Comment exprimez-vous votre reconnaissance ?",
    options: [
      { text: "Par des mots de remerciement", language: "words" },
      { text: "En donnant de mon temps", language: "quality-time" },
      { text: "Par un cadeau", language: "gifts" },
      { text: "En rendant service", language: "acts" },
      { text: "Par un geste affectueux", language: "touch" }
    ]
  },
  {
    id: 65,
    question: "Qu'est-ce qui vous donne de l'énergie ?",
    options: [
      { text: "Des mots encourageants", language: "words" },
      { text: "Passer du temps avec mes proches", language: "quality-time" },
      { text: "Recevoir une petite attention", language: "gifts" },
      { text: "Qu'on m'aide dans mes projets", language: "acts" },
      { text: "Des gestes d'affection", language: "touch" }
    ]
  },
  {
    id: 66,
    question: "Comment aimez-vous faire plaisir ?",
    options: [
      { text: "En faisant des compliments", language: "words" },
      { text: "En offrant mon temps", language: "quality-time" },
      { text: "En offrant des cadeaux", language: "gifts" },
      { text: "En rendant service", language: "acts" },
      { text: "Par des gestes tendres", language: "touch" }
    ]
  },
  {
    id: 67,
    question: "Qu'est-ce qui vous fait sentir valorisé(e) ?",
    options: [
      { text: "Des compliments sur mes qualités", language: "words" },
      { text: "Qu'on choisisse de passer du temps avec moi", language: "quality-time" },
      { text: "Des cadeaux qui montrent qu'on me connaît", language: "gifts" },
      { text: "Qu'on apprécie mes efforts", language: "acts" },
      { text: "Des marques d'affection physique", language: "touch" }
    ]
  },
  {
    id: 68,
    question: "Comment préférez-vous communiquer dans une relation ?",
    options: [
      { text: "Par des conversations profondes", language: "words" },
      { text: "En passant du temps ensemble", language: "quality-time" },
      { text: "Par des petits gestes symboliques", language: "gifts" },
      { text: "Par des actions concrètes", language: "acts" },
      { text: "Par le contact physique", language: "touch" }
    ]
  },
  {
    id: 69,
    question: "Qu'est-ce qui vous manque quand vous êtes séparé(e) de vos proches ?",
    options: [
      { text: "Leurs mots et messages", language: "words" },
      { text: "Leur présence et compagnie", language: "quality-time" },
      { text: "Les petites attentions échangées", language: "gifts" },
      { text: "Leur aide au quotidien", language: "acts" },
      { text: "Leur affection physique", language: "touch" }
    ]
  },
  {
    id: 70,
    question: "Comment savez-vous qu'on vous aime ?",
    options: [
      { text: "On me le dit", language: "words" },
      { text: "On passe du temps avec moi", language: "quality-time" },
      { text: "On pense à moi avec des cadeaux", language: "gifts" },
      { text: "On fait des choses pour moi", language: "acts" },
      { text: "On me touche affectueusement", language: "touch" }
    ]
  },
  {
    id: 71,
    question: "Qu'est-ce qui vous rend nostalgique d'une relation ?",
    options: [
      { text: "Les conversations qu'on avait", language: "words" },
      { text: "Les moments passés ensemble", language: "quality-time" },
      { text: "Les cadeaux échangés", language: "gifts" },
      { text: "L'aide mutuelle qu'on s'apportait", language: "acts" },
      { text: "Les câlins et contacts physiques", language: "touch" }
    ]
  },
  {
    id: 72,
    question: "Comment aimez-vous être accueilli(e) après une absence ?",
    options: [
      { text: "Avec des mots chaleureux", language: "words" },
      { text: "Avec du temps pour se retrouver", language: "quality-time" },
      { text: "Avec un petit cadeau de bienvenue", language: "gifts" },
      { text: "Que tout soit prêt pour moi", language: "acts" },
      { text: "Avec une longue accolade", language: "touch" }
    ]
  },
  {
    id: 73,
    question: "Qu'appréciez-vous dans le soutien émotionnel ?",
    options: [
      { text: "Les mots justes et réconfortants", language: "words" },
      { text: "Une écoute attentive", language: "quality-time" },
      { text: "Un geste symbolique de soutien", language: "gifts" },
      { text: "Une aide concrète pour m'en sortir", language: "acts" },
      { text: "Un réconfort physique", language: "touch" }
    ]
  },
  {
    id: 74,
    question: "Comment préférez-vous partager votre bonheur ?",
    options: [
      { text: "En en parlant avec enthousiasme", language: "words" },
      { text: "En célébrant avec mes proches", language: "quality-time" },
      { text: "En offrant quelque chose", language: "gifts" },
      { text: "En aidant les autres", language: "acts" },
      { text: "Par des embrassades de joie", language: "touch" }
    ]
  },
  {
    id: 75,
    question: "Qu'est-ce qui crée de l'intimité pour vous ?",
    options: [
      { text: "Les confidences et secrets partagés", language: "words" },
      { text: "Le temps privilégié ensemble", language: "quality-time" },
      { text: "Les cadeaux personnels et significatifs", language: "gifts" },
      { text: "L'entraide dans les moments difficiles", language: "acts" },
      { text: "La proximité physique", language: "touch" }
    ]
  },
  {
    id: 76,
    question: "Comment aimez-vous vous réconcilier ?",
    options: [
      { text: "En discutant ouvertement", language: "words" },
      { text: "En passant du temps ensemble", language: "quality-time" },
      { text: "Avec un geste de paix", language: "gifts" },
      { text: "En faisant un effort concret", language: "acts" },
      { text: "Avec un câlin de réconciliation", language: "touch" }
    ]
  },
  {
    id: 77,
    question: "Qu'est-ce qui montre qu'on pense à vous ?",
    options: [
      { text: "Un message inattendu", language: "words" },
      { text: "Une invitation à se voir", language: "quality-time" },
      { text: "Un petit cadeau surprise", language: "gifts" },
      { text: "Un service rendu", language: "acts" },
      { text: "Un geste tendre", language: "touch" }
    ]
  },
  {
    id: 78,
    question: "Comment aimez-vous exprimer votre fierté pour quelqu'un ?",
    options: [
      { text: "En le lui disant clairement", language: "words" },
      { text: "En célébrant avec cette personne", language: "quality-time" },
      { text: "En offrant un cadeau de félicitation", language: "gifts" },
      { text: "En l'aidant à aller plus loin", language: "acts" },
      { text: "Par une accolade chaleureuse", language: "touch" }
    ]
  },
  {
    id: 79,
    question: "Qu'est-ce qui vous fait sentir soutenu(e) ?",
    options: [
      { text: "Des paroles d'encouragement", language: "words" },
      { text: "Une présence constante", language: "quality-time" },
      { text: "Des petites attentions", language: "gifts" },
      { text: "Une aide pratique", language: "acts" },
      { text: "Un soutien physique", language: "touch" }
    ]
  },
  {
    id: 80,
    question: "Comment préférez-vous recevoir des nouvelles de vos proches ?",
    options: [
      { text: "Par des messages détaillés", language: "words" },
      { text: "Par des appels ou visites", language: "quality-time" },
      { text: "Par des photos ou petits cadeaux", language: "gifts" },
      { text: "Par leur aide quand j'en ai besoin", language: "acts" },
      { text: "Par des câlins lors des retrouvailles", language: "touch" }
    ]
  },
  {
    id: 81,
    question: "Qu'est-ce qui rend un cadeau spécial pour vous ?",
    options: [
      { text: "Le message qui l'accompagne", language: "words" },
      { text: "Le moment où il est offert", language: "quality-time" },
      { text: "Le cadeau lui-même et sa signification", language: "gifts" },
      { text: "L'effort fait pour le trouver", language: "acts" },
      { text: "Le geste d'amour qui suit", language: "touch" }
    ]
  },
  {
    id: 82,
    question: "Comment aimez-vous démarrer une relation ?",
    options: [
      { text: "Par de longues conversations", language: "words" },
      { text: "En passant beaucoup de temps ensemble", language: "quality-time" },
      { text: "Par l'échange de petites attentions", language: "gifts" },
      { text: "En s'entraidant mutuellement", language: "acts" },
      { text: "Avec une connexion physique", language: "touch" }
    ]
  },
  {
    id: 83,
    question: "Qu'est-ce qui maintient votre intérêt dans une relation ?",
    options: [
      { text: "Des conversations stimulantes", language: "words" },
      { text: "Des moments de qualité réguliers", language: "quality-time" },
      { text: "Des attentions continues", language: "gifts" },
      { text: "Un soutien mutuel constant", language: "acts" },
      { text: "Une affection physique régulière", language: "touch" }
    ]
  },
  {
    id: 84,
    question: "Comment exprimez-vous votre affection au quotidien ?",
    options: [
      { text: "Par des mots tendres", language: "words" },
      { text: "En étant présent(e)", language: "quality-time" },
      { text: "Par de petites attentions", language: "gifts" },
      { text: "En aidant concrètement", language: "acts" },
      { text: "Par des gestes affectueux", language: "touch" }
    ]
  },
  {
    id: 85,
    question: "Qu'est-ce qui vous fait sentir connecté(e) à quelqu'un ?",
    options: [
      { text: "Des échanges verbaux profonds", language: "words" },
      { text: "Du temps passé ensemble", language: "quality-time" },
      { text: "Des symboles partagés", language: "gifts" },
      { text: "Des projets communs", language: "acts" },
      { text: "Le contact physique", language: "touch" }
    ]
  },
  {
    id: 86,
    question: "Comment aimez-vous gérer les conflits ?",
    options: [
      { text: "En parlant ouvertement", language: "words" },
      { text: "En prenant le temps de se calmer ensemble", language: "quality-time" },
      { text: "Avec un geste de réconciliation", language: "gifts" },
      { text: "En trouvant des solutions concrètes", language: "acts" },
      { text: "Avec un câlin apaisant", language: "touch" }
    ]
  },
  {
    id: 87,
    question: "Qu'est-ce qui vous réconforte dans les moments difficiles ?",
    options: [
      { text: "Des paroles apaisantes", language: "words" },
      { text: "La présence de mes proches", language: "quality-time" },
      { text: "Une attention particulière", language: "gifts" },
      { text: "Qu'on m'aide à résoudre le problème", language: "acts" },
      { text: "Des câlins réconfortants", language: "touch" }
    ]
  },
  {
    id: 88,
    question: "Comment préférez-vous montrer votre engagement ?",
    options: [
      { text: "Par des promesses verbales", language: "words" },
      { text: "En consacrant mon temps", language: "quality-time" },
      { text: "Par des symboles d'engagement", language: "gifts" },
      { text: "Par des actions concrètes", language: "acts" },
      { text: "Par l'intimité physique", language: "touch" }
    ]
  },
  {
    id: 89,
    question: "Qu'attendez-vous lors d'un moment romantique ?",
    options: [
      { text: "Des déclarations d'amour", language: "words" },
      { text: "Du temps intime ensemble", language: "quality-time" },
      { text: "Des cadeaux romantiques", language: "gifts" },
      { text: "Qu'on s'occupe de tout", language: "acts" },
      { text: "Beaucoup de contact physique", language: "touch" }
    ]
  },
  {
    id: 90,
    question: "Comment aimez-vous surprendre quelqu'un ?",
    options: [
      { text: "Avec des mots inattendus", language: "words" },
      { text: "Avec une visite surprise", language: "quality-time" },
      { text: "Avec un cadeau inattendu", language: "gifts" },
      { text: "En faisant quelque chose pour eux", language: "acts" },
      { text: "Avec un geste affectueux surprise", language: "touch" }
    ]
  },
  {
    id: 91,
    question: "Qu'est-ce qui renforce votre sentiment d'appartenance ?",
    options: [
      { text: "Être inclus(e) dans les conversations", language: "words" },
      { text: "Partager des moments ensemble", language: "quality-time" },
      { text: "Recevoir des symboles d'appartenance", language: "gifts" },
      { text: "Contribuer activement au groupe", language: "acts" },
      { text: "Les gestes d'affection partagés", language: "touch" }
    ]
  },
  {
    id: 92,
    question: "Comment aimez-vous être inclus(e) ?",
    options: [
      { text: "Qu'on me demande mon avis", language: "words" },
      { text: "Qu'on m'invite à participer", language: "quality-time" },
      { text: "Qu'on pense à m'apporter quelque chose", language: "gifts" },
      { text: "Qu'on me donne un rôle actif", language: "acts" },
      { text: "Par des gestes d'inclusion", language: "touch" }
    ]
  },
  {
    id: 93,
    question: "Qu'est-ce qui vous fait sentir spécial(e) ?",
    options: [
      { text: "Des compliments uniques", language: "words" },
      { text: "Du temps exclusif avec quelqu'un", language: "quality-time" },
      { text: "Des cadeaux personnalisés", language: "gifts" },
      { text: "Qu'on fasse des efforts spéciaux pour moi", language: "acts" },
      { text: "Des marques d'affection particulières", language: "touch" }
    ]
  },
  {
    id: 94,
    question: "Comment gérez-vous la distance dans une relation ?",
    options: [
      { text: "Par des communications régulières", language: "words" },
      { text: "En planifiant des moments ensemble", language: "quality-time" },
      { text: "En envoyant des cadeaux", language: "gifts" },
      { text: "En trouvant des façons de s'aider à distance", language: "acts" },
      { text: "En attendant les retrouvailles physiques", language: "touch" }
    ]
  },
  {
    id: 95,
    question: "Qu'est-ce qui vous fait sentir apprécié(e) ?",
    options: [
      { text: "Des remerciements sincères", language: "words" },
      { text: "Qu'on veuille passer du temps avec moi", language: "quality-time" },
      { text: "Des cadeaux de reconnaissance", language: "gifts" },
      { text: "Qu'on reconnaisse mes efforts", language: "acts" },
      { text: "Des gestes de gratitude", language: "touch" }
    ]
  },
  {
    id: 96,
    question: "Comment préférez-vous recevoir du feedback ?",
    options: [
      { text: "Par des mots clairs et constructifs", language: "words" },
      { text: "Lors d'une conversation dédiée", language: "quality-time" },
      { text: "Accompagné d'une reconnaissance symbolique", language: "gifts" },
      { text: "Avec des suggestions d'amélioration concrètes", language: "acts" },
      { text: "De manière bienveillante et chaleureuse", language: "touch" }
    ]
  },
  {
    id: 97,
    question: "Qu'est-ce qui vous motive à vous améliorer ?",
    options: [
      { text: "Les encouragements verbaux", language: "words" },
      { text: "Le soutien actif de mes proches", language: "quality-time" },
      { text: "Des récompenses symboliques", language: "gifts" },
      { text: "L'aide concrète pour progresser", language: "acts" },
      { text: "Le soutien physique et émotionnel", language: "touch" }
    ]
  },
  {
    id: 98,
    question: "Comment aimez-vous célébrer les fêtes ?",
    options: [
      { text: "En échangeant des vœux chaleureux", language: "words" },
      { text: "En passant du temps ensemble", language: "quality-time" },
      { text: "En échangeant des cadeaux", language: "gifts" },
      { text: "En partageant les préparatifs", language: "acts" },
      { text: "Avec beaucoup de câlins festifs", language: "touch" }
    ]
  },
  {
    id: 99,
    question: "Qu'est-ce qui vous fait sentir proche de vos amis ?",
    options: [
      { text: "Nos conversations intimes", language: "words" },
      { text: "Le temps qu'on passe ensemble", language: "quality-time" },
      { text: "Les cadeaux qu'on échange", language: "gifts" },
      { text: "L'aide mutuelle", language: "acts" },
      { text: "Les gestes affectueux", language: "touch" }
    ]
  },
  {
    id: 100,
    question: "Comment aimez-vous dire au revoir ?",
    options: [
      { text: "Avec des mots affectueux", language: "words" },
      { text: "En prolongeant le moment", language: "quality-time" },
      { text: "Avec un petit cadeau souvenir", language: "gifts" },
      { text: "En aidant pour le départ", language: "acts" },
      { text: "Avec une longue accolade", language: "touch" }
    ]
  },
  {
    id: 101,
    question: "Qu'est-ce qui rend une relation durable pour vous ?",
    options: [
      { text: "La communication constante", language: "words" },
      { text: "Le temps investi ensemble", language: "quality-time" },
      { text: "Les attentions régulières", language: "gifts" },
      { text: "Le soutien mutuel continu", language: "acts" },
      { text: "L'affection physique maintenue", language: "touch" }
    ]
  },
  {
    id: 102,
    question: "Comment exprimez-vous votre tristesse ?",
    options: [
      { text: "En en parlant", language: "words" },
      { text: "En cherchant de la compagnie", language: "quality-time" },
      { text: "En regardant des objets sentimentaux", language: "gifts" },
      { text: "En m'occupant avec des tâches", language: "acts" },
      { text: "En cherchant du réconfort physique", language: "touch" }
    ]
  },
  {
    id: 103,
    question: "Qu'attendez-vous d'une soirée en amoureux ?",
    options: [
      { text: "Des conversations profondes", language: "words" },
      { text: "Du temps de qualité sans distraction", language: "quality-time" },
      { text: "Un échange de petites attentions", language: "gifts" },
      { text: "Que tout soit parfaitement organisé", language: "acts" },
      { text: "Beaucoup de proximité physique", language: "touch" }
    ]
  },
  {
    id: 104,
    question: "Comment aimez-vous commencer une nouvelle amitié ?",
    options: [
      { text: "Par des conversations intéressantes", language: "words" },
      { text: "En passant du temps ensemble", language: "quality-time" },
      { text: "En échangeant de petites attentions", language: "gifts" },
      { text: "En s'entraidant", language: "acts" },
      { text: "Par des gestes amicaux", language: "touch" }
    ]
  },
  {
    id: 105,
    question: "Qu'est-ce qui renforce une amitié pour vous ?",
    options: [
      { text: "Des confidences partagées", language: "words" },
      { text: "Des expériences vécues ensemble", language: "quality-time" },
      { text: "Des cadeaux échangés", language: "gifts" },
      { text: "L'entraide dans les moments difficiles", language: "acts" },
      { text: "Les accolades et gestes amicaux", language: "touch" }
    ]
  },
  {
    id: 106,
    question: "Comment préférez-vous recevoir de l'aide ?",
    options: [
      { text: "Avec des conseils verbaux", language: "words" },
      { text: "Avec une présence soutenante", language: "quality-time" },
      { text: "Avec des ressources matérielles", language: "gifts" },
      { text: "Avec une aide pratique directe", language: "acts" },
      { text: "Avec du soutien émotionnel physique", language: "touch" }
    ]
  },
  {
    id: 107,
    question: "Qu'est-ce qui vous fait sentir bienvenu(e) ?",
    options: [
      { text: "Des mots d'accueil chaleureux", language: "words" },
      { text: "Qu'on prenne le temps de m'accueillir", language: "quality-time" },
      { text: "Un cadeau de bienvenue", language: "gifts" },
      { text: "Que tout soit préparé pour moi", language: "acts" },
      { text: "Une accolade chaleureuse", language: "touch" }
    ]
  },
  {
    id: 108,
    question: "Comment aimez-vous partager vos réussites ?",
    options: [
      { text: "En en parlant avec fierté", language: "words" },
      { text: "En célébrant avec mes proches", language: "quality-time" },
      { text: "En m'offrant un cadeau de célébration", language: "gifts" },
      { text: "En utilisant mon succès pour aider les autres", language: "acts" },
      { text: "Par des embrassades de joie", language: "touch" }
    ]
  },
  {
    id: 109,
    question: "Qu'est-ce qui vous aide à surmonter une difficulté ?",
    options: [
      { text: "Des mots d'encouragement", language: "words" },
      { text: "La présence de mes proches", language: "quality-time" },
      { text: "Des petites attentions réconfortantes", language: "gifts" },
      { text: "Une aide concrète pour résoudre le problème", language: "acts" },
      { text: "Du réconfort physique", language: "touch" }
    ]
  },
  {
    id: 110,
    question: "Comment préférez-vous être félicité(e) ?",
    options: [
      { text: "Avec des mots de félicitation", language: "words" },
      { text: "Lors d'un moment de célébration", language: "quality-time" },
      { text: "Avec un cadeau de félicitation", language: "gifts" },
      { text: "En reconnaissant mes efforts", language: "acts" },
      { text: "Avec des gestes de fierté", language: "touch" }
    ]
  },
  {
    id: 111,
    question: "Qu'est-ce qui vous fait sentir chez vous quelque part ?",
    options: [
      { text: "Les conversations familières", language: "words" },
      { text: "Le temps passé dans ce lieu", language: "quality-time" },
      { text: "Mes objets personnels autour de moi", language: "gifts" },
      { text: "Pouvoir contribuer à cet endroit", language: "acts" },
      { text: "Le confort physique", language: "touch" }
    ]
  },
  {
    id: 112,
    question: "Comment aimez-vous gérer le stress en couple ?",
    options: [
      { text: "En parlant de ce qui me stresse", language: "words" },
      { text: "En passant du temps ensemble pour décompresser", language: "quality-time" },
      { text: "Avec des petites attentions réconfortantes", language: "gifts" },
      { text: "Qu'on m'aide à gérer les sources de stress", language: "acts" },
      { text: "Avec du réconfort physique", language: "touch" }
    ]
  },
  {
    id: 113,
    question: "Qu'attendez-vous lors d'une réconciliation ?",
    options: [
      { text: "Des excuses sincères", language: "words" },
      { text: "Du temps pour se reconnecter", language: "quality-time" },
      { text: "Un geste de paix symbolique", language: "gifts" },
      { text: "Des actions pour réparer", language: "acts" },
      { text: "Un câlin de réconciliation", language: "touch" }
    ]
  },
  {
    id: 114,
    question: "Comment aimez-vous montrer que vous tenez à quelqu'un ?",
    options: [
      { text: "En le lui disant régulièrement", language: "words" },
      { text: "En passant beaucoup de temps ensemble", language: "quality-time" },
      { text: "En offrant des cadeaux attentionnés", language: "gifts" },
      { text: "En l'aidant dans ses projets", language: "acts" },
      { text: "Par des gestes affectueux réguliers", language: "touch" }
    ]
  },
  {
    id: 115,
    question: "Qu'est-ce qui vous fait sentir en paix ?",
    options: [
      { text: "Des paroles apaisantes", language: "words" },
      { text: "Du temps calme avec mes proches", language: "quality-time" },
      { text: "Être entouré(e) de mes objets préférés", language: "gifts" },
      { text: "Que tout soit en ordre autour de moi", language: "acts" },
      { text: "Le contact physique réconfortant", language: "touch" }
    ]
  },
  {
    id: 116,
    question: "Comment préférez-vous être inspiré(e) ?",
    options: [
      { text: "Par des mots motivants", language: "words" },
      { text: "Par des expériences partagées", language: "quality-time" },
      { text: "Par des symboles inspirants", language: "gifts" },
      { text: "Par l'exemple et l'action", language: "acts" },
      { text: "Par une connexion émotionnelle forte", language: "touch" }
    ]
  },
  {
    id: 117,
    question: "Qu'est-ce qui rend un geste mémorable pour vous ?",
    options: [
      { text: "Les mots qui l'accompagnent", language: "words" },
      { text: "Le moment où il se produit", language: "quality-time" },
      { text: "Le geste lui-même et sa signification", language: "gifts" },
      { text: "L'effort et l'intention derrière", language: "acts" },
      { text: "L'émotion physique ressentie", language: "touch" }
    ]
  },
  {
    id: 118,
    question: "Comment aimez-vous exprimer votre admiration ?",
    options: [
      { text: "Par des compliments sincères", language: "words" },
      { text: "En consacrant mon temps à cette personne", language: "quality-time" },
      { text: "En offrant un cadeau significatif", language: "gifts" },
      { text: "En soutenant ses projets activement", language: "acts" },
      { text: "Par des gestes de respect", language: "touch" }
    ]
  },
  {
    id: 119,
    question: "Qu'est-ce qui vous fait sentir respecté(e) ?",
    options: [
      { text: "Qu'on écoute mes opinions", language: "words" },
      { text: "Qu'on me consacre du temps d'écoute", language: "quality-time" },
      { text: "Qu'on respecte mes possessions", language: "gifts" },
      { text: "Qu'on respecte mes limites et besoins", language: "acts" },
      { text: "Qu'on respecte mon espace personnel", language: "touch" }
    ]
  },
  {
    id: 120,
    question: "Comment préférez-vous partager votre vulnérabilité ?",
    options: [
      { text: "En parlant de mes sentiments", language: "words" },
      { text: "Dans un moment intime et privé", language: "quality-time" },
      { text: "En partageant quelque chose de personnel", language: "gifts" },
      { text: "En acceptant de l'aide", language: "acts" },
      { text: "Par le contact physique réconfortant", language: "touch" }
    ]
  },
  {
    id: 121,
    question: "Qu'est-ce qui vous aide à vous sentir aimé(e) inconditionnellement ?",
    options: [
      { text: "Entendre 'Je t'aime quoi qu'il arrive'", language: "words" },
      { text: "Une présence constante dans tous les moments", language: "quality-time" },
      { text: "Des cadeaux même sans raison particulière", language: "gifts" },
      { text: "Un soutien dans les bons comme les mauvais moments", language: "acts" },
      { text: "Une affection physique régulière et constante", language: "touch" }
    ]
  },
  {
    id: 122,
    question: "Comment aimez-vous exprimer votre soutien à quelqu'un qui souffre ?",
    options: [
      { text: "Avec des mots de réconfort", language: "words" },
      { text: "En étant présent(e) à ses côtés", language: "quality-time" },
      { text: "Avec une attention particulière", language: "gifts" },
      { text: "En l'aidant concrètement", language: "acts" },
      { text: "Avec du réconfort physique", language: "touch" }
    ]
  },
  {
    id: 123,
    question: "Qu'est-ce qui vous fait sentir inclus(e) dans un groupe ?",
    options: [
      { text: "Qu'on sollicite mon avis", language: "words" },
      { text: "Qu'on m'invite aux activités", language: "quality-time" },
      { text: "Qu'on pense à m'apporter quelque chose", language: "gifts" },
      { text: "Qu'on me donne des responsabilités", language: "acts" },
      { text: "Les gestes d'inclusion amicaux", language: "touch" }
    ]
  },
  {
    id: 124,
    question: "Comment préférez-vous gérer les moments de tension ?",
    options: [
      { text: "En discutant calmement", language: "words" },
      { text: "En prenant du recul ensemble", language: "quality-time" },
      { text: "Avec un geste apaisant", language: "gifts" },
      { text: "En trouvant des solutions pratiques", language: "acts" },
      { text: "Avec un contact physique apaisant", language: "touch" }
    ]
  },
  {
    id: 125,
    question: "Qu'est-ce qui vous fait sentir compris(e) profondément ?",
    options: [
      { text: "Qu'on exprime ma pensée avec justesse", language: "words" },
      { text: "Qu'on passe du temps à vraiment m'écouter", language: "quality-time" },
      { text: "Qu'on m'offre exactement ce dont j'ai besoin", language: "gifts" },
      { text: "Qu'on anticipe mes besoins", language: "acts" },
      { text: "Qu'on sente mon état émotionnel", language: "touch" }
    ]
  },
  {
    id: 126,
    question: "Comment aimez-vous célébrer les traditions familiales ?",
    options: [
      { text: "En partageant des histoires familiales", language: "words" },
      { text: "En passant du temps ensemble", language: "quality-time" },
      { text: "En échangeant des objets symboliques", language: "gifts" },
      { text: "En perpétuant les rituels ensemble", language: "acts" },
      { text: "Avec des embrassades traditionnelles", language: "touch" }
    ]
  },
  {
    id: 127,
    question: "Qu'attendez-vous lors d'un moment de complicité ?",
    options: [
      { text: "Des conversations à demi-mot", language: "words" },
      { text: "Du temps privilégié ensemble", language: "quality-time" },
      { text: "Des petits secrets partagés", language: "gifts" },
      { text: "Une collaboration naturelle", language: "acts" },
      { text: "Une proximité physique complice", language: "touch" }
    ]
  },
  {
    id: 128,
    question: "Comment préférez-vous renforcer un lien affectif ?",
    options: [
      { text: "Par des conversations profondes", language: "words" },
      { text: "Par des moments partagés", language: "quality-time" },
      { text: "Par des échanges symboliques", language: "gifts" },
      { text: "Par l'entraide mutuelle", language: "acts" },
      { text: "Par le contact physique", language: "touch" }
    ]
  },
  {
    id: 129,
    question: "Qu'est-ce qui vous fait sentir chanceux(se) dans une relation ?",
    options: [
      { text: "Les belles choses qu'on me dit", language: "words" },
      { text: "Le temps qu'on me consacre", language: "quality-time" },
      { text: "Les attentions dont je bénéficie", language: "gifts" },
      { text: "Le soutien que je reçois", language: "acts" },
      { text: "L'affection dont je suis entouré(e)", language: "touch" }
    ]
  },
  {
    id: 130,
    question: "Comment aimez-vous accueillir une bonne nouvelle ?",
    options: [
      { text: "En en parlant avec enthousiasme", language: "words" },
      { text: "En célébrant avec mes proches", language: "quality-time" },
      { text: "En m'offrant quelque chose", language: "gifts" },
      { text: "En me mettant en action", language: "acts" },
      { text: "Avec des embrassades de joie", language: "touch" }
    ]
  },
  {
    id: 131,
    question: "Qu'est-ce qui renforce votre estime de vous-même ?",
    options: [
      { text: "Les compliments que je reçois", language: "words" },
      { text: "Le temps qu'on investit en moi", language: "quality-time" },
      { text: "Les marques de reconnaissance", language: "gifts" },
      { text: "Mes accomplissements concrets", language: "acts" },
      { text: "L'affection qu'on me témoigne", language: "touch" }
    ]
  },
  {
    id: 132,
    question: "Comment préférez-vous être intégré(e) dans une nouvelle communauté ?",
    options: [
      { text: "Par des conversations d'accueil", language: "words" },
      { text: "En passant du temps avec le groupe", language: "quality-time" },
      { text: "Par des cadeaux de bienvenue", language: "gifts" },
      { text: "En participant activement", language: "acts" },
      { text: "Par des gestes amicaux", language: "touch" }
    ]
  },
  {
    id: 133,
    question: "Qu'est-ce qui vous fait sentir valorisé(e) dans votre travail ?",
    options: [
      { text: "La reconnaissance verbale", language: "words" },
      { text: "Le temps qu'on me consacre", language: "quality-time" },
      { text: "Les récompenses matérielles", language: "gifts" },
      { text: "L'impact de mes actions", language: "acts" },
      { text: "Les relations chaleureuses", language: "touch" }
    ]
  },
  {
    id: 134,
    question: "Comment aimez-vous gérer les changements ?",
    options: [
      { text: "En en parlant avec mes proches", language: "words" },
      { text: "En étant entouré(e) pendant la transition", language: "quality-time" },
      { text: "En m'accrochant à des objets familiers", language: "gifts" },
      { text: "En agissant pour m'adapter", language: "acts" },
      { text: "En cherchant du réconfort physique", language: "touch" }
    ]
  },
  {
    id: 135,
    question: "Qu'attendez-vous lors d'un moment de partage ?",
    options: [
      { text: "Des échanges verbaux riches", language: "words" },
      { text: "Du temps de qualité ensemble", language: "quality-time" },
      { text: "Des cadeaux ou attentions échangés", language: "gifts" },
      { text: "Une collaboration active", language: "acts" },
      { text: "Une proximité physique", language: "touch" }
    ]
  },
  {
    id: 136,
    question: "Comment préférez-vous exprimer votre empathie ?",
    options: [
      { text: "Par des mots de compréhension", language: "words" },
      { text: "En étant présent(e) et à l'écoute", language: "quality-time" },
      { text: "Par un geste attentionné", language: "gifts" },
      { text: "En offrant mon aide", language: "acts" },
      { text: "Par un contact physique réconfortant", language: "touch" }
    ]
  },
  {
    id: 137,
    question: "Qu'est-ce qui vous fait sentir en confiance ?",
    options: [
      { text: "Des promesses tenues", language: "words" },
      { text: "Une présence fiable", language: "quality-time" },
      { text: "Des preuves tangibles de fiabilité", language: "gifts" },
      { text: "Des actions cohérentes", language: "acts" },
      { text: "Un contact physique sécurisant", language: "touch" }
    ]
  },
  {
    id: 138,
    question: "Comment aimez-vous partager votre enthousiasme ?",
    options: [
      { text: "En en parlant avec passion", language: "words" },
      { text: "En partageant l'expérience", language: "quality-time" },
      { text: "En offrant quelque chose lié à ma passion", language: "gifts" },
      { text: "En impliquant les autres dans l'action", language: "acts" },
      { text: "Par des gestes expressifs", language: "touch" }
    ]
  },
  {
    id: 139,
    question: "Qu'est-ce qui rend une relation harmonieuse pour vous ?",
    options: [
      { text: "Une communication ouverte", language: "words" },
      { text: "Du temps de qualité régulier", language: "quality-time" },
      { text: "Des attentions mutuelles", language: "gifts" },
      { text: "Un soutien réciproque", language: "acts" },
      { text: "Une affection physique partagée", language: "touch" }
    ]
  },
  {
    id: 140,
    question: "Comment préférez-vous être motivé(e) pour un projet ?",
    options: [
      { text: "Par des encouragements verbaux", language: "words" },
      { text: "Par un soutien actif et présent", language: "quality-time" },
      { text: "Par des récompenses à venir", language: "gifts" },
      { text: "Par de l'aide concrète", language: "acts" },
      { text: "Par un soutien émotionnel physique", language: "touch" }
    ]
  },
  {
    id: 141,
    question: "Qu'est-ce qui vous fait sentir énergisé(e) ?",
    options: [
      { text: "Des conversations stimulantes", language: "words" },
      { text: "Du temps avec des personnes positives", language: "quality-time" },
      { text: "Des petites surprises agréables", language: "gifts" },
      { text: "Accomplir des tâches avec succès", language: "acts" },
      { text: "Des contacts physiques énergisants", language: "touch" }
    ]
  },
  {
    id: 142,
    question: "Comment aimez-vous partager un moment de joie ?",
    options: [
      { text: "En exprimant mon bonheur verbalement", language: "words" },
      { text: "En savourant le moment avec d'autres", language: "quality-time" },
      { text: "En offrant quelque chose pour marquer l'occasion", language: "gifts" },
      { text: "En créant plus de moments heureux", language: "acts" },
      { text: "Par des embrassades joyeuses", language: "touch" }
    ]
  },
  {
    id: 143,
    question: "Qu'attendez-vous lors d'un moment de détente ?",
    options: [
      { text: "Des conversations légères", language: "words" },
      { text: "Du temps calme ensemble", language: "quality-time" },
      { text: "De petits plaisirs matériels", language: "gifts" },
      { text: "Ne rien avoir à faire", language: "acts" },
      { text: "Du confort physique", language: "touch" }
    ]
  },
  {
    id: 144,
    question: "Comment préférez-vous gérer les déceptions ?",
    options: [
      { text: "En parlant de ce que je ressens", language: "words" },
      { text: "Avec la présence de mes proches", language: "quality-time" },
      { text: "Avec de petites consolations", language: "gifts" },
      { text: "En trouvant des solutions", language: "acts" },
      { text: "Avec du réconfort physique", language: "touch" }
    ]
  },
  {
    id: 145,
    question: "Qu'est-ce qui vous fait sentir bien accueilli(e) ?",
    options: [
      { text: "Des mots chaleureux", language: "words" },
      { text: "Qu'on me consacre du temps", language: "quality-time" },
      { text: "Un petit cadeau d'accueil", language: "gifts" },
      { text: "Que tout soit prêt pour moi", language: "acts" },
      { text: "Une accolade de bienvenue", language: "touch" }
    ]
  },
  {
    id: 146,
    question: "Comment aimez-vous exprimer votre créativité ?",
    options: [
      { text: "Par l'écriture ou la parole", language: "words" },
      { text: "En collaborant avec d'autres", language: "quality-time" },
      { text: "En créant des objets", language: "gifts" },
      { text: "Par l'action et la réalisation", language: "acts" },
      { text: "Par l'expression corporelle", language: "touch" }
    ]
  },
  {
    id: 147,
    question: "Qu'est-ce qui renforce votre sentiment de sécurité affective ?",
    options: [
      { text: "Des paroles rassurantes régulières", language: "words" },
      { text: "Une présence constante", language: "quality-time" },
      { text: "Des preuves tangibles d'amour", language: "gifts" },
      { text: "Un soutien actif continu", language: "acts" },
      { text: "Une affection physique régulière", language: "touch" }
    ]
  },
  {
    id: 148,
    question: "Comment préférez-vous être encouragé(e) dans vos rêves ?",
    options: [
      { text: "Par des mots motivants", language: "words" },
      { text: "Par un soutien actif", language: "quality-time" },
      { text: "Par des ressources utiles", language: "gifts" },
      { text: "Par une aide concrète pour avancer", language: "acts" },
      { text: "Par un soutien émotionnel physique", language: "touch" }
    ]
  },
  {
    id: 149,
    question: "Qu'est-ce qui vous fait sentir épanoui(e) ?",
    options: [
      { text: "La reconnaissance verbale", language: "words" },
      { text: "Des relations de qualité", language: "quality-time" },
      { text: "Les plaisirs de la vie", language: "gifts" },
      { text: "Mes accomplissements", language: "acts" },
      { text: "L'affection que je reçois", language: "touch" }
    ]
  },
  {
    id: 150,
    question: "Comment aimez-vous terminer une conversation importante ?",
    options: [
      { text: "Avec des mots de conclusion clairs", language: "words" },
      { text: "En prenant le temps de bien conclure", language: "quality-time" },
      { text: "Avec un geste symbolique", language: "gifts" },
      { text: "En planifiant les prochaines actions", language: "acts" },
      { text: "Avec un geste physique de conclusion", language: "touch" }
    ]
  },
  {
    id: 151,
    question: "Qu'est-ce qui vous fait sentir vivant(e) ?",
    options: [
      { text: "Des échanges passionnés", language: "words" },
      { text: "Des expériences intenses partagées", language: "quality-time" },
      { text: "De nouvelles découvertes matérielles", language: "gifts" },
      { text: "L'accomplissement de défis", language: "acts" },
      { text: "Des sensations physiques fortes", language: "touch" }
    ]
  },
  {
    id: 152,
    question: "Comment préférez-vous gérer les transitions de vie ?",
    options: [
      { text: "En parlant de mes ressentis", language: "words" },
      { text: "Avec le soutien de mes proches", language: "quality-time" },
      { text: "En m'entourant d'objets familiers", language: "gifts" },
      { text: "En agissant pour faciliter le changement", language: "acts" },
      { text: "En cherchant du réconfort physique", language: "touch" }
    ]
  },
  {
    id: 153,
    question: "Qu'attendez-vous lors d'un moment de connexion profonde ?",
    options: [
      { text: "Des confidences intimes", language: "words" },
      { text: "Du temps de qualité exclusif", language: "quality-time" },
      { text: "Un échange de symboles personnels", language: "gifts" },
      { text: "Une collaboration significative", language: "acts" },
      { text: "Une intimité physique", language: "touch" }
    ]
  },
  {
    id: 154,
    question: "Comment aimez-vous exprimer votre gratitude envers la vie ?",
    options: [
      { text: "En l'exprimant verbalement", language: "words" },
      { text: "En profitant pleinement du moment présent", language: "quality-time" },
      { text: "En m'offrant de petits plaisirs", language: "gifts" },
      { text: "En aidant les autres", language: "acts" },
      { text: "En savourant les sensations physiques", language: "touch" }
    ]
  },
  {
    id: 155,
    question: "Qu'est-ce qui vous fait sentir comblé(e) ?",
    options: [
      { text: "Entendre des mots d'amour", language: "words" },
      { text: "Avoir du temps de qualité avec mes proches", language: "quality-time" },
      { text: "Recevoir des attentions", language: "gifts" },
      { text: "Voir mes efforts reconnus", language: "acts" },
      { text: "Avoir de l'affection physique", language: "touch" }
    ]
  },
  {
    id: 156,
    question: "Comment préférez-vous célébrer votre évolution personnelle ?",
    options: [
      { text: "En partageant mes réflexions", language: "words" },
      { text: "En célébrant avec mes proches", language: "quality-time" },
      { text: "En m'offrant une récompense", language: "gifts" },
      { text: "En me fixant de nouveaux objectifs", language: "acts" },
      { text: "En savourant le moment pleinement", language: "touch" }
    ]
  },
  {
    id: 157,
    question: "Qu'est-ce qui renforce votre résilience ?",
    options: [
      { text: "Des mots d'encouragement", language: "words" },
      { text: "Le soutien de mes proches", language: "quality-time" },
      { text: "Des petites victoires matérielles", language: "gifts" },
      { text: "Mes actions et accomplissements", language: "acts" },
      { text: "Le réconfort physique", language: "touch" }
    ]
  },
  {
    id: 158,
    question: "Comment aimez-vous partager vos valeurs ?",
    options: [
      { text: "En en parlant ouvertement", language: "words" },
      { text: "Par l'exemple au quotidien", language: "quality-time" },
      { text: "Par des symboles significatifs", language: "gifts" },
      { text: "Par mes actions concrètes", language: "acts" },
      { text: "Par ma présence authentique", language: "touch" }
    ]
  },
  {
    id: 159,
    question: "Qu'attendez-vous lors d'un moment de célébration ?",
    options: [
      { text: "Des discours et des toasts", language: "words" },
      { text: "Du temps festif ensemble", language: "quality-time" },
      { text: "Des cadeaux et surprises", language: "gifts" },
      { text: "Une organisation parfaite", language: "acts" },
      { text: "Beaucoup de contacts joyeux", language: "touch" }
    ]
  },
  {
    id: 160,
    question: "Comment préférez-vous être inspiré(e) au quotidien ?",
    options: [
      { text: "Par des citations et paroles motivantes", language: "words" },
      { text: "Par des moments partagés inspirants", language: "quality-time" },
      { text: "Par des objets inspirants autour de moi", language: "gifts" },
      { text: "Par des modèles d'action", language: "acts" },
      { text: "Par des expériences sensorielles", language: "touch" }
    ]
  },
  {
    id: 161,
    question: "Qu'est-ce qui vous fait sentir connecté(e) à l'humanité ?",
    options: [
      { text: "Les histoires et récits partagés", language: "words" },
      { text: "Les moments de communion", language: "quality-time" },
      { text: "Les échanges et le partage", language: "gifts" },
      { text: "L'entraide et la solidarité", language: "acts" },
      { text: "Le contact humain", language: "touch" }
    ]
  },
  {
    id: 162,
    question: "Comment aimez-vous gérer vos émotions intenses ?",
    options: [
      { text: "En les verbalisant", language: "words" },
      { text: "En étant avec mes proches", language: "quality-time" },
      { text: "En m'entourant d'objets réconfortants", language: "gifts" },
      { text: "En agissant pour les canaliser", language: "acts" },
      { text: "Par le contact physique", language: "touch" }
    ]
  },
  {
    id: 163,
    question: "Qu'attendez-vous lors d'un moment de paix ?",
    options: [
      { text: "Du silence ou des mots doux", language: "words" },
      { text: "Une présence calme", language: "quality-time" },
      { text: "Un environnement apaisant", language: "gifts" },
      { text: "Aucune obligation", language: "acts" },
      { text: "Un confort physique", language: "touch" }
    ]
  },
  {
    id: 164,
    question: "Comment préférez-vous exprimer votre individualité ?",
    options: [
      { text: "Par mes mots et mes idées", language: "words" },
      { text: "Par mes choix de vie", language: "quality-time" },
      { text: "Par mes possessions personnelles", language: "gifts" },
      { text: "Par mes actions et réalisations", language: "acts" },
      { text: "Par mon expression corporelle", language: "touch" }
    ]
  },
  {
    id: 165,
    question: "Qu'est-ce qui renforce votre sentiment d'accomplissement ?",
    options: [
      { text: "La reconnaissance verbale", language: "words" },
      { text: "Célébrer avec mes proches", language: "quality-time" },
      { text: "Des récompenses tangibles", language: "gifts" },
      { text: "L'impact concret de mes actions", language: "acts" },
      { text: "La satisfaction physique ressentie", language: "touch" }
    ]
  },
  {
    id: 166,
    question: "Comment aimez-vous cultiver vos relations ?",
    options: [
      { text: "Par une communication régulière", language: "words" },
      { text: "En passant du temps ensemble", language: "quality-time" },
      { text: "Par des attentions régulières", language: "gifts" },
      { text: "Par un soutien mutuel actif", language: "acts" },
      { text: "Par l'affection physique", language: "touch" }
    ]
  },
  {
    id: 167,
    question: "Qu'attendez-vous lors d'un moment d'apprentissage ?",
    options: [
      { text: "Des explications claires", language: "words" },
      { text: "Du temps pour comprendre", language: "quality-time" },
      { text: "Des supports pédagogiques", language: "gifts" },
      { text: "De la pratique concrète", language: "acts" },
      { text: "Une approche expérientielle", language: "touch" }
    ]
  },
  {
    id: 168,
    question: "Comment préférez-vous exprimer votre joie de vivre ?",
    options: [
      { text: "Par des mots enthousiastes", language: "words" },
      { text: "En profitant de chaque moment", language: "quality-time" },
      { text: "En me faisant plaisir", language: "gifts" },
      { text: "Par l'action et le mouvement", language: "acts" },
      { text: "Par l'expression corporelle", language: "touch" }
    ]
  },
  {
    id: 169,
    question: "Qu'est-ce qui vous fait sentir en harmonie ?",
    options: [
      { text: "Des échanges harmonieux", language: "words" },
      { text: "Des moments d'équilibre partagés", language: "quality-time" },
      { text: "Un environnement équilibré", language: "gifts" },
      { text: "Un équilibre entre donner et recevoir", language: "acts" },
      { text: "Un bien-être physique", language: "touch" }
    ]
  },
  {
    id: 170,
    question: "Comment aimez-vous partager vos passions ?",
    options: [
      { text: "En en parlant avec passion", language: "words" },
      { text: "En les vivant avec d'autres", language: "quality-time" },
      { text: "En offrant des objets liés", language: "gifts" },
      { text: "En impliquant les autres dans l'action", language: "acts" },
      { text: "Par l'expression émotionnelle", language: "touch" }
    ]
  },
  {
    id: 171,
    question: "Qu'attendez-vous lors d'un moment de réflexion partagée ?",
    options: [
      { text: "Des échanges intellectuels", language: "words" },
      { text: "Du temps pour réfléchir ensemble", language: "quality-time" },
      { text: "Des supports de réflexion", language: "gifts" },
      { text: "Des pistes d'action concrètes", language: "acts" },
      { text: "Une atmosphère propice", language: "touch" }
    ]
  },
  {
    id: 172,
    question: "Comment préférez-vous être accueilli(e) dans l'intimité ?",
    options: [
      { text: "Avec des mots tendres", language: "words" },
      { text: "Avec du temps privilégié", language: "quality-time" },
      { text: "Avec une attention particulière", language: "gifts" },
      { text: "Dans un cadre préparé avec soin", language: "acts" },
      { text: "Avec une grande proximité physique", language: "touch" }
    ]
  },
  {
    id: 173,
    question: "Qu'est-ce qui renforce votre sentiment de plénitude ?",
    options: [
      { text: "Des échanges profonds et significatifs", language: "words" },
      { text: "Des moments de qualité avec mes proches", language: "quality-time" },
      { text: "La satisfaction de mes besoins matériels", language: "gifts" },
      { text: "L'accomplissement de mes objectifs", language: "acts" },
      { text: "Le bien-être physique et émotionnel", language: "touch" }
    ]
  },
  {
    id: 174,
    question: "Comment aimez-vous exprimer votre authenticité ?",
    options: [
      { text: "Par des paroles sincères", language: "words" },
      { text: "En étant pleinement présent(e)", language: "quality-time" },
      { text: "Par mes choix personnels", language: "gifts" },
      { text: "Par mes actions cohérentes", language: "acts" },
      { text: "Par mon expression corporelle naturelle", language: "touch" }
    ]
  },
  {
    id: 175,
    question: "Qu'attendez-vous lors d'un moment de vulnérabilité partagée ?",
    options: [
      { text: "Des mots de compréhension", language: "words" },
      { text: "Une présence bienveillante", language: "quality-time" },
      { text: "Un geste de soutien symbolique", language: "gifts" },
      { text: "Une aide concrète", language: "acts" },
      { text: "Un réconfort physique", language: "touch" }
    ]
  },
  {
    id: 176,
    question: "Comment préférez-vous célébrer la beauté de la vie ?",
    options: [
      { text: "En l'exprimant par des mots", language: "words" },
      { text: "En savourant les moments présents", language: "quality-time" },
      { text: "En m'entourant de belles choses", language: "gifts" },
      { text: "En créant de la beauté", language: "acts" },
      { text: "Par des expériences sensorielles", language: "touch" }
    ]
  },
  {
    id: 177,
    question: "Qu'est-ce qui vous fait sentir ancré(e) ?",
    options: [
      { text: "Des affirmations rassurantes", language: "words" },
      { text: "Des routines partagées", language: "quality-time" },
      { text: "Des objets familiers", language: "gifts" },
      { text: "Des habitudes concrètes", language: "acts" },
      { text: "Un ancrage physique et sensoriel", language: "touch" }
    ]
  },
  {
    id: 178,
    question: "Comment aimez-vous partager votre sagesse ?",
    options: [
      { text: "Par des conseils verbaux", language: "words" },
      { text: "Par ma présence et mon écoute", language: "quality-time" },
      { text: "Par des symboles significatifs", language: "gifts" },
      { text: "Par l'exemple de mes actions", language: "acts" },
      { text: "Par une présence bienveillante", language: "touch" }
    ]
  },
  {
    id: 179,
    question: "Qu'attendez-vous lors d'un moment de transformation personnelle ?",
    options: [
      { text: "Des mots d'encouragement", language: "words" },
      { text: "Un accompagnement constant", language: "quality-time" },
      { text: "Des outils pour évoluer", language: "gifts" },
      { text: "Un soutien actif dans le changement", language: "acts" },
      { text: "Un soutien émotionnel physique", language: "touch" }
    ]
  },
  {
    id: 180,
    question: "Comment préférez-vous exprimer votre reconnaissance envers vos proches ?",
    options: [
      { text: "Par des mots de gratitude sincères", language: "words" },
      { text: "En leur consacrant du temps", language: "quality-time" },
      { text: "Par des cadeaux de remerciement", language: "gifts" },
      { text: "En les aidant en retour", language: "acts" },
      { text: "Par des gestes affectueux", language: "touch" }
    ]
  },
  {
    id: 181,
    question: "Qu'est-ce qui renforce votre sentiment de liberté ?",
    options: [
      { text: "Pouvoir exprimer mes opinions", language: "words" },
      { text: "Avoir du temps pour moi", language: "quality-time" },
      { text: "Disposer de mes propres ressources", language: "gifts" },
      { text: "Agir selon mes choix", language: "acts" },
      { text: "Respecter mon espace personnel", language: "touch" }
    ]
  },
  {
    id: 182,
    question: "Comment aimez-vous gérer les moments de doute ?",
    options: [
      { text: "En parlant de mes incertitudes", language: "words" },
      { text: "Avec la présence rassurante de mes proches", language: "quality-time" },
      { text: "En m'entourant d'objets réconfortants", language: "gifts" },
      { text: "En agissant malgré le doute", language: "acts" },
      { text: "En cherchant du réconfort physique", language: "touch" }
    ]
  },
  {
    id: 183,
    question: "Qu'attendez-vous lors d'un moment de complicité amoureuse ?",
    options: [
      { text: "Des mots doux et complices", language: "words" },
      { text: "Du temps intime rien qu'à deux", language: "quality-time" },
      { text: "Des petites attentions romantiques", language: "gifts" },
      { text: "Une collaboration naturelle", language: "acts" },
      { text: "Une grande proximité physique", language: "touch" }
    ]
  },
  {
    id: 184,
    question: "Comment préférez-vous exprimer votre besoin d'attention ?",
    options: [
      { text: "En le disant clairement", language: "words" },
      { text: "En cherchant de la compagnie", language: "quality-time" },
      { text: "Par des attentes de gestes", language: "gifts" },
      { text: "En demandant de l'aide", language: "acts" },
      { text: "En cherchant du contact", language: "touch" }
    ]
  },
  {
    id: 185,
    question: "Qu'est-ce qui vous fait sentir nourri(e) affectivement ?",
    options: [
      { text: "Des mots d'amour réguliers", language: "words" },
      { text: "Du temps de qualité constant", language: "quality-time" },
      { text: "Des attentions continues", language: "gifts" },
      { text: "Un soutien actif permanent", language: "acts" },
      { text: "Une affection physique régulière", language: "touch" }
    ]
  },
  {
    id: 186,
    question: "Comment aimez-vous partager vos découvertes ?",
    options: [
      { text: "En en parlant avec enthousiasme", language: "words" },
      { text: "En les vivant avec d'autres", language: "quality-time" },
      { text: "En offrant ce que j'ai découvert", language: "gifts" },
      { text: "En montrant par l'exemple", language: "acts" },
      { text: "Par l'expérience partagée", language: "touch" }
    ]
  },
  {
    id: 187,
    question: "Qu'attendez-vous lors d'un moment de guérison émotionnelle ?",
    options: [
      { text: "Des paroles apaisantes", language: "words" },
      { text: "Une présence patiente", language: "quality-time" },
      { text: "Des attentions réconfortantes", language: "gifts" },
      { text: "Une aide pour aller mieux", language: "acts" },
      { text: "Un réconfort physique doux", language: "touch" }
    ]
  },
  {
    id: 188,
    question: "Comment préférez-vous exprimer votre côté ludique ?",
    options: [
      { text: "Par l'humour et les jeux de mots", language: "words" },
      { text: "En jouant avec d'autres", language: "quality-time" },
      { text: "Par des objets amusants", language: "gifts" },
      { text: "Par des actions amusantes", language: "acts" },
      { text: "Par le jeu physique", language: "touch" }
    ]
  },
  {
    id: 189,
    question: "Qu'est-ce qui renforce votre sentiment d'équilibre émotionnel ?",
    options: [
      { text: "Des échanges équilibrés", language: "words" },
      { text: "Un équilibre entre temps seul et ensemble", language: "quality-time" },
      { text: "Un équilibre dans les échanges matériels", language: "gifts" },
      { text: "Un équilibre entre donner et recevoir de l'aide", language: "acts" },
      { text: "Un équilibre dans l'affection physique", language: "touch" }
    ]
  },
  {
    id: 190,
    question: "Comment aimez-vous gérer les moments de nostalgie ?",
    options: [
      { text: "En partageant mes souvenirs", language: "words" },
      { text: "En revisitant le passé avec d'autres", language: "quality-time" },
      { text: "En regardant des objets souvenirs", language: "gifts" },
      { text: "En recréant des expériences passées", language: "acts" },
      { text: "Par des sensations familières", language: "touch" }
    ]
  },
  {
    id: 191,
    question: "Qu'attendez-vous lors d'un moment de croissance personnelle ?",
    options: [
      { text: "Des retours constructifs", language: "words" },
      { text: "Un accompagnement dans la durée", language: "quality-time" },
      { text: "Des ressources pour grandir", language: "gifts" },
      { text: "Des défis à relever", language: "acts" },
      { text: "Un soutien émotionnel constant", language: "touch" }
    ]
  },
  {
    id: 192,
    question: "Comment préférez-vous exprimer votre besoin de connexion ?",
    options: [
      { text: "En initiant des conversations", language: "words" },
      { text: "En proposant de passer du temps ensemble", language: "quality-time" },
      { text: "En offrant quelque chose", language: "gifts" },
      { text: "En proposant mon aide", language: "acts" },
      { text: "En cherchant du contact", language: "touch" }
    ]
  },
  {
    id: 193,
    question: "Qu'est-ce qui vous fait sentir en phase avec vous-même ?",
    options: [
      { text: "Exprimer mes pensées librement", language: "words" },
      { text: "Avoir du temps pour moi", language: "quality-time" },
      { text: "Être entouré(e) de ce que j'aime", language: "gifts" },
      { text: "Agir selon mes valeurs", language: "acts" },
      { text: "Être à l'écoute de mon corps", language: "touch" }
    ]
  },
  {
    id: 194,
    question: "Comment aimez-vous partager vos moments de bonheur simple ?",
    options: [
      { text: "En les racontant", language: "words" },
      { text: "En les vivant avec d'autres", language: "quality-time" },
      { text: "En offrant ce qui me rend heureux(se)", language: "gifts" },
      { text: "En créant plus de bonheur", language: "acts" },
      { text: "En savourant pleinement", language: "touch" }
    ]
  },
  {
    id: 195,
    question: "Qu'attendez-vous lors d'un moment de sérénité ?",
    options: [
      { text: "Des mots apaisants ou du silence", language: "words" },
      { text: "Une présence calme et paisible", language: "quality-time" },
      { text: "Un environnement harmonieux", language: "gifts" },
      { text: "Aucune perturbation", language: "acts" },
      { text: "Un confort physique total", language: "touch" }
    ]
  },
  {
    id: 196,
    question: "Comment préférez-vous exprimer votre confiance en quelqu'un ?",
    options: [
      { text: "En lui confiant mes pensées intimes", language: "words" },
      { text: "En passant du temps vulnérable ensemble", language: "quality-time" },
      { text: "En partageant des objets précieux", language: "gifts" },
      { text: "En lui confiant des responsabilités", language: "acts" },
      { text: "En permettant une grande proximité", language: "touch" }
    ]
  },
  {
    id: 197,
    question: "Qu'est-ce qui renforce votre sentiment d'unité dans une relation ?",
    options: [
      { text: "Des conversations profondes et alignées", language: "words" },
      { text: "Du temps fusionnel ensemble", language: "quality-time" },
      { text: "Des symboles d'union", language: "gifts" },
      { text: "Des projets communs réalisés", language: "acts" },
      { text: "Une intimité physique forte", language: "touch" }
    ]
  },
  {
    id: 198,
    question: "Comment aimez-vous gérer les moments d'incertitude collective ?",
    options: [
      { text: "En communiquant ouvertement", language: "words" },
      { text: "En restant unis et présents", language: "quality-time" },
      { text: "En partageant les ressources", language: "gifts" },
      { text: "En agissant ensemble pour trouver des solutions", language: "acts" },
      { text: "En se soutenant mutuellement", language: "touch" }
    ]
  },
  {
    id: 199,
    question: "Qu'attendez-vous lors d'un moment d'intimité profonde ?",
    options: [
      { text: "Des confidences et secrets partagés", language: "words" },
      { text: "Du temps exclusif et ininterrompu", language: "quality-time" },
      { text: "Des cadeaux très personnels", language: "gifts" },
      { text: "Un investissement total l'un envers l'autre", language: "acts" },
      { text: "Une fusion physique et émotionnelle", language: "touch" }
    ]
  },
  {
    id: 200,
    question: "Comment préférez-vous exprimer l'amour inconditionnel ?",
    options: [
      { text: "Par des mots sans réserve", language: "words" },
      { text: "Par une présence inconditionnelle", language: "quality-time" },
      { text: "Par des dons désintéressés", language: "gifts" },
      { text: "Par un soutien sans faille", language: "acts" },
      { text: "Par une affection constante et totale", language: "touch" }
    ]
  },
  {
    id: 201,
    question: "Tu traverses une période stressante (examens, projet important, problème familial). Qu'est-ce qui t'aiderait le plus venant de tes proches ?",
    options: [
      { text: "Des encouragements quotidiens et des mots de soutien", language: "words" },
      { text: "Qu'ils prennent en charge tes autres responsabilités", language: "acts" },
      { text: "Des petites attentions pour te faire sourire", language: "gifts" },
      { text: "Leur présence silencieuse mais rassurante", language: "quality-time" },
      { text: "Des gestes réconfortants (massage, câlins)", language: "touch" }
    ]
  },
  {
    id: 202,
    question: "C'est ton anniversaire. Quelle situation te rendrait le plus heureux/heureuse ?",
    options: [
      { text: "Recevoir des messages personnalisés de chaque invité te disant ce que tu représentes pour eux", language: "words" },
      { text: "Une journée entière organisée avec tes proches sans aucune distraction", language: "quality-time" },
      { text: "Découvrir un cadeau que tu convoitais depuis longtemps", language: "gifts" },
      { text: "Que tout soit préparé sans que tu aies à lever le petit doigt", language: "acts" },
      { text: "Plein de câlins et d'embrassades de tes proches toute la journée", language: "touch" }
    ]
  },
  {
    id: 203,
    question: "Tu viens de vivre un échec professionnel (entretien raté, projet refusé). Comment ton/ta partenaire peut-il/elle t'aider ?",
    options: [
      { text: "Me rappeler mes qualités et mes réussites passées", language: "words" },
      { text: "Passer la soirée avec moi à m'écouter sans jugement", language: "quality-time" },
      { text: "M'offrir quelque chose qui me remonte le moral", language: "gifts" },
      { text: "S'occuper de toutes les tâches ménagères pour me laisser souffler", language: "acts" },
      { text: "Me prendre dans ses bras et me bercer", language: "touch" }
    ]
  },
  {
    id: 204,
    question: "Tu déménages dans un nouvel appartement. Quelle aide apprécierais-tu le plus ?",
    options: [
      { text: "Des encouragements constants et des compliments sur mes choix de décoration", language: "words" },
      { text: "Que quelqu'un reste avec moi tout le week-end pour m'aider", language: "quality-time" },
      { text: "Recevoir des cadeaux de pendaison de crémaillère", language: "gifts" },
      { text: "Que mes amis prennent en charge le déménagement et l'installation", language: "acts" },
      { text: "Des câlins de réconfort après les moments de stress", language: "touch" }
    ]
  },
  {
    id: 205,
    question: "Ton/ta partenaire rentre tard après une longue journée épuisante. Comment l'accueilles-tu ?",
    options: [
      { text: "Je lui dis combien je suis fier/fière de son travail acharné", language: "words" },
      { text: "Je m'assois avec lui/elle pour qu'on décompresse ensemble", language: "quality-time" },
      { text: "Je lui offre son dessert ou snack préféré que j'ai acheté", language: "gifts" },
      { text: "J'ai déjà préparé le dîner et rangé la maison", language: "acts" },
      { text: "Je l'accueille avec un long câlin et un massage des épaules", language: "touch" }
    ]
  },
  {
    id: 206,
    question: "Tu es malade et alité(e) depuis plusieurs jours. Qu'est-ce qui te réconforte le plus ?",
    options: [
      { text: "Des messages réguliers me demandant comment je vais et me souhaitant un prompt rétablissement", language: "words" },
      { text: "Que quelqu'un reste à mes côtés pour me tenir compagnie", language: "quality-time" },
      { text: "Recevoir des fleurs, un livre ou un petit cadeau pour passer le temps", language: "gifts" },
      { text: "Qu'on s'occupe de moi : préparer mes repas, aller à la pharmacie, faire le ménage", language: "acts" },
      { text: "Des câlins doux et des caresses sur le front", language: "touch" }
    ]
  },
  {
    id: 207,
    question: "Vous avez eu une dispute avec votre partenaire. Comment préfères-tu vous réconcilier ?",
    options: [
      { text: "Des excuses verbales sincères et une discussion honnête sur nos sentiments", language: "words" },
      { text: "Passer du temps ensemble à faire quelque chose qu'on aime tous les deux", language: "quality-time" },
      { text: "Recevoir un petit geste symbolique de paix (fleurs, chocolat)", language: "gifts" },
      { text: "Qu'il/elle fasse un effort concret pour corriger ce qui a causé la dispute", language: "acts" },
      { text: "Un câlin long et sincère qui brise la tension", language: "touch" }
    ]
  },
  {
    id: 208,
    question: "C'est les vacances. Quel type de séjour te ressemblerait le plus ?",
    options: [
      { text: "Un voyage où on prend le temps de discuter de tout et partager nos impressions", language: "words" },
      { text: "Des vacances où on passe chaque instant ensemble sans distraction", language: "quality-time" },
      { text: "Un séjour où on se fait plaisir avec des souvenirs et des petits achats", language: "gifts" },
      { text: "Un voyage tout compris où je n'ai rien à organiser ni préparer", language: "acts" },
      { text: "Des vacances romantiques avec beaucoup de moments intimes", language: "touch" }
    ]
  },
  {
    id: 209,
    question: "Tu commences un nouveau travail et tu es nerveux/nerveuse. Comment ton entourage peut-il te rassurer ?",
    options: [
      { text: "Me dire que je vais y arriver et me rappeler mes compétences", language: "words" },
      { text: "Prendre le temps de m'écouter parler de mes craintes", language: "quality-time" },
      { text: "M'offrir un petit cadeau porte-bonheur pour mon premier jour", language: "gifts" },
      { text: "M'aider à préparer mes affaires et planifier mon trajet", language: "acts" },
      { text: "Me serrer dans leurs bras pour me donner du courage", language: "touch" }
    ]
  },
  {
    id: 210,
    question: "Ton/ta partenaire part en voyage professionnel pour une semaine. Qu'est-ce qui te manquera le plus ?",
    options: [
      { text: "Nos conversations quotidiennes et nos échanges de messages", language: "words" },
      { text: "Les moments qu'on passe ensemble chaque soir", language: "quality-time" },
      { text: "Les petites attentions et surprises du quotidien", language: "gifts" },
      { text: "Toute l'aide qu'il/elle m'apporte dans les tâches quotidiennes", language: "acts" },
      { text: "Les câlins du matin et du soir", language: "touch" }
    ]
  },
  {
    id: 211,
    question: "Tu organises une soirée importante (dîner, fête). Comment voudrais-tu que ton/ta partenaire participe ?",
    options: [
      { text: "Qu'il/elle me félicite et valorise mes efforts devant les invités", language: "words" },
      { text: "Qu'il/elle soit présent(e) à mes côtés toute la soirée", language: "quality-time" },
      { text: "Qu'il/elle m'offre des fleurs ou un cadeau pour l'occasion", language: "gifts" },
      { text: "Qu'il/elle prenne en charge une partie de l'organisation (cuisine, rangement)", language: "acts" },
      { text: "Qu'il/elle me fasse des petits gestes tendres tout au long de la soirée", language: "touch" }
    ]
  },
  {
    id: 212,
    question: "Tu as réussi un défi personnel (sport, régime, projet créatif). Comment aimes-tu célébrer ?",
    options: [
      { text: "Recevoir des félicitations enthousiastes de mes proches", language: "words" },
      { text: "Organiser un moment festif avec mes amis/famille", language: "quality-time" },
      { text: "M'offrir une récompense matérielle que je me suis promise", language: "gifts" },
      { text: "Que quelqu'un prenne en charge mes corvées pour que je puisse me reposer", language: "acts" },
      { text: "Recevoir plein de câlins de fierté", language: "touch" }
    ]
  },
  {
    id: 213,
    question: "C'est un dimanche pluvieux et tu restes à la maison. Quelle activité de couple te plaît le plus ?",
    options: [
      { text: "Discuter pendant des heures de nos rêves et de la vie", language: "words" },
      { text: "Regarder une série ou jouer à un jeu ensemble", language: "quality-time" },
      { text: "S'offrir mutuellement de petits cadeaux surprises", language: "gifts" },
      { text: "Faire le ménage ou bricoler ensemble pour la maison", language: "acts" },
      { text: "Rester au lit à se câliner toute la matinée", language: "touch" }
    ]
  },
  {
    id: 214,
    question: "Tu dois présenter un projet important devant un public. Comment ton/ta partenaire peut-il/elle te soutenir ?",
    options: [
      { text: "Me dire et répéter que je vais être brillant(e)", language: "words" },
      { text: "Être présent(e) dans le public pour me soutenir du regard", language: "quality-time" },
      { text: "M'offrir un petit porte-bonheur ou un talisman", language: "gifts" },
      { text: "M'aider à préparer ma présentation et répéter avec moi", language: "acts" },
      { text: "Me faire un câlin réconfortant juste avant de monter sur scène", language: "touch" }
    ]
  },
  {
    id: 215,
    question: "Ton/ta meilleur(e) ami(e) traverse une rupture difficile. Comment le/la soutiens-tu ?",
    options: [
      { text: "Je lui envoie des messages réguliers pour lui dire qu'il/elle va s'en sortir", language: "words" },
      { text: "Je passe du temps avec lui/elle pour qu'il/elle ne soit pas seul(e)", language: "quality-time" },
      { text: "Je lui offre un petit cadeau pour lui remonter le moral", language: "gifts" },
      { text: "Je l'aide concrètement (faire ses courses, ménage, démarches)", language: "acts" },
      { text: "Je lui fais des câlins réconfortants", language: "touch" }
    ]
  },
  {
    id: 216,
    question: "Tu reviens de vacances et tu retrouves ton/ta partenaire. Quelle est ta priorité ?",
    options: [
      { text: "Lui raconter tout mon voyage et entendre comment s'est passée son absence", language: "words" },
      { text: "Passer toute la soirée ensemble à rattraper le temps perdu", language: "quality-time" },
      { text: "Lui offrir le souvenir que j'ai ramené pour lui/elle", language: "gifts" },
      { text: "Ranger mes affaires ensemble et reprendre nos habitudes", language: "acts" },
      { text: "Le/la prendre dans mes bras et ne plus le/la lâcher", language: "touch" }
    ]
  },
  {
    id: 217,
    question: "Vous emménagez ensemble pour la première fois. Qu'est-ce qui te rendrait le plus heureux/heureuse ?",
    options: [
      { text: "Qu'on se dise régulièrement à quel point c'est une étape importante pour nous", language: "words" },
      { text: "Prendre le temps de tout faire ensemble, même les petites choses", language: "quality-time" },
      { text: "Recevoir des cadeaux de pendaison de crémaillère de mes proches", language: "gifts" },
      { text: "Que mon/ma partenaire prenne en charge une grande partie du déménagement", language: "acts" },
      { text: "Inaugurer chaque pièce avec des câlins et des moments intimes", language: "touch" }
    ]
  },
  {
    id: 218,
    question: "Tu dois prendre une décision importante et difficile. Comment ton entourage peut-il t'aider ?",
    options: [
      { text: "Me dire qu'ils ont confiance en mon jugement et mes capacités", language: "words" },
      { text: "Prendre le temps de m'écouter peser le pour et le contre", language: "quality-time" },
      { text: "M'offrir quelque chose qui m'aide à me détendre (livre, spa)", language: "gifts" },
      { text: "M'aider concrètement à réunir les informations pour décider", language: "acts" },
      { text: "Me rassurer par des gestes tendres et apaisants", language: "touch" }
    ]
  },
  {
    id: 219,
    question: "C'est la Saint-Valentin. Quelle soirée serait idéale pour toi ?",
    options: [
      { text: "Une soirée où on se dit tout ce qu'on aime l'un chez l'autre", language: "words" },
      { text: "Un dîner romantique en tête-à-tête sans téléphones ni distractions", language: "quality-time" },
      { text: "Recevoir un cadeau qui montre que mon/ma partenaire me connaît vraiment", language: "gifts" },
      { text: "Que tout soit parfaitement organisé sans que j'aie à m'en soucier", language: "acts" },
      { text: "Une soirée romantique avec beaucoup de moments intimes", language: "touch" }
    ]
  },
  {
    id: 220,
    question: "Tu rentres chez toi après la pire journée de travail de ta vie. Qu'espères-tu trouver ?",
    options: [
      { text: "Mon/ma partenaire qui me dit que demain sera meilleur et que je suis formidable", language: "words" },
      { text: "Quelqu'un prêt à m'écouter raconter ma journée aussi longtemps que nécessaire", language: "quality-time" },
      { text: "Une petite surprise (mon dessert préféré, des fleurs) pour me faire sourire", language: "gifts" },
      { text: "Le dîner prêt, la maison rangée, pour que je puisse juste me détendre", language: "acts" },
      { text: "Des bras ouverts pour un long câlin sans avoir besoin de parler", language: "touch" }
    ]
  }
];
