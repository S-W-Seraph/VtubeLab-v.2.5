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
  const quantityElement = document.querySelector(`#item-${productId} .quantity-number__container p`);
  const button = document.querySelector(`#item-${productId} .addtocart`);

  if (product.количество === 0) {
    product.количество = 1;
    button.classList.add('in-cart');
    button.innerText = 'Отменить'
  } else {
    product.количество = 0;
    button.classList.remove('in-cart');
    button.innerText = 'В Корзину'
  }
  quantityElement.innerText = product.количество;
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
        const quantityElement = document.querySelector(`#item-${product.id} .quantity-number__container p`);
        const button = document.querySelector(`#item-${product.id} .addtocart`);
        quantityElement.innerText = product.количество;
        button.innerText = product.количество > 0 ? 'Отменить' : 'В Корзину';
      }
    });
    updateTotalPrice();
  }
}

window.onload = loadCartState;

каталогТоваров.forEach(product => {
  const itemElement = document.getElementById(`item-${product.id}`);
  const minusButton = itemElement.querySelector('.button-minus');
  const plusButton = itemElement.querySelector('.button-plus');
  const quantityElement = itemElement.querySelector('.quantity-number__container p');

  minusButton.addEventListener('click', () => {
    if (product.количество > 0) {
      product.количество -= 1;
      quantityElement.innerText = product.количество;
      if (product.количество === 0) {
        const button = itemElement.querySelector('.addtocart');
        button.classList.remove('in-cart');
        button.innerText = 'В Корзину';
      }
      updateTotalPrice();
      saveCartState();
    }
  });

  plusButton.addEventListener('click', () => {
    product.количество += 1;
    quantityElement.innerText = product.количество;
    const button = itemElement.querySelector('.addtocart');
    button.innerText = 'Отменить';
    button.classList.add('in-cart');
    updateTotalPrice();
    saveCartState();
  });

  // Add event listeners for enlarging images
  const images = itemElement.querySelectorAll('.panel__image');
  images.forEach(image => {
    image.addEventListener('click', () => {
      enlargeImage(image.src);
    });
  });
});

function enlargeImage(src) {
  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-button">&times;</span>
      <img src="${src}" alt="Enlarged image">
    </div>
  `;
  document.body.appendChild(modal);

  const closeButton = modal.querySelector('.close-button');
  closeButton.addEventListener('click', () => {
    document.body.removeChild(modal);
  });

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      document.body.removeChild(modal);
    }
  });
}
  // Add the accordion
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