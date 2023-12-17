document.addEventListener("DOMContentLoaded", function () {
  fetchExchangeRates();
});

function fetchExchangeRates() {
  const apiUrl =
    "https://api.privatbank.ua/p24api/exchange_rates?date=01.12.2014";

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => displayExchangeRates(data.exchangeRate))
    .catch((error) => console.error("Error fetching exchange rates:", error));
}

function displayExchangeRates(rates) {
  const tableBody = document.querySelector("#exchangeTable tbody");

  const targetCurrencies = [
    "USD",
    "EUR",
    "CHF",
    "GBP",
    "PLZ",
    "SEK",
    "XAU",
    "CAD",
  ];

  const filteredRates = targetCurrencies.map((currency) => {
    const rate = rates.find(
      (r) => r.currency === currency || r.currencyCode === currency
    );
    return rate || { currency, purchaseRate: "", saleRate: "" };
  });

  filteredRates.forEach((rate) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${rate.currency}</td>
      <td>${rate.purchaseRate}</td>
      <td>${rate.saleRate}</td>
    `;
    tableBody.appendChild(row);
  });
}

