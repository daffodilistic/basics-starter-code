const EXERCISES = Object.freeze(
  [
    {
      title: "Mode Switch",
      instruction: "Enter mode name:",
      inputId: "input-mode",
      functionCall: modeSwitch
    },
    {
      title: "Dice Game Validation",
      instruction: "Enter guess:",
      inputId: "input-dice-game",
      functionCall: diceGameValidation
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

  EXERCISES[activeSwitcherIndex].functionCall();
});

class App {
  mode = "";
}

function diceGameValidation() {
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

  console.log("OK");

  if (isValidInput) {
    if (diceResult == parseInt(diceGuess)) {
      displayResults("You guessed correctly!", "#input-dice-game");
    } else {
      displayResults(`You guessed incorrectly. The dice rolled ${diceResult}`);
    }
  }
}

function modeSwitch() {
  const modeInput = document.querySelector("#input-mode").value;
  let mode = "";
  if (["greenmode", "bluemode", "redmode"].includes(modeInput)) {
    mode = modeInput;
  }

  let quote = "";
  switch (mode) {
    case "bluemode":
      quote = "A fool sees not the same tree that a wise man sees. -William Blake";
      break;
    case "greenmode":
      quote = "The sea, once it casts its spell, holds one in its net of wonder forever. -Jacques Cousteau";
      break;
    case "redmode":
      quote = 'Difficulties strengthen the mind, as labor does the body. -Seneca';
      break;
    default:
      quote = "There are 10 types of people in this world...";
      break;
  }

  displayResults(quote);
}

function displayResults(result, inputId) {
  let outputElement = document.querySelector("#output-div");
  outputElement.innerHTML = result;

  // Reset input value
  if (inputId) {
    document.querySelector(inputId).value = "";
  }
}