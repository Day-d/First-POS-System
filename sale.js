  const cart = {};

  const billItemsContainer = document.getElementById('bill-items');
  const subtotalAmount = document.getElementById('subtotal-amount');
  const discountInput = document.getElementById('discount-percentage');
  const discountAmount = document.getElementById('discount-amount');
  const totalAmount = document.getElementById('total-amount');

  function updateBill() {
    billItemsContainer.innerHTML = '';

    let subtotal = 0;

    for (const id in cart) {
      const item = cart[id];
      const totalPrice = item.price * item.quantity;
      subtotal += totalPrice;

      const itemDiv = document.createElement('div');
      itemDiv.classList.add('bill-item');
      itemDiv.innerHTML = `
        <div class="bill-item-details">
          <span class="item-name">${item.name}</span>
          <span class="item-price-per-unit">$${item.price.toFixed(2)}</span>
        </div>
        <div class="bill-item-controls">
          <button class="quantity-btn minus-btn" data-id="${id}">-</button>
          <span class="item-quantity-display">${item.quantity}</span>
          <button class="quantity-btn plus-btn" data-id="${id}">+</button>
          <span class="item-total-price">$${totalPrice.toFixed(2)}</span>
          <button class="remove-item-btn" data-id="${id}">×</button>
        </div>
      `;
      billItemsContainer.appendChild(itemDiv);
    }

    if (subtotal === 0) {
      billItemsContainer.innerHTML = '<div class="empty-bill-message">No items added yet.</div>';
    }

    const discountPercent = parseFloat(discountInput.value) || 0;
    const discount = subtotal * (discountPercent / 100);
    const total = subtotal - discount;

    subtotalAmount.textContent = `$${subtotal.toFixed(2)}`;
    discountAmount.textContent = `$${discount.toFixed(2)}`;
    totalAmount.textContent = `$${total.toFixed(2)}`;
  }

  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('add-to-cart-btn')) {
      const menuItem = e.target.closest('.menu-item');
      const id = e.target.dataset.id;
      const name = menuItem.querySelector('h3').textContent;
      const price = parseFloat(menuItem.querySelector('p').textContent.replace('$', ''));

      if (!cart[id]) {
        cart[id] = { name, price, quantity: 1 };
      } else {
        cart[id].quantity += 1;
      }

      updateBill();
    }

    if (e.target.classList.contains('plus-btn')) {
      const id = e.target.dataset.id;
      cart[id].quantity += 1;
      updateBill();
    }

    if (e.target.classList.contains('minus-btn')) {
      const id = e.target.dataset.id;
      cart[id].quantity -= 1;
      if (cart[id].quantity <= 0) delete cart[id];
      updateBill();
    }

    if (e.target.classList.contains('remove-item-btn')) {
      const id = e.target.dataset.id;
      delete cart[id];
      updateBill();
    }
  });

  discountInput.addEventListener('input', updateBill);

  const tabs = document.querySelectorAll('.category-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const category = tab.dataset.category;
      filterMenuItems(category);
    });
  });

  function filterMenuItems(category) {
    const items = document.querySelectorAll('#menu-items-grid .menu-item');
    items.forEach(item => {
      const itemCategory = item.dataset.category;
      if (category === 'all' || itemCategory === category) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  }

  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('add-to-cart-btn')) {
      const id = e.target.dataset.id;
      console.log('Add to cart:', id);
    }
  });

  document.getElementById('clear-order-btn').addEventListener('click', () => {
    if (confirm("Are you sure you want to clear the current order?")) {
      for (const id in cart) delete cart[id];
      updateBill();
    }
  });

  // Checkout Button
  document.getElementById('checkout-btn').addEventListener('click', () => {
    const total = document.getElementById('total-amount').textContent;
    const tableNo = document.getElementById('table-number').value;
    const paymentMethod = document.getElementById('payment-method').value;

    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    if (Object.keys(cart).length === 0) {
      alert("No items in the order.");
      return;
    }

    alert(`Order for Table #${tableNo} confirmed!\nTotal: ${total}\nPayment: ${paymentMethod}`);

    for (const id in cart) delete cart[id];
    updateBill();
  });

  document.getElementById('print-bill-btn').addEventListener('click', () => {
    const printContent = document.querySelector('.bill-section').innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = `<div class="bill-section">${printContent}</div>`;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
  });