const { elements } = require("./dom_helper_object");
const { checkIndex } = require("./jam_buddy_helper_function");

function highlightDisplayedNotes() {
  elements.box1(document).classList.add("highlight");
  elements.box2(document).classList.add("highlight");
}

function removesHighlight() {
  elements.box1(document).classList.remove("highlight");
  elements.box2(document).classList.remove("highlight");
}

function displayRandomNotes(buddy) {
  const [randomNote1, randomNote2] = buddy.getCurrentNotes();
  elements.box1(document).textContent = randomNote1;
  elements.box2(document).textContent = randomNote2;
}

function clearMessage() {
  elements.displayMessage(document).textContent = "";
  elements.answer(document).value = "";
}

function displayMessage(isCorrect) {
  if (isCorrect) {
    highlightDisplayedNotesInSemitoneArray();
    elements.giveUp(document).disabled = true;
    elements.displayMessage(document).classList.add("correct");
    elements.displayMessage(document).textContent = "Correct!";
    highlightDisplayedNotes();

    elements.giveUpMessage(document).textContent = "Congratulations!";
  } else {
    elements.displayMessage(document).classList.add("incorrect");
    elements.displayMessage(document).textContent = "Wrong!";
    elements.checkAnswer(document).disabled = true;
    elements.answer(document).disabled = true;

    setTimeout(() => {
      clearMessage();
      elements.displayMessage(document).classList.remove("incorrect");
      elements.checkAnswer(document).disabled = false;
      elements.answer(document).disabled = false;
    }, 1000);
  }
}
function hideSemitoneArray() {
  if (elements.semitoneArray(document)) {
    elements.semitoneArray(document).style.display = "none";
  }
}

function showSemitoneArray() {
  if (elements.semitoneArray(document)) {
    elements.semitoneArray(document).style.display = "";
  }
}

function highlightDisplayedNotesInSemitoneArray() {
  const semiToneArray = document.querySelectorAll("#semitone-array .note");
  const box1 = elements.box1(document).textContent.trim();
  const box2 = elements.box2(document).textContent.trim();

  semiToneArray.forEach((noteElement) => {
    let spans = noteElement.querySelectorAll("span");
    let foundMatch = false;

    spans.forEach((span) => {
      let spanText = span.textContent.trim();
      if (spanText === box1 || spanText === box2) {
        span.classList.add("highlight");
        foundMatch = true;
      } else {
        span.classList.remove("highlight");
      }
    });

    if (foundMatch) {
      noteElement.classList.add("fullHighlight");
    } else {
      noteElement.classList.remove("fullHighlight");
    }
  });
}

function giveUpSemitoneArray() {
  const semiToneArray = document.querySelectorAll("#semitone-array .note");
  const box1 = elements.box1(document).textContent.trim();
  const box2 = elements.box2(document).textContent.trim();
  const giveUpArray = elements.semitoneArray(document).querySelectorAll("div");

  semiToneArray.forEach((noteElement) => {
    let noteText = noteElement.textContent.trim();
    let spans = noteElement.querySelectorAll("span");
    let foundMatch = false;

    spans.forEach((span) => {
      let spanText = span.textContent.trim();
      if (spanText === box1 || spanText === box2) {
        span.classList.add("highlight");
        foundMatch = true;
      } else {
        span.classList.remove("highlight");
      }
    });

    if (foundMatch) {
      noteElement.classList.add("fullHighlight");
    } else {
      noteElement.classList.remove("fullHighlight");
    }
  });

  giveUpArray.forEach((noteElement) => {
    if (!noteElement.classList.contains("fullHighlight")) {
      noteElement.classList.add("gaveUpHighlight");
    }
  });
}

function removeAllHighlightsInArray() {
  const semiToneArray = document.querySelectorAll("#semitone-array .note");
  semiToneArray.forEach((noteElement) => {
    noteElement.classList.remove("fullHighlight");
    noteElement.classList.remove("gaveUpHighlight");
  });

  const giveUpArray = elements.semitoneArray(document).querySelectorAll("div");
  giveUpArray.forEach((noteElement) => {
    noteElement.classList.remove("gaveUpHighlight");
  });
}

function correctDistanceMessage(distance) {
  const box1 = elements.box1(document).textContent.trim();
  const box2 = elements.box2(document).textContent.trim();
  const message = elements.giveUpMessage(document);
  const indexes = checkIndex([box1, box2]);
  let clockwiseDistance = 0;
  let antiClockwiseDistance = 0;
  if (indexes[0] < indexes[1]) {
    clockwiseDistance = Math.abs(indexes[1] - indexes[0]);
    antiClockwiseDistance = 12 - indexes[1] + indexes[0];
  } else {
    clockwiseDistance = 12 - indexes[0] + indexes[1];
    antiClockwiseDistance = Math.abs(indexes[1] - indexes[0]);
  }
  message.textContent = `The Clockwise distance (From ${box1} right to ${box2}) is ${clockwiseDistance} semitones and the Anti-Clockwise distance (From ${box1} left to ${box2}) is ${antiClockwiseDistance} semitones.`;
}

function spinRandomNotes(buddy) {
  const spinSound =
    typeof Audio !== "undefined"
      ? new Audio("../Music&Sounds/spinning-reel.mp3")
      : null;

  const spinCount = 15;
  let currentSpin = 0;

  if (spinSound) {
    spinSound.currentTime = 2;
    spinSound.play();
  }

  const interval = setInterval(() => {
    elements.checkAnswer(document).disabled = true;
    elements.answer(document).disabled = true;
    elements.giveUp(document).disabled = true;
    buddy.randomizeCurrentNotes();
    displayRandomNotes(buddy);

    currentSpin++;

    if (currentSpin === spinCount) {
      clearInterval(interval);
      buddy.randomizeCurrentNotes();
      displayRandomNotes(buddy);
      elements.checkAnswer(document).disabled = false;
      elements.answer(document).disabled = false;
      elements.giveUp(document).disabled = false;

      if (spinSound) {
        spinSound.pause();
        spinSound.currentTime = 2;
      }
    }
  }, 100);
}

module.exports = {
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
};
