const EXERCISES = Object.freeze(
  [
    {
      title: "Address Book",
      instruction: "Enter name to search:",
      inputId: "input-address-book",
      functionCall: addressBookApp
    },
    {
      title: "Mad Libs",
      instruction: "Press submit to start the program:",
      inputId: "input-mad-libs",
      instructionsId: "instructions-mad-libs",
      functionCall: madLibsApp
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
  EXERCISES[activeSwitcherIndex].functionCall();
});

let addressBook = [
  "Adam",
  "Bob",
  "Charlie"
];

const MadLibsProgramState = Object.freeze({
  Start: 0,
  Adjective: 1,
  Adverb: 2,
  Exclamation: 3,
  Noun: 4,
  Create: 5
});
const madLibs = [
  "${randomExclamation}! he said ${randomAdverb} as he jumped into his convertible ${randomNoun} and drove off with his ${randomAdj} wife.",
  "She asked ${randomAdverb} for the ${randomNoun} and when they were rude, she said ${randomExclamation} and hung up the ${randomAdj} phone.",
  "${randomExclamation}! It was a ${randomAdj}, cold November day. I woke up ${randomAdverb} to the ${randomAdj} smell of ${randomNoun} roasting in the fireplace downstairs."
];
let selectedWords = {
  randomAdj: "",
  randomAdverb: "",
  randomExclamation: "",
  randomNoun: ""
};
let userWords = {
  randomAdj: [],
  randomAdverb: [],
  randomExclamation: [],
  randomNoun: []
}
let madLibsCurrentState = MadLibsProgramState.Start;

function madLibsApp() {
  switch (madLibsCurrentState) {
    case MadLibsProgramState.Start:
      {
        const instructions = "Enter a list of adjectives, seperated by spaces:" +
          "<br/>" + "For example, 'cold beautiful black'";
        setInstructionsText(instructions, "#instructions-mad-libs");
        madLibsCurrentState = MadLibsProgramState.Adjective;
      }
      break;
    case MadLibsProgramState.Adjective:
      {
        userWords.randomAdj = document.querySelector("#input-mad-libs").value.split(" ");
        
        clearInput("#input-mad-libs");

        const instructions = "Enter a list of adverbs, seperated by spaces:" +
          "<br/>" + "For example, 'excitedly slowly angrily'";
        setInstructionsText(instructions, "#instructions-mad-libs");
        
        madLibsCurrentState = MadLibsProgramState.Adverb;
      }
      break;
    case MadLibsProgramState.Adverb:
      {
        userWords.randomAdverb = document.querySelector("#input-mad-libs").value.split(" ");

        clearInput("#input-mad-libs");

        const instructions = "Enter a list of exclamations, seperated by spaces:" +
          "<br/>" + "For example, 'alas sorry wait'";
        setInstructionsText(instructions, "#instructions-mad-libs");

        madLibsCurrentState = MadLibsProgramState.Exclamation;
      }
      break;
    case MadLibsProgramState.Exclamation:
      {
        userWords.randomExclamation = document.querySelector("#input-mad-libs").value.split(" ");

        clearInput("#input-mad-libs");

        const instructions = "Enter a list of nouns, seperated by spaces:" +
        "<br/>" + "For example, 'car chestnuts manager'";
        setInstructionsText(instructions, "#instructions-mad-libs");

        madLibsCurrentState = MadLibsProgramState.Noun;
      }
      break;
    case MadLibsProgramState.Noun:
      {
        userWords.randomNoun = document.querySelector("#input-mad-libs").value.split(" ");

        clearInput("#input-mad-libs");

        const instructions = "Enter create to generate a random mad lib!";
        setInstructionsText(instructions, "#instructions-mad-libs");
        
        madLibsCurrentState = MadLibsProgramState.Create;
      }
      break;
    case MadLibsProgramState.Create:
      {
        clearInput("#input-mad-libs");

        const randomAdj = userWords.randomAdj[getRandomNumber(userWords.randomAdj.length)];
        const randomAdverb = userWords.randomAdverb[getRandomNumber(userWords.randomAdverb.length)];
        const randomExclamation = userWords.randomExclamation[getRandomNumber(userWords.randomExclamation.length)];
        const randomNoun = userWords.randomNoun[getRandomNumber(userWords.randomNoun.length)];

        const randomMadLib = madLibs[getRandomNumber(madLibs.length)];
        const output = eval("`" + randomMadLib + "`");
        displayResults(output.charAt(0).toUpperCase() + output.slice(1));
      }
      break;
  }
}

function addressBookApp() {
  const nameInput = document.querySelector("#input-address-book").value;
  let found = false;

  console.log("OK");

  if (addressBook.find(name => name === nameInput)) {
    found = true;
  } else {
    found = false;
    addressBook.push(nameInput);
  }

  clearOutput();

  if (found) {
    displayResults("Sorry, that person already exists!");
  } else {
    displayResults("Added " + nameInput + " to the address book!");
    displayResults("Address Book data: " + addressBook);
  }
}

function displayResults(result, inputId) {
  const outputElement = document.querySelector("#output-div");
  outputElement.innerHTML += result + "<br/>";

  // Reset input value
  if (inputId) {
    document.querySelector(inputId).value = "";
  }
}

function getRandomNumber(num) {
  const randomIndex = Math.floor(Math.random() * num);
  return randomIndex;
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