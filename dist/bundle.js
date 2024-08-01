/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom_manipulation.js":
/*!*********************************!*\
  !*** ./src/dom_manipulation.js ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const { JamBuddy } = __webpack_require__(/*! ./jam_buddy */ \"./src/jam_buddy.js\");\nconst { elements } = __webpack_require__(/*! ./helpers/dom_helper_object */ \"./src/helpers/dom_helper_object.js\");\nconst {\n  displayRandomNotes,\n  displayMessage,\n  clearMessage,\n  removesHighlight,\n  hideSemitoneArray,\n  showSemitoneArray,\n  giveUpSemitoneArray,\n  removeAllHighlightsInArray,\n  correctDistanceMessage,\n} = __webpack_require__(/*! ./helpers/dom_helper_functions */ \"./src/helpers/dom_helper_functions.js\");\n\nconst buddy = new JamBuddy();\n\nconst initialize = () => {\n  hideSemitoneArray();\n  buddy.randomizeCurrentNotes();\n  elements.box1(document).textContent = buddy.getCurrentNotes()[0];\n  elements.box2(document).textContent = buddy.getCurrentNotes()[1];\n  elements.restart(document).disabled = true;\n  elements.streak(document).textContent = `Streak: ${buddy.streak}`;\n  elements.giveUpMessage(document).textContent = \"\";\n};\n\nconst randomizeListener = () => {\n  elements.randomize(document).addEventListener(\"click\", () => {\n    elements.checkAnswer(document).disabled = false;\n    elements.answer(document).disabled = false;\n    elements.giveUp(document).disabled = false;\n    elements.giveUpMessage(document).textContent = \"\";\n    elements.displayMessage(document).classList.remove(\"correct\");\n    elements.displayMessage(document).classList.remove(\"incorrect\");\n    elements.displayMessage(document).textContent = \"\";\n    buddy.randomizeCurrentNotes();\n    displayRandomNotes(buddy);\n    removeAllHighlightsInArray();\n    hideSemitoneArray();\n    clearMessage();\n    removesHighlight();\n    removesHighlight();\n    clearMessage();\n  });\n};\n\nconst answerListener = () => {\n  elements.form(document).addEventListener(\"submit\", (event) => {\n    event.preventDefault();\n    const answer = Number(elements.answer(document).value);\n    const [displayedNote1, displayedNote2] = [\n      elements.box1(document).textContent,\n      elements.box2(document).textContent,\n    ];\n    buddy.setCurrentNotes([displayedNote1, displayedNote2]);\n    const isCorrect = buddy.checkAnswer(answer);\n    displayMessage(isCorrect);\n\n    if (isCorrect) {\n      showSemitoneArray();\n      elements.checkAnswer(document).disabled = true;\n      elements.answer(document).disabled = true;\n    }\n    elements.streak(document).textContent = `Streak: ${buddy.streak}`;\n  });\n};\n\nconst giveUpListener = () => {\n  elements.giveUp(document).addEventListener(\"click\", () => {\n    elements.checkAnswer(document).disabled = true;\n    elements.answer(document).disabled = true;\n    elements.randomize(document).disabled = true;\n    elements.giveUp(document).disabled = true;\n    elements.restart(document).disabled = false;\n    elements.displayMessage(document).classList.add(\"incorrect\");\n    elements.displayMessage(document).textContent = \"Gave Up!\";\n    elements.box1(document).classList.add(\"gaveUpHighlight\");\n    elements.box2(document).classList.add(\"gaveUpHighlight\");\n    giveUpSemitoneArray();\n    showSemitoneArray();\n    correctDistanceMessage();\n  });\n};\n\nconst restartListener = () => {\n  elements.restart(document).addEventListener(\"click\", () => {\n    initialize();\n\n    buddy.streak = 0;\n    elements.streak(document).textContent = `Streak: ${buddy.streak}`;\n    elements.giveUp(document).disabled = false;\n    elements.randomize(document).disabled = false;\n    elements.checkAnswer(document).disabled = false;\n    elements.answer(document).disabled = false;\n    elements.giveUpMessage(document).textContent = \"\";\n    elements.giveUpMessage(document).textContent = \"\";\n    elements.checkAnswer(document).disabled = false;\n    elements.answer(document).disabled = false;\n    elements.giveUpMessage(document).textContent = \"\";\n    elements.box1(document).classList.remove(\"gaveUpHighlight\");\n    elements.box2(document).classList.remove(\"gaveUpHighlight\");\n    removeAllHighlightsInArray();\n    hideSemitoneArray();\n    clearMessage();\n    removesHighlight();\n    removesHighlight();\n    clearMessage();\n  });\n};\n\ninitialize();\nrandomizeListener();\nanswerListener();\ngiveUpListener();\nrestartListener();\n\nmodule.exports = {\n  initialize,\n  randomizeListener,\n  answerListener,\n  buddy,\n};\n\n\n//# sourceURL=webpack://tshegofatso-kgokong-199-semitone-difference-basic-algorithm-javascript/./src/dom_manipulation.js?");

