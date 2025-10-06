
function renderCart() {
  const cartPanel = document.getElementById("cart-panel");
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const items = JSON.parse(localStorage.getItem("carrito")) || [];

  if (!cartContainer || !totalElement) return;

  // const items = JSON.parse(localStorage.getItem("carrito") || "[]");
  // cartContainer.innerHTML = "";

  let total = 0;

  if (items.length === 0) {
    cartContainer.innerHTML = `<p style="text-align:center;color:var(--muted)">Tu carrito está vacío 🛍️</p>`;
    totalElement.textContent = "$0";
    return;
  }

  items.forEach((item) => {
    const precio = parseFloat(String(item.precio).replace(/[^0-9.,]/g, "").replace(",", "."));
    const cantidad = item.cantidad || 1;
    const subtotal = precio * cantidad;
    total += subtotal;

    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <div class="cart-item-info">
        <span class="cart-item-name">${item.nombre}</span>
        <span class="cart-item-qty">Cantidad: ${cantidad}</span>
        <span class="cart-item-price">Precio: ${item.precio}</span>
      </div>
      <strong>$${subtotal.toFixed(2)}</strong>
    `;
    cartContainer.appendChild(div);
  });

  totalElement.textContent = `$${total.toFixed(2)}`;
}

// Vaciar carrito
document.getElementById("cart-clear")?.addEventListener("click", () => {
  const ok = confirm("¿Seguro que querés vaciar el carrito?");
  if (ok) {
    localStorage.removeItem("carrito");
    renderCart();
  }
});

// Render inicial
renderCart();