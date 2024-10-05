// script.js

// Function to fetch real-time exchange rates
async function getExchangeRates(baseCurrency) {
    try {
        // Replace YOUR-API-KEY with the actual API key from ExchangeRate-API
        const response = await fetch(`https://v6.exchangerate-api.com/v6/947a9ef67fbd380c1823303c/latest/${baseCurrency}`);
        const data = await response.json();

        if (data.result === "success") {
            return data.conversion_rates;
        } else {
            throw new Error("Failed to fetch exchange rates");
        }
    } catch (error) {
        console.error("Error fetching exchange rates:", error);
        return null;
    }
}

document.getElementById("convert-btn").addEventListener("click", async function () {
    const amount = parseFloat(document.getElementById("amount").value);
    const fromCurrency = document.getElementById("from-currency").value;
    const toCurrency = document.getElementById("to-currency").value;

    if (isNaN(amount) || amount <= 0) {
        document.getElementById("result").textContent = "Please enter a valid amount!";
        return;
    }

    // Fetch real-time exchange rates for the selected "From" currency
    const rates = await getExchangeRates(fromCurrency);

    if (!rates) {
        document.getElementById("result").textContent = "Error fetching exchange rates. Please try again.";
        return;
    }

    if (fromCurrency === toCurrency) {
        document.getElementById("result").textContent = `${amount} ${fromCurrency} = ${amount} ${toCurrency}`;
    } else {
        const rate = rates[toCurrency];
        const convertedAmount = (amount * rate).toFixed(2);
        document.getElementById("result").textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
    }
});
