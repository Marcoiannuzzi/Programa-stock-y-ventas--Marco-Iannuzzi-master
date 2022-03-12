// ----- Variables

const codigoProductoStock = document.getElementById("codigoProductoStock");
const descripcionProductoStock = document.getElementById("descripcionProductoStock");
const cantidadProdStock = document.getElementById("cantidadProdStock");
const precioProductoStock = document.getElementById("precioProductoStock");
const form =document.getElementById("form");
const listaProductosStock = document.getElementById("listaProductosStock");
const productos=document.getElementById("productos");
const mostrarProductos = document.getElementById("mostrarProductos");
const monstrarStock = document.getElementById("monstrarStock");
const codigoABorrar = document.getElementById("codigoABorrar");
const borrarProducto = document.getElementById("borrarProducto");


// ---- class y constructor de productos

class Producto {
    constructor(codigo, descripcion, cantidad, precio){
        this.codigo=codigo;
        this.descripcion=descripcion;
        this.cantidad=cantidad
        this.precio=precio;
    }
}


// ----- Evento para cargar productos en Local Storage ----

let arrayProductos;

// si el programa ya fue iniciado alguna vez, entonces no será necesario volver a iniciarlo en futuros ingresos. 

if (arrayProductos = JSON.parse(localStorage.getItem("Productos"))){
    productos.remove()
} else {
    swal("Atencion!", "Ingresa la palabra clave: INICIAR. Solo por única vez en tu primer ingreso al sistema", "info");
}


productos.addEventListener("change", (e)=>{
    if(productos.value.toLowerCase()=="iniciar"){
        arrayProductos = [];
        localStorage.setItem("Productos", JSON.stringify(arrayProductos)) 
        productos.remove()
    }else{
        swal("Algo no anda bien", "Ingresa la palabar clave INICIAR", "error");
    }
})

// --- Función destinada a que no se ingresen productos con un codigo que ya haya sido ingresado anteriormente

codigoProductoStock.addEventListener("change", (e)=>{
            const productoUser = arrayProductos.find(producto=> {
               if(producto.codigo===codigoProductoStock.value) {
                   listaProductosStock.innerHTML=`<li> El Codigo:${codigoProductoStock.value} ya fue asignado a un producto, ingrese un nuevo código</li>`
                   swal("Atencion!", `El Codigo: "${codigoProductoStock.value}" ya fue asignado a un producto, ingrese un nuevo código`, "warning");
               }
            })
            
         })


form.addEventListener("submit",(e)=>{
    e.preventDefault()
    if(codigoProductoStock.value==""||descripcionProductoStock.value==""||precioProductoStock.value==""||cantidadProdStock.value==""){
        listaProductosStock.innerHTML=`<li>Por favor complete todos los campos</li>`;
        monstrarStock.innerHTML="";
    }  else {
       arrayProductos.push(new Producto(codigoProductoStock.value, descripcionProductoStock.value, cantidadProdStock.value, precioProductoStock.value))
        localStorage.setItem("Productos", JSON.stringify(arrayProductos))
        listaProductosStock.innerHTML=`<li> Codigo:${codigoProductoStock.value} - Producto: ${descripcionProductoStock.value} - cantidad:${cantidadProdStock.value} - precio $${precioProductoStock.value}</li>`
        form.reset()
        monstrarStock.innerHTML=""; 
    }
    
})


mostrarProductos.addEventListener("click", (e)=>{
    arrayProductos = JSON.parse(localStorage.getItem("Productos"))
    arrayProductos.forEach(producto => {
        monstrarStock.innerHTML+=`<li> Codigo: ${producto.codigo} - Producto: ${producto.descripcion} - Precio: ${producto.precio} - Cantidad: ${producto.cantidad}</li>`          
    });
})

// ----- Eliminar Producto del stock ----

 
borrarProducto.addEventListener("click", (e) =>{
    arrayProductos = JSON.parse(localStorage.getItem("Productos"))
    const newArray = arrayProductos.filter((producto) => producto.codigo !== codigoABorrar.value);
    listaProductosStock.innerHTML=`<li> El Codigo:${codigoABorrar.value} ha sido borrado del stock</li>`
    arrayProductos=newArray
    localStorage.setItem("Productos", JSON.stringify(arrayProductos))
    monstrarStock.innerHTML="";
  })



