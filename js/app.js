window.onload = function()
{
    btnRegistrar = document.getElementById("btnRegistrar");
    ingreso = document.getElementById("ingreso");
    registro = document.getElementById("registro");
    txtCorreo = document.getElementById("correoR");
    txtNombre = document.getElementById("nombreR");
    txtContrasena = document.getElementById("contrasenaR");
    txtConfirmacion = document.getElementById("confirmacionR");
    txtFecha = document.getElementById("fechaR");
    btnRegistro = document.getElementById("btnRegistro");
    btnIngresar = document.getElementById("btnIngresar");
    txtCorreoI = document.getElementById("correoI");
    txtContrasenaI = document.getElementById("contrasenaI");
    nombreP = document.getElementById("nombreP");
    enviarM = document.getElementById("enviarM");
    MensajeM = document.getElementById("mensajeM");
    correoM = document.getElementById("correoM");
    photo = document.getElementById("photo");
    camera = document.getElementById("camera");
    Open = document.getElementById("open");

   
}
btnRegistrar.addEventListener("click", function() 
{
    ingreso.style.display = "none";
    registro.style.display = "block";
});
enviarM.addEventListener("click", function(){
    if(correoM.value == ""){
        alert ("Debes escribir usuario");
        correoM.classList.add("errorCampo");
        return false;
    }
    else {
        correoM.classList.remove("errorCampo");
    }
    if(MensajeM.value == ""){
        alert ("Debes escribir el mensaje");
        MensajeM.classList.add("errorCampo");
        return false;
    }
    else {
        correoM.classList.remove("errorCampo");
    }
    let metaMensaje = new FormData();
    metaMensaje.append("correoM", correoM.value);
    metaMensaje.append("mensajeM", MensajeM.value);

    fetch ("http://tpajatc.orgfree.com/registrarMensaje.php", {
        method: 'POST',
        body: metaMensaje
    })
    .then (function(response){
        if (response.ok) {
            alert ("Mensaje Enviado");
        }
        else {
            alert("Ocurrio un error");
            console.log(response);
        }
        })
        .catch(function(err) {
            alert("ocurrio un error");
            console.log(err);
        }); 
});
btnRegistro.addEventListener("click", function() 
{
    if (txtCorreo.value == "")
    {
        alert("Debe agregar un correo");
        txtCorreo.classList.add("errorCampo");
        return false;
    }
    else{
        txtCorreo.classList.remove("errorCampo");
    }
    if (txtNombre.value == "")
    {
        alert("Debe agregar un Nombre");
        txtNombre.classList.add("errorCampo");
        return false;
    }
    else{
        txtNombre.classList.remove("errorCampo");
    }
    if (txtConfirmacion.value == "")
    {
        alert("Debe confirmar la contrasena");
        txtConfirmacion.classList.add("errorCampo");
        return false;
    }
    else{
        txtConfirmacion.classList.remove("errorCampo");
    }
    if (txtContrasena.value !== txtConfirmacion.value)
    {
        alert("Las contrasenas deben coincidir");
        txtContrasena.classList.add("errorCampo");
        txtConfirmacion.classList.add("errorCampo");
        return false;
    }
    else{
        txtContrasena.classList.remove("errorCampo");
        txtConfirmacion.classList.remove("errorCampo");
    }
    if (txtFecha.value == "")
    {
        alert("Debe agregar una fecha de Nacimiento");
        txtFecha.classList.add("errorCampo");
        return false;
    }
    else{
        txtFecha.classList.remove("errorCampo");
    }
    
    let datos = new FormData();
    datos.append("correoR", txtCorreo.value);
    datos.append("nombreR", txtNombre.value);
    datos.append("contrasenaR", txtContrasena.value);
    datos.append("fechaR", txtFecha.value);

    fetch("http://tpajatc.orgfree.com/registro.php",{
        
    method: 'POST',
    body: datos
    })
    .then(function (response){
        if (response.ok){
            alert("usuario Registrado");
        }
        else{
            alert("Ocurrio un error al registrar");
            console.log(response);
        }
    })
    .catch(function(err){
        alert("Ocurrio un error inesperado");
        console.log(err);
    });
});

