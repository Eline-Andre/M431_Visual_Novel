const lines = [...DIALOGUES["j1_arrivee"], ...DIALOGUES["j1_chambre"], ...DIALOGUES["j1_navigation1"], ...DIALOGUES["j1_salon"], ...DIALOGUES["j1_cuisine"], ...DIALOGUES["j1_chambre1"], ...DIALOGUES["j1_photos"], ...DIALOGUES["j1_chambre3"], ...DIALOGUES["j1_fin"], 
...DIALOGUES["j2_reveil"], ...DIALOGUES["j2_depart"], ...DIALOGUES["j2_elec"], ...DIALOGUES["j2_vetements"], ...DIALOGUES["j2_nina_confrontation"], ...DIALOGUES["j2_fin"],
...DIALOGUES["j3_matin"], ...DIALOGUES["j3_surprise"], ...DIALOGUES["j3_confrontation"], ...DIALOGUES["j3_soiree"], ...DIALOGUES["j3_santa"], ...DIALOGUES["j3_karaoke"], ...DIALOGUES["j3_pizzas"], ...DIALOGUES["j3_mort"], ...DIALOGUES["j3_police"], ...DIALOGUES["j3_fin"],
...DIALOGUES["j4_reveil"], ...DIALOGUES["j4_hub"], ...DIALOGUES["j4_salon"], ...DIALOGUES["j4_cuisine"], ...DIALOGUES["j4_chambre3"], ...DIALOGUES["j4_chambre2"], ...DIALOGUES["j4_telephone"], ...DIALOGUES["j4_terrasse"], ...DIALOGUES["j4_erina"], ...DIALOGUES["j4_bilan"], ...DIALOGUES["j4_fin"],
...DIALOGUES["j5_matin"], ...DIALOGUES["j5_finA"], ...DIALOGUES["j5_finB"], ...DIALOGUES["j5_finC"], ...DIALOGUES["j5_finAbis"], ...DIALOGUES["j5_epilogue"],
];

let index = 0;

function showLine(line) {
  // Affichage du texte et du nom du speaker
  document.getElementById('speaker').textContent =
    line.speaker === 'Narrateur' ? '' : line.speaker;
  document.getElementById('text').textContent = line.texte;

  // Affichage des sprites
  const sprite = document.getElementById('sprite');
  if (line.sprite) {
    sprite.src = line.sprite;
    sprite.style.display = 'block';
    sprite.onerror = () => { sprite.style.display = 'none'; };
  } else {
    sprite.style.display = 'none';
  }
 // Affichage du background
  if (line.background) {
    document.getElementById('background').style.backgroundImage =
      `url('${line.background}')`;
  }
}
// Fonction pour avancer dans le dialogue
function advance() {
  index++;
  if (index >= lines.length) return;
  showLine(lines[index]);
}

// Initialisation du jeu
window.addEventListener('load', () => {
  showLine(lines[0]);

  // Avancer avec un clic gauche
  document.getElementById('game').addEventListener('click', advance);
  
  // Avancer avec la barre d'espace
  document.addEventListener('keydown', (e) => {
    if (e.key === ' ') {
      e.preventDefault(); // ça empêche les actions par défaut quand on tape sur une touche (scroll, etc.)
      advance();
    }
  });
});
