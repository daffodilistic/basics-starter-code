const EXERCISES = Object.freeze(
  [
    {
      title: "Dice Game with History",
      instruction: "Enter guess:",
      inputId: "input-dice-game",
      functionCall: diceGameWithHistory
    },
    {
      title: "Emoji Drawing",
      instruction: "Enter size of square:",
      inputId: "input-emoji-drawing",
      functionCall: emojiDrawing
    },
    {
      title: "Multi-Dice Game",
      instruction: "Press Submit to start the game!",
      inputId: "input-multi-dice",
      instructionsId: "instructions-multi-dice",
      functionCall: multiDiceGame
    }
  ]
);

EXERCISES.forEach((exercise) => {
  const switcher = document.querySelector("#switcher");
  const switcherContent = document.querySelector("#switcher-content");

  switcher.innerHTML += `
    <li>
      <a href="#">${exercise.title}</a>
    </li>`;
  switcherContent.innerHTML += `
    <li>
      <h4 id="${exercise.instructionsId}">${exercise.instruction}</h4>
      <input id="${exercise.inputId}" class="uk-form-small uk-input" />
    </li>`;
});

// Define button click functionality
const button = document.querySelector("#submit-button");
button.addEventListener("click", function () {
  const switcher = UIkit.switcher("#switcher");
  const activeSwitcherIndex = switcher.index();

  // console.log(`selected index is ${activeSwitcherIndex}`);
  clearOutput();
  diceRollHistory = [];
  EXERCISES[activeSwitcherIndex].functionCall();
});

let diceRollHistory = [];
// state -1: enter no. of dice to roll
// state 0: dice guess from user.
// state 1: check for win condition
// state 2: end game?
let diceGameState = -1;
let diceGuess = -1;
let diceToRoll = -1;
let winCount = 0;
let gameCount = 0;

function multiDiceGame() {
  if (diceGameState === -1) {
    setInstructionsText("Enter number of dice to roll:", "#instructions-multi-dice");
    diceRollHistory = [];
    diceGuess = -1;
    diceToRoll = -1;
    diceGameState++;
  } else if (diceGameState === 0) {
    diceToRoll = Number(document.querySelector("#input-multi-dice").value);
    console.log("No. of dice to roll is " + diceToRoll);
    setInstructionsText("Enter your guess:", "#instructions-multi-dice");
    diceGameState++;
  } else if (diceGameState === 1) {
    diceGuess = Number(document.querySelector("#input-multi-dice").value);
    console.log("Number To Guess is " + diceGuess);
    setInstructionsText("Click submit to start the game!", "#instructions-multi-dice");
    diceGameState++;
  } else if (diceGameState === 2) {
    clearInput("#input-multi-dice");

    let winGame = false;

    for (let i = 0; i < diceToRoll; i++) {
      const diceResult = Math.floor(Math.random() * 6) + 1;
      diceRollHistory.push(diceResult);
      if (diceResult === diceGuess) {
        winGame = true;
        i = diceToRoll;
      }
    }

    if (winGame) {
      displayResults("Congrats you win!");
      diceGameState = -1;
      winCount += 1;
    } else {
      displayResults("Sorry, you lost!");
      diceGameState = -1;
    }

    gameCount += 1;

    displayResults("Your dice rolls were: " + diceRollHistory);
    displayResults(`Your win ratio is: ${(winCount / gameCount) * 100}%`);

    setInstructionsText("Click submit to restart the game!", "#instructions-multi-dice");
  }
}

function diceGameWithHistory() {
  const diceResult = Math.floor(Math.random() * 6) + 1;
  const diceGuess = Number(document.querySelector("#input-dice-game").value);
  let isValidInput = false;

  if (Number.isNaN(diceGuess)) {
    displayResults("Sorry, please enter a number!");
  } else if (diceGuess > 6 || diceGuess < 1) {
    displayResults("Sorry, please enter a number between 1 and 6!");
  } else {
    isValidInput = true;
  }

  if (isValidInput) {
    diceRollHistory.push(diceGuess);
    if (diceResult == parseInt(diceGuess)) {
      displayResults("You guessed correctly!");
    } else {
      displayResults(`You guessed incorrectly. The dice rolled ${diceResult}`);
    }
    displayResults("Your guesses were: " + diceRollHistory);
  }
}

function emojiDrawing() {
  drawEmojiSquare();
  displayResults("");
  drawEmojiTriangle();
}

function drawEmojiTriangle() {
  const triangleSize = Number(document.querySelector("#input-emoji-drawing").value);
  let emojiString = "";

  for (let i = 0; i < triangleSize; i++) {
    for (let j = 0; j < i + 1; j++) {
      emojiString += "🐹";
    }
    emojiString += "<br/>";
  }

  displayResults(emojiString);
}

function drawEmojiSquare() {
  const squareSize = Number(document.querySelector("#input-emoji-drawing").value);
  let emojiString = "";

  for (let i = 0; i < squareSize; i++) {
    for (let j = 0; j < squareSize; j++) {
      if ((i > 0 && i < squareSize - 1) &&
        (j > 0 && j < squareSize - 1)) {
        emojiString += "🐭";
      } else {
        emojiString += "🐱";
      }
    }
    emojiString += "<br/>";
  }

  displayResults(emojiString);
}

function displayResults(result, inputId) {
  const outputElement = document.querySelector("#output-div");
  outputElement.innerHTML += result + "<br/>";

  // Reset input value
  if (inputId) {
    document.querySelector(inputId).value = "";
  }
}

function setInstructionsText(text, id) {
  const instructionText = document.querySelector(id);
  instructionText.innerHTML = text;
}

function clearInput(id) {
  const outputElement = document.querySelector(id);
  outputElement.value = "";
}

function clearOutput() {
  const outputElement = document.querySelector("#output-div");
  outputElement.innerHTML = "";
}