/***/ }),

/***/ "./src/helpers/dom_helper_functions.js":
/*!*********************************************!*\
  !*** ./src/helpers/dom_helper_functions.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const { elements } = __webpack_require__(/*! ./dom_helper_object */ \"./src/helpers/dom_helper_object.js\");\nconst { checkIndex } = __webpack_require__(/*! ./jam_buddy_helper_function */ \"./src/helpers/jam_buddy_helper_function.js\");\n\nfunction highlightDisplayedNotes() {\n  elements.box1(document).classList.add(\"highlight\");\n  elements.box2(document).classList.add(\"highlight\");\n}\n\nfunction removesHighlight() {\n  elements.box1(document).classList.remove(\"highlight\");\n  elements.box2(document).classList.remove(\"highlight\");\n}\n\nfunction displayRandomNotes(buddy) {\n  const [randomNote1, randomNote2] = buddy.getCurrentNotes();\n  elements.box1(document).textContent = randomNote1;\n  elements.box2(document).textContent = randomNote2;\n}\n\nfunction clearMessage() {\n  elements.displayMessage(document).textContent = \"\";\n  elements.answer(document).value = \"\";\n}\n\nfunction displayMessage(isCorrect) {\n  if (isCorrect) {\n    highlightDisplayedNotesInSemitoneArray();\n    elements.giveUp(document).disabled = true;\n    elements.displayMessage(document).classList.add(\"correct\");\n    elements.displayMessage(document).textContent = \"Correct!\";\n    highlightDisplayedNotes();\n\n    elements.giveUpMessage(document).textContent = \"Congratulations!\";\n  } else {\n    elements.displayMessage(document).classList.add(\"incorrect\");\n    elements.displayMessage(document).textContent = \"Wrong!\";\n    elements.checkAnswer(document).disabled = true;\n    elements.answer(document).disabled = true;\n    setTimeout(() => {\n      clearMessage();\n      elements.displayMessage(document).classList.remove(\"incorrect\");\n      elements.checkAnswer(document).disabled = false;\n      elements.answer(document).disabled = false;\n    }, 1000);\n  }\n}\nfunction hideSemitoneArray() {\n  if (elements.semitoneArray(document)) {\n    elements.semitoneArray(document).style.display = \"none\";\n  }\n}\n\nfunction showSemitoneArray() {\n  if (elements.semitoneArray(document)) {\n    elements.semitoneArray(document).style.display = \"\";\n  }\n}\n\nfunction highlightDisplayedNotesInSemitoneArray() {\n  const semiToneArray = document.querySelectorAll(\"#semitone-array .note\");\n  const box1 = elements.box1(document).textContent.trim();\n  const box2 = elements.box2(document).textContent.trim();\n\n  semiToneArray.forEach((noteElement) => {\n    let spans = noteElement.querySelectorAll(\"span\");\n    let foundMatch = false;\n\n    spans.forEach((span) => {\n      let spanText = span.textContent.trim();\n      if (spanText === box1 || spanText === box2) {\n        span.classList.add(\"highlight\");\n        foundMatch = true;\n      } else {\n        span.classList.remove(\"highlight\");\n      }\n    });\n\n    if (foundMatch) {\n      noteElement.classList.add(\"fullHighlight\");\n    } else {\n      noteElement.classList.remove(\"fullHighlight\");\n    }\n  });\n}\n\nfunction giveUpSemitoneArray() {\n  const semiToneArray = document.querySelectorAll(\"#semitone-array .note\");\n  const box1 = elements.box1(document).textContent.trim();\n  const box2 = elements.box2(document).textContent.trim();\n  const giveUpArray = elements.semitoneArray(document).querySelectorAll(\"div\");\n\n  semiToneArray.forEach((noteElement) => {\n    let noteText = noteElement.textContent.trim();\n    let spans = noteElement.querySelectorAll(\"span\");\n    let foundMatch = false;\n\n    spans.forEach((span) => {\n      let spanText = span.textContent.trim();\n      if (spanText === box1 || spanText === box2) {\n        span.classList.add(\"highlight\");\n        foundMatch = true;\n      } else {\n        span.classList.remove(\"highlight\");\n      }\n    });\n\n    if (foundMatch) {\n      noteElement.classList.add(\"fullHighlight\");\n    } else {\n      noteElement.classList.remove(\"fullHighlight\");\n    }\n  });\n\n  giveUpArray.forEach((noteElement) => {\n    if (!noteElement.classList.contains(\"fullHighlight\")) {\n      noteElement.classList.add(\"gaveUpHighlight\");\n    }\n  });\n}\n\nfunction removeAllHighlightsInArray() {\n  const semiToneArray = document.querySelectorAll(\"#semitone-array .note\");\n  semiToneArray.forEach((noteElement) => {\n    noteElement.classList.remove(\"fullHighlight\");\n    noteElement.classList.remove(\"gaveUpHighlight\");\n  });\n\n  const giveUpArray = elements.semitoneArray(document).querySelectorAll(\"div\");\n  giveUpArray.forEach((noteElement) => {\n    noteElement.classList.remove(\"gaveUpHighlight\");\n  });\n}\n\nfunction correctDistanceMessage(distance) {\n  const box1 = elements.box1(document).textContent.trim();\n  const box2 = elements.box2(document).textContent.trim();\n  const message = elements.giveUpMessage(document);\n  const indexes = checkIndex([box1, box2]);\n  let clockwiseDistance = 0;\n  let antiClockwiseDistance = 0;\n  if (indexes[0] < indexes[1]) {\n    clockwiseDistance = Math.abs(indexes[1] - indexes[0]);\n    antiClockwiseDistance = 12 - indexes[1] + indexes[0];\n  } else {\n    clockwiseDistance = 12 - indexes[0] + indexes[1];\n    antiClockwiseDistance = Math.abs(indexes[1] - indexes[0]);\n  }\n  message.textContent = `The Clockwise distance (From ${box1} right to ${box2}) is ${clockwiseDistance} semitones and the Anti-Clockwise distance (From ${box1} left to ${box2}) is ${antiClockwiseDistance} semitones.`;\n}\n\nmodule.exports = {\n  displayRandomNotes,\n  displayMessage,\n  clearMessage,\n  removesHighlight,\n  hideSemitoneArray,\n  showSemitoneArray,\n  giveUpSemitoneArray,\n  removeAllHighlightsInArray,\n  correctDistanceMessage,\n};\n\n\n//# sourceURL=webpack://tshegofatso-kgokong-199-semitone-difference-basic-algorithm-javascript/./src/helpers/dom_helper_functions.js?");

