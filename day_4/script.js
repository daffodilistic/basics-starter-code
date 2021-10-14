const EXERCISES = Object.freeze(
  [
    {
      title: "Last Roll",
      instruction: "Enter your guess:",
      inputId: "input-last-roll",
      functionCall: lastRoll
    }
  ]
);

class AppState {
  constructor() {
    this.rolls = [];
  }

  addRoll(roll) {
    this.rolls.push(roll);
  }

  getLastRoll() {
    if (this.rolls.length == 0) {
      return -1;
    } else {
      return this.rolls[this.rolls.length - 1];
    }
  }
}

const App = new AppState();

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

function lastRoll() {
  const randomDiceNumber = rollDice();
  const diceGuess = parseInt(document.querySelector("#input-last-roll").value);
  
  let result = "";

  if (App.getLastRoll() != -1) {
    result += `Your last roll was ${App.getLastRoll()}` + "<br>";
  }
  
  result += `You just rolled a ${randomDiceNumber}. You guessed ${diceGuess}.` + "<br>";

  if (randomDiceNumber == diceGuess) {
    result += "You win!";
    displayResults(result);
  } else {
    result += "You lose!";
    displayResults(result);
  }
  App.addRoll(randomDiceNumber);
}

function rollDice() {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

function displayResults(result, inputId) {
  let outputElement = document.querySelector("#output-div");
  outputElement.innerHTML = result;

  // Reset input value
  if (inputId) {
    document.querySelector(inputId).value = "";
  }
}