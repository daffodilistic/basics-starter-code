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
      <h4>${exercise.instruction}</h4>
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
  EXERCISES[activeSwitcherIndex].functionCall();
});

const diceRollHistory = [];

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

function clearOutput() {
  const outputElement = document.querySelector("#output-div");
  outputElement.innerHTML = "";
}