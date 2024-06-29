document.addEventListener('DOMContentLoaded', () => {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  const cartTable = document.getElementById('carttable');
  const totalItems = document.getElementById('itemsquantity');
  const totalPrice = document.getElementById('total');

  let totalItemCount = 0;
  let totalCartPrice = 0;

  cartItems.forEach(item => {
    if (item.количество > 0) {
      const itemBox = document.createElement('div');
      itemBox.classList.add('cart-item-box');

      const nameElement = document.createElement('div');
      nameElement.classList.add('cart-item-name');
      const quantityElement = document.createElement('div');
      quantityElement.classList.add('cart-item-quantity');
      const priceElement = document.createElement('div');
      priceElement.classList.add('cart-item-price');

      nameElement.textContent = `${item.название}`;
      quantityElement.textContent = `${item.количество} шт.`;
      priceElement.textContent = `${item.цена} руб.`;

      itemBox.appendChild(nameElement);
      itemBox.appendChild(quantityElement);
      itemBox.appendChild(priceElement);

      cartTable.appendChild(itemBox);

      totalItemCount += item.количество;
      totalCartPrice += item.цена * item.количество;
    }
  });

  totalItems.textContent = `${totalItemCount} шт.`;
  totalPrice.textContent = `${totalCartPrice} руб.`;

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

    const accordionButton = document.createElement('button');
    accordionButton.classList.add('accordion');
    accordionButton.classList.add('basket-accordion');
    accordionButton.textContent = `${new Date(purchase.date).toLocaleString()}`;

    const panelDiv = document.createElement('div');
    panelDiv.classList.add('panel');
    panelDiv.classList.add('panel-decoration');

    const purchaseItemsList = document.createElement('ul');

    const codeItem = document.createElement('p');
    codeItem.textContent = `Код подтверждения: ${purchase.code}`;
    purchaseItemsList.appendChild(codeItem);
    purchase.items.forEach(item => {
      
      const listItem = document.createElement('li');
      listItem.textContent = `${item.название}: ${item.количество}`;
      purchaseItemsList.appendChild(listItem);
    }
  );
  

    

    panelDiv.appendChild(purchaseItemsList);
    purchaseItem.appendChild(accordionButton);
    purchaseItem.appendChild(panelDiv);

    purchaseHistoryDiv.appendChild(purchaseItem);
  });

  // Add the accordion functionality
  const acc = document.getElementsByClassName("accordion");
  for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
      this.classList.toggle("active");
      const panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  }
}
async function saveOrder(purchaseInfo) {
  try {
    const response = await fetch('/api/saveOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(purchaseInfo)
    });
    
    const result = await response.json();
    if (result.success) {
      console.log(`Order saved with ID: ${result.orderId}`);
    } else {
      console.error('Error saving order:', result.error);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}
