// Define button click functionality
var button = document.querySelector("#submit-button");
button.addEventListener("click", function () {
  // Set result to input value
  var input = document.querySelector("#input-field");
  var result = main(input.value);

  // Display result in output element
  var output = document.querySelector("#output-div");
  output.innerHTML = result;

  // Reset input value
  input.value = "";
});

var main = function (input) {
  var myOutputValue = 'hello world';
  return myOutputValue;
};