btnIngresar.addEventListener("click", function()
{
    if (txtCorreoI.value == "")
    {
        alert("Debe agregar un correo");
        txtCorreo.classList.add("errorCampo");
        return false;
    }
    else
    {
        txtCorreoI.classList.remove("errorCampo");
    }
    if (txtContrasenaI.value == "")
    {
        alert("Debe ingresar su contrasena");
        txtContrasenaI.classList.add("errorCampo");
        return false;
    }
    else
    {
        txtContrasenaI.classList.remove("errorCampo");
    }
    let datosI = new FormData();
    datosI.append("correoI", txtCorreoI.value);
    datosI.append("contrasenaI", txtContrasenaI.value);

    fetch("http://tpajatc.orgfree.com/ingreso.php",{
    method: 'POST',
    body: datosI
    })
    .then(function(response)
    {
        return response.json();
    })
    .then(function(data){
        if (data.fallo == "contrasena"){
            alert("debe escribir la contrasena correcta");
        }
        else if(data.fallo == "usuario") {
            alert("El correo no esta registrado");
        }
        else {
            nombre = data.nombre;
            correo = data.correo;
            ingreso.style.display = "none";
            principal.style.display = "block";
            nombreP.innerHTML = nombre;
            localStorage.setItem("login",1);
            localStorage.setItem("nombre",nombre);
            localStorage.setItem("correo", correo);

            leerM();
        }
    })
    .catch(function(err){
    alert("Ocurrio un error inesperado");
    console.log(err);
    });
});
function mensajes(){
    redactar.style.display = "block";
    document.getElementById("mensajes").style.display = "block";
    document.getElementById("camara").style.display = "none";
    cerrarBarra();
}
function cerrarSesion(){
    cerrarBarra();
    localStorage.removeItem("nombre");
    localStorage.removeItem("correo");
    localStorage.setItem("login",0);
    redactar.style.display = "none";
    document.getElementById("principal").style.display = "none";
    document.getElementById("mensajes").style.display = "none";
    document.getElementById("camara").style.display ="none";
    document.getElementById("ingreso").style.display = "block";

}
function abrirBarra() {
    document.getElementById("barraMenu").style.width = "250px";
}
function cerrarBarra() {
    document.getElementById("barraMenu").style.width = "0"
}
function leerM(){
    let datosLM = new FormData();
    datosLM.append("correoUsuario", correo);
    fetch("http://tpajatc.orgfree.com/leerMensajes.php",{
    method: 'POST',
    body: datosLM
    })
    .then(function(response)
    {
        return response.json();
    })
    .then(function(data){
        for (let x = 0; x < data.length; x++){
            document.getElementById("mensajes").innerHTML = 
            document.getElementById("mensajes").innerHTML + data[x].mensaje + "<br>" +
            data[x].fechahora + "<br>";
        }
    });
}


function tomarFoto(){
    redactar.style.display = "none";
    document.getElementById("mensajes").style.display = "none";
    document.getElementById("camara").style.display = "block";
}
Open.addEventListener("click", function(){
    camera.click();
});
camera.addEventListener("change", function(e){
    ruta= URL.createObjectURL(e.target.files[0]);
    obtenerLugar();
    photo.src = ruta;
    photo.src = URL.createObjectURL(e.target.files[0]);
    let link = document.createElement('a');
    link.download = "test.png"
    link.href = photo.toDaraURL("image/png").replace("image/png", "image/octet-stream");
    link.href = ruta;
    link.click();
    alert("foto capturada");
});
mapa.addEventListener('click', function(){
    window.open ("http://www.openstreetmap.org/?mlat=" + coordenadas.lat+"&mlon=" + coordenadas.lon + "&zoom=20");
});

function obtenerLugar(){
    coordenadas = {lat: 0, lon: 0};
    navigator.geolocation.getCurrentPosition(function(position){
        coordenadas = {lat : position.coords.latitude, lon: position.coords.longitude}

        fetch("https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=" + coordenadas.lat + "&lon=" + coordenadas.lon)
        .then(response => response.json())
        .then(data =>{
            document.getElementById("lugar").value = data.address.coutry +""+ data.address.state;
        })
        .catch(error => {
            console.log(error);
            coordenadas = {lat: 0, lon: 0};
        });   
    });
}
