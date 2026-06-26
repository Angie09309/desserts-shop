const cartButtons = document.querySelectorAll(".add-to-cart-btn");

cartButtons.forEach(function (boton) {
  boton.addEventListener("click", function (e) {
    const botonActivo = e.currentTarget;
    botonActivo.classList.add("inactive");

    let contadorChocolate = botonActivo.nextElementSibling;
    contadorChocolate.classList.add("active");

    const botonNumero = contadorChocolate.querySelector(".quantity-value");
    botonNumero.innerText = "1";
    actualizarTotalCarrito();
  });
});

const botonMas = document.querySelectorAll(".increment-btn");

botonMas.forEach((botonSuma) => {
  botonSuma.addEventListener("click", (e) => {
    const tarjeta = e.target.closest(".product-card");

    const botonNumero = tarjeta.querySelector(".quantity-value");

    botonNumero.innerText = Number(botonNumero.innerText) + 1;
    actualizarTotalCarrito();
  });
});

const botonMenos = document.querySelectorAll(".decrement-btn");

botonMenos.forEach((botonResta) => {
  botonResta.addEventListener("click", (e) => {
    const card = e.target.closest(".product-card");

    const botonNum = card.querySelector(".quantity-value");

    if (Number(botonNum.innerText) > 1) {
      botonNum.innerText = Number(botonNum.innerText) - 1;
      actualizarTotalCarrito();
    } else {
      botonNum.innerText = "0";
      card.querySelector(".quantity-counter").classList.remove("active");
      card.querySelector(".add-to-cart-btn").classList.remove("inactive");
      actualizarTotalCarrito();
    }
  });
});

function actualizarTotalCarrito() {
  let sumaTotal = 0;
  numeros = document.querySelectorAll(".quantity-value");

  numeros.forEach((sumaNumeros) => {
    sumaTotal = sumaTotal + Number(sumaNumeros.innerText);
  });

  numeroTotal = document.querySelector(".cart-total-quantity");
  numeroTotal.innerText = sumaTotal;
}
