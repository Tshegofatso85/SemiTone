const {
  randomize,
  validateSetNotes,
  validateCheckAnswer,
  calculatedAnswer,
} = require("./helpers/jam_buddy_helper_function");

class JamBuddy {
  constructor() {
    this.notes = [];
    this.streak = 0;
  }
  getCurrentNotes() {
    return this.notes;
  }
  setCurrentNotes(arr) {
    validateSetNotes(arr);
    this.notes = arr;
  }

  randomizeCurrentNotes() {
    this.notes = randomize();
  }

  checkAnswer(answer) {
    validateCheckAnswer(answer);

    if (calculatedAnswer(this.notes, answer)) {
      this.streak++;
    } else {
      this.streak = 0;
    }

    return calculatedAnswer(this.notes, answer);
  }
}

module.exports = { JamBuddy };
