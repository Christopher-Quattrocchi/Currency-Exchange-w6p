import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyService from './currency-service.js';

// Business Logic

function getCoin(dollarAmount, toCurrency) {
  let rates = sessionStorage.getItem('currencyRates');

  if (rates) {
    rates = JSON.parse(rates);
    let convertedAmount = CurrencyService.exchangeCalculator(dollarAmount, toCurrency, rates);
    printElements(convertedAmount, dollarAmount, toCurrency);
  } else {
    CurrencyService.getCoin(dollarAmount, toCurrency)
      .then(function (response) {
        if (response.rates) {
          sessionStorage.setItem('currencyRates', JSON.stringify(response.rates));
          let convertedAmount = CurrencyService.exchangeCalculator(dollarAmount, toCurrency, response.rates);
          printElements(convertedAmount, dollarAmount, toCurrency);
        } else {
          printError(response, dollarAmount, toCurrency);
        }
      })
      .catch(function (error) {
        printError(error, dollarAmount, toCurrency);
      });
  }
}
// UI Logic

function printElements(convertedAmount, dollarAmount, toCurrency) {
  // console.log("In printElements:", results);
  document.querySelector('#showResponse').innerText = `${dollarAmount} USD is worth ${convertedAmount} ${toCurrency}`;
}

function printError(error, dollarAmount, toCurrency) {
  document.querySelector('#showResponse').innerText = `There was an error converting ${dollarAmount} USD to ${toCurrency}: ${error}.`;
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
  const fromCurrency = document.getElementById('from-currency').value;
  const dollarAmount = document.querySelector('#dollar-amount').value;
  let toCurrency = document.getElementById('to-currency').value;
  document.querySelector('#dollar-amount').value = null;
  // document.querySelector('#currency').value = null;
  // let currencyKey = currencySelect(currency);
  getCoin(dollarAmount, toCurrency);
}

window.addEventListener("load", function () {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});
