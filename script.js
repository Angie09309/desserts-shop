const cartButtons = document.querySelectorAll(".add-to-cart-btn");

cartButtons.forEach(function (boton) {
  boton.addEventListener("click", function (e) {
    const botonActivo = e.currentTarget;
    botonActivo.classList.add("inactive");

    let contadorChocolate = botonActivo.nextElementSibling;
    contadorChocolate.classList.add("active");

    const botonMas = contadorChocolate.querySelector(".increment-btn");
    const botonNumero = contadorChocolate.querySelector(".quantity-value");
    const botonMenos = contadorChocolate.querySelector(".decrement-btn");

    botonMas.addEventListener("click", (e) => {
      botonNumero.innerText = Number(botonNumero.innerText) + 1;
    });

    botonMenos.addEventListener("click", (e) => {
      botonNumero.innerText = Number(botonNumero.innerText) - 1;
    });
  });
});
