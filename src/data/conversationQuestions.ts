export interface ConversationQuestion {
  id: number;
  question: string;
  theme: string;
  depth: 'light' | 'medium' | 'deep';
}

export const conversationQuestions: ConversationQuestion[] = [
  // Enfance - Light
  { id: 1, question: "Quel était ton plat préféré quand tu étais enfant ?", theme: "enfance", depth: "light" },
  { id: 2, question: "Quelle était ta matière préférée à l'école ?", theme: "enfance", depth: "light" },
  { id: 3, question: "Quel était ton dessin animé ou émission préféré ?", theme: "enfance", depth: "light" },
  { id: 4, question: "Quel était ton jouet préféré ?", theme: "enfance", depth: "light" },
  
  // Enfance - Medium
  { id: 5, question: "Quel souvenir d'enfance te fait encore sourire aujourd'hui ?", theme: "enfance", depth: "medium" },
  { id: 6, question: "Quelle était ta plus grande peur quand tu étais enfant ?", theme: "enfance", depth: "medium" },
  { id: 7, question: "Quel moment de ton enfance aimerais-tu revivre ?", theme: "enfance", depth: "medium" },
  
  // Enfance - Deep
  { id: 8, question: "Quelle leçon importante as-tu apprise dans ton enfance ?", theme: "enfance", depth: "deep" },
  { id: 9, question: "Comment ton enfance a-t-elle façonné la personne que tu es aujourd'hui ?", theme: "enfance", depth: "deep" },
  
  // Valeurs - Light
  { id: 10, question: "Qu'est-ce qui est le plus important pour toi dans la vie ?", theme: "valeurs", depth: "light" },
  { id: 11, question: "Quelle qualité admires-tu le plus chez les autres ?", theme: "valeurs", depth: "light" },
  { id: 12, question: "Quel est ton plus grand accomplissement ?", theme: "valeurs", depth: "light" },
  
  // Valeurs - Medium
  { id: 13, question: "Quelle cause te tient particulièrement à cœur ?", theme: "valeurs", depth: "medium" },
  { id: 14, question: "Qu'est-ce qui définit une vie réussie pour toi ?", theme: "valeurs", depth: "medium" },
  { id: 15, question: "Quelle valeur ne compromettras-tu jamais ?", theme: "valeurs", depth: "medium" },
  
  // Valeurs - Deep
  { id: 16, question: "Quel héritage aimerais-tu laisser derrière toi ?", theme: "valeurs", depth: "deep" },
  { id: 17, question: "Qu'est-ce qui donne vraiment du sens à ta vie ?", theme: "valeurs", depth: "deep" },
  { id: 18, question: "Comment tes valeurs ont-elles évolué avec le temps ?", theme: "valeurs", depth: "deep" },
  
  // Relations - Light
  { id: 19, question: "Qu'est-ce qui te fait rire aux éclats ?", theme: "relations", depth: "light" },
  { id: 20, question: "Quel est ton type de sortie préféré ?", theme: "relations", depth: "light" },
  { id: 21, question: "Qu'apprécies-tu le plus chez tes amis ?", theme: "relations", depth: "light" },
  
  // Relations - Medium
  { id: 22, question: "Comment préfères-tu recevoir de l'amour et de l'affection ?", theme: "relations", depth: "medium" },
  { id: 23, question: "Qu'est-ce qui te fait te sentir vraiment compris(e) ?", theme: "relations", depth: "medium" },
  { id: 24, question: "Quelle est la plus belle chose que quelqu'un ait fait pour toi ?", theme: "relations", depth: "medium" },
  { id: 25, question: "Comment gères-tu les conflits dans tes relations ?", theme: "relations", depth: "medium" },
  
  // Relations - Deep
  { id: 26, question: "Qu'est-ce qui te rend vulnérable dans une relation ?", theme: "relations", depth: "deep" },
  { id: 27, question: "Quelle est ta plus grande peur dans une relation proche ?", theme: "relations", depth: "deep" },
  { id: 28, question: "Comment sais-tu que tu peux faire confiance à quelqu'un ?", theme: "relations", depth: "deep" },
  
  // Rêves - Light
  { id: 29, question: "Où rêves-tu de voyager ?", theme: "reves", depth: "light" },
  { id: 30, question: "Si tu pouvais apprendre n'importe quelle compétence instantanément, laquelle choisirais-tu ?", theme: "reves", depth: "light" },
  { id: 31, question: "Quel est ton rêve professionnel ?", theme: "reves", depth: "light" },
  
  // Rêves - Medium
  { id: 32, question: "Si l'argent n'était pas un problème, que ferais-tu de ta vie ?", theme: "reves", depth: "medium" },
  { id: 33, question: "Quel projet aimerais-tu réaliser dans les 5 prochaines années ?", theme: "reves", depth: "medium" },
  { id: 34, question: "Quelle version de toi-même aspires-tu à devenir ?", theme: "reves", depth: "medium" },
  
  // Rêves - Deep
  { id: 35, question: "Qu'est-ce qui t'empêche de poursuivre tes rêves ?", theme: "reves", depth: "deep" },
  { id: 36, question: "Si tu pouvais changer une chose dans ta vie, qu'est-ce que ce serait ?", theme: "reves", depth: "deep" },
  { id: 37, question: "Quel rêve as-tu abandonné et pourquoi ?", theme: "reves", depth: "deep" },
  
  // Émotions - Light
  { id: 38, question: "Qu'est-ce qui te met de bonne humeur instantanément ?", theme: "emotions", depth: "light" },
  { id: 39, question: "Qu'est-ce qui te détend après une journée stressante ?", theme: "emotions", depth: "light" },
  { id: 40, question: "Quelle activité te rend le plus heureux/heureuse ?", theme: "emotions", depth: "light" },
  
  // Émotions - Medium
  { id: 41, question: "Comment exprimes-tu tes émotions généralement ?", theme: "emotions", depth: "medium" },
  { id: 42, question: "Qu'est-ce qui te rend triste ou mélancolique ?", theme: "emotions", depth: "medium" },
  { id: 43, question: "Comment préfères-tu être réconforté(e) ?", theme: "emotions", depth: "medium" },
  
  // Émotions - Deep
  { id: 44, question: "Quelle émotion as-tu le plus de mal à exprimer ?", theme: "emotions", depth: "deep" },
  { id: 45, question: "De quoi as-tu le plus peur dans la vie ?", theme: "emotions", depth: "deep" },
  { id: 46, question: "Qu'est-ce qui te fait te sentir vraiment vivant(e) ?", theme: "emotions", depth: "deep" },
  
  // Vie quotidienne - Light
  { id: 47, question: "Es-tu plutôt du matin ou du soir ?", theme: "quotidien", depth: "light" },
  { id: 48, question: "Quelle est ta routine matinale idéale ?", theme: "quotidien", depth: "light" },
  { id: 49, question: "Quel est ton endroit préféré pour te détendre ?", theme: "quotidien", depth: "light" },
  
  // Vie quotidienne - Medium
  { id: 50, question: "Qu'est-ce qui rend une journée parfaite pour toi ?", theme: "quotidien", depth: "medium" },
  { id: 51, question: "Comment trouves-tu l'équilibre entre travail et vie personnelle ?", theme: "quotidien", depth: "medium" },
  { id: 52, question: "Quel rituel quotidien est sacré pour toi ?", theme: "quotidien", depth: "medium" },
  
  // Vie quotidienne - Deep
  { id: 53, question: "Es-tu satisfait(e) de la vie que tu mènes actuellement ?", theme: "quotidien", depth: "deep" },
  { id: 54, question: "Qu'est-ce qui manque dans ta vie quotidienne ?", theme: "quotidien", depth: "deep" },
  
  // Enfance - Light (suite)
  { id: 55, question: "Quel était ton animal de compagnie préféré ou rêvé ?", theme: "enfance", depth: "light" },
  { id: 56, question: "Quelle était ta cachette secrète préférée ?", theme: "enfance", depth: "light" },
  { id: 57, question: "Quel jeu jouais-tu le plus souvent avec tes amis ?", theme: "enfance", depth: "light" },
  { id: 58, question: "Quelle était ta saison préférée enfant et pourquoi ?", theme: "enfance", depth: "light" },
  { id: 59, question: "Quel super-héros ou personnage voulais-tu être ?", theme: "enfance", depth: "light" },
  { id: 60, question: "Quelle était ta chanson ou musique préférée ?", theme: "enfance", depth: "light" },
  { id: 61, question: "Quel était ton livre ou histoire préférée ?", theme: "enfance", depth: "light" },
  { id: 62, question: "Quelle était ta friandise ou bonbon préféré ?", theme: "enfance", depth: "light" },
  { id: 63, question: "Quel sport ou activité pratiquais-tu ?", theme: "enfance", depth: "light" },
  { id: 64, question: "Où passais-tu tes vacances d'été ?", theme: "enfance", depth: "light" },
  
  // Enfance - Medium (suite)
  { id: 65, question: "Quel adulte a eu le plus d'influence sur ton enfance ?", theme: "enfance", depth: "medium" },
  { id: 66, question: "Quel était ton rituel familial préféré ?", theme: "enfance", depth: "medium" },
  { id: 67, question: "Quelle bêtise d'enfance te fait encore rire ?", theme: "enfance", depth: "medium" },
  { id: 68, question: "Quelle était ta plus grande fierté enfant ?", theme: "enfance", depth: "medium" },
  { id: 69, question: "Quel moment avec tes frères/sœurs ou amis te marque encore ?", theme: "enfance", depth: "medium" },
  { id: 70, question: "Quelle tradition familiale te manque le plus ?", theme: "enfance", depth: "medium" },
  { id: 71, question: "Quel conseil aurais-tu aimé recevoir enfant ?", theme: "enfance", depth: "medium" },
  { id: 72, question: "Quelle était ta plus grande source de joie ?", theme: "enfance", depth: "medium" },
  
  // Enfance - Deep (suite)
  { id: 73, question: "Quel événement d'enfance t'a le plus marqué(e) ?", theme: "enfance", depth: "deep" },
  { id: 74, question: "Qu'aurais-tu voulu dire à ton toi enfant ?", theme: "enfance", depth: "deep" },
  { id: 75, question: "Quelle blessure d'enfance as-tu dû guérir en grandissant ?", theme: "enfance", depth: "deep" },
  { id: 76, question: "Comment ta relation avec tes parents a-t-elle évolué ?", theme: "enfance", depth: "deep" },
  
  // Valeurs - Light (suite)
  { id: 77, question: "Quel trait de caractère apprécies-tu le plus chez toi ?", theme: "valeurs", depth: "light" },
  { id: 78, question: "Quelle est ta citation ou devise préférée ?", theme: "valeurs", depth: "light" },
  { id: 79, question: "Qu'est-ce qui te rend fier(e) de toi ?", theme: "valeurs", depth: "light" },
  { id: 80, question: "Quelle vertu essaies-tu de cultiver ?", theme: "valeurs", depth: "light" },
  { id: 81, question: "Quel acte de gentillesse t'a marqué(e) ?", theme: "valeurs", depth: "light" },
  { id: 82, question: "Qu'est-ce qui définit une bonne personne pour toi ?", theme: "valeurs", depth: "light" },
  { id: 83, question: "Quelle est la chose la plus importante dans une amitié ?", theme: "valeurs", depth: "light" },
  { id: 84, question: "Quel compliment te touche le plus ?", theme: "valeurs", depth: "light" },
  { id: 85, question: "Quelle injustice te révolte le plus ?", theme: "valeurs", depth: "light" },
  { id: 86, question: "Qu'est-ce qui te donne de l'espoir ?", theme: "valeurs", depth: "light" },
  
  // Valeurs - Medium (suite)
  { id: 87, question: "Comment définis-tu le bonheur ?", theme: "valeurs", depth: "medium" },
  { id: 88, question: "Quelle erreur t'a appris la plus grande leçon ?", theme: "valeurs", depth: "medium" },
  { id: 89, question: "Qu'es-tu prêt(e) à sacrifier pour tes valeurs ?", theme: "valeurs", depth: "medium" },
  { id: 90, question: "Comment mesures-tu le succès dans ta vie ?", theme: "valeurs", depth: "medium" },
  { id: 91, question: "Quelle responsabilité prends-tu très au sérieux ?", theme: "valeurs", depth: "medium" },
  { id: 92, question: "Quel principe guide tes décisions importantes ?", theme: "valeurs", depth: "medium" },
  { id: 93, question: "Comment contribues-tu au monde qui t'entoure ?", theme: "valeurs", depth: "medium" },
  { id: 94, question: "Quelle est ta définition de l'intégrité ?", theme: "valeurs", depth: "medium" },
  
  // Valeurs - Deep (suite)
  { id: 95, question: "Quelle est ta plus grande conviction ?", theme: "valeurs", depth: "deep" },
  { id: 96, question: "Comment as-tu découvert ce qui compte vraiment pour toi ?", theme: "valeurs", depth: "deep" },
  { id: 97, question: "Quel dilemme moral t'a le plus questionné(e) ?", theme: "valeurs", depth: "deep" },
  { id: 98, question: "Comment veux-tu être rappelé(e) après ta mort ?", theme: "valeurs", depth: "deep" },
  
  // Relations - Light (suite)
  { id: 99, question: "Quel est ton langage d'amour principal ?", theme: "relations", depth: "light" },
  { id: 100, question: "Comment aimes-tu célébrer les gens que tu aimes ?", theme: "relations", depth: "light" },
  { id: 101, question: "Quel type de personne t'attire naturellement ?", theme: "relations", depth: "light" },
  { id: 102, question: "Quelle activité aimes-tu faire avec tes proches ?", theme: "relations", depth: "light" },
  { id: 103, question: "Comment te décrivent tes meilleurs amis ?", theme: "relations", depth: "light" },
  { id: 104, question: "Quel est ton souvenir préféré avec un ami ?", theme: "relations", depth: "light" },
  { id: 105, question: "Qu'est-ce qui te fait te sentir proche de quelqu'un ?", theme: "relations", depth: "light" },
  { id: 106, question: "Quel cadeau t'a le plus touché(e) ?", theme: "relations", depth: "light" },
  { id: 107, question: "Comment montres-tu ton affection ?", theme: "relations", depth: "light" },
  { id: 108, question: "Quelle qualité recherches-tu chez un partenaire ?", theme: "relations", depth: "light" },
  
  // Relations - Medium (suite)
  { id: 109, question: "Qu'est-ce qui crée de l'intimité pour toi ?", theme: "relations", depth: "medium" },
  { id: 110, question: "Comment sais-tu que tu es vraiment aimé(e) ?", theme: "relations", depth: "medium" },
  { id: 111, question: "Quel comportement ne peux-tu pas tolérer dans une relation ?", theme: "relations", depth: "medium" },
  { id: 112, question: "Comment rétablis-tu la connexion après une dispute ?", theme: "relations", depth: "medium" },
  { id: 113, question: "Quelle leçon as-tu apprise de tes relations passées ?", theme: "relations", depth: "medium" },
  { id: 114, question: "Comment exprimes-tu tes besoins dans une relation ?", theme: "relations", depth: "medium" },
  { id: 115, question: "Qu'est-ce qui te fait te sentir en sécurité avec quelqu'un ?", theme: "relations", depth: "medium" },
  { id: 116, question: "Comment équilibres-tu indépendance et proximité ?", theme: "relations", depth: "medium" },
  
  // Relations - Deep (suite)
  { id: 117, question: "Quelle partie de toi as-tu le plus de mal à montrer ?", theme: "relations", depth: "deep" },
  { id: 118, question: "Comment as-tu été blessé(e) dans le passé et comment cela t'affecte ?", theme: "relations", depth: "deep" },
  { id: 119, question: "Qu'es-tu prêt(e) à donner pour une relation qui compte ?", theme: "relations", depth: "deep" },
  { id: 120, question: "Quelle est ta plus grande insécurité relationnelle ?", theme: "relations", depth: "deep" },
  
  // Rêves - Light (suite)
  { id: 121, question: "Quelle destination est sur ta bucket list ?", theme: "reves", depth: "light" },
  { id: 122, question: "Quel métier aurais-tu aimé faire dans une autre vie ?", theme: "reves", depth: "light" },
  { id: 123, question: "Quelle célébrité aimerais-tu rencontrer ?", theme: "reves", depth: "light" },
  { id: 124, question: "Quel super-pouvoir choisirais-tu ?", theme: "reves", depth: "light" },
  { id: 125, question: "Dans quelle époque aimerais-tu vivre ?", theme: "reves", depth: "light" },
  { id: 126, question: "Quelle langue aimerais-tu parler couramment ?", theme: "reves", depth: "light" },
  { id: 127, question: "Quel instrument aimerais-tu maîtriser ?", theme: "reves", depth: "light" },
  { id: 128, question: "Quelle maison de rêve voudrais-tu habiter ?", theme: "reves", depth: "light" },
  { id: 129, question: "Quel animal exotique aimerais-tu voir dans son habitat ?", theme: "reves", depth: "light" },
  { id: 130, question: "Quelle expérience extrême aimerais-tu vivre ?", theme: "reves", depth: "light" },
  
  // Rêves - Medium (suite)
  { id: 131, question: "À quoi ressemblerait ta vie idéale dans 10 ans ?", theme: "reves", depth: "medium" },
  { id: 132, question: "Quel impact veux-tu avoir sur le monde ?", theme: "reves", depth: "medium" },
  { id: 133, question: "Quel défi aimerais-tu relever avant de mourir ?", theme: "reves", depth: "medium" },
  { id: 134, question: "Quelle passion aimerais-tu transformer en carrière ?", theme: "reves", depth: "medium" },
  { id: 135, question: "Quel type de vie de famille rêves-tu d'avoir ?", theme: "reves", depth: "medium" },
  { id: 136, question: "Quelle version améliorée de toi travailles-tu à créer ?", theme: "reves", depth: "medium" },
  { id: 137, question: "Quel objectif te semble actuellement hors de portée ?", theme: "reves", depth: "medium" },
  { id: 138, question: "Comment définirais-tu une vie sans regrets ?", theme: "reves", depth: "medium" },
  
  // Rêves - Deep (suite)
  { id: 139, question: "Quel rêve secret n'oses-tu partager avec personne ?", theme: "reves", depth: "deep" },
  { id: 140, question: "Qu'est-ce qui te retient vraiment de vivre ta meilleure vie ?", theme: "reves", depth: "deep" },
  { id: 141, question: "Si tu savais que tu ne peux pas échouer, que ferais-tu ?", theme: "reves", depth: "deep" },
  { id: 142, question: "Quel rêve as-tu renoncé à cause de la peur ?", theme: "reves", depth: "deep" },
  
  // Émotions - Light (suite)
  { id: 143, question: "Quelle musique écoutes-tu selon ton humeur ?", theme: "emotions", depth: "light" },
  { id: 144, question: "Qu'est-ce qui te fait pleurer de rire ?", theme: "emotions", depth: "light" },
  { id: 145, question: "Quel film ou livre te fait pleurer à chaque fois ?", theme: "emotions", depth: "light" },
  { id: 146, question: "Qu'est-ce qui te donne de l'énergie positive ?", theme: "emotions", depth: "light" },
  { id: 147, question: "Comment célèbres-tu quand tu es heureux/heureuse ?", theme: "emotions", depth: "light" },
  { id: 148, question: "Quelle odeur ou saveur te ramène à un bon souvenir ?", theme: "emotions", depth: "light" },
  { id: 149, question: "Quel compliment te fait vraiment plaisir ?", theme: "emotions", depth: "light" },
  { id: 150, question: "Qu'est-ce qui te fait sentir en paix ?", theme: "emotions", depth: "light" },
  { id: 151, question: "Quelle activité te fait oublier le temps qui passe ?", theme: "emotions", depth: "light" },
  { id: 152, question: "Qu'est-ce qui te rend nostalgique ?", theme: "emotions", depth: "light" },
  
  // Émotions - Medium (suite)
  { id: 153, question: "Comment gères-tu la colère ou la frustration ?", theme: "emotions", depth: "medium" },
  { id: 154, question: "Qu'est-ce qui te stresse le plus dans la vie ?", theme: "emotions", depth: "medium" },
  { id: 155, question: "Comment sais-tu que tu es vraiment heureux/heureuse ?", theme: "emotions", depth: "medium" },
  { id: 156, question: "Quelle situation te met le plus mal à l'aise ?", theme: "emotions", depth: "medium" },
  { id: 157, question: "Comment traites-tu tes émotions difficiles ?", theme: "emotions", depth: "medium" },
  { id: 158, question: "Qu'est-ce qui déclenche ton anxiété ?", theme: "emotions", depth: "medium" },
  { id: 159, question: "Comment reconnectes-tu avec toi-même ?", theme: "emotions", depth: "medium" },
  { id: 160, question: "Quelle émotion ressens-tu le plus souvent ?", theme: "emotions", depth: "medium" },
  
  // Émotions - Deep (suite)
  { id: 161, question: "Quelle douleur émotionnelle portes-tu encore ?", theme: "emotions", depth: "deep" },
  { id: 162, question: "Qu'est-ce qui te fait te sentir le plus seul(e) ?", theme: "emotions", depth: "deep" },
  { id: 163, question: "Comment as-tu appris à te pardonner ?", theme: "emotions", depth: "deep" },
  { id: 164, question: "Quelle partie de toi essaies-tu de guérir ?", theme: "emotions", depth: "deep" },
  
  // Quotidien - Light (suite)
  { id: 165, question: "Quel est ton café ou thé préféré ?", theme: "quotidien", depth: "light" },
  { id: 166, question: "Quelle est ta série ou émission actuelle préférée ?", theme: "quotidien", depth: "light" },
  { id: 167, question: "Quel genre de musique écoutes-tu le plus ?", theme: "quotidien", depth: "light" },
  { id: 168, question: "Quel est ton passe-temps favori le week-end ?", theme: "quotidien", depth: "light" },
  { id: 169, question: "Quelle application utilises-tu le plus ?", theme: "quotidien", depth: "light" },
  { id: 170, question: "Quel type de cuisine préfères-tu manger ?", theme: "quotidien", depth: "light" },
  { id: 171, question: "Préfères-tu la ville ou la nature ?", theme: "quotidien", depth: "light" },
  { id: 172, question: "Quel est ton type de vacances idéal ?", theme: "quotidien", depth: "light" },
  { id: 173, question: "Comment aimes-tu te détendre après le travail ?", theme: "quotidien", depth: "light" },
  { id: 174, question: "Quel est ton vêtement le plus confortable ?", theme: "quotidien", depth: "light" },
  
  // Quotidien - Medium (suite)
  { id: 175, question: "Quelle habitude aimerais-tu développer ?", theme: "quotidien", depth: "medium" },
  { id: 176, question: "Comment prends-tu soin de ta santé mentale ?", theme: "quotidien", depth: "medium" },
  { id: 177, question: "Quelle partie de ta routine te ressource le plus ?", theme: "quotidien", depth: "medium" },
  { id: 178, question: "Comment gères-tu ton stress quotidien ?", theme: "quotidien", depth: "medium" },
  { id: 179, question: "Qu'est-ce qui rend ta maison vraiment chez toi ?", theme: "quotidien", depth: "medium" },
  { id: 180, question: "Comment maintiens-tu ta productivité ?", theme: "quotidien", depth: "medium" },
  { id: 181, question: "Quelle petite chose améliore toujours ta journée ?", theme: "quotidien", depth: "medium" },
  { id: 182, question: "Comment te ressources-tu quand tu es épuisé(e) ?", theme: "quotidien", depth: "medium" },
  
  // Quotidien - Deep (suite)
  { id: 183, question: "Quelle partie de ta routine voudrais-tu changer radicalement ?", theme: "quotidien", depth: "deep" },
  { id: 184, question: "Te sens-tu aligné(e) avec la vie que tu vis ?", theme: "quotidien", depth: "deep" },
  { id: 185, question: "Qu'est-ce qui te donne l'impression de survivre plutôt que de vivre ?", theme: "quotidien", depth: "deep" },
  { id: 186, question: "Comment voudrais-tu que ton quotidien soit différent ?", theme: "quotidien", depth: "deep" },
  
  // Questions mixtes pour arriver à 200
  { id: 187, question: "Quelle est la meilleure décision que tu aies jamais prise ?", theme: "valeurs", depth: "medium" },
  { id: 188, question: "Si tu pouvais dîner avec 3 personnes (vivantes ou mortes), qui choisirais-tu ?", theme: "reves", depth: "light" },
  { id: 189, question: "Quel conseil donnerais-tu à quelqu'un qui traverse une période difficile ?", theme: "emotions", depth: "medium" },
  { id: 190, question: "Quelle chanson représente ta vie actuellement ?", theme: "emotions", depth: "light" },
  { id: 191, question: "Quel moment de ta vie aimerais-tu revivre exactement comme il était ?", theme: "enfance", depth: "deep" },
  { id: 192, question: "Comment définis-tu l'amour véritable ?", theme: "relations", depth: "deep" },
  { id: 193, question: "Quel est ton plus grand talent caché ?", theme: "valeurs", depth: "light" },
  { id: 194, question: "Si tu écrivais un livre sur ta vie, quel en serait le titre ?", theme: "reves", depth: "medium" },
  { id: 195, question: "Quelle tradition voudrais-tu créer dans ta propre famille ?", theme: "relations", depth: "medium" },
  { id: 196, question: "Qu'est-ce qui te fait te sentir le plus toi-même ?", theme: "emotions", depth: "deep" },
  { id: 197, question: "Quel moment de ta journée préfères-tu et pourquoi ?", theme: "quotidien", depth: "light" },
  { id: 198, question: "Comment veux-tu grandir en tant que personne ?", theme: "valeurs", depth: "deep" },
  { id: 199, question: "Quelle est la chose la plus spontanée que tu aies jamais faite ?", theme: "reves", depth: "light" },
  { id: 200, question: "Si tu pouvais laisser un message au monde entier, que dirais-tu ?", theme: "valeurs", depth: "deep" }
];

export const themes = [
  { id: 'all', label: 'Tous les thèmes', icon: '🌟' },
  { id: 'enfance', label: 'Enfance', icon: '🧸' },
  { id: 'valeurs', label: 'Valeurs', icon: '💎' },
  { id: 'relations', label: 'Relations', icon: '💞' },
  { id: 'reves', label: 'Rêves', icon: '✨' },
  { id: 'emotions', label: 'Émotions', icon: '💭' },
  { id: 'quotidien', label: 'Quotidien', icon: '☀️' }
];

export const depths = [
  { id: 'all', label: 'Tous niveaux', color: 'bg-purple-500' },
  { id: 'light', label: 'Léger', color: 'bg-blue-400' },
  { id: 'medium', label: 'Moyen', color: 'bg-purple-400' },
  { id: 'deep', label: 'Profond', color: 'bg-pink-500' }
];
