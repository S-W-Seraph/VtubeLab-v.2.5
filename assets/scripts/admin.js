function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'admin' && password === '12345') {
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('order-details').style.display = 'block';
        displayOrderDetails();
    } else {
        alert('Неправильный логин или пароль');
    }
}

function displayOrderDetails() {
    const orderDetails = JSON.parse(localStorage.getItem('orderDetails'));

    if (orderDetails) {
        const orderCode = document.getElementById('order-code');
        const orderTable = document.getElementById('order-table').querySelector('tbody');

        orderCode.textContent = orderDetails.confirmationCode;

        orderDetails.items.forEach(item => {
            const row = document.createElement('tr');
            const nameCell = document.createElement('td');
            const priceCell = document.createElement('td');
            const quantityCell = document.createElement('td');

            nameCell.textContent = item.название;
            priceCell.textContent = `${item.цена} руб.`;
            quantityCell.textContent = item.количество;

            row.appendChild(nameCell);
            row.appendChild(priceCell);
            row.appendChild(quantityCell);

            orderTable.appendChild(row);
        });
    } else {
        document.getElementById('order-details').innerHTML = '<p>Заказов нет.</p>';
    }
}
