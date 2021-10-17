const EXERCISES = Object.freeze(
  [
    {
      title: "Last Roll",
      instruction: "Enter your guess:",
      inputId: "input-last-roll",
      functionCall: lastRoll
    },
    {
      title: "Win/Loss",
      instruction: "Enter your guess:",
      inputId: "input-win-loss",
      functionCall: lastRollWithWinLoss
    },
    {
      title: "Most Rolled",
      instruction: "Enter your guess:",
      inputId: "input-most-rolled",
      functionCall: mostRolled
    },
    {
      title: "Guessing",
      instruction: "Enter your guess:",
      inputId: "input-guessing",
      functionCall: guessing
    },
    {
      title: "Advanced Guessing",
      instruction: "Enter your guess:",
      inputId: "input-advanced-guessing",
      functionCall: advancedGuessing
    },
    {
      title: "Secret Word X in a Row",
      instruction: "Enter your guess:",
      inputId: "input-secretWord",
      functionCall: secretWord
    },
    {
      title: "Dice Within 2 Dice",
      instruction: "Enter your guess:",
      inputId: "input-dice-within",
      functionCall: diceWithin
    },
  ]
);

class AppState {
  #rolls = [];
  #winCount = 0;
  #points = 0;
  #currentSwitcherIndex = -1;
  guessesToWin = -1;
  guessCount = 0;
  correctGuesses = 0;
  secretWords = ["banana", "chisel", "faucet", "garden"];
  currentSecretWord = "";
  fudgeDice = -1;

  constructor() {
  }

  addRoll(roll, addWinCount = false, points = 1) {
    this.#rolls.push(roll);
    if (addWinCount) {
      this.#winCount++;
      this.#points += points;
    }
  }

  getLastRoll() {
    if (this.#rolls.length == 0) {
      return -1;
    } else {
      return this.#rolls[this.#rolls.length - 1];
    }
  }

  getWinRate() {
    return this.#winCount / this.#rolls.length;
  }

  getWinPoints() {
    return this.#points;
  }

  getMostRolled() {
    const counts = {
      '0': 0,
      '1': 0,
      '2': 0,
      '3': 0,
      '4': 0,
      '5': 0
    };
    for (const num of this.#rolls) {
      counts[num - 1] += 1;
    }
    // console.log(counts);
    // console.log(this.#rolls);
    console.log(Object.entries(counts));
    let mostFrequentRollIndex = 0;
    for (const [key, value] of Object.entries(counts)) {
      if (value > counts[mostFrequentRollIndex]) {
        mostFrequentRollIndex = key;
      }
    }

    return Number(mostFrequentRollIndex) + 1;
  }

  resetState() {
    this.#rolls = [];
    this.#winCount = 0;
    this.#points = 0;
    this.guessesToWin = -1;
    this.guessCount = 0;
    this.correctGuesses = 0;
    this.secretWords = ["banana", "chisel", "faucet", "garden"];
    this.currentSecretWord = "";
    this.fudgeDice = -1;
  }

  getLastSwitcherIndex() {
    return this.#currentSwitcherIndex;
  }

  setLastSwitcherIndex(index) {
    this.#currentSwitcherIndex = index;
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

  if (App.getLastSwitcherIndex() != activeSwitcherIndex) {
    App.resetState();
    App.setLastSwitcherIndex(activeSwitcherIndex);
  }

  // console.log(`selected index is ${activeSwitcherIndex}`);

  EXERCISES[activeSwitcherIndex].functionCall();
});

function diceWithin() {
  const diceGuess = parseInt(document.querySelector("#input-dice-within").value);
  const diceRolls = [rollDice(), rollDice()];

  if (App.fudgeDice === -1) {
    App.fudgeDice = 1 + Math.floor(Math.random() * 3);
  }

  let isWithinRange = diceRolls.some((roll) => {
    return diceGuess >= (roll - App.fudgeDice) && diceGuess <= (roll + App.fudgeDice)
  });

  if (isWithinRange) {
    displayResults(`You guessed ${diceGuess} and rolled (${diceRolls.toString()}). Your guess is within ${App.fudgeDice} of the rolls. You win!`);
    App.fudgeDice = -1;
  } else {
    displayResults(`You guessed ${diceGuess} and rolled (${diceRolls.toString()}). You lost!`);
  }
}

