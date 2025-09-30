
// selecciono los elementos del DOM

// selecciono el menu hamburguesa
const toggle = document.getElementById("menu-toggle");
// selecciono el sidebar 
const menu = document.getElementById("sidebar");

    toggle.addEventListener("click", () => {
        menu.classList.toggle("active");
    });
    