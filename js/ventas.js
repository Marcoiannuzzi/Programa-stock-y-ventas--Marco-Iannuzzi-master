// -----  Variables  -----

const codigoProducto = document.getElementById(`codigoProducto`);
const precio = document.getElementById(`precio`);
const psuma = document.getElementById(`psuma`);
const botonBorrar = document.getElementById(`botonBorrar`);
const efectivo = document.getElementById("efectivo");
const tarjeta = document.getElementById("tarjeta");
const tres = document.getElementById("tres");
const seis = document.getElementById("seis");
const nueve = document.getElementById("nueve");
const doce = document.getElementById("doce");
const finalizarBoton = document.getElementById("finalizarBoton");
const detalleFinal = document.getElementById("detalleFinal");
const detalleFinalCuotas = document.getElementById("detalleFinalCuotas");
const resetear = document.getElementById("resetear");
const cantidadProducto = document.getElementById("cantidadProducto");
const formularioVentas = document.getElementById("formularioVentas")

// ----- Arrays ----

const arrayProductos = JSON.parse(localStorage.getItem("Productos")) || swal("Cuidado", "No hay productos Cargados en tu stock inicial", "warning");
let sumatoria = 0;



// ----- funciones ----


// Funcion para obtener el precio del producto por codigo y disminuir su stock por venta. Si el usuario no conoce el codigo igual 
// se le permite realizar una venta, la cual no influira en el stock de mercaderias. El ingreso negativo en la cantidad se utiliza 
// para cargar una devolucion de mercaderia


formularioVentas.addEventListener("submit", (e)=>{
    e.preventDefault()
    const productoUser = arrayProductos.find(producto=> {
    return producto.codigo===codigoProducto.value;
    })
    if (codigoProducto.value==""){
      sumatoria+=(parseInt(precio.value)*parseInt(cantidadProducto.value)); 
      psuma.innerHTML =`El total de la compra es de $${sumatoria}. A continuación seleccione la forma de pago.`
   } else if (productoUser.cantidad>=cantidadProducto.value) { 
      productoUser.cantidad = parseInt(productoUser.cantidad); 
      productoUser.cantidad -= parseInt(cantidadProducto.value);
      precio.value=parseInt(productoUser.precio) 
      sumatoria+=parseInt(productoUser.precio)*parseInt(cantidadProducto.value);
      psuma.innerHTML =`El total de la compra es de $${sumatoria}. A continuación seleccione la forma de pago.`
      localStorage.setItem("Productos", JSON.stringify(arrayProductos))
      formularioVentas.reset()
      } else {
         swal("Algo no anda bien", `Solo tienes ${productoUser.cantidad} unidedes para vender`, "error");
      }
})


codigoProducto.addEventListener("change", (e)=>{
   const productoUser = arrayProductos.find(producto=> {
      return producto.codigo===codigoProducto.value
   })
   if (productoUser!=undefined){
      psuma.innerHTML = `Tienes ${productoUser.cantidad} unidades de este producto`
      precio.value=parseInt(productoUser.precio)
   } else {
      psuma.innerHTML =`El codigo ingresado no corresponede a ningun producto en stock.`
   }
      
})


  
// ---- borra sumatoria de productos cargados----

botonBorrar.addEventListener(`click`, (e) =>{
    montoAPagar = []
    sumatoria=0
    formularioVentas.reset()
    psuma.innerHTML =`El total de la compra es de $${sumatoria}. `
 } )

// ---- Calculo final del monto a pagar segun forma de pago elegida


finalizarBoton.addEventListener(`click`, (e) => {
    e.preventDefault()
    if (efectivo.checked) {
        detalleFinal.innerHTML=`El pago en efectivo tiene un 10% de descuento. El total es $${Math.round(sumatoria*0.9)}`
        detalleFinalCuotas.innerHTML=""
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

resetear.addEventListener("click", (e)=>{
   sumatoria=0
   formularioVentas.reset()
   psuma.innerHTML =`ya puedes iniciar una nueva venta.`
   detalleFinal.innerHTML=""
   detalleFinalCuotas.innerHTML=""
})






