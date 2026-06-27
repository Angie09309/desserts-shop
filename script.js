let carrito = [];

const cartButtons = document.querySelectorAll(".add-to-cart-btn");

cartButtons.forEach(function (boton) {
  boton.addEventListener("click", function (e) {
    const botonActivo = e.currentTarget;
    botonActivo.classList.add("inactive");

    let contadorChocolate = botonActivo.nextElementSibling;
    contadorChocolate.classList.add("active");

    const botonNumero = contadorChocolate.querySelector(".quantity-value");
    botonNumero.innerText = "1";
    const tarjetas = botonActivo.closest(".product-card");
    const nombreProducto = tarjetas.querySelector("h2").innerText;
    const precioProducto = tarjetas.querySelector("p").innerText;

    carrito.push({
      name: nombreProducto,
      price: precioProducto,
      quantity: 1,
    });

    actualizarTotalCarrito();
  });
});

const botonMas = document.querySelectorAll(".increment-btn");

botonMas.forEach((botonSuma) => {
  botonSuma.addEventListener("click", (e) => {
    const tarjeta = e.target.closest(".product-card");

    const botonNumero = tarjeta.querySelector(".quantity-value");

    botonNumero.innerText = Number(botonNumero.innerText) + 1;

    const nombreProducto = tarjeta.querySelector("h2").innerText;
    let productoExistente = carrito.find(
      (item) => item.name === nombreProducto,
    );

    if (productoExistente) {
      productoExistente.quantity = productoExistente.quantity + 1;
    }

    actualizarTotalCarrito();
  });
});

const botonMenos = document.querySelectorAll(".decrement-btn");

botonMenos.forEach((botonResta) => {
  botonResta.addEventListener("click", (e) => {
    const card = e.target.closest(".product-card");
    const botonNum = card.querySelector(".quantity-value");

    const nombreProducto = card.querySelector("h2").innerText;
    let productoExistente = carrito.find(
      (item) => item.name === nombreProducto,
    );

    if (Number(botonNum.innerText) > 1) {
      botonNum.innerText = Number(botonNum.innerText) - 1;
      productoExistente.quantity = productoExistente.quantity - 1;
      actualizarTotalCarrito();
    } else {
      botonNum.innerText = "0";
      carrito = carrito.filter((item) => item.name !== nombreProducto);
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
  renderizarCarrito();
}

function renderizarCarrito() {
  const cartItems = document.querySelector(".cart-items-container");
  const cartInfo = document.querySelector(".empty-cart-state");

  cartItems.innerHTML = "";

  if (carrito.length === 0) {
    cartInfo.style.display = "block";
  } else {
    cartInfo.style.display = "none";
  }

  carrito.forEach((item) => {
    cartItems.innerHTML =
      cartItems.innerHTML +
      `
    <div class="cart-item">
      <h3>${item.name}</h3>
      <p>
        <span>${item.quantity}x</span>
        <span>$ ${item.price}</span>
      </p>
    </div>
  `;
  });
}
