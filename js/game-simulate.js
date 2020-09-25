// Settings
let specGameOn = false;
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

    if (gameName == "pong") {
      $('#canvas-tron').hide();
      $('#canvas-rps').hide();
      $('#canvas-pong').show();
      specRunPong();
    } else if (gameName == "tron") {
      $('#canvas-pong').hide();
      $('#canvas-rps').hide();
      $('#canvas-tron').show();
    } else if (gameName == "rps") {
      $('#canvas-pong').hide();
      $('#canvas-tron').hide();
      $('#canvas-rps').show();
      specRunRps();
    } else {
      $('#canvas-tron, #canvas-tron, #canvas-rps').hide();
    }
  } else {
    $('.nogame').show();
    $('.game-block').hide();
    $('#canvas-pong').hide();
    $('#canvas-tron').hide();
    $('#canvas-rps').hide();
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
/*
 * Basic Count Up from Date and Time
 * Author: @mrwigster / https://guwii.com/bytes/count-date-time-javascript/
 */
function setSpecTimer(countFrom, id) {
  countFrom = new Date(countFrom).getTime();
  var now = new Date(),
      countFrom = new Date(countFrom),
      timeDifference = (now - countFrom);

  var secondsInADay = 60 * 60 * 1000 * 24,
      secondsInAHour = 60 * 60 * 1000;

  days = Math.floor(timeDifference / (secondsInADay) * 1);
  hours = Math.floor((timeDifference % (secondsInADay)) / (secondsInAHour) * 1);
  mins = Math.floor(((timeDifference % (secondsInADay)) % (secondsInAHour)) / (60 * 1000) * 1);
  secs = Math.floor((((timeDifference % (secondsInADay)) % (secondsInAHour)) % (60 * 1000)) / 1000 * 1);

  var idEl = document.getElementById(id);
  idEl.getElementsByClassName('minutes')[0].innerHTML = mins;
  idEl.getElementsByClassName('seconds')[0].innerHTML = secs;

  clearTimeout(setSpecTimer.interval);
  setSpecTimer.interval = setTimeout(function(){ setSpecTimer(countFrom, id); }, 1000);
}

// Initialise
setSpecGameOnOff();
setSpecGameName();
setSpecPlayersNames();
setSpecScore();
setSpecTimer("Sep 24, 2020 13:00:00", 'countup1');

// Traitement - websocket
var socket = io.connect('192.168.43.54:3000');
socket.on('connect', function() {
    socket.on('manette', function(msg) {
        // console.log(msg.topic+'->'+msg.message);
        // {"button":"B", "value":"LOW", "User": 1 }
        let manetteData = msg.message;
    });
    socket.on('gamedata', function(gdata) {
        console.log(gdata.topic+'->'+gdata.message);

        // Récupération des données de la partie (nom du jeu, pseudos et date debut) et les afficher.
        // function specPlayGame() {
        //   let spectGameData = gdata.message;
        //
        //   specGameOn = spectGameData["gameOn"];
        //   gameName = spectGameData["gameName"];
        //   pseudoJ1 = spectGameData["pseudos"]["joueur1"];
        //   pseudoJ2 = spectGameData["pseudos"]["joueur2"];
        //   scoreJ1 = spectGameData["scores"]["scoreJ1"];
        //   scoreJ2 = spectGameData["scores"]["scoreJ2"];
        //
        //   setSpecGameOnOff();
        //   setSpecGameName();
        //   setSpecPlayersNames();
        //   setSpecScore();
        //   setSpecTimer(spectGameData["date"], 'countup1');
        // }
        //
        // specPlayGame();

    });
});

$(document).ready(socket.emit('subscribe', {topic:'manette'}));

// Récupération des données de la partie (nom du jeu, pseudos et date debut) et les afficher.
function specPlayGame() {
  let spectGameData = {
    "gameOn": true,
    "gameName": "pong test",
    "pseudos": {
      "joueur1": "Vincent",
      "joueur2": "Gautier"
    },
    "scores": {
      "scoreJ1": 0,
      "scoreJ2": 0
    },
    "date": "Sep 25, 2020 10:12:00"
  };

  specGameOn = spectGameData["gameOn"];
  gameName = spectGameData["gameName"];
  pseudoJ1 = spectGameData["pseudos"]["joueur1"];
  pseudoJ2 = spectGameData["pseudos"]["joueur2"];
  scoreJ1 = spectGameData["scores"]["scoreJ1"];
  scoreJ2 = spectGameData["scores"]["scoreJ2"];

  setSpecGameOnOff();
  setSpecGameName();
  setSpecPlayersNames();
  setSpecScore();
  setSpecTimer(spectGameData["date"], 'countup1');
}

// Stop game
function specStopGame() {
  let spectGameData = {
    "gameOn": false
  };

  specGameOn = spectGameData["gameOn"];

  setSpecGameOnOff();
  setSpecGameName();
  setSpecPlayersNames();
  setSpecScore();
  setSpecTimer(spectGameData["date"], 'countup1');
}


// fonction qui boucle pour avoir un screen du live
function refresh() {
   var tmp = new Date();
   var img = document.getElementById("screenGame");
   img.src = img.src + '?' + tmp.getTime();
}
window.onload = function() {
  setInterval(refresh,2000);
};
