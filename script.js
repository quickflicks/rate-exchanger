const apiUrl = 'https://api.exchangerate-api.com/v4/latest/USD';

document.addEventListener('DOMContentLoaded', () => {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const currencies = Object.keys(data.rates);
            const fromCurrencyDropdown = document.getElementById('fromCurrencyDropdown');
            const toCurrencyDropdown = document.getElementById('toCurrencyDropdown');

            currencies.forEach(currency => {
                const fromOption = document.createElement('div');
                fromOption.textContent = currency;
                fromOption.addEventListener('click', () => {
                    document.getElementById('fromCurrencySearch').value = currency;
                    fromCurrencyDropdown.style.display = 'none';
                });

                const toOption = document.createElement('div');
                toOption.textContent = currency;
                toOption.addEventListener('click', () => {
                    document.getElementById('toCurrencySearch').value = currency;
                    toCurrencyDropdown.style.display = 'none';
                });

                fromCurrencyDropdown.appendChild(fromOption);
                toCurrencyDropdown.appendChild(toOption);
            });
        })
        .catch(error => {
            console.error('Error fetching initial exchange rates:', error);
        });
});

function toggleDropdown(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

function convert() {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('fromCurrencySearch').value;
    const toCurrency = document.getElementById('toCurrencySearch').value;

    if (amount === '' || isNaN(amount)) {
        alert('Please enter a valid amount');
        return;
    }

    fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
        .then(response => response.json())
        .then(data => {
            const rate = data.rates[toCurrency];
            const result = (amount * rate).toFixed(2);
            document.getElementById('result').textContent = `${amount} ${fromCurrency} = ${result} ${toCurrency}`;
        })
        .catch(error => {
            console.error('Error fetching exchange rates:', error);
            alert('An error occurred while fetching exchange rates. Please try again later.');
        });
}
