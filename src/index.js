import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyService from './currency-service.js';

// Business Logic

function getCoin(dollarAmount, currencyKey) {
  let rates = sessionStorage.getItem('currencyRates');

  if (rates) {
    rates = JSON.parse(rates);
    let convertedAmount = CurrencyService.exchangeCalculator(dollarAmount, currencyKey, rates);
    printElements(convertedAmount, dollarAmount, currencyKey);
  } else {
    CurrencyService.getCoin(dollarAmount, currencyKey)
      .then(function (response) {
        if (response.rates) {
          sessionStorage.setItem('currencyRates', JSON.stringify(response.rates));
          let convertedAmount = CurrencyService.exchangeCalculator(dollarAmount, currencyKey, response.rates);
          printElements(convertedAmount, dollarAmount, currencyKey);
        } else {
          printError(response, dollarAmount, currencyKey);
        }
      })
      .catch(function (error) {
        printError(error, dollarAmount, currencyKey);
      });
  }
}
// UI Logic

function printElements(convertedAmount, dollarAmount, currencyKey) {
  // console.log("In printElements:", results);
  document.querySelector('#showResponse').innerText = `${dollarAmount} USD is worth ${convertedAmount} ${currencyKey}`;
}

function printError(error, dollarAmount, currencyKey) {
  document.querySelector('#showResponse').innerText = `There was an error converting ${dollarAmount} USD to ${currencyKey}: ${error}.`;
}

// function currencySelect(currency) {
//   let currencyKey;
//   if (currency === "EURO") {
//     currencyKey = "EUR";
//     return currencyKey;
//   } else if (currency === "POUND") {
//     currencyKey = "GBP";
//     return currency;
//   } else if (currency === "YEN") {
//     currencyKey = "JPY";
//     return currency;
//   } else if (currency === "FRANC") {
//     currencyKey = "CHF";
//     return currency;
//   } else if (currency === "RUPEE") {
//     currencyKey = "INR";
//     return currencyKey;
//   }
// }

function handleFormSubmission(event) {
  event.preventDefault();
  // debugger;
  const dollarAmount = document.querySelector('#dollar-amount').value;
  let currencyKey = document.querySelector('#currency').value;
  document.querySelector('#dollar-amount').value = null;
  // document.querySelector('#currency').value = null;
  // let currencyKey = currencySelect(currency);
  getCoin(dollarAmount, currencyKey);
}

window.addEventListener("load", function () {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});
