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
};

module.exports = { elements };
