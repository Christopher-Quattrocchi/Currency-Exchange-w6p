export default class CurrencyService {
  static getCoin(dollarAmount, currencyKey) {
    return fetch(`https://api.exchangerate-api.com/v4/latest/USD?apiKey=${process.env.API_KEY}`)
      .then(function (response) {
        if (!response.ok) {
          return response.json()
            .then(function (apiErrorMessage) {
              const errorMessage = `${response.status} ${response.statusText}
            ${apiErrorMessage.message}`;
              throw new Error(errorMessage);
            });
        } else {
          return response.json();
        }
      })
      .catch(function (error) {
        return error;
      });
  }
  // exchangeCalculator() {
  // }
}

