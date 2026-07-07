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
  let cantidadProductos = 0;

  carrito.forEach((item) => {
    cantidadProductos += item.quantity;
    dineroTotal += item.quantity * item.price;
  });

  const etiquetaCantidad = document.querySelector(".cart-total-quantity");
  etiquetaCantidad.innerText = cantidadProductos;

  const etiquetaPrecio = document.querySelector(".cart-total-price");
  etiquetaPrecio.innerText = "$" + dineroTotal.toLocaleString("es-CO");
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
  if (carrito.length === 0) {
    return;
  } else {
    capaModal.classList.add("is-active");
  }

  let listaPostresHtml = "";
  let totalGeneral = 0;

  carrito.forEach((item) => {
    const precioFormateado = item.price.toLocaleString("es-CO");

    totalGeneral += item.quantity * item.price;
    const subtotalFormateado = (item.quantity * item.price).toLocaleString(
      "es-CO",
    );

    listaPostresHtml += `  
  <div class="modal-item">
    <div class="modal-item-left">
      <img src="${item.imagen}" alt="${item.name}" class="modal-thumbnail"/>
      <div class="modal-item-details">
        <h3>${item.name}</h3>
        <p>
          <span class="modal-quantity">${item.quantity}x</span>
          <span class="modal-price">@ ${precioFormateado}</span>
        </p>
      </div>
    </div> <span class="modal-subtotal">$${subtotalFormateado}</span>
  </div>
`;
  });

  const totalFinalFormateado = totalGeneral.toLocaleString("es-CO");

  listaPostresHtml += `
    <div class="modal-total-container">
        <p>Order Total</p>
        <strong>$ ${totalFinalFormateado}</strong>
    </div>
  `;
  resumenModal.innerHTML = listaPostresHtml;
});

const btnNewOrder = document.querySelector(".btn-start-new-order");

btnNewOrder.addEventListener("click", () => {
  capaModal.classList.remove("is-active");
  carrito = [];

  totalTarjetas = document.querySelectorAll(".product-card");

  totalTarjetas.forEach((tarjetas) => {
    tarjetas.querySelector(".quantity-counter").classList.remove("active");
    tarjetas.querySelector(".add-to-cart-btn").classList.remove("inactive");
    tarjetas.querySelector(".quantity-value").innerText = "1";
  });

  actualizarTotalCarrito();
});
