let day;
let scene;
let nbScene;
let room;
let dialogue;
let listDialogues;
let activeDialogues = false;
let defaultText =  "Il n'y a personne ici...";
let indices = 0;
let choice;

/**
 * initalisation du jeu
 */
function init() {
    day = 5;
    scene = 1;
    nbScene = 1;
    indices = 9;
    document.getElementById("day").innerHTML = "Jour " + day;
    chooseRoom('Parking')

    document.addEventListener('keydown', (e) => {
        if (e.key === ' ') {
            e.preventDefault(); // ça empêche les actions par défaut quand on tape sur une touche (scroll, etc.)
            advance();
        }
    });
}

/**
 * Désactiver tout les boutons lors de dialogues, les réactiver ensuite
 * @param {regarder si c'est true ou false} state 
 */
function toggleButton(state){
    if (state == true) {
        activeDialogues = false;
        document.getElementById("game").style.cursor = "default";
    } else {
        activeDialogues = true;
        document.getElementById("game").style.cursor = "pointer";
    }

    document.getElementById("parking").disabled = !state;
    document.getElementById("entree").disabled = !state;
    document.getElementById("hall").disabled = !state;
    document.getElementById("couloir").disabled = !state;
    document.getElementById("cuisine").disabled = !state;
    document.getElementById("salon").disabled = !state;
    document.getElementById("chambre1").disabled = !state;
    document.getElementById("chambre2").disabled = !state;
    document.getElementById("chambre3").disabled = !state;
    document.getElementById("terrasse").disabled = !state;

    document.getElementById("magasin1").disabled = !state;
    document.getElementById("magasin2").disabled = !state;
    document.getElementById("restaurant").disabled = !state;
}

function toggleFinalChoice(state) {
    document.getElementById("chooseDenounce").hidden = !state;
    document.getElementById("chooseSilence").hidden = !state;
}

/**
 * @param {On choisit la chambre} room 
 */
function chooseRoom(room) {  
    const res3 = [];

    toggleButton(false);
    toggleFinalChoice(false);

    dialogue = 0;

    // recoit les différents dialogues de la scene dans l'ordre
    const res = dialogues.filter((d) => {
        return (d.day == day && d.scene == scene && d.room == room && d.visited == false);
    });

    // Reçoit que les résultats de toutes les scenes en dessus de 100 pour le jour indiqué
    const res2 = dialogues.filter((d) => {
        return (d.day == day && d.scene > 100 && d.room == room && d.visited == false);
    });

    // Ici, on on ne garde les dialogues de la première scène de res2, parce que res2 a pu trouver plusiers scènes
    let dialNb = 0;
    res2.forEach((d) => {
        if (d.dialogue > dialNb) {
            dialNb = d.dialogue;
            res3.push(d);
        };
    });

    if (res.length > 0) {
        listDialogues = res;
        changeDialogue();
    } else if (res3.length > 0 && scene > 2) {
        listDialogues = res3;
        changeDialogue();
    } else {
        document.getElementById("text").innerHTML = defaultText;
        toggleButton(true);
    }

    console.log("scene", scene);
}

/**
 * Tester si on est dans la villa ou dehors et activer/désactiver les boutons liés
 */
function checkPlaceVisibility() {
    let res = dialogues.filter((d) => {
        return (d.day == day && d.scene == scene && d.dialogue == 1 && d.visited == false);
    });

    if (res.length > 0) {
        if (res[0].place == 'town') {
            document.getElementById("town").style.display = "block";
            document.getElementById("house").style.display = "none";
            defaultText =  "C'est fermé. Revenez plus tard."
        } else {
            document.getElementById("town").style.display = "none";
            document.getElementById("house").style.display = "block";
            defaultText =  "Il n'y a personne ici..."
        }
    }
}

/**
 * Aller au prochain dialogue, et désactiver les dialogues déjà eu
 */
function changeDialogue() { 
    if (activeDialogues && dialogue < listDialogues.length) {   
        listDialogues[dialogue].visited = true;
        if (listDialogues[dialogue].indice == true) {
            indices++
            console.log(indices)
        } 
        document.getElementById("text").innerHTML = listDialogues[dialogue++].text;
        testNewScene ();
    }
}


/**
 * Tester si il s'agit d'une nouvelle scène
 */
function testNewScene () {
    if (listDialogues.length == dialogue) {
        if (scenes[day] == nbScene && listDialogues.length == dialogue) {
            // Nouveau jour
            scene = 1;
            nbScene = 1;
            
            testNewDay()

            if (day == 7) {
                resolution();
            } else if (day == 8) {
                theEnd();
            } else {
                toggleButton(true);
            }
        } else {
            // Nouvelle scene
            scene++;
            nbScene++;
            checkPlaceVisibility(); 
            toggleButton(true);
        }
    }
    console.log('day', day)
}

/**
 * Affichage jour actuel et nouveau jours
 */
function testNewDay() {
    if (day < 4) {
        day++;
        document.getElementById("day").innerHTML = "Jour " + day;
    } else if (day == 4) {
        document.getElementById("day").innerHTML = "Jour 4";
        day++;
    } else if (day == 5) {
        document.getElementById("day").innerHTML = "Jour " + day;
        day++;
    } else {
        document.getElementById("day").innerHTML = "Jour 5";
        day++;
    }

}

function resolution() {
    if (indices < 5) {
        scene = 3;
    } else if (indices < 8) {
        scene = 2;
    } else {
        toggleFinalChoice(true);
        finalChoice();
    }

    // recoit les différents dialogues de la scene dans l'ordre
    const res = dialogues.filter((d) => {
        return (d.day == day && d.scene == scene);
    });

    dialogue = 0;

    if (res.length > 0) {
        listDialogues = res;
        changeDialogue();
    }
}

function finalChoice(choice) {
    toggleFinalChoice(false);
    if (choice == "chooseDenounce") {
        scene = 1;
    } else {
        scene = 4;
    }
}

function theEnd() {
    // recoit les différents dialogues de la scene dans l'ordre
    const res = dialogues.filter((d) => {
        return (d.day == day && d.scene == scene);
    });

    dialogue = 0;

    if (res.length > 0) {
        listDialogues = res;
        changeDialogue();
    }
}