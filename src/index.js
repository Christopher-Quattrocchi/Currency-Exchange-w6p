import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyService from './currency-service.js';

// Business Logic

function getCoin(dollarAmount, fromCurrency, toCurrency) {
  let rates = sessionStorage.getItem('currencyRates');

  if (rates) {
    rates = JSON.parse(rates);
    let convertedAmount = CurrencyService.exchangeCalculator(dollarAmount, fromCurrency, toCurrency, rates);
    printElements(convertedAmount, dollarAmount, fromCurrency, toCurrency);
  } else {
    CurrencyService.getCoin(dollarAmount, fromCurrency, toCurrency)
      .then(function (response) {
        if (response.rates) {
          sessionStorage.setItem('currencyRates', JSON.stringify(response.rates));
          let convertedAmount = CurrencyService.exchangeCalculator(dollarAmount, fromCurrency, toCurrency, response.rates);
          printElements(convertedAmount, dollarAmount, fromCurrency, toCurrency);
        } else {
          printError(response, dollarAmount, fromCurrency, toCurrency);
        }
      })
      .catch(function (error) {
        printError(error, dollarAmount, fromCurrency, toCurrency);
      });
  }
}
// UI Logic

function printElements(convertedAmount, dollarAmount, fromCurrency, toCurrency) {
  document.querySelector('#showResponse').innerText = `${dollarAmount} ${fromCurrency} is worth ${convertedAmount} ${toCurrency}`;
}

function printError(error, dollarAmount, fromCurrency, toCurrency) {
  document.querySelector('#showResponse').innerText = `There was an error converting ${dollarAmount} ${fromCurrency} to ${toCurrency}: ${error}.`;
}

function handleFormSubmission(event) {
  event.preventDefault();
  // debugger;
  const fromCurrency = document.getElementById('from-currency').value;
  const dollarAmount = document.querySelector('#dollar-amount').value;
  let toCurrency = document.getElementById('to-currency').value;
 
  getCoin(dollarAmount, fromCurrency, toCurrency);
}

window.addEventListener("load", function () {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});
