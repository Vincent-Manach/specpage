// Settings
let specGameOn = true;
let gameName = "Nom du jeu";
let pseudoJ1 = "Pseudo_joueur_1";
let pseudoJ2 = "Pseudo_joueur_2";
let scoreJ1 = 0;
let scoreJ2 = 0;


// Show or Hide game
function setSpecGameOnOff() {
  if (specGameOn == true) {
    $('.nogame').hide();
    $('.game-block').show();
  } else {
    $('.nogame').show();
    $('.game-block').hide();
  }
}

// Set game name
function setSpecGameName() {
  $('.game-name').text(gameName);
}

// Set players names
function setSpecPlayersNames() {
  $('.pseudo1').text(pseudoJ1);
  $('.pseudo2').text(pseudoJ2);
}

// Set score
function setSpecScore() {
  $('.score1').text(scoreJ1);
  $('.score2').text(scoreJ2);
}

// Set timer


// Initialise
setSpecGameOnOff();
setSpecPlayersNames();


function getData(){
  // traitement - websocket


  // rappel après 2 secondes = 2000 millisecondes
  setTimeout('getData',2000);
}

getData();
