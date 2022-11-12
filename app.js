const stockProductos = [
  {
    id: 1,
    nombre: "CLASICA",
    cantidad: 1,
    
    precio: 1200,
    img: "FOTOS/5a35e0f35088d3.2888187115134804353299.png",
  },
  {
    id: 2,
    nombre: "ESPECIAL",
    cantidad: 1,
   
    precio: 1350,
    img: "FOTOS/kisspng-hamburger-shake-shack-new-york-city-cheeseburger-f-shack-burger-png-5a74922a422640.197265231517589034271 (1).png",
  },
  {
    id: 3,
    nombre: "CANGRE-BURGER",
    cantidad: 1,
    
    precio: 1570,
    img: "FOTOS/FOTO CANGREBURGUER EDITADA (1).png",
  },
  {
    id: 4,
    nombre: "Sprite",
    cantidad: 1,
    
    precio: 300,
    img: "FOTOS/kisspng-beer-carlsberg-group-soft-drink-sprite-zero-european-cup-element-sprite-5a74df438fb773.2430206415176087715887.png",
  },
  {
    id: 5,
    nombre: "COCA-COLA",
    cantidad: 1,
    
    precio: 300,
    img: "FOTOS/kisspng-coca-cola-fizzy-drinks-hamburger-diet-coke-creative-coca-cola-carbonated-drinks-5aec3d8c3608d5.0445789815254316922213 (1).png",
  },
  {
    id: 6,
    nombre: "CERVEZA",
    cantidad: 1,
    
    precio: 450,
    img: "FOTOS/kisspng-ale-malt-beer-beer-bottle-kwaremont-brewed-beer-5b0ec6f959a3a3.3428175015276950973672.png",
  },
  
  {
    id: 8,
    nombre: "BANANA-SPLIT",
    cantidad: 1,
    
    precio: 550,
    img: "FOTOS/kisspng-banana-split-sundae-chocolate-ice-cream-banana-splits-5b130bfe244ed0.6247395315279749101487.png",
  },
  {
    id: 9,
    nombre: "HELADO",
    cantidad: 1,
    
    precio: 300,
    img: "FOTOS/kisspng-ice-cream-cones-milkshake-strawberry-ice-cream-icecream-5acebcf7294a46.3337013515234982311691.png",
  },
  {
    id: 10,
    nombre: "FLAN",
    cantidad: 1,
    
    precio: 250,
    img: "FOTOS/kisspng-crxe8me-caramel-pudding-custard-cream-egg-kikiwa-ko-egg-pudding-5a83c203b65cb6.048247411518584323747.png",
  },
  {
    id: 11,
    nombre: "MOUSE DE CHOCOLATE",
    cantidad: 1,
    
    precio: 250,
    img: "FOTOS/kisspng-chocolate-cake-chocolate-brownie-mousse-tiramisu-l-chocolate-mousse-5b1da516970245.8851442615286694626185.png",
  },
  {
    id: 12,
    nombre: "YOGURT CON FRUTAS",
    cantidad: 1,
    
    precio: 300,
    img: "FOTOS/kisspng-muesli-breakfast-cereal-congee-parfait-pudding-cup-of-fruit-yogurt-cereal-5a83b6f402a4b4.1638802815185814920108.png",
  },
  {
    id: 13,
    nombre: "CHEESE CAKE",
    cantidad: 1,
    
    precio: 400,
    img: "FOTOS/kisspng-cheesecake-matcha-pizza-teacake-cheeseburger-pure-cheese-cake-5a8be8090b6797.7059333215191183450467.png",
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
const formulario = document.querySelector('#procesar-pago')

if (activarFuncion) {
  activarFuncion.addEventListener("click", procesarPedido);
}

document.addEventListener("DOMContentLoaded", () => {
  carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  mostrarCarrito();
  document.querySelector("#activarFuncion").click(procesarPedido);
});
if(formulario){
  formulario.addEventListener('submit', enviarCompra)
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
        text: "Compra algo para continuar con la compra",
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
    <div class="card mt-3" style="width: 18rem;">
    <img class="card-img-top mt-2" src="${img}" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">${nombre}</h5>
      <p class="card-text">Precio: ${precio}</p>
      <p class="card-text">Cantidad: ${cantidad}</p>
      <button class=" btn btn-primary " onclick="agregarProducto(${id})">Comprar Producto</button>
    </div>
  </div>
    `;
  }
});

const agregarProducto = (id) => {
  const existe = carrito.some(prod => prod.id === id)

  if(existe){
    const prod = carrito.map(prod => {
      if(prod.id === id){
        prod.cantidad++
      }
    })
  } else {
    const item = stockProductos.find((prod) => prod.id === id)
    carrito.push(item)
  }
  mostrarCarrito()

};

const mostrarCarrito = () => {
  const modalBody = document.querySelector(".modal .modal-body");
  if (modalBody) {
    modalBody.innerHTML = "";
    carrito.forEach((prod) => {
      const { id, nombre, precio, desc, img, cantidad } = prod;
      console.log(modalBody);
      modalBody.innerHTML += `
      <div class="container modal-contenedor">
        <div>
        <img class="img-fluid img-carrito" src="${img}"/>
        </div>
        <div>
        <p>Producto: ${nombre}</p>
      <p>Precio: ${precio}</p>
      <p>Cantidad :${cantidad}</p>
      <button class="btn btn-danger"  onclick="eliminarProducto(${id})">Eliminar producto</button>
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

 function enviarCompra(e){
   e.preventDefault()
   const cliente = document.querySelector('#cliente').value
   const email = document.querySelector('#correo').value

   if(email === '' || cliente == ''){
     Swal.fire({
       title: "¡Debes completar tu email y nombre!",
       text: "Rellena el formulario",
       icon: "error",
       confirmButtonText: "Aceptar",
   })
 } else {

  const btn = document.getElementById('button');



   btn.value = 'Enviando...';

   const serviceID = 'default_service';
   const templateID = 'template_qxwi0jn';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Finalizar compra';
      alert('Correo enviado!');
    }, (err) => {
      btn.value = 'Finalizar compra';
      alert(JSON.stringify(err));
    });
    
   const spinner = document.querySelector('#spinner')
   spinner.classList.add('d-flex')
   spinner.classList.remove('d-none')

   
 }
 localStorage.clear()

 }