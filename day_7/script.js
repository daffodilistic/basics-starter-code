const EXERCISES = Object.freeze(
  [
    {
      title: "Address Book",
      instruction: "Enter name to search:",
      inputId: "input-address-book",
      functionCall: addressBookApp
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