// -----  Variables  -----

const detalleVentas = document.getElementById("detalleVentas");
const codigoProducto = document.getElementById(`codigoProducto`);
const precio = document.getElementById(`precio`);
const psuma = document.getElementById(`psuma`);
const conteinerDetalle = document.getElementById(`conteinerDetalle`);
const ventasDiarias = document.getElementById("ventasDiarias");
const botonBorrar = document.getElementById(`botonBorrar`);
const totalVentas =document.getElementById(`totalVentas`);
const botonContinuar = document.getElementById(`botonContinuar`);
const efectivo = document.getElementById("efectivo");
const tarjeta = document.getElementById("tarjeta");
const tres = document.getElementById("tres");
const seis = document.getElementById("seis");
const nueve = document.getElementById("nueve");
const doce = document.getElementById("doce");
const finalizarBoton = document.getElementById("finalizarBoton");
const detalleFinal = document.getElementById("detalleFinal");
const detalleFinalCuotas = document.getElementById("detalleFinalCuotas");
const reset = document.getElementById("reset");
const cantidadProducto = document.getElementById("cantidadProducto");
const formularioVentas = document.getElementById("formularioVentas")

// ----- Arrays ----

const arrayProductos = JSON.parse(localStorage.getItem("Productos")) || swal("Cuidado", "No hay productos Cargados en tu stock inicial", "warning");
let sumatoria = 0;

cantidadProducto.value=0

// ----- funciones ----


// Funcion para obtener el precio del producto por codigo y disminuir su stock por venta o si el usuario no conoce el codigo igual se le permite realizar una venta. La cual no infuira en el stock de mercaderias


formularioVentas.addEventListener("submit", (e)=>{
    e.preventDefault()
    const productoUser = arrayProductos.find(producto=> {
    return producto.codigo===codigoProducto.value;
    })
    if (codigoProducto.value==""){
        sumatoria+=(parseInt(precio.value)*parseInt(cantidadProducto.value)); 
        psuma.innerHTML =`El total de la compra es de $${sumatoria}. A continuación seleccione la forma de pago.`
        } else { 
            productoUser.cantidad = parseInt(productoUser.cantidad); 
            productoUser.cantidad -= parseInt(cantidadProducto.value);
            if (productoUser.cantidad<=0){
               productoUser.cantidad=0
               swal("Algo no anda bien", "ya no te quedan unidades para vender", "error");
            }
            precio.value=parseInt(productoUser.precio) 
            sumatoria+=parseInt(productoUser.precio)*parseInt(cantidadProducto.value);
            psuma.innerHTML =`El total de la compra es de $${sumatoria}. A continuación seleccione la forma de pago.`
            localStorage.setItem("Productos", JSON.stringify(arrayProductos))
            formularioVentas.reset()
            } 
})


codigoProducto.addEventListener("change", (e)=>{
   const productoUser = arrayProductos.find(producto=> {
      return producto.codigo===codigoProducto.value
   })
      precio.value=parseInt(productoUser.precio)
})


  
// ---- borra sumatoria de productos cargados

botonBorrar.addEventListener(`click`, (e) =>{
    montoAPagar = []
    sumatoria=0
    formularioVentas.reset()
    cantidadProducto.value=0
    psuma.innerHTML =`El total de la compra es de $${sumatoria}. `
 } )

// ---- Calculo final del monto a pagar segun forma de pago elegida


finalizarBoton.addEventListener(`click`, (e) => {
    e.preventDefault()
    if (efectivo.checked) {
        detalleFinal.innerHTML=`El pago en efectivo tiene un 10% de descuento. El total es $${Math.round(sumatoria*0.9)}`
    } else if(tarjeta.checked) {
        detalleFinal.innerHTML=`Seleccionaste Tarjeta, dependiendo de la cantidad de cuotas varian los interes`
         if (tres.checked) {
            detalleFinalCuotas.innerHTML=`El monto a pagar en 3 cuotas es de $${Math.round(sumatoria*1.1)}, siendo el interés del 10%`
         } else if (seis.checked){
            detalleFinalCuotas.innerHTML=`El monto a pagar en 6 cuotas es de $${Math.round(sumatoria*1.15)}, siendo el interés del 15%`
         } else if(nueve.checked){
            detalleFinalCuotas.innerHTML=`El monto a pagar en 9 cuotas es de $${Math.round(sumatoria*1.20)}, siendo el interés del 20%`
         } else if (doce.checked) {
            detalleFinalCuotas.innerHTML=`El monto a pagar en 12 cuotas es de $${Math.round(sumatoria*1.25)}, siendo el interés del 25%`
         }
    }
})


// ----- Reset

reset.addEventListener("click", (e)=>{
   location.reload();
})






