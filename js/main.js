//sección contacto
function soloNumeros(e){
    key=e.keyCode || e.which;
    teclado=String.fromCharCode(key);
    numeros="0123456789";
    especiales="8-37-38-46";
    teclado_especial=false;

    for(var i in especiales){
        if(key==especiales[i]){
            teclado_especial=true
        }
    }
    if(numeros.indexOf(teclado)==-1 && !teclado_especial){
        return false;
    }
}

function soloLetras(e){
    key=e.keyCode || e.which;
    teclado=String.fromCharCode(key).toLowerCase();
    letras=" abcdefghijklmnñopqrstuvwxyzáéíóúü";
    especiales="8-37-38-46-164";
    teclado_especial=false;

    for(var i in especiales){
        if(key==especiales[i]){
            teclado_especial=true;break;
        }
    }
    if(letras.indexOf(teclado)==-1 && !teclado_especial){
        return false;
    }
}
function init(){
    contactoEnviado()
}

function contactoEnviado(){
    const btn = document.querySelector("#contactoBtn");
    btn.addEventListener("click", 
    ()=>
    Swal.fire({
        showConfirmButton: false,
        timer: 2000,
        title: `Su información nos ha llegado correctamente!`, 
        icon: 'success',
    }));    
}
// fin sección contacto



//sección catálogo
const contenedorProductos = document.getElementById('contenedor-productos')
const contenedorCarrito = document.getElementById('carrito-contenedor')
const botonVaciar = document.getElementById('vaciar-carrito')
const contadorCarrito = document.getElementById('contadorCarrito')
const cantidad = document.getElementById('cantidad')
const precioTotal = document.getElementById('precioTotal')
const cantidadTotal = document.getElementById('cantidadTotal')

let carrito = []

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    actualizarCarrito()
    Toastify({
        text: "Se han eliminado todos los productos",
        duration: 4000,
        gravity: 'bottom',
        position: 'right',
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
    }).showToast();
})

stockProductos.forEach((producto) => {
    const div = document.createElement('div')
    div.classList.add('producto')
    div.innerHTML = `
    <img src=${producto.img} alt= "">
    <h3>${producto.nombre}</h3>
    <p>${producto.desc}</p>
    <p class="precioProducto">Precio:$ ${producto.precio}</p>
    <button id="agregar${producto.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>
    `
    contenedorProductos.appendChild(div)
    const boton = document.getElementById(`agregar${producto.id}`)

    boton.addEventListener('click', () => {
        agregarAlCarrito(producto.id)
    })
})

//AGREGAR AL CARRITO
const agregarAlCarrito = (prodId) => {

    //PARA AUMENTAR LA CANTIDAD Y QUE NO SE REPITA
    const existe = carrito.some (prod => prod.id === prodId)

    if (existe){ //SI YA ESTÁ EN EL CARRITO, ACTUALIZAMOS LA CANTIDAD
        const prod = carrito.map (prod => { 
            if (prod.id === prodId){
                prod.cantidad++
            }
        })
    } else { //EN CASO DE QUE NO ESTÉ, AGREGAMOS EL CURSO AL CARRITO
        const item = stockProductos.find((prod) => prod.id === prodId)
        carrito.push(item)
    }
    actualizarCarrito()
    Toastify({
        text: "Se ha agregado este producto al carrito.",
        duration: 4000,
        gravity: 'bottom',
        position: 'right',
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
    }).showToast();
}

const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)

    const indice = carrito.indexOf(item) //Busca el elemento q yo le pase y nos devuelve su indice.

    carrito.splice(indice, 1) //Le pasamos el indice de mi elemento ITEM y borramos un elemento 
    actualizarCarrito()
    Toastify({
        text: "Se ha eliminado este producto",
        duration: 4000,
        gravity: 'bottom',
        position: 'right',
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
    }).showToast();
}

const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = "" 
    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <p>${prod.nombre}</p>
        <p>Precio:$${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `
        contenedorCarrito.appendChild(div)
    })
    localStorage.setItem('carrito', JSON.stringify(carrito))

    
    contadorCarrito.innerText = carrito.length 
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)
    //Por cada producto q recorro en mi carrito, al acumulador le suma la propiedad precio, con el acumulador empezando en 0.
}
// fin sección catálogo