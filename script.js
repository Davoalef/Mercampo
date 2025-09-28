// =======================
// Carrito robusto (drop-in)
// =======================

(() => {
  // Estado
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // ---------- Utilidades ----------
  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function getCount() {
    return cart.reduce((acc, item) => acc + (Number(item.qty) || 0), 0);
  }

  function money(n) {
    const x = Number(n) || 0;
    return x.toFixed(2);
  }

  // ---------- Contadores ----------
  function updateCartCount() {
    const count = getCount();

    // Soporta múltiples contadores
    const targets = [
      document.getElementById("cart-count"),
      document.getElementById("floating-cart-count"),
    ].filter(Boolean);

    // También acepta cualquier elemento con data-cart-count
    document.querySelectorAll("[data-cart-count]").forEach(el => targets.push(el));

    targets.forEach(el => { el.textContent = count; });
  }

  // ---------- API pública ----------
  function addToCart(name, price, category) {
    // Sanitizar por si llegan strings
    const p = Number(price);

    const found = cart.find(
      (item) => item.name === name && item.category === category
    );

    if (found) {
      found.qty = (Number(found.qty) || 0) + 1;
    } else {
      cart.push({ name, price: p, category, qty: 1 });
    }

    saveCart();
    updateCartCount();
    renderCartNavbar();
    alert(`Agregaste "${name}" al carrito`);
  }

  function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    displayCart();
  }

  function clearCart() {
    cart = [];
    localStorage.removeItem("cart");
    displayCart();
    updateCartCount();
  }

  // ---------- Render del carrito (solo si existen los nodos) ----------
function displayCart() {
  const cartBody = document.getElementById("cart-body");
  const subtotalEl = document.getElementById("cart-subtotal");
  const totalEl = document.getElementById("cart-total");

  if (!cartBody || !subtotalEl || !totalEl) {
    updateCartCount();
    return;
  }

  cartBody.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const qty = Number(item.qty) || 0;
    const price = Number(item.price) || 0;
    const subtotal = price * qty;
    total += subtotal;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="product-remove">
        <a href="#" class="remove" data-index="${index}">
          <i class="fas fa-times"></i>
        </a>
      </td>
      <td class="product-thumbnail">
        <a href="#"><img src="img/${item.name.toLowerCase()}.jpg" alt="${item.name}" width="60"></a>
      </td>
      <td class="product-name"><a href="#">${item.name}</a></td>
      <td class="product-price">$${money(price)}</td>
      <td class="product-quantity">
        <input 
          type="number" 
          value="${qty}" 
          min="1" 
          step="1" 
          data-qty-index="${index}"
        >
      </td>
      <td class="product-subtotal">$${money(subtotal)}</td>
    `;
    cartBody.appendChild(row);
  });

  subtotalEl.textContent = money(total);
  totalEl.textContent = money(total);
  updateCartCount();

  // 🔗 Quitar producto
  document.querySelectorAll(".remove").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const idx = e.currentTarget.dataset.index;
      removeFromCart(idx);
    });
  });

  // 🔗 Actualizar cantidad
  document.querySelectorAll("input[data-qty-index]").forEach((input) => {
    input.addEventListener("change", (e) => {
      const idx = e.target.dataset.qtyIndex;
      const newQty = parseInt(e.target.value, 10);
      if (newQty > 0) {
        cart[idx].qty = newQty;
        saveCart();
        displayCart();
      }
    });
  });
}

  // ---------- Defensa anti-recargas por botones dentro de <form> ----------
  // Si tus botones "Agregar" están en formularios, el default es type="submit".
  // Esto evita recargas y conecta data-attrs si los usas.
  function wireAddButtons() {
    // Botones con data-add-to-cart
    document.querySelectorAll("[data-add-to-cart]").forEach(btn => {
      btn.type = "button"; // evitar submit
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const name = btn.dataset.name;
        const price = btn.dataset.price;
        const category = btn.dataset.category || "General";
        addToCart(name, price, category);
      });
    });

    // Por si usas clase .add-to-cart sin data-attrs
    document.querySelectorAll("button.add-to-cart").forEach(btn => {
      btn.type = "button";
    });
  }

  // ---------- Sync entre pestañas ----------
  window.addEventListener("storage", (e) => {
    if (e.key === "cart") {
      cart = JSON.parse(e.newValue || "[]");
      updateCartCount();
      displayCart();
    }
  });

  // ---------- Exponer en window para inline onclick="addToCart(...)" ----------
  window.addToCart = addToCart;
  window.removeFromCart = removeFromCart;
  window.clearCart = clearCart;
  window.displayCart = displayCart;
  window.updateCartCount = updateCartCount;

// ---------- Boot ----------
document.addEventListener("DOMContentLoaded", () => {
  if (typeof loadCart === "function") {
    loadCart();
  }

  updateCartCount();
  displayCart();       
  renderCartNavbar();  
  wireAddButtons();
});
})();


function renderCartNavbar() {
  const cartList = document.getElementById("cart-list");
  const cartTotalNavbar = document.getElementById("cart-total-navbar");

  if (!cartList || !cartTotalNavbar) return;

  // Limpiar (excepto el <li class="total"> que está al final)
  cartList.querySelectorAll("li:not(.total)").forEach(el => el.remove());

  let total = 0;

  cart.forEach((item, index) => {
    const qty = Number(item.qty) || 0;
    const price = Number(item.price) || 0;
    const subtotal = price * qty;
    total += subtotal;

    // Crear <li>
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="thumb">
        <a href="#" class="photo">
          <img src="img/${item.name.toLowerCase()}.jpg" alt="${item.name}">
        </a>
        <a href="#" class="remove-product" data-remove-index="${index}">
          <i class="fas fa-times"></i>
        </a>
      </div>
      <div class="info">
        <h6><a href="#">${item.name}</a></h6>
        <p>${qty}x - <span class="price">$${money(price)}</span></p>
      </div>
    `;
    cartList.insertBefore(li, cartList.querySelector(".total"));
  });

  cartTotalNavbar.textContent = money(total);

  function money(value) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0
  }).format(value);
}

  // Eventos para quitar
  cartList.querySelectorAll("[data-remove-index]").forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      const idx = btn.getAttribute("data-remove-index");
      removeFromCart(idx);
      renderCartNavbar();
    });
  });
}
