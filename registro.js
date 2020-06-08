const btn_registro = document.getElementById("continuar");

eventListener();

function eventListener()
{
    btn_registro.addEventListener('click',registrarse);
}

function registrarse(e)
{
    e.preventDefault();

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", api + "usuarios", false);
    xhttp.setRequestHeader("Content-Type", "application/json");

    /*
    xhttp.onload = function() {
        if (this.status == 201) {
            var data = JSON.parse(this.responseText);

            if (data.success === true) {
                window.location.href = "login.html";
            }
        }
        else {
            var data = JSON.parse(this.responseText);
            alert(data.messages);
        }
    };*/

    var num_telefono = document.getElementById('num_telefono').value;
    var domicilio = document.getElementById('domicilio').value;
    var nombre = document.getElementById('nombre').value;
    var nombre_usuario = document.getElementById('nombre_usuario').value;
    var email = document.getElementById('email').value;
    var contrasena = document.getElementById('contrasena').value;

    var tipo_usuario = document.getElementById("tipo_usuario");
    var tipo_usuarioSeleccionado = tipo_usuario.options[tipo_usuario.selectedIndex].value;

    var json = { "num_telefono": num_telefono, "domicilio": domicilio, "nombre": nombre, "nombre_usuario": nombre_usuario, 
    "email":email, "contrasena": contrasena, "tipo_usuario": tipo_usuarioSeleccionado};
    var json_string = JSON.stringify(json);
    
    xhttp.send(json_string);

    if (xhttp.status == 201) {
        var data = JSON.parse(xhttp.responseText);

        if (data.success === true) {
            //window.location.href = "login.html";
        }
    }
    else {
        var data = JSON.parse(xhttp.responseText);
        alert(data.messages);
    }

    xhttp = new XMLHttpRequest();

    xhttp.open("POST", api + "sesiones", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.onload = function() {
        if (this.status == 201) {
            var data = JSON.parse(this.responseText);

            if (data.success === true){
                localStorage.setItem('lusuarios_sesion', JSON.stringify(data.data));
                window.location.href = client;
            }
        }
        else {
            var data = JSON.parse(this.responseText);

            alert(data.messages);
        }
    };

    var json = { "nombre_usuario": nombre_usuario, "contrasena": contrasena };
    var json_string = JSON.stringify(json);
    
    xhttp.send(json_string);
}