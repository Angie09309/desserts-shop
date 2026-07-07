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
    const precioTexto = tarjetas.querySelector("p").innerText;
    const precioProducto = parseInt(precioTexto.replace(/\./g, ""), 10);
    const imagenProducto = tarjetas.querySelector("img").getAttribute("src");
    const iamgenChiquita = imagenProducto.replace("desktop", "thumbnail");

    carrito.push({
      name: nombreProducto,
      price: precioProducto,
      quantity: 1,
      imagen: iamgenChiquita,
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
  let dineroTotal = 0;

  numeros = document.querySelectorAll(".quantity-value");

  numeros.forEach((sumaNumeros) => {
    sumaTotal = sumaTotal + Number(sumaNumeros.innerText);
  });

  carrito.forEach((item) => {
    dineroTotal = dineroTotal + item.quantity * item.price;
  });

  numeroTotal = document.querySelector(".cart-total-quantity");
  numeroTotal.innerText = sumaTotal;

  priceTotal = document.querySelector(".cart-total-price");
  priceTotal.innerText = "$" + dineroTotal.toLocaleString("es-CO");
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
    const precioFormateado = item.price.toLocaleString("es-CO");
    const subtotalFormateado = (item.quantity * item.price).toLocaleString(
      "es-CO",
    );

    cartItems.innerHTML =
      cartItems.innerHTML +
      `<div class="cart-item">
        <div class="cart-item-details">
          <h3>${item.name}</h3>
          <p>
            <span>${item.quantity}x</span>
            <span>@ ${precioFormateado}</span>
            <span>$ ${subtotalFormateado}</span>
          </p>
        </div>
        <button class="remove-item-btn" data-name="${item.name}">
          <img src="./assets/images/icon-remove-item.svg" />
        </button>
      </div>`;
  });

  const botonesEliminar = document.querySelectorAll(".remove-item-btn");

  botonesEliminar.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      const nameCokie = e.currentTarget.getAttribute("data-name");

      carrito = carrito.filter((item) => item.name !== nameCokie);

      const encabezados = document.querySelectorAll(".product-card h2");

      encabezados.forEach((texto) => {
        if (texto.innerText === nameCokie) {
          const tarjeta = texto.closest(".product-card");
          tarjeta.querySelector(".quantity-value").innerText = "0";
          tarjeta.querySelector(".quantity-counter").classList.remove("active");
          tarjeta
            .querySelector(".add-to-cart-btn")
            .classList.remove("inactive");
        }
      });
      actualizarTotalCarrito();
    });
  });
}

const btnConfirmarOrden = document.querySelector(".btn-confirm-order");
const capaModal = document.querySelector(".modal-overlay");
const resumenModal = document.querySelector(".modal-orders-summary");

btnConfirmarOrden.addEventListener("click", () => {
  capaModal.classList.add("is-active");

  let listaPostresHtml = "";

  carrito.forEach((item) => {
    const precioFormateado = item.price.toLocaleString("es-CO");
    const subtotalFormateado = (item.quantity * item.price).toLocaleString(
      "es-CO",
    );

    listaPostresHtml += `  
      <div>
        <div>
          <h3>${item.name}</h3>
          <p>
            <span>${item.quantity} x</span>
            <span>@ ${precioFormateado}</span>
            <span>$ ${subtotalFormateado}</span>
          </p>
          <img src="${item.imagen}"/>
        </div>
      </div>
   `;
  });
  resumenModal.innerHTML = listaPostresHtml;
});
