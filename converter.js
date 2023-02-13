// content_script.js

// Function to retrieve the current exchange rate between bitcoin and the original currency
async function convertToBitcoin(price, currency) {
  const url = `https://api.coindesk.com/v1/bpi/currentprice/${currency}.json`;
  const response = await fetch(url);
  const data = await response.json();
  const rate = data.bpi[currency].rate_float;
  return price / rate;
}

// Function to replace the original prices with the converted bitcoin prices
async function replacePrices() {
  const elements = document.querySelectorAll(".price");
  for (let element of elements) {
    const price = parseFloat(element.textContent.replace(",", ""));
    const currency = "USD";
    const bitcoinPrice = await convertToBitcoin(price, currency);
    element.textContent = bitcoinPrice.toFixed(8) + " BTC";
  }
}

// Call the replacePrices function when the page loads
replacePrices();
