const {
  theNoteCircle,
  allErrorMessages,
} = require("./jam_buddy_helper_object");

const randomizeItem = () =>
  Math.floor(Math.random() * theNoteCircle.arrayOfNotes.length);

const getRandomNotes = (randomNote) => {
  if (Array.isArray(theNoteCircle.arrayOfNotes[randomNote])) {
    randomNote =
      theNoteCircle.arrayOfNotes[randomNote][
        Math.floor(
          Math.random() * theNoteCircle.arrayOfNotes[randomNote].length
        )
      ];
  } else {
    randomNote = theNoteCircle.arrayOfNotes[randomNote];
  }
  return randomNote;
};

const randomize = () => {
  let random1 = randomizeItem();
  let random2;

  do {
    random2 = randomizeItem();
  } while (random1 === random2);

  random1 = getRandomNotes(random1);
  random2 = getRandomNotes(random2);

  return [random1, random2];
};

const validateSetNotes = (arr) => {
  if (arr === undefined) {
    throw new Error(allErrorMessages.notesNotDefined);
  } else if (
    theNoteCircle.arrayOfNotes.flat(1).indexOf(arr[0] || arr[1]) === -1
  ) {
    throw new Error(allErrorMessages.invalidNote);
  } else if (arr[0] === arr[1]) {
    throw new Error(allErrorMessages.setSameNotes);
  } else if (arr.length !== 2) {
    throw new Error(allErrorMessages.invalidLengthOfArray);
  }
};

const validateCheckAnswer = (answer) => {
  if (!Number.isInteger(answer)) {
    throw new Error(allErrorMessages.invalidCheckAnswerType);
  } else if (answer > 12 || answer < 0) {
    throw new Error(allErrorMessages.invalidCheckAnswerDistance);
  }
};

const checkIndex = (notes) => {
  let noteIndex1 = 0;
  let noteIndex2 = 0;

  for (let i = 0; i < theNoteCircle.arrayOfNotes.length; i++) {
    if (
      theNoteCircle.arrayOfNotes[i] === notes[0] ||
      theNoteCircle.arrayOfNotes[i].indexOf(notes[0]) !== -1
    ) {
      noteIndex1 = i;
    }
    if (
      theNoteCircle.arrayOfNotes[i] === notes[1] ||
      theNoteCircle.arrayOfNotes[i].indexOf(notes[1]) !== -1
    ) {
      noteIndex2 = i;
    }
  }
  return [noteIndex1, noteIndex2];
};

const calculatedAnswer = (current, answer) => {
  const noteIndex1 = checkIndex(current)[0];
  const noteIndex2 = checkIndex(current)[1];

  if (Math.abs(noteIndex1 - noteIndex2) === answer) {
    return true;
  } else if (
    theNoteCircle.arrayOfNotes.length -
      Math.max(noteIndex1, noteIndex2) +
      Math.min(noteIndex1, noteIndex2) ===
    answer
  ) {
    return true;
  }
  return false;
};

module.exports = {
  randomize,
  validateSetNotes,
  validateCheckAnswer,
  calculatedAnswer,
  checkIndex,
};
