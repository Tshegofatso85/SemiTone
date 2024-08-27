const { theNoteCircle } = require("../src/helpers/jam_buddy_helper_object");
const { document } = require("./dom_imports");
const { initialize, buddy } = require("../src/dom_manipulation");
const { elements } = require("../src/helpers/dom_helper_object");

describe("Dom Manipulation", () => {
  beforeEach(() => {
    jasmine.clock().install();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  describe("initialize", () => {
    let notes;
    beforeEach(() => {
      notes = theNoteCircle.arrayOfNotes.flat(1);
      elements.box1(document).textContent = "none";
      elements.box2(document).textContent = "none";
      initialize();
    });

    it("should hide semitone array", () => {
      expect(elements.semitoneArray(document).style.display).toBe("none");
    });

    it("should have restart button disabled", () => {
      expect(elements.restart(document).disabled).toBe(true);
    });

    it("should display box1 with a random note", () => {
      const divContent = elements.box1(document).textContent;
      expect(notes).toContain(divContent);
    });
    it("should display box2 with a random note", () => {
      const divContent = elements.box2(document).textContent;
      expect(notes).toContain(divContent);
    });
  });

  describe("randomizeListener", () => {
    let firstNoteBefore, secondNoteBefore;
    beforeEach(() => {
      firstNoteBefore = elements.box1(document).textContent;
      secondNoteBefore = elements.box2(document).textContent;
    });

    it("should be different notes after clicking randomize", () => {
      elements.randomize(document).click();
      jasmine.clock().tick(1100);

      let firstNoteAfter = elements.box1(document).textContent;
      let secondNoteAfter = elements.box2(document).textContent;

      if (
        firstNoteBefore === firstNoteAfter &&
        secondNoteBefore === secondNoteAfter
      ) {
        elements.randomize(document).click();
        jasmine.clock().tick(1000);

        firstNoteAfter = elements.box1(document).textContent;
        secondNoteAfter = elements.box2(document).textContent;
      }
      const notesBefore = `${firstNoteBefore}/${secondNoteBefore}`;
      const notesAfter = `${firstNoteAfter}/${secondNoteAfter}`;

      expect(notesBefore).not.toEqual(notesAfter);
    });
  });

  describe("answerListener", () => {
    beforeEach(() => {
      elements.box1(document).textContent = "A";
      elements.box2(document).textContent = "B";
      elements.checkAnswer(document).disabled = false;
      elements.answer(document).disabled = false;
      elements.displayMessage(document).textContent = "";
      elements.answer(document).value = "";
      buddy.streak = 0;
    });

    it("should display wrong message when answer is wrong", () => {
      elements.answer(document).value = 1;

      elements.checkAnswer(document).click();
      expect(elements.displayMessage(document).textContent).toBe("Wrong!");
      jasmine.clock().tick(1000);
      expect(elements.displayMessage(document).textContent).toBe("");
    });

    it("should display correct message when answer is correct", () => {
      elements.answer(document).value = 2;

      elements.checkAnswer(document).click();
      expect(elements.displayMessage(document).textContent).toBe("Correct!");
    });

    it("should highlight box 1 and 2 when answer is correct ", () => {
      elements.answer(document).value = 2;
      elements.checkAnswer(document).click();
      expect(elements.box1(document).classList).toContain("highlight");
      expect(elements.box2(document).classList).toContain("highlight");
    });

    it("should disable the button and answer when answer is correct", () => {
      elements.answer(document).value = 2;
      elements.checkAnswer(document).click();
      expect(elements.checkAnswer(document).disabled).toBe(true);
      expect(elements.answer(document).disabled).toBe(true);
    });

    it("should not submit form if answer is less than 0", () => {
      expect(elements.answer(document).validity.rangeUnderflow).toBe(false);
      elements.answer(document).value = -1;
      expect(elements.answer(document).validity.rangeUnderflow).toBe(true);
    });

    it("should not submit form if answer is greater than 12", () => {
      expect(elements.answer(document).validity.rangeOverflow).toBe(false);
      elements.answer(document).value = 13;
      expect(elements.answer(document).validity.rangeOverflow).toBe(true);
    });

    it("should not submit form if answer is not defined", () => {
      expect(elements.answer(document).validity.valueMissing).toBe(true);
    });

    it("should show semitone array when answer is correct", () => {
      elements.answer(document).value = 2;
      elements.checkAnswer(document).click();
      expect(elements.semitoneArray(document).style.display).toBe("");
    });

    it("should highlight elements that are equal to box 1 or box 2 in the semitone array when answer is correct", () => {
      elements.answer(document).value = 2;
      elements.checkAnswer(document).click();
      const semiToneArray = document.querySelectorAll("#semitone-array .note");
      semiToneArray.forEach((noteElement) => {
        const span = noteElement.querySelector("span");
        if (
          span.textContent.trim() ===
            elements.box1(document).textContent.trim() ||
          span.textContent.trim() === elements.box2(document).textContent.trim()
        ) {
          expect(span.classList).toContain("highlight");
        }
      });
    });

    it("should highlight box that contains box1 or box 2 value in the semitone array when answer is correct", () => {
      elements.answer(document).value = 2;
      elements.checkAnswer(document).click();
      const semiToneArray = document.querySelectorAll("#semitone-array .note");
      semiToneArray.forEach((noteElement) => {
        if (
          noteElement.textContent.trim() === "A" ||
          noteElement.textContent.trim() === "B"
        ) {
          expect(noteElement.classList).toContain("fullHighlight");
        }
      });
    });

    it("should plus one on steak when answer is correct", () => {
      elements.answer(document).value = 2;
      elements.checkAnswer(document).click();
      expect(elements.streak(document).textContent).toBe("Streak: 1");
    });

    it("should reset streak when answer is incorrect", () => {
      elements.answer(document).value = 1;
      elements.checkAnswer(document).click();
      expect(elements.streak(document).textContent).toBe("Streak: 0");
    });
  });

  describe("giveUpListener", () => {
    beforeEach(() => {
      elements.box1(document).textContent = "A#";
      elements.box2(document).textContent = "C";
      elements.giveUp(document).disabled = false;
      elements.giveUpMessage(document).textContent = "";
      elements.giveUp(document).click();
    });

    afterEach(() => {
      elements.restart(document).click();
    });

    it("should display 'Gave Up!' on display message", () => {
      expect(elements.displayMessage(document).textContent).toBe("Gave Up!");
    });

    it("should display give up message", () => {
      expect(elements.giveUpMessage(document).textContent).toBe(
        "The Clockwise distance (From A# right to C) is 2 semitones and the Anti-Clockwise distance (From A# left to C) is 10 semitones."
      );
    });

    it("should highlight box 1 and 2 with the gave up highlight", () => {
      expect(elements.box1(document).classList).toContain("gaveUpHighlight");
      expect(elements.box2(document).classList).toContain("gaveUpHighlight");
    });

    it("should disable give up, randomize and checkAnswer buttons and answer form", () => {
      expect(elements.giveUp(document).disabled).toBe(true);
      expect(elements.answer(document).disabled).toBe(true);
      expect(elements.randomize(document).disabled).toBe(true);
      expect(elements.checkAnswer(document).disabled).toBe(true);
    });

    it("should display semitone array", () => {
      expect(elements.semitoneArray(document).style.display).toBe("");
    });

    it("should highlight elements box in the semitone array", () => {
      const semiToneArray = document.querySelectorAll("#semitone-array .note");

      semiToneArray.forEach((noteElement) => {
        if (
          noteElement.textContent.trim() === "A#/Bb" ||
          noteElement.textContent.trim() === "C"
        ) {
          expect(noteElement.classList).toContain("fullHighlight");
        } else {
          expect(noteElement.classList).toContain("gaveUpHighlight");
        }
      });
    });

    it("should only highlight the two elements of box1 and box2 in the semitone array", () => {
      const semiToneArray = document.querySelectorAll("#semitone-array .note");
      const box1 = elements.box1(document).textContent.trim();
      const box2 = elements.box2(document).textContent.trim();

      semiToneArray.forEach((noteElement) => {
        let span = noteElement.querySelector("span");

        if (
          span.textContent.trim() === box1 ||
          span.textContent.trim() === box2
        ) {
          expect(span.classList).toContain("highlight");
        }
      });
    });
  });

  describe("restartListener", () => {
    beforeEach(() => {
      elements.semitoneArray(document).style.display = "none";
      elements.restart(document).click();
      elements.displayMessage(document).textContent = "";
      elements.giveUpMessage(document).textContent = "";
      elements.giveUp(document).disabled = false;
      elements.randomize(document).disabled = false;
      elements.checkAnswer(document).disabled = false;
      elements.answer(document).disabled = false;
    });

    it("should reset streak to 0", () => {
      elements.giveUp(document).click();
      elements.restart(document).click();
      expect(elements.streak(document).textContent).toBe("Streak: 0");
    });

    it("should remove displayed message and the gave up message", () => {
      expect(elements.displayMessage(document).textContent).toBe("");
      expect(elements.giveUpMessage(document).textContent).toBe("");
    });

    it("should hide semitone array", () => {
      expect(elements.semitoneArray(document).style.display).toBe("none");
    });

    it("should remove highlight from box 1 and 2", () => {
      expect(elements.box1(document).classList).not.toContain(
        "gaveUpHighlight"
      );
      expect(elements.box2(document).classList).not.toContain(
        "gaveUpHighlight"
      );
    });

    it("should enable randomize, checkAnswer and giveUp buttons and answer form", () => {
      expect(elements.randomize(document).disabled).toBe(false);
      expect(elements.checkAnswer(document).disabled).toBe(false);
      expect(elements.answer(document).disabled).toBe(false);
      expect(elements.giveUp(document).disabled).toBe(false);
    });

    it("should disable restart button", () => {
      expect(elements.restart(document).disabled).toBe(true);
    });
  });
});