/***/ }),

/***/ "./src/helpers/dom_helper_object.js":
/*!******************************************!*\
  !*** ./src/helpers/dom_helper_object.js ***!
  \******************************************/
/***/ ((module) => {

eval("const elements = {\n  displayMessage: (document) => document.getElementById(\"displayMessage\"),\n  giveUpMessage: (document) => document.getElementById(\"giveUpMessage\"),\n  streak: (document) => document.getElementById(\"streak\"),\n  form: (document) => document.getElementById(\"form\"),\n  answer: (document) => document.getElementById(\"answer\"),\n  randomize: (document) => document.getElementById(\"randomize\"),\n  giveUp: (document) => document.getElementById(\"giveUp\"),\n  restart: (document) => document.getElementById(\"restart\"),\n  box1: (document) => document.getElementById(\"box1\"),\n  box2: (document) => document.getElementById(\"box2\"),\n  checkAnswer: (document) => document.getElementById(\"check\"),\n  restart: (document) => document.getElementById(\"restart\"),\n  semitoneArray: (document) => document.getElementById(\"semitone-array\"),\n};\n\nmodule.exports = { elements };\n\n\n//# sourceURL=webpack://tshegofatso-kgokong-199-semitone-difference-basic-algorithm-javascript/./src/helpers/dom_helper_object.js?");

/***/ }),

