// Suite des scènes
//Je sais pas si c'est utile de faire une constante pour ça, mais ça me permet de visualiser facilement le flow du jeu et de faire des modifications si besoin
const SCENE_FLOW = {

  // Jour 1
  "j1_arrivee": "j1_chambre",
  "j1_chambre": "j1_navigation1",
  "j1_navigation1": "j1_salon",
  "j1_salon": "j1_cuisine",
  "j1_cuisine": "j1_chambre1",
  "j1_chambre1": "j1_photos",
  "j1_photos": "j1_chambre3",
  "j1_chambre3": "j1_fin",
  "j1_fin": "j2_reveil",

  // Jour 2
  "j2_reveil": "j2_depart",
  "j2_depart": "j2_elec",
  "j2_elec": "j2_vetements",
  "j2_vetements": "j2_nina_confrontation",
  "j2_nina_confrontation":"j2_fin",
  "j2_fin": "j3_matin",

  // Jour 3
  "j3_matin": "j3_surprise",
  "j3_surprise": "j3_confrontation",
  "j3_confrontation": "j3_soiree",
  "j3_soiree": "j3_santa",
  "j3_santa": "j3_karaoke",
  "j3_karaoke": "j3_pizzas",
  "j3_pizzas": "j3_mort",
  "j3_mort": "j3_police",
  "j3_police": "j3_fin",
  "j3_fin": "j4_reveil",

  // Jour 4
  "j4_reveil": "j4_hub",
  "j4_hub": "j4_bilan",
  "j4_salon": "j4_hub",
  "j4_cuisine": "j4_hub",
  "j4_chambre3": "j4_hub",
  "j4_chambre2": "j4_hub",
  "j4_telephone": "j4_hub",
  "j4_terrasse": "j4_hub",
  "j4_erina": "j4_hub",

  "j4_bilan": "j4_fin",
  "j4_fin": "j5_matin",

  // Jour 5
  "j5_matin": null, // voir getEndingScene() en bas

  
  "j5_finA": "j5_epilogue",
  "j5_finB": "j5_epilogue",
  "j5_finC": null,
  "j5_finAbis": "j5_epilogue",
  "j5_epilogue": null,
};

// hub : y'en a 2, le joueur peut visiter chaque lieu avant de continuer 
// pour le 1er, il doit visiter tous les lieux
// pour le 2eme, il peut en visiter une partie seulement (voire aucun) avant de continuer, et les indices trouvés dans ces lieux vont influencer la fin du jeu
// --> je sais pas comment faire pour que ça soit dynamique, du coup j'ai mis les hubs dans une constante à part
const HUBS = {
  "j1_navigation1": {
    locations: ["j1_salon", "j1_cuisine", "j1_chambre1"],
    exitScene: "j1_photos",
  },
  "j4_hub": {
    locations: ["j4_salon", "j4_cuisine", "j4_chambre3", "j4_chambre2", "j4_telephone", "j4_terrasse", "j4_erina"],
    exitScene: "j4_bilan",
  },
};

// détermine la fin selon les indices trouvés --->> faut modifier pour que ça prenne en compte les indices trouvés dans les hubs
// courage
// Résumé : 
// - 9/9 indices : fin A --> choix entre A (dénoncer) ou Abis (ne pas dénoncer)
// - 5-8 indices : fin B (Nina se dénonce)
// - moins de 5 indices : fin C (Pablo est arrêté)
function getEndingScene(cluesFound) {
  const count = cluesFound.length;


}


