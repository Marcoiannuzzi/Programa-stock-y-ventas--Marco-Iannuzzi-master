// ----- Variables -----
const formCompras = document.getElementById("formCompras")
const codigoProductoComprado=document.getElementById("codigoProductoComprado");
const cantidadProdComprado=document.getElementById("cantidadProdComprado");
const listaProductosComprados=document.getElementById("listaProductosComprados")


// -----  Eventos ----

const arrayProductos = JSON.parse(localStorage.getItem("Productos")) || swal("Error", "No hay productos Cargados en tu stock inicial, no puedes ingresar compras aún", "error");


formCompras.addEventListener("submit",(e)=>{
    e.preventDefault()
    const productoUser = arrayProductos.find(producto=> {
    return producto.codigo===codigoProductoComprado.value
    }) 

    if(cantidadProdComprado.value=="" || cantidadProdComprado.value <= 0){
        listaProductosComprados.innerHTML=`<li>La cantidad comprada, no puede ser 0 o un valor negativo</li>`
    }else if (productoUser!=undefined) {   
    productoUser.cantidad = parseInt(productoUser.cantidad); 
    productoUser.cantidad += parseInt(cantidadProdComprado.value);
    listaProductosComprados.innerHTML+=`<li> Se agregaron ${cantidadProdComprado.value} unidades del producto ${productoUser.descripcion} codigo ${productoUser.codigo}.</li>`
    localStorage.setItem("Productos", JSON.stringify(arrayProductos))
    formCompras.reset()
    listaProductosComprados.innerHTML+=`<li>El Total en stock es de ${productoUser.cantidad}</li>`  
    }else{
        listaProductosComprados.innerHTML=`<li>El Codigo ${codigoProductoComprado.value}, no fue asignado a ningun producto del stock</li>`
    }
    
})
