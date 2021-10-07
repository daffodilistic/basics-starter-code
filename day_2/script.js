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
    {
      title: "Cost of Aircon",
      instruction: "Enter hours of aircon use:",
      inputId: "input-aircon-hours",
      functionCall: getCostOfAircon
    },
    {
      title: "Screen Time",
      instruction: "Enter number of hours spent on your favourite app per day:",
      inputId: "input-screen-time",
      functionCall: getScreenTime
    },
    {
      title: "Papayas Budget",
      instruction: "Enter price of papaya per kilo:",
      inputId: "input-papaya-budget",
      functionCall: getPapayaBudget
    },
    {
      title: "Ice Machine",
      instruction: "Enter number of guests:",
      inputId: "input-ice-machine-guests",
      functionCall: getIceMachineRuntime
    },
    {
      title: "Beer Order",
      instruction: "Enter average number of customers per day:",
      inputId: "input-beer-drinkers",
      functionCall: getHalfBeerKegCount
    },
    {
      title: "Helen & Ivan's Coins",
      instruction: "Enter excess 20-cent coins that Ivan has:",
      inputId: "input-extra-coins",
      functionCall: getRichPerson
    },
    {
      title: "Mortgage Calculator",
      instruction: "How much do you wish to borrow:",
      inputId: "input-mortgage-principal",
      functionCall: getMortgagePayment
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

function getCostOfAircon() {
  const kwCostPerHour = 0.20;
  const kwAirconUse = 2;

  const numOfHours = parseInt(document.querySelector("#input-aircon-hours").value);
  const costOfAircon = kwAirconUse * kwCostPerHour * numOfHours;

  displayResults(`${numOfHours} hour(s) of aircon use will cost you $${costOfAircon.toFixed(2)}`);
}

function getScreenTime() {
  const lifeExpectancyYears = 82;
  const downTimeHours = 9;

  const screenTimeHoursPerDay = parseInt(document.querySelector("#input-screen-time").value);

  if (screenTimeHoursPerDay > 24) {
    displayResults(`Invalid value!`);
  } else {
    const totalScreenTimeHoursInLife = screenTimeHoursPerDay * 365 * lifeExpectancyYears;
    const daysInLife = totalScreenTimeHoursInLife / (24 - downTimeHours);

    displayResults(`In your lifespan, you would spend ${daysInLife.toFixed(2)} days on your favourite app, excluding eating and sleeping time.`);
  }
}

function getPapayaBudget() {
  const kgPapayaConsumedPerMonth = 2;
  
  const papayaCostPerKg = parseFloat(document.querySelector("#input-papaya-budget").value);
  const papayaBudget = papayaCostPerKg * kgPapayaConsumedPerMonth;

  displayResults(`You would need to budget $${papayaBudget.toFixed(2)} this month for papayas.`);
}

function getIceMachineRuntime() {
  const drinksPerGuest = 2;
  const iceCubesPerDrink = 4;
  const gramsPerIceCube = 1.5;
  const gramsPerPound = 454;
  const iceMachinePoundsPerHour = 5;

  const numOfGuests = parseInt(document.querySelector("#input-ice-machine-guests").value);
  const totalPounds = numOfGuests * drinksPerGuest * iceCubesPerDrink * gramsPerIceCube / gramsPerPound;
  const runtimeHours = totalPounds / iceMachinePoundsPerHour;

  displayResults(`The ice machine requires ${runtimeHours.toFixed(2)} hours to create enough ice.`);
}

function getHalfBeerKegCount() {
  const pintsInHalfKeg = 124;
  const averagePintsPerGuestPerDay = 2;
  const daysPerQuarter = 91;

  const numOfGuests = parseInt(document.querySelector("#input-beer-drinkers").value);
  const totalPintsPerQuarter = numOfGuests * averagePintsPerGuestPerDay * daysPerQuarter;
  const numHalfKegs = totalPintsPerQuarter / pintsInHalfKeg;

  displayResults(`You would need ${numHalfKegs.toFixed(2)} half-kegs of beer per quarter`);
}

function getRichPerson() {
  const helen20CentCoins = 64;

  const extra20CentCoins = parseInt(document.querySelector("#input-extra-coins").value);
  // NOTE: Because number of coins is fixed, any additional 20 cent coins that
  // Ivan has will always make him poorer than Helen.
  const shortfall = extra20CentCoins * 0.30;
  
  displayResults(`Ivan will always be poorer than Helen by $${shortfall.toFixed(2)} because they have the same number of coins in total, and they only have 50 and 20 cent coins.`);
}

function getDataPlanCost() {
  const dataPlanCostPerMonth = 19.99;
  const dataPlanGBQuotaPerMonth = 50;

  const gbPerMonth = parseFloat(document.querySelector("#input-data-per-month").value);
  const dataPlanCost = (Math.ceil(gbPerMonth / dataPlanGBQuotaPerMonth) * dataPlanCostPerMonth) / gbPerMonth;

  displayResults(`Your data plan costs $${dataPlanCost.toFixed(2)} per GB.`);
}

function getMortgagePayment() {
  const interestRate = 0.03;
  const mortgageYears = 10;
  const mortgagePrincipal = parseFloat(document.querySelector("#input-mortgage-principal").value);

  const totalInterest = mortgagePrincipal * interestRate * mortgageYears;
  const totalPayment = mortgagePrincipal + totalInterest;
  const monthlyPayment = totalPayment / mortgageYears / 12;
  
  displayResults(`You will pay $${monthlyPayment.toFixed(2)} per month (total of $${totalPayment.toFixed(2)}), of which $${totalInterest.toFixed(2)} is the interest.`);
}

function displayResults(result, inputId) {
  let outputElement = document.querySelector("#output-div");
  outputElement.innerHTML = result;

  // Reset input value
  if (inputId) {
    document.querySelector(inputId).value = "";
  }
}