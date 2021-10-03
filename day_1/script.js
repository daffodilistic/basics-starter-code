// Define button click functionality
const button = document.querySelector("#submit-button");
button.addEventListener("click", function () {
  const switcher = UIkit.switcher("#switcher");
  const activeSwitcherIndex = switcher.index();

  // console.log(`selected index is ${activeSwitcherIndex}`);

  switch (activeSwitcherIndex) {
    // Weeks in Minutes
    case 0:
      {
        const daysInWeek = 7;
        const hoursInDay = 24;
        const minutesInHour = 60;

        const numOfWeeks = parseInt(document.querySelector("#input-weeks").value);
        const numOfMinutes = numOfWeeks * daysInWeek * hoursInDay * minutesInHour;

        // Display result in output element
        var outputElement = document.querySelector("#output-div");
        outputElement.innerHTML =
          `In ${numOfWeeks} weeks there are ${numOfMinutes} minutes! Wow!`;

        // Reset input value
        document.querySelector("#input-weeks").value = "";
      }
      break;
    // Fahrenheight to Celcius
    case 1:
      {
        const farenheight = parseFloat(document.querySelector("#input-temperature").value);
        const celcius = (farenheight - 32) * 5 / 9;

        // Display result in output element
        var outputElement = document.querySelector("#output-div");
        outputElement.innerHTML = `${farenheight}&#176;F in Celcius is ${celcius.toFixed(2)}&#176;C`;

        // Reset input value
        document.querySelector("#input-temperature").value = "";
      }
      break;
    // Road Trip Cost
    case 2:
      {
        const kmPerLitreFerrari = 9;
        const costPerLitre = 2.20;
        const tripDistanceKm = parseFloat(document.querySelector("#input-road-trip").value);
        const tripCost = tripDistanceKm / kmPerLitreFerrari * costPerLitre;

        // Display result in output element
        var outputElement = document.querySelector("#output-div");
        outputElement.innerHTML = `Your cost of petrol is $${tripCost.toFixed(2)}`;

        // Reset input value
        document.querySelector("#input-road-trip").value = "";
      }
      break;
    // Ice Cream Buffet
    case 3:
      {
        const mlPerContainer = 400;
        const mlPerCup = 70;
        const numTrips = parseFloat(document.querySelector("#input-trips-to-ice-cream-station").value);
        const numContainers = numTrips * mlPerCup / mlPerContainer;

        // Display result in output element
        var outputElement = document.querySelector("#output-div");
        outputElement.innerHTML = `Number of containers consumed: ${Math.ceil(numContainers)} (actually ${numContainers.toFixed(2)})`;

        // Reset input value
        document.querySelector("#input-trips-to-ice-cream-station").value = "";
      }
      break;
    // Time to Type Sonnets
    case 4:
      {
        const sonnetWordCount = 17677;
        const wordsPerMinute = parseFloat(document.querySelector("#input-wpm").value);
        const hoursToFinish = sonnetWordCount / wordsPerMinute / 60;

        // Display result in output element
        var outputElement = document.querySelector("#output-div");
        outputElement.innerHTML = `Thou wouldst require ${hoursToFinish.toFixed(2)} hours to finish my sonnets, sirrah.`;

        // Reset input value
        document.querySelector("#input-wpm").value = "";
      }
      break;
  }
});
