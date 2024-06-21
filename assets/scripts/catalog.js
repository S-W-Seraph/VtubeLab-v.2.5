const каталогТоваров = [
  {
    id: "Концепт-арт",
    название: "Концепт-арт",
    количество: 0,
    цена: 5000
  },
  {
    id: "Модель",
    название: "Модель",
    количество: 0,
    цена: 5000
  },
  {
    id: "Риг",
    название: "Риг",
    количество: 0,
    цена: 5000
  },
  {
    id: "Оверлей",
    название: "Оверлей",
    количество: 0,
    цена: 5000
  },
  {
    id: "Стикеры",
    название: "Стикеры",
    количество: 0,
    цена: 5000
  },
  {
    id: "BGM",
    название: "BGM",
    количество: 0,
    цена: 5000
  }
];

function toggleCart(productId) {
  const product = каталогТоваров.find(item => item.id === productId);
  const quantityInput = document.getElementById(`quantity-${productId}`);
  const button = quantityInput.nextElementSibling;

  if (product.количество === 0) {
    product.количество = 1;
    button.innerText = 'Убрать из корзины';
  } else {
    product.количество = 0;
    button.innerText = 'В Корзину';
  }
  quantityInput.value = product.количество;
  updateTotalPrice();
  saveCartState();
}

function updateTotalPrice() {
  let totalPrice = 0;
  каталогТоваров.forEach(product => {
    totalPrice += product.количество * product.цена;
  });
  document.getElementById("total-price").innerText = `Итоговая цена: ${totalPrice} руб.`;
}

function buyItems() {
  const cartItems = каталогТоваров.filter(product => product.количество > 0);
  localStorage.setItem('cart', JSON.stringify(cartItems));
  window.location.href = 'basket.html';
}

function saveCartState() {
  const cartItems = каталогТоваров.filter(product => product.количество > 0);
  localStorage.setItem('cart', JSON.stringify(cartItems));
}

function loadCartState() {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    const cartItems = JSON.parse(savedCart);
    cartItems.forEach(savedItem => {
      const product = каталогТоваров.find(item => item.id === savedItem.id);
      if (product) {
        product.количество = savedItem.количество;
        const quantityInput = document.getElementById(`quantity-${product.id}`);
        const button = quantityInput.nextElementSibling;
        quantityInput.value = product.количество;
        button.innerText = product.количество > 0 ? 'Убрать из корзины' : 'В Корзину';
      }
    });
    updateTotalPrice();
  }
}

window.onload = loadCartState;

// Add event listeners to handle quantity changes
каталогТоваров.forEach(product => {
  const quantityInput = document.getElementById(`quantity-${product.id}`);
  quantityInput.addEventListener('input', (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    product.количество = isNaN(newQuantity) ? 0 : newQuantity;
    updateTotalPrice();
    saveCartState();
  });
});
