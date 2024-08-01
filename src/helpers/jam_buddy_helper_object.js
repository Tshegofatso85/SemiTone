const allErrorMessages = {
  invalidNote: "This is an invalid note",
  setSameNotes: "You cannot check the distance of the same notes",
  invalidCheckAnswerType: "Check Answer should be an integer",
  invalidLengthOfArray: "The length of the array should be 2",
  invalidCheckAnswerDistance: "Answer should range between 0 and 12",
  notesNotDefined: "Notes have not been defined",
};

const theNoteCircle = {
  arrayOfNotes: [
    "A",
    ["A#", "Bb"],
    "B",
    "C",
    ["C#", "Db"],
    "D",
    ["D#", "Eb"],
    "E",
    "F",
    ["F#", "Gb"],
    "G",
    ["G#", "Ab"],
  ],
};
module.exports = { allErrorMessages, theNoteCircle };
