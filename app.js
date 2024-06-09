// app.js
document.addEventListener('DOMContentLoaded', () => {
    const amountInput = document.getElementById('amount');
    const fromCurrency = document.getElementById('fromCurrency');
    const toCurrency = document.getElementById('toCurrency');
    const result = document.getElementById('result');
    const convertButton = document.getElementById('convert');
    
    // Function to populate currency dropdowns
    const populateCurrencies = (currencies) => {
        for (const currency of currencies) {
            const option1 = document.createElement('option');
            option1.value = currency;
            option1.textContent = currency;
            fromCurrency.appendChild(option1);
            
            const option2 = document.createElement('option');
            option2.value = currency;
            option2.textContent = currency;
            toCurrency.appendChild(option2);
        }
    };
    
    // Fetch available currencies and populate dropdowns
    fetch('https://api.exchangerate-api.com/v4/latest/USD')
        .then(response => response.json())
        .then(data => {
            const currencies = Object.keys(data.rates);
            populateCurrencies(currencies);
        })
        .catch(error => console.error('Error fetching exchange rates:', error));
    
    // Convert currency
    convertButton.addEventListener('click', () => {
        const amount = parseFloat(amountInput.value);
        const from = fromCurrency.value;
        const to = toCurrency.value;
        
        if (isNaN(amount) || from === '' || to === '') {
            result.textContent = 'Please fill in all fields.';
            return;
        }
        
        fetch(`https://api.exchangerate-api.com/v4/latest/${from}`)
            .then(response => response.json())
            .then(data => {
                const rate = data.rates[to];
                const convertedAmount = (amount * rate).toFixed(2);
                result.textContent = `${amount} ${from} = ${convertedAmount} ${to}`;
            })
            .catch(error => console.error('Error fetching exchange rate:', error));
    });
});