/***/ "./src/helpers/jam_buddy_helper_function.js":
/*!**************************************************!*\
  !*** ./src/helpers/jam_buddy_helper_function.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const {\n  theNoteCircle,\n  allErrorMessages,\n} = __webpack_require__(/*! ./jam_buddy_helper_object */ \"./src/helpers/jam_buddy_helper_object.js\");\n\nconst randomizeItem = () =>\n  Math.floor(Math.random() * theNoteCircle.arrayOfNotes.length);\n\nconst getRandomNotes = (randomNote) => {\n  if (Array.isArray(theNoteCircle.arrayOfNotes[randomNote])) {\n    randomNote =\n      theNoteCircle.arrayOfNotes[randomNote][\n        Math.floor(\n          Math.random() * theNoteCircle.arrayOfNotes[randomNote].length\n        )\n      ];\n  } else {\n    randomNote = theNoteCircle.arrayOfNotes[randomNote];\n  }\n  return randomNote;\n};\n\nconst randomize = () => {\n  let random1 = randomizeItem();\n  let random2;\n\n  do {\n    random2 = randomizeItem();\n  } while (random1 === random2);\n\n  random1 = getRandomNotes(random1);\n  random2 = getRandomNotes(random2);\n\n  return [random1, random2];\n};\n\nconst validateSetNotes = (arr) => {\n  if (arr === undefined) {\n    throw new Error(allErrorMessages.notesNotDefined);\n  } else if (\n    theNoteCircle.arrayOfNotes.flat(1).indexOf(arr[0] || arr[1]) === -1\n  ) {\n    throw new Error(allErrorMessages.invalidNote);\n  } else if (arr[0] === arr[1]) {\n    throw new Error(allErrorMessages.setSameNotes);\n  } else if (arr.length !== 2) {\n    throw new Error(allErrorMessages.invalidLengthOfArray);\n  }\n};\n\nconst validateCheckAnswer = (answer) => {\n  if (!Number.isInteger(answer)) {\n    throw new Error(allErrorMessages.invalidCheckAnswerType);\n  } else if (answer > 12 || answer < 0) {\n    throw new Error(allErrorMessages.invalidCheckAnswerDistance);\n  }\n};\n\nconst checkIndex = (notes) => {\n  let noteIndex1 = 0;\n  let noteIndex2 = 0;\n\n  for (let i = 0; i < theNoteCircle.arrayOfNotes.length; i++) {\n    if (\n      theNoteCircle.arrayOfNotes[i] === notes[0] ||\n      theNoteCircle.arrayOfNotes[i].indexOf(notes[0]) !== -1\n    ) {\n      noteIndex1 = i;\n    }\n    if (\n      theNoteCircle.arrayOfNotes[i] === notes[1] ||\n      theNoteCircle.arrayOfNotes[i].indexOf(notes[1]) !== -1\n    ) {\n      noteIndex2 = i;\n    }\n  }\n  return [noteIndex1, noteIndex2];\n};\n\nconst calculatedAnswer = (current, answer) => {\n  const noteIndex1 = checkIndex(current)[0];\n  const noteIndex2 = checkIndex(current)[1];\n\n  if (Math.abs(noteIndex1 - noteIndex2) === answer) {\n    return true;\n  } else if (\n    theNoteCircle.arrayOfNotes.length -\n      Math.max(noteIndex1, noteIndex2) +\n      Math.min(noteIndex1, noteIndex2) ===\n    answer\n  ) {\n    return true;\n  }\n  return false;\n};\n\nmodule.exports = {\n  randomize,\n  validateSetNotes,\n  validateCheckAnswer,\n  calculatedAnswer,\n  checkIndex,\n};\n\n\n//# sourceURL=webpack://tshegofatso-kgokong-199-semitone-difference-basic-algorithm-javascript/./src/helpers/jam_buddy_helper_function.js?");

