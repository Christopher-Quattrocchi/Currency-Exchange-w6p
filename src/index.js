import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyService from './currency-service.js';

// Business Logic

function getCoin(dollarAmount, currencyKey) {
  CurrencyService.getCoin(dollarAmount, currencyKey)
    .then(function (response) {
      if (response.rates) {
        printElements(response.rates, dollarAmount, currencyKey);
      } else {
        printError(response, dollarAmount, currencyKey);
      }
    });
}
// UI Logic

function printElements(response, dollarAmount, currencyKey) {
  // console.log("In printElements:", results);
  document.querySelector('#showResponse').innerText = `${dollarAmount} USD is worth ${response[currencyKey]} ${currencyKey}`;
}

function printError(error, dollarAmount, currencyKey) {
  document.querySelector('#showResponse').innerText = `There was an error converting ${dollarAmount} USD to ${currencyKey}: ${error}.`;
}

function currencySelect(currency) {
  let currencyKey;
  if (currency === "EURO") {
    currencyKey = "EUR";
    return currencyKey;
  } else if (currency === "POUND") {
    currencyKey = "GBP";
    return currency;
  } else if (currency === "YEN") {
    currencyKey = "JPY";
    return currency;
  } else if (currency === "FRANC") {
    currencyKey = "CHF";
    return currency;
  } else if (currency === "RUPEE") {
    currencyKey = "INR";
    return currencyKey;
  }
}

function handleFormSubmission(event) {
  event.preventDefault();
  // debugger;
  const dollarAmount = document.querySelector('#dollar-amount').value;
  let currency = document.querySelector('#currency').value.toUpperCase();
  document.querySelector('#dollar-amount').value = null;
  document.querySelector('#currency').value = null;
  let currencyKey = currencySelect(currency);
  getCoin(dollarAmount, currencyKey);
}

window.addEventListener("load", function () {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});
