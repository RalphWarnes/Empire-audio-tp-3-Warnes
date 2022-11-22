const stockProductos = [
  {
    id: 1,
    nombre: "Audient Sono",
    cantidad: 1,
    desc: "Interfaces de Audio",
    precio: 89129.0,
    img: "img/EMPIRE AUDIO-logos_black.png",
  },
  {
    id: 2,
    nombre: "Audient ID4 mk2",
    cantidad: 1,
    desc: "Interfaces de Audio",
    precio: 80300.0,
    img: "img/EMPIRE AUDIO-logos_black.png",
  },
  {
    id: 3,
    nombre: "Black Lion Revolution 2x2",
    cantidad: 1,
    desc: "Interfaces de Audio",
    precio: 89400.0,
    img: "img/EMPIRE AUDIO-logos_black.png",
  },
  {
    id: 4,
    nombre: "EVO By Audient EVO 8",
    cantidad: 1,
    desc: "Interfaces de Audio",
    precio: 79200.0,
    img: "img/EMPIRE AUDIO-logos_black.png",
  },
  {
    id: 5,
    nombre: "Aston Origin",
    cantidad: 1,
    desc: "microfonos",
    precio: 1157200.0,
    img: "img/EMPIRE AUDIO-logos_black.png",
  },
  {
    id: 6,
    nombre: "Warm Audio WA251",
    cantidad: 1,
    desc: "microfonos",
    precio: 1157200.0,
    img: "img/EMPIRE AUDIO-logos_black.png",
  },
  {
    id: 7,
    nombre: "Soyuz 023 Bomblet Deluxe",
    cantidad: 1,
    desc: "microfonos",
    precio: 1157200.0,
    img: "img/EMPIRE AUDIO-logos_black.png",
  },
  {
    id: 8,
    nombre: "Avantone Audio CK-1",
    cantidad: 1,
    desc: "microfonos",
    precio: 1157200.0,
    img: "img/EMPIRE AUDIO-logos_black.png",
  },
  {
    id: 9,
    nombre: "Sony MDR7506",
    cantidad: 1,
    desc: "auriculares",
    precio: 60500.0,
    img: "img/EMPIRE AUDIO-logos_black.png",
  },
  {
    id: 10,
    nombre: "Avantone Audio Mixphones MP1",
    cantidad: 1,
    desc: "auriculares",
    precio: 88000.0,
    img: "img/EMPIRE AUDIO-logos_black.png",
  },
  {
    id: 11,
    nombre: "512 AUDIO Academy",
    cantidad: 1,
    desc: "auriculares",
    precio: 45100.0,
    img: "img/EMPIRE AUDIO-logos_black.png",
  },
  {
    id: 12,
    nombre: "Ultrasone Signature Studio",
    cantidad: 1,
    desc: "auriculares",
    precio: 156200.0,
    img: "img/EMPIRE AUDIO-logos_black.png",
  },
];
let carrito = [];

const contenedor = document.querySelector("#contenedor");
const carritoContenedor = document.querySelector("#carritoContenedor");
const vaciarCarrito = document.querySelector("#vaciarCarrito");
const precioTotal = document.querySelector("#precioTotal");
const activarFuncion = document.querySelector("#activarFuncion");
const procesarCompra = document.querySelector("#procesarCompra");
const totalProceso = document.querySelector("#totalProceso");
const formulario = document.querySelector("#procesar-pago");

if (activarFuncion) {
  activarFuncion.addEventListener("click", procesarPedido);
}

document.addEventListener("DOMContentLoaded", () => {
  carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  mostrarCarrito();
  document.querySelector("#activarFuncion").click(procesarPedido);
});
if (formulario) {
  formulario.addEventListener("submit", enviarCompra);
}

if (vaciarCarrito) {
  vaciarCarrito.addEventListener("click", () => {
    carrito.length = [];
    mostrarCarrito();
  });
}

