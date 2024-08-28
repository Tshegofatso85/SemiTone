const { JamBuddy } = require("./jam_buddy");
const { elements } = require("./helpers/dom_helper_object");
const {
  displayRandomNotes,
  displayMessage,
  clearMessage,
  removesHighlight,
  hideSemitoneArray,
  showSemitoneArray,
  giveUpSemitoneArray,
  removeAllHighlightsInArray,
  correctDistanceMessage,
  spinRandomNotes,
} = require("./helpers/dom_helper_functions");

const buddy = new JamBuddy();

const initialize = () => {
  hideSemitoneArray();
  buddy.randomizeCurrentNotes();
  elements.box1(document).textContent = buddy.getCurrentNotes()[0];
  elements.box2(document).textContent = buddy.getCurrentNotes()[1];
  elements.restart(document).disabled = true;
  elements.streak(document).textContent = `Streak: ${buddy.streak}`;
  elements.giveUpMessage(document).textContent = "";
};

const randomizeListener = () => {
  elements.randomize(document).addEventListener("click", () => {
    elements.giveUpMessage(document).textContent = "";
    elements.displayMessage(document).classList.remove("correct");
    elements.displayMessage(document).classList.remove("incorrect");
    elements.displayMessage(document).textContent = "";
    spinRandomNotes(buddy);
    removeAllHighlightsInArray();
    hideSemitoneArray();
    clearMessage();
    removesHighlight();
    removesHighlight();
    clearMessage();
  });
};

const answerListener = () => {
  elements.form(document).addEventListener("submit", (event) => {
    event.preventDefault();
    const answer = Number(elements.answer(document).value);
    const [displayedNote1, displayedNote2] = [
      elements.box1(document).textContent,
      elements.box2(document).textContent,
    ];
    buddy.setCurrentNotes([displayedNote1, displayedNote2]);
    const isCorrect = buddy.checkAnswer(answer);
    displayMessage(isCorrect);

    if (isCorrect) {
      showSemitoneArray();
      elements.checkAnswer(document).disabled = true;
      elements.answer(document).disabled = true;
      elements.correctAnsSound(document).play();
    } else {
      elements.incorrectAnsSound(document).play();
    }

    elements.streak(document).textContent = `Streak: ${buddy.streak}`;
  });
};

const giveUpListener = () => {
  elements.giveUp(document).addEventListener("click", () => {
    elements.checkAnswer(document).disabled = true;
    elements.answer(document).disabled = true;
    elements.randomize(document).disabled = true;
    elements.giveUp(document).disabled = true;
    elements.restart(document).disabled = false;
    elements.displayMessage(document).classList.add("incorrect");
    elements.displayMessage(document).textContent = "Gave Up!";
    elements.box1(document).classList.add("gaveUpHighlight");
    elements.box2(document).classList.add("gaveUpHighlight");
    giveUpSemitoneArray();
    showSemitoneArray();
    correctDistanceMessage();
    elements.gameOverSound(document).play();
  });
};

const restartListener = () => {
  elements.restart(document).addEventListener("click", () => {
    initialize();

    buddy.streak = 0;
    elements.streak(document).textContent = `Streak: ${buddy.streak}`;
    elements.giveUp(document).disabled = false;
    elements.randomize(document).disabled = false;
    elements.checkAnswer(document).disabled = false;
    elements.answer(document).disabled = false;
    elements.giveUpMessage(document).textContent = "";
    elements.giveUpMessage(document).textContent = "";
    elements.checkAnswer(document).disabled = false;
    elements.answer(document).disabled = false;
    elements.giveUpMessage(document).textContent = "";
    elements.box1(document).classList.remove("gaveUpHighlight");
    elements.box2(document).classList.remove("gaveUpHighlight");
    removeAllHighlightsInArray();
    hideSemitoneArray();
    clearMessage();
    removesHighlight();
    removesHighlight();
    clearMessage();
    elements.gameStartSound(document).play();
  });
};

initialize();
randomizeListener();
answerListener();
giveUpListener();
restartListener();

module.exports = {
  initialize,
  randomizeListener,
  answerListener,
  buddy,
};
