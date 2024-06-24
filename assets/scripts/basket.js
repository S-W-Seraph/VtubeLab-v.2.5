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

  displayPurchaseHistory();
});

function showPaymentPopup() {
  document.getElementById('payment-popup').style.display = 'block';
}

function closePaymentPopup() {
  document.getElementById('payment-popup').style.display = 'none';
}

function payWith(method) {
  alert(`Вы выбрали оплату с помощью: ${method}`);
  document.getElementById('payment-popup').style.display = 'none';
  showConfirmationPopup();
}

function showConfirmationPopup() {
  // Generate an 8-digit confirmation code
  const confirmationCode = Math.floor(10000000 + Math.random() * 90000000);
  document.getElementById('confirmation-code').innerText = confirmationCode;

  // Retrieve cart items
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

  // Create purchase info object
  const purchaseInfo = {
      code: confirmationCode,
      items: cartItems.filter(item => item.количество > 0).map(item => ({
          название: item.название,
          количество: item.количество
      })),
      date: new Date().toISOString() // Add a timestamp to the purchase
  };

  // Retrieve existing purchases from local storage
  let purchases = JSON.parse(localStorage.getItem('purchases')) || [];

  // Add new purchase to the list
  purchases.push(purchaseInfo);

  // Store updated purchases list in local storage
  localStorage.setItem('purchases', JSON.stringify(purchases));

  // Hide cart elements
  document.getElementById('carttable').style.display = 'none';
  document.getElementById('itemsquantity').style.display = 'none';
  document.getElementById('total').style.display = 'none';
  document.getElementById('buy-button').style.display = 'none';
  document.getElementById('emptycart').style.display = 'none';

  // Show confirmation popup
  document.getElementById('confirmation-popup').style.display = 'block';

  // Update the purchase history display
  displayPurchaseHistory();
}

function closeConfirmationPopup() {
  document.getElementById('confirmation-popup').style.display = 'none';
}

function copyCode() {
  const code = document.getElementById('confirmation-code').innerText;
  navigator.clipboard.writeText(code).then(() => {
      alert('Код скопирован в буфер обмена!');
  });
}

function displayPurchaseHistory() {
  const purchases = JSON.parse(localStorage.getItem('purchases')) || [];
  const purchaseHistoryDiv = document.getElementById('purchase-history');
  purchaseHistoryDiv.innerHTML = ''; // Clear previous entries

  purchases.forEach(purchase => {
      const purchaseItem = document.createElement('div');
      purchaseItem.classList.add('purchase-item');

      const purchaseDate = document.createElement('p');
      purchaseDate.textContent = `Дата: ${new Date(purchase.date).toLocaleString()}`;

      const purchaseCode = document.createElement('p');
      purchaseCode.textContent = `Код подтверждения: ${purchase.code}`;

      const purchaseItemsList = document.createElement('ul');

      purchase.items.forEach(item => {
          const listItem = document.createElement('li');
          listItem.textContent = `${item.название}: ${item.количество}`;
          purchaseItemsList.appendChild(listItem);
      });

      purchaseItem.appendChild(purchaseDate);
      purchaseItem.appendChild(purchaseCode);
      purchaseItem.appendChild(purchaseItemsList);

      purchaseHistoryDiv.appendChild(purchaseItem);
  });
}
