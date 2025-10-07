document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById("cart-items");

      // Leer el carrito del localStorage
      const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

      console.log("Carrito cargado:", carrito);
});