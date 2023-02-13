// Define a function that converts a currency amount to its equivalent value in bitcoin
async function convertToBitcoin(amount, currency) {
  // Fetch the current bitcoin price in the specified currency
  const response = await fetch(`https://api.coindesk.com/v1/bpi/currentprice/${currency}.json`);
  const data = await response.json();
  
  // Extract the bitcoin price from the API response
  const bitcoinPrice = data.bpi[currency].rate_float;
  
  // Convert the amount to bitcoin and return the result
  return amount / bitcoinPrice;
}

// Inject a script into the webpage
browser.tabs.executeScript({
  code: `
    // Find all elements on the page that contain currency amounts or prices
    // const elements = document.querySelectorAll(".currency-amount");
    const elements = document.querySelectorAll(".price");

    
    // Convert each currency amount to its equivalent value in bitcoin
    for (const element of elements) {
      // Extract the currency amount from the element's text content
      const match = element.textContent.match(/\d+(?:\.\d+)?/);
      if (match) {
        const amount = parseFloat(match[0]);
        
        // Determine the currency of the amount based on the element's class name
        const currency = element.className.match(/currency-(\w+)/)[1];
        
        // Convert the amount to bitcoin
        convertToBitcoin(amount, currency).then(result => {
          // Replace the original currency amount with the converted bitcoin amount
          element.textContent = result + " BTC";
        });
      }
    }
  `
});
