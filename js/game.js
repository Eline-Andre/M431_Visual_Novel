let day;
let scene;
let room;
let dialogue;
let listDialogues;
let activeDialogues = false;
let defaultText =  "Il n'y a personne ici...";
let indices = 0;

function init() {
    day = 4;
    scene = 1;
    document.getElementById("day").innerHTML = "Jour " + day;
    chooseRoom('Parking')

    document.addEventListener('keydown', (e) => {
        if (e.key === ' ') {
        e.preventDefault(); // ça empêche les actions par défaut quand on tape sur une touche (scroll, etc.)
        advance();
        }
    });
}

function toggleButton(state){
    if (state == true) {
        activeDialogues = false;
        //document.getElementById("game").style.pointer = "default";
    } else {
        activeDialogues = true;
        //document.getElementById("game").style.pointer = "pointer";
    }
    console.log("etat", activeDialogues);

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
}

function chooseRoom(room) {  
    const res3 = [];

    toggleButton(false);
    console.log("scene", scene);

    dialogue = 0;

    const res = dialogues.filter((d) => {
        return (d.day == day && d.scene == scene && d.room == room && d.visited == false);
    });

    const res2 = dialogues.filter((d) => {
        return (d.day == day && d.scene > 100 && d.room == room && d.visited == false);
    });

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
    } else if (res3.length > 0) {
        listDialogues = res3;
        changeDialogue();
    } else {
        document.getElementById("text").innerHTML = defaultText;
        toggleButton(true);
    }
}

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

function changeDialogue() { 
    if (activeDialogues && dialogue < listDialogues.length) {   
        listDialogues[dialogue].visited = true;
        document.getElementById("text").innerHTML = listDialogues[dialogue++].text;
        testNewScene ();
        if (listDialogues[dialogue].indice == true) {
            indices++
        }
    }
}

function testNewScene () {
    if (listDialogues.length == dialogue) {
        if (scenes[day] == scene && listDialogues.length == dialogue) {
            day++;
            scene = 1;

            document.getElementById("day").innerHTML = "Jour " + day;

            if (day == 6) {
                //compter les indices
            }
        } else {
            scene++;
            checkPlaceVisibility(); 
        }
        toggleButton(true);
    }
    console.log('day', day)
}