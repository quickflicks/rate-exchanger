document.addEventListener('DOMContentLoaded', () => {
    const amountInput = document.getElementById('amount');
    const fromCurrencySelect = document.getElementById('fromCurrency');
    const toCurrencySelect = document.getElementById('toCurrency');
    const resultDiv = document.getElementById('result');
    const convertButton = document.getElementById('convert');
    
    // Function to populate currency dropdowns
    const populateCurrencies = (currencies) => {
        for (const currency of currencies) {
            const option1 = document.createElement('option');
            option1.value = currency;
            option1.textContent = currency;
            fromCurrencySelect.appendChild(option1);
            
            const option2 = document.createElement('option');
            option2.value = currency;
            option2.textContent = currency;
            toCurrencySelect.appendChild(option2);
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
        const from = fromCurrencySelect.value;
        const to = toCurrencySelect.value;
        
        if (isNaN(amount) || from === '' || to === '') {
            resultDiv.textContent = 'Please fill in all fields.';
            return;
        }
        
        fetch(`https://api.exchangerate-api.com/v4/latest/${from}`)
            .then(response => response.json())
            .then(data => {
                const rate = data.rates[to];
                const convertedAmount = (amount * rate).toFixed(2);
                resultDiv.textContent = `${amount} ${from} = ${convertedAmount} ${to}`;
            })
            .catch(error => console.error('Error fetching exchange rate:', error));
    });
});