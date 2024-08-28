const elements = {
  displayMessage: (document) => document.getElementById("displayMessage"),
  giveUpMessage: (document) => document.getElementById("giveUpMessage"),
  streak: (document) => document.getElementById("streak"),
  form: (document) => document.getElementById("form"),
  answer: (document) => document.getElementById("answer"),
  randomize: (document) => document.getElementById("randomize"),
  giveUp: (document) => document.getElementById("giveUp"),
  restart: (document) => document.getElementById("restart"),
  box1: (document) => document.getElementById("box1"),
  box2: (document) => document.getElementById("box2"),
  checkAnswer: (document) => document.getElementById("check"),
  restart: (document) => document.getElementById("restart"),
  semitoneArray: (document) => document.getElementById("semitone-array"),
  giveUpSound: (document) => document.getElementById("give-up-sound"),
  correctAnsSound: (document) => document.getElementById("correct-ans"),
  incorrectAnsSound: (document) => document.getElementById("incorrect-ans"),
  gameStartSound: (document) => document.getElementById("game-start"),
  gameOverSound: (document) => document.getElementById("game-over"),
  spinningReel: (document) => document.getElementById("spinning-reel"),
};

module.exports = { elements };
