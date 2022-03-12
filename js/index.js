const user = document.getElementById(`user`);
const password = document.getElementById(`password`);
const continuar = document.getElementById(`continuar`);
const form = document.getElementById("form");

continuar
form.addEventListener("submit",(e)=>{
    e.preventDefault()
    if (user.value != "visitor" || password.value != "1234") {
     swal("Algo no anda bien", "el usuario ingresado no es correcto", "error")
     
    }

    if(user.value == "visitor" && password.value == "1234"){
        continuar.className+="verde"
        continuar.href = "./menu.html"; 
    }

})