if (procesarCompra) {
  procesarCompra.addEventListener("click", () => {
    if (carrito.length === 0) {
      Swal.fire({
        title: "¡Tu carrito está vacio!",
        text: "sigue comprando para continuar ",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    } else {
      location.href = "compra.html";
    }
  });
}

stockProductos.forEach((prod) => {
  const { id, nombre, precio, desc, img, cantidad } = prod;
  if (contenedor) {
    contenedor.innerHTML += `
    <div class=" text-bg-light card text-center mt-3 mb-5 ms-5" style="width: 17rem;">
    <img class="border border-dark rounded card-img-top mt-2" src="${img}" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">${nombre}</h5>
      <p class="card-text">$ ${precio}</p>
      <p class="card-text"> ${desc}</p>
      <p class="card-text">Cantidad: ${cantidad}</p>
      <button class="btn btn-dark" onclick="agregarProducto(${id})">Comprar Producto</button>
    </div>
  </div>
    `;
  }
});

const agregarProducto = (id) => {
  const existe = carrito.some((prod) => prod.id === id);

  if (existe) {
    const prod = carrito.map((prod) => {
      if (prod.id === id) {
        prod.cantidad++;
      }
    });
  } else {
    const item = stockProductos.find((prod) => prod.id === id);
    carrito.push(item);
  }
  mostrarCarrito();
};

const mostrarCarrito = () => {
  const modalBody = document.querySelector(".modal .modal-body");
  if (modalBody) {
    modalBody.innerHTML = "";
    carrito.forEach((prod) => {
      const { id, nombre, precio, desc, img, cantidad } = prod;
      console.log(modalBody);
      modalBody.innerHTML += `
      <div class="modal-contenedor">
        <div>
        <img class="img-fluid img-carrito" src="${img}"/>
        </div>
        <div>
        <p>Producto: ${nombre}</p>
      <p>Precio: ${precio}</p>
      <p>Cantidad :${cantidad}</p>
      <button class="btn btn-dark"  onclick="eliminarProducto(${id})">Eliminar producto</button>
        </div>
      </div>
      
  
      `;
    });
  }

  if (carrito.length === 0) {
    console.log("Nada");
    modalBody.innerHTML = `
    <p class="text-center text-primary parrafo">¡Aun no agregaste nada!</p>
    `;
  } else {
    console.log("Algo");
  }
  carritoContenedor.textContent = carrito.length;

  if (precioTotal) {
    precioTotal.innerText = carrito.reduce(
      (acc, prod) => acc + prod.cantidad * prod.precio,
      0
    );
  }

  guardarStorage();
};

function guardarStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function eliminarProducto(id) {
  const juegoId = id;
  carrito = carrito.filter((juego) => juego.id !== juegoId);
  mostrarCarrito();
}
function procesarPedido() {
  carrito.forEach((prod) => {
    const listaCompra = document.querySelector("#lista-compra tbody");
    const { id, nombre, precio, img, cantidad } = prod;
    if (listaCompra) {
      const row = document.createElement("tr");
      row.innerHTML += `
              <td>
              <img class="img-fluid img-carrito" src="${img}"/>
              </td>
              <td>${nombre}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>${precio * cantidad}</td>
            `;
      listaCompra.appendChild(row);
    }
  });
  totalProceso.innerText = carrito.reduce(
    (acc, prod) => acc + prod.cantidad * prod.precio,
    0
  );
}

function enviarCompra(e) {
  e.preventDefault();
  const cliente = document.querySelector("#cliente").value;
  const email = document.querySelector("#correo").value;

  if (email === "" || cliente == "") {
    Swal.fire({
      title: "¡Debes completar tu email y nombre!",
      text: "Rellena el formulario",
      icon: "error",
      confirmButtonText: "Aceptar",
    });
  } else {
    const btn = document.getElementById("button");
    btn.value = "Enviando...";

    const serviceID = "default_service";
    const templateID = "template_9jw70ie";

    emailjs.sendForm(serviceID, templateID, this).then(
      () => {
        btn.value = "Finalizar compra";
        alert("Correo enviado!");
      },
      (err) => {
        btn.value = "Finalizar compra";
        alert(JSON.stringify(err));
      }
    );

    const spinner = document.querySelector("#spinner");
    spinner.classList.add("d-flex");
    spinner.classList.remove("d-none");

    setTimeout(() => {
      spinner.classList.remove("d-flex");
      spinner.classList.add("d-none");
      formulario.reset();

      const alertExito = document.createElement("p");
      alertExito.classList.add(
        "alert",
        "alerta",
        "d-block",
        "text-center",
        "col-12",
        "mt-2",
        "alert-success"
      );
      alertExito.textContent = "Compra realizada correctamente";
      formulario.appendChild(alertExito);

      setTimeout(() => {
        alertExito.remove();
      }, 3000);
    }, 3000);
  }
  localStorage.clear();
}