function secretWord() {
  const wordGuess = document.querySelector("#input-secretWord").value;

  App.currentSecretWord = App.secretWords[Math.floor(Math.random() * App.secretWords.length)];
  App.secretWords = App.secretWords.filter(word => word !== App.currentSecretWord);

  if (App.guessesToWin === -1) {
    App.guessesToWin = 2 + Math.floor(Math.random() * 3);
  }

  App.guessCount += 1;

  if (App.currentSecretWord === wordGuess) {
    App.correctGuesses += 1;
  }

  let result = `You guessed <b>${wordGuess}</b>. The secret word was <b>${App.currentSecretWord}</b>. You need ${App.guessesToWin - App.correctGuesses} more guesses to win.`;
  document.querySelector("#input-secretWord").value = "";
  console.log(App.secretWords);
  if (App.correctGuesses === App.guessesToWin && App.guessesToWin === App.guessCount) {
    result = `You win! You guessed <b>${wordGuess}</b>. The secret word was <b>${App.currentSecretWord}</b>.`;
    App.resetState();
  } else if (App.guessCount > App.correctGuesses) {
    result = `You lost! You guessed <b>${wordGuess}</b>. The secret word was <b>${App.currentSecretWord}</b>. You needed ${App.guessesToWin - App.correctGuesses} more guesses to win.`;
    App.resetState();
  }

  displayResults(result);
}

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
  } else {
    result += "You lose!";
  }

  App.addRoll(randomDiceNumber);

  displayResults(result);
}

function lastRollWithWinLoss() {
  const randomDiceNumber = rollDice();
  const diceGuess = parseInt(document.querySelector("#input-win-loss").value);

  let result = "";

  if (App.getLastRoll() != -1) {
    result += `Your last roll was ${App.getLastRoll()}` + "<br>";
  }

  result += `You just rolled a ${randomDiceNumber}. You guessed ${diceGuess}.` + "<br>";

  if (randomDiceNumber == diceGuess) {
    result += "You win!";
  } else {
    result += "You lose!";
  }

  App.addRoll(randomDiceNumber, randomDiceNumber == diceGuess);

  result += "<br>" + `Your win rate is ${(App.getWinRate() * 100).toFixed(2)}%!`;

  displayResults(result);
}

function mostRolled() {
  const randomDiceNumber = rollDice();
  const diceGuess = parseInt(document.querySelector("#input-most-rolled").value);

  let result = "";

  result += `You just rolled a ${randomDiceNumber}. You guessed ${diceGuess}.` + "<br>";

  if (randomDiceNumber == diceGuess) {
    result += "You win!";
  } else {
    result += "You lose!";
  }

  App.addRoll(randomDiceNumber);

  result += "<br>" + `The number which you rolled the most is ${App.getMostRolled()}.`;

  displayResults(result);
}

function guessing() {
  const randomDiceNumber = rollDice();
  const diceGuess = parseInt(document.querySelector("#input-guessing").value);

  let result = "";
  let pointsWon = 0;

  result += `You just rolled a ${randomDiceNumber}. You guessed ${diceGuess}.` + "<br>";

  if ([randomDiceNumber - 1, randomDiceNumber, randomDiceNumber + 1].includes(diceGuess)) {
    if (randomDiceNumber == diceGuess) {
      result += "You win 2 points!";
      pointsWon = 2;
    } else {
      result += "You win 1 point!";
      pointsWon = 1;
    }
  } else {
    result += "You didn't win anything!";
  }

  // console.log(pointsWon);

  App.addRoll(randomDiceNumber, pointsWon > 0, pointsWon);

  result += "<br>" + `Your current score is ${App.getWinPoints()}!`;

  displayResults(result);
}

function advancedGuessing() {
  const randomDiceNumber = rollDice();
  const diceGuess = parseInt(document.querySelector("#input-advanced-guessing").value);

  let result = "";
  let pointsWon = 0;

  result += `You just rolled a ${randomDiceNumber}. You guessed ${diceGuess}.` + "<br>";

  if ((diceGuess >= randomDiceNumber - 4) && (diceGuess <= randomDiceNumber + 4)) {
    if (randomDiceNumber == diceGuess) {
      result += "You win 5 points!";
      pointsWon = 5;
    } else {
      pointsWon = 5 - Math.abs(diceGuess - randomDiceNumber);
      result += `You win ${pointsWon} point(s)!`;
    }
  } else {
    result += "You didn't win anything!";
  }

  // console.log(pointsWon);

  App.addRoll(randomDiceNumber, pointsWon > 0, pointsWon);

  result += "<br>" + `Your current score is ${App.getWinPoints()}!`;

  displayResults(result);
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