/***/ }),

/***/ "./src/helpers/jam_buddy_helper_object.js":
/*!************************************************!*\
  !*** ./src/helpers/jam_buddy_helper_object.js ***!
  \************************************************/
/***/ ((module) => {

eval("const allErrorMessages = {\n  invalidNote: \"This is an invalid note\",\n  setSameNotes: \"You cannot check the distance of the same notes\",\n  invalidCheckAnswerType: \"Check Answer should be an integer\",\n  invalidLengthOfArray: \"The length of the array should be 2\",\n  invalidCheckAnswerDistance: \"Answer should range between 0 and 12\",\n  notesNotDefined: \"Notes have not been defined\",\n};\n\nconst theNoteCircle = {\n  arrayOfNotes: [\n    \"A\",\n    [\"A#\", \"Bb\"],\n    \"B\",\n    \"C\",\n    [\"C#\", \"Db\"],\n    \"D\",\n    [\"D#\", \"Eb\"],\n    \"E\",\n    \"F\",\n    [\"F#\", \"Gb\"],\n    \"G\",\n    [\"G#\", \"Ab\"],\n  ],\n};\nmodule.exports = { allErrorMessages, theNoteCircle };\n\n\n//# sourceURL=webpack://tshegofatso-kgokong-199-semitone-difference-basic-algorithm-javascript/./src/helpers/jam_buddy_helper_object.js?");

/***/ }),

/***/ "./src/jam_buddy.js":
/*!**************************!*\
  !*** ./src/jam_buddy.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const {\n  randomize,\n  validateSetNotes,\n  validateCheckAnswer,\n  calculatedAnswer,\n} = __webpack_require__(/*! ./helpers/jam_buddy_helper_function */ \"./src/helpers/jam_buddy_helper_function.js\");\n\nclass JamBuddy {\n  constructor() {\n    this.notes = [];\n    this.streak = 0;\n  }\n  getCurrentNotes() {\n    return this.notes;\n  }\n  setCurrentNotes(arr) {\n    validateSetNotes(arr);\n    this.notes = arr;\n  }\n\n  randomizeCurrentNotes() {\n    this.notes = randomize();\n  }\n\n  checkAnswer(answer) {\n    validateCheckAnswer(answer);\n\n    if (calculatedAnswer(this.notes, answer)) {\n      this.streak++;\n    } else {\n      this.streak = 0;\n    }\n\n    return calculatedAnswer(this.notes, answer);\n  }\n}\n\nmodule.exports = { JamBuddy };\n\n\n//# sourceURL=webpack://tshegofatso-kgokong-199-semitone-difference-basic-algorithm-javascript/./src/jam_buddy.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/dom_manipulation.js");
/******/ 	
/******/ })()
;