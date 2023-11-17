
export default class CurrencyService {
  static getCoin(dollarAmount, toCurrency) {
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
  static exchangeCalculator(dollarAmount, toCurrency, rates) {
    if (rates && rates[toCurrency]) {
      let outputAmount = dollarAmount * rates[toCurrency];
      return outputAmount;
    } else {
      throw new Error('Invalid response or currency key')
    }

  }
}
