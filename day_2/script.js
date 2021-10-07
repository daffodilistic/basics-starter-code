const EXERCISES = Object.freeze(
  [
    {
      title: "Juice Wedding",
      instruction: "Enter number of guests:",
      inputId: "input-juice-wedding",
      functionCall: getOrangesForWedding
    },
    {
      title: "SG Hugs",
      instruction: "Enter duration of hug in seconds:",
      inputId: "input-hug-seconds",
      functionCall: getYearsToHug
    },
    {
      title: "House Paint",
      instruction: "Enter dollar cost per litre:",
      inputId: "input-paint-cost-per-litre",
      functionCall: getCostToPaint
    },
    {
      title: "Train Speed",
      instruction: "Enter time delayed in minutes:",
      inputId: "input-time-delay",
      functionCall: getTrainCatchupSpeed
    },
    {
      title: "Clock",
      instruction: "Enter time in minutes past 1pm:",
      inputId: "input-minutes-past-1",
      functionCall: getAngleOfClock
    },
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

function getOrangesForWedding() {
  // WARNING: This assumes that each guest has only one glass of orange juice!
  const orangesPerGlass = 4;
  const mlJuicePerGlass = 90;

  const numOfGuests = parseInt(document.querySelector("#input-juice-wedding").value);
  const numOfOranges = orangesPerGlass * numOfGuests;
  const litresOfJuice = mlJuicePerGlass * numOfGuests / 1000;

  displayResults(`You would need ${numOfOranges} oranges to make a total of ${litresOfJuice.toFixed(2)} litres of orange juice.`, "#input-juice-wedding");
}

function getYearsToHug() {
  // Source of truth: https://www.population.gov.sg/media-centre/articles/population-in-brief-2021-key-trends
  const populationOfSingapore = Number("5.45E6");
  const downTimeHours = 9;

  const secondsPerHug = parseFloat(document.querySelector("#input-hug-seconds").value);
  const daysToHug = populationOfSingapore * secondsPerHug / 60 / 60 / (24 - downTimeHours);
  const yearsToHug = daysToHug / 365;

  // console.log(daysToHug);

  displayResults(`You would need ${yearsToHug.toFixed(2)} years to hug everyone in Singapore.`, "#input-hug-seconds");
}

function getCostToPaint() {
  const roomCount = 6;
  const windowCount = 6;
  const doorCount = 8;
  const doorSizeMetre = 0.90 * 1.50;
  const windowSizeMetre = doorSizeMetre;
  // NOTE: Assuming we paint the 4 walls and the ceiling, and assuming each room is 3m in height
  const paintAreaPerRoomMetre = 3 * 3 * 5;
  const paintAreaPerLitre = 300;
  const paintCoats = 2;

  const costPerLitre = parseFloat(document.querySelector("#input-paint-cost-per-litre").value);
  const paintableArea = roomCount * paintAreaPerRoomMetre;
  const unpaintableArea = (windowCount * windowSizeMetre) + (doorCount * doorSizeMetre);
  const totalArea = paintableArea - unpaintableArea;
  const litresOfPaint = totalArea / paintAreaPerLitre * paintCoats;
  const totalCost = litresOfPaint * costPerLitre;

  displayResults(`The cost to paint your house would be $${totalCost.toFixed(2)}.`, "#input-paint-cost-per-litre");
}

function getTrainCatchupSpeed() {
  const oldTrainSpeed = 200;
  const oldTrainHoursToReachTokyo = 2;
  const distanceToTokyo = oldTrainSpeed * oldTrainHoursToReachTokyo;

  const minutesDelayed = parseFloat(document.querySelector("#input-time-delay").value);
  const catchupSpeed = distanceToTokyo / (((oldTrainHoursToReachTokyo * 60) - minutesDelayed) / 60);

  displayResults(`The train has to travel at ${catchupSpeed.toFixed(2)}km/h to be Fast and Furious and catch up with the old train.`, "#input-time-delay");
}

function getAngleOfClock() {
  const minutesPast1pm = parseFloat(document.querySelector("#input-minutes-past-1").value);
  const anglePerMinute = 360 / 60;
  const angle = (minutesPast1pm - 10) / 60 * 360;

  console.log("test");

  displayResults(`Clockwise angle between hour and minute hands: ${angle}&#176;`, "#input-minutes-past-1");
}

function displayResults(result, inputId) {
  let outputElement = document.querySelector("#output-div");
  outputElement.innerHTML = result;

  // Reset input value
  document.querySelector(inputId).value = "";
}