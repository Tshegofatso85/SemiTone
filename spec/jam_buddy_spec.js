const { JamBuddy } = require("../src/jam_buddy");
const { allErrorMessages } = require("../src/helpers/jam_buddy_helper_object");

describe("Jambuddy Class", () => {
  let buddy;
  beforeEach(() => {
    buddy = new JamBuddy();
  });
  describe("setCurrentNote", () => {
    it("should return the array ['C','D#'] when we call getCurrentNotes() after setting the array", () => {
      buddy.setCurrentNotes(["C", "D#"]);
      expect(buddy.getCurrentNotes()).toEqual(["C", "D#"]);
    });

    it("should throw an error when a note is an invalid note", () => {
      expect(() => buddy.setCurrentNotes(["B#", "D#"])).toThrowError(
        allErrorMessages.invalidNote
      );
    });

    it("should throw an error when the same notes have been set in the array", () => {
      expect(() => buddy.setCurrentNotes(["A", "A"])).toThrowError(
        allErrorMessages.setSameNotes
      );
    });

    it("should throw an error if length of array is invalid", () => {
      expect(() => buddy.setCurrentNotes(["A#", "B", "F"])).toThrowError(
        allErrorMessages.invalidLengthOfArray
      );
    });

    it("should throw an error when setCurrentNotes has no value passed in it", () => {
      expect(() => buddy.setCurrentNotes()).toThrowError(
        allErrorMessages.notesNotDefined
      );
    });
  });

  describe("randomizeCurrentNotes", () => {
    it("should return true if note in randomizeCurrentNotes are note equal", () => {
      buddy.randomizeCurrentNotes();
      const notes = buddy.getCurrentNotes();
      expect(notes[0] !== notes[1]).toBe(true);
    });
  });

  describe("checkAnswer", () => {
    it("should throw an error when the check answer is not an integer", () => {
      buddy.setCurrentNotes(["C", "D#"]);
      expect(() => buddy.checkAnswer("3")).toThrowError(
        allErrorMessages.invalidCheckAnswerType
      );
      expect(() => buddy.checkAnswer(3.5)).toThrowError(
        allErrorMessages.invalidCheckAnswerType
      );
    });

    it("should throw an error when the check answer is an invalid distance", () => {
      buddy.setCurrentNotes(["C", "D#"]);
      expect(() => buddy.checkAnswer(2334)).toThrowError(
        allErrorMessages.invalidCheckAnswerDistance
      );
      expect(() => buddy.checkAnswer(-3)).toThrowError(
        allErrorMessages.invalidCheckAnswerDistance
      );
    });

    it("should return true if user passed the correct distance between the two notes else return false", () => {
      buddy.setCurrentNotes(["C", "D#"]);
      expect(buddy.checkAnswer(3)).toBe(true);
      expect(buddy.checkAnswer(9)).toBe(true);
      expect(buddy.checkAnswer(5)).toBe(false);
    });

    it("should return true if user passed the correct distance between a flat and a sharp note else return false", () => {
      buddy.setCurrentNotes(["A#", "Bb"]);
      expect(buddy.checkAnswer(0)).toBe(true);
      expect(buddy.checkAnswer(12)).toBe(true);
      expect(buddy.checkAnswer(6)).toBe(false);
    });

    it("should return true if user passed the correct distance between the two flat notes else return false", () => {
      buddy.setCurrentNotes(["Gb", "Db"]);
      expect(buddy.checkAnswer(5)).toBe(true);
      expect(buddy.checkAnswer(7)).toBe(true);
      expect(buddy.checkAnswer(3)).toBe(false);
    });
  });
});
