const EXERCISES = Object.freeze(
  [
    {
      title: "Dice Game",
      instruction: "Enter your guess:",
      inputId: "input-dice-game",
      functionCall: getDiceGameResult
    },
    {
      title: "Twice the Guess Game",
      instruction: "Enter your guess:",
      inputId: "input-twice-guess",
      functionCall: getTwiceGuessResult
    },
    {
      title: "Close Enough Dice Game",
      instruction: "Enter your guess:",
      inputId: "input-close-enough",
      functionCall: getCloseEnoughResult
    },
    {
      title: "Secret Words",
      instruction: "Enter the password:",
      inputId: "input-secret-words",
      functionCall: getSecretText
    },
    {
      title: "Easier Dice Game",
      instruction: "Enter your guess:",
      inputId: "input-easier-dice-game",
      functionCall: getEasierDiceGameResult
    },
    {
      title: "Even Easier Dice Game",
      instruction: "Enter your guess:",
      inputId: "input-even-easier-dice-game",
      functionCall: getEvenEasierDiceGameResult
    },
    {
      title: "2d6 Dice Game",
      instruction: "Enter your guess:",
      inputId: "input-2d6-dice-game",
      functionCall: get2d6DiceGameResult
    },
    {
      title: "2d6 + Snake Eyes Dice Game",
      instruction: "Enter your guess:",
      inputId: "input-2d6-snake-eyes-dice-game",
      functionCall: get2d6SnakeEyesDiceGameResult
    },
    {
      title: "New Winning Conditions",
      instruction: "Enter your guess:",
      inputId: "input-new-winning-conditions",
      functionCall: getNewWinningConditions
    },
    {
      title: "Lucky 11",
      instruction: "Enter your guess:",
      inputId: "input-lucky-11",
      functionCall: getLucky11
    },
    {
      title: "Hawker Food Categorisation",
      instruction: "Enter a hawker dish:",
      inputId: "input-hawker-food-categorisation",
      functionCall: getHawkerDishCategory
    },
    {
      title: "4D Single Digit Guess",
      instruction: "Enter your guess:",
      inputId: "input-4d-single-digit-guess",
      functionCall: get4dSingleDigitGuess
    },
    {
      title: "Hawker Food Randomness",
      instruction: "Enter your guess:",
      inputId: "input-hawker-food-randomness",
      functionCall: getHawkerDish
    },
    {
      title: "4D Range Guess",
      instruction: "Enter your guess:",
      inputId: "input-4d-range-guess",
      functionCall: get4dRangeGuess
    },
    {
      title: "Hawker Food Omakase",
      instruction: "Enter your desired food:",
      inputId: "input-hawker-food-omakase",
      functionCall: getHawkerOmakase
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

function getDiceGameResult() {
  const diceResult = rollDice();
  const diceGuess = document.querySelector("#input-dice-game").value;

  if (isPassphraseCorrect(diceGuess) || diceResult == parseInt(diceGuess)) {
    displayResults("You guessed correctly!", "#input-dice-game");
  } else {
    displayResults(`You guessed incorrectly. The dice rolled ${diceResult}`);
  }
}

function getTwiceGuessResult() {
  const diceResult = rollDice();
  const diceGuess = document.querySelector("#input-twice-guess").value;

  if (isPassphraseCorrect(diceGuess) || (diceResult / 2 == diceGuess)) {
    displayResults("You guessed correctly!", "#input-twice-guess");
  } else {
    displayResults(`You guessed incorrectly. The dice rolled ${diceResult}`);
  }
}

function getCloseEnoughResult() {
  const diceResult = rollDice();
  const diceGuess = document.querySelector("#input-close-enough").value;

  if (isPassphraseCorrect(diceGuess) || [diceResult - 1, diceResult, diceResult + 1].includes(parseInt(diceGuess))) {
    displayResults(`Your guess was close enough! The dice rolled ${diceResult}`, "#input-close-enough");
  } else {
    displayResults(`You guessed incorrectly. The dice rolled ${diceResult}`);
  }
}

function getSecretText() {
  const passphrase = document.querySelector("#input-secret-words").value;
  const validPassphrases = [
    "palatable papaya",
    "neat noodles",
    "awesome ayam",
    "delicious dumpings",
  ]
  if (isPassphraseCorrect(passphrase, validPassphrases)) {
    displayResults(`Today's lucky number is ${rollDice()}`, "#input-secret-words");
  } else {
    displayResults("Hello World");
  }
}

function getEasierDiceGameResult() {
  const diceResult = rollDice();
  const diceGuess = document.querySelector("#input-easier-dice-game").value;

  if (isPassphraseCorrect(diceGuess) || [diceResult - 2, diceResult, diceResult + 2].includes(parseInt(diceGuess))) {
    displayResults(`Your guess was close enough! The dice rolled ${diceResult}`, "#input-easier-dice-game");
  } else {
    displayResults(`You guessed incorrectly. The dice rolled ${diceResult}`);
  }
}

function getEvenEasierDiceGameResult() {
  const diceGuess = document.querySelector("#input-even-easier-dice-game").value;
  const diceResult = rollDice() % 2 ? "even" : "odd";

  if (isPassphraseCorrect(diceGuess) || diceGuess == diceResult) {
    displayResults(`Your guess was correct!`, "#input-even-easier-dice-game");
  } else {
    displayResults(`You guessed incorrectly. The dice rolled a ${diceResult} number`);
  }
}

function get2d6DiceGameResult() {
  const diceGuess = document.querySelector("#input-2d6-dice-game").value;
  const diceResult = [rollDice(), rollDice()];

  if (parseInt(diceGuess) == diceResult[0] &&
    parseInt(diceGuess) == diceResult[1]) {
    displayResults(`Your guess was correct!`, "#input-2d6-dice-game");
  } else {
    displayResults(`You guessed incorrectly. The dices rolled ${diceResult[0]} and ${diceResult[1]}`);
  }
}

function get2d6SnakeEyesDiceGameResult() {
  const diceGuess = document.querySelector("#input-2d6-snake-eyes-dice-game").value;
  const diceResult = [rollDice(), rollDice()];

  if ((diceResult[0] != 1 && diceResult[1] != 1) &&
    parseInt(diceGuess) == diceResult[0] &&
    parseInt(diceGuess) == diceResult[1]) {
    displayResults(`Your guess was correct!`, "#input-2d6-snake-eyes-dice-game");
  } else {
    displayResults(`You guessed incorrectly. The dices rolled ${diceResult[0]} and ${diceResult[1]}`);
  }
}

function getNewWinningConditions() {
  const diceGuess = document.querySelector("#input-new-winning-conditions").value;
  const diceRolls = [rollDice(), rollDice()];
  const results = [];

  // Condition 1: User wins if guess is within 1 for any of 2 dice
  results[0] = diceRolls.some((roll) => {
    return [roll - 1, roll, roll + 1].includes(parseInt(diceGuess));
  });

  // Condition 2: User wins if guess is within 1 for all 2 dice.
  results[1] = diceRolls.every((roll, index) => {
    return [roll - 1, roll, roll + 1].includes(parseInt(diceGuess));
  });

  // Condition 3: User wins if guess is within 1 of either dice but the user does not roll snake eyes.
  results[2] = results[0] && !(diceRolls[0] == 1 && diceRolls[1] == 1);

  // Condition 4: User wins if guess is within 1 of either dice or if the user rolls snake eyes.
  results[3] = results[0] || (diceRolls[0] == 1 && diceRolls[1] == 1);

  displayResults(
    `The dices rolled ${diceRolls[0]} and ${diceRolls[1]}, and the user guessed ${diceGuess}.
    <ol>
      <li>Guess is within 1 for any dice: <b>${results[0]}</b></li>
      <li>Guess is within 1 for all 2 dice: <b>${results[1]}</b></li>
      <li>Guess is within 1 of either dice and no snake eyes: <b>${results[2]}</b></li>
      <li>Guess is within 1 of either dice, or roll is snake eyes: <b>${results[3]}</b></li>
    </ol>
    `,
    "#input-new-winning-conditions"
  );
}

function getLucky11() {
  const diceGuess = parseInt(document.querySelector("#input-lucky-11").value);
  const diceRolls = [rollDice(), rollDice()];

  if ((diceRolls[0] + diceRolls[1] == 11) ||
    diceRolls.includes(diceGuess)) {
    displayResults(`You win! The dice rolled ${diceRolls[0]} and ${diceRolls[1]}`, "#input-lucky-11");
  } else {
    displayResults(`Sorry, no dice! The dice rolled ${diceRolls[0]} and ${diceRolls[1]}`, "#input-lucky-11");
  }
}

function getHawkerDishCategory() {
  const dishGuess = document.querySelector("#input-hawker-food-categorisation").value;
  const dishList = [
    "chicken rice",
    "roti prata",
    "nasi lemak",
    "hokkien mee",
    "bak kut teh",
    "laksa"
  ];

  let foodType = "unknown";

  if (dishGuess == dishList[0] || dishGuess == dishList[2]) {
    foodType = "rice";
  } else if (dishGuess == dishList[3] || dishGuess == dishList[5]) {
    foodType = "noodle";
  } else if (dishGuess == dishList[1] || dishGuess == dishList[4]) {
    foodType = "other";
  }

  displayResults(`Your hawker food is a ${foodType} category.`, "#input-hawker-food-categorisation");
}

function get4dSingleDigitGuess() {
  const guess = parseInt(document.querySelector("#input-4d-single-digit-guess").value);
  const luckyNumber = [generateDigit(), generateDigit(), generateDigit(), generateDigit()];

  if (luckyNumber.includes(guess)) {
    displayResults(`You win! Your guess was ${guess} and the 4D number was ${luckyNumber.join("")}`, "#input-4d-single-digit-guess");
  } else {
    displayResults(`Sorry, you lost! Your guess was ${guess} and the 4D number was ${luckyNumber.join("")}`, "#input-4d-single-digit-guess");
  }
}

function getHawkerDish() {
  const dishGuess = document.querySelector("#input-hawker-food-randomness").value;
  const diceRolls = rollDice() - 1;
  const dishList = [
    "chicken rice",
    "roti prata",
    "nasi lemak",
    "hokkien mee",
    "bak kut teh",
    "laksa"
  ];

  if (dishList[diceRolls] == dishGuess) {
    displayResults(`Congrats! You guessed correctly! Your ${dishList[diceRolls]} is free!`);
  } else {
    displayResults(`Sorry! You guessed wrong! Pay up!`);
  }
}

function get4dRangeGuess() {
  const guess = parseInt(document.querySelector("#input-4d-range-guess").value);
  const luckyNumber = parseInt([generateDigit(), generateDigit(), generateDigit(), generateDigit()].join(""));

  if ((guess > (luckyNumber - 1000)) && (guess < (luckyNumber + 1000))) {
    displayResults(`You win! Your guess was ${guess} and the 4D number was ${luckyNumber}`, "#input-4d-range-guess");
  } else {
    displayResults(`You lost! Your guess was ${guess} and the 4D number was ${luckyNumber}`, "#input-4d-range-guess");
  }
}

function getHawkerOmakase() {
  const inputDish = document.querySelector("#input-hawker-food-omakase").value;
  const riceDishes = [
    {
      name: "chicken rice",
      hasSambal: false
    },
    {
      name: "nasi lemak",
      hasSambal: true
    },
    {
      name: "bak kut teh",
      hasSambal: false
    }
  ];
  const noodleDishes = [
    {
      name: "hokkien mee",
      hasSambal: false
    },
    {
      name: "beef hor fan",
      hasSambal: false
    },
    {
      name: "laksa",
      hasSambal: true
    }
  ];

  let firstDish = {
    name: "",
    hasSambal: false
  };
  let secondDish = {
    name: "",
    hasSambal: false
  };
  let outputString = "-";

  // Generate dishes
  if (inputDish == "rice") {
    // let i = Math.ceil(rollDice() / 2) - 1;
    // console.log(Math.ceil(rollDice() / 2) - 1);
    firstDish = riceDishes[Math.ceil(rollDice() / 2) - 1];
    secondDish = riceDishes[Math.ceil(rollDice() / 2) - 1];
  } else if (inputDish == "noodle") {
    firstDish = noodleDishes[Math.ceil(rollDice() / 2) - 1];
    secondDish = noodleDishes[Math.ceil(rollDice() / 2) - 1];
  }

  // Random 30% chance to swap second dish for prata
  if (generateDigit() / 10 <= 0.3) {
    secondDish = {
      name: "roti prata",
      hasSambal: false
    };
    outputString = `The gods have smiled upon you!`;
    outputString += `<br>Uncle has cooked ${firstDish.name} and ${secondDish.name} for you!`;
  } else {
    outputString = `Uncle has cooked ${firstDish.name} and ${secondDish.name} for you!`;
  }

  if (firstDish.hasSambal || secondDish.hasSambal) {
    outputString += `<br>Complimentary sambal will be included.`;
  }

  // Return output.
  displayResults(outputString, "#input-hawker-food-omakase");
}

function generateDigit() {
  var randomDecimal = Math.random() * 10;
  var randomInteger = Math.floor(randomDecimal);
  // var diceNumber = randomInteger + 1;
  return randomInteger;
};

function rollDice() {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

function isPassphraseCorrect(input, passphrase = ['palatable papaya']) {
  return passphrase.includes(input);
}

function displayResults(result, inputId) {
  let outputElement = document.querySelector("#output-div");
  outputElement.innerHTML = result;

  // Reset input value
  if (inputId) {
    document.querySelector(inputId).value = "";
  }
}