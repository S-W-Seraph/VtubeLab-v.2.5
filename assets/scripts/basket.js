document.addEventListener('DOMContentLoaded', () => {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  const cartTable = document.getElementById('carttable');
  const totalItems = document.getElementById('itemsquantity');
  const totalPrice = document.getElementById('total');

  let totalItemCount = 0;
  let totalCartPrice = 0;

  cartItems.forEach(item => {
      if (item.количество > 0) {
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

          cartTable.appendChild(row);

          totalItemCount += item.количество;
          totalCartPrice += item.цена * item.количество;
      }
  });

  totalItems.textContent = totalItemCount;
  totalPrice.textContent = totalCartPrice;

  document.getElementById('emptycart').addEventListener('click', () => {
      localStorage.removeItem('cart');
      alert('Корзина очищена!');
      window.location.reload();
  });
});

function showPaymentPopup() {
  document.getElementById('payment-popup').style.display = 'block';
}

function closePaymentPopup() {
  document.getElementById('payment-popup').style.display = 'none';
}

function payWith(method) {
  alert(`Вы выбрали оплату с помощью: ${method}`);
  closePaymentPopup();
}
