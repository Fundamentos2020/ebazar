const btn_login = document.getElementById('login');

eventListener();

function eventListener() 
{
    btn_login.addEventListener("click", iniciaSesion);

    document.addEventListener("DOMContentLoaded", documentListo);
}

//Funciones
function iniciaSesion(e) 
{
    e.preventDefault();

    var xhttp = new XMLHttpRequest();

    xhttp.open("POST", api + "sesiones", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.onload = function() {
        if (this.status == 201) {
            var data = JSON.parse(this.responseText);

            if (data.success === true){
                localStorage.setItem('lusuarios_sesion', JSON.stringify(data.data));
                localStorage.setItem('carrito', JSON.stringify({
                    productos: [],
                    envio: 50
                }));
                window.location.href = client;
            }
        }
        else {
            var data = JSON.parse(this.responseText);

            alert(data.messages);
        }
    };
    
    var nombre_usuario = document.getElementById('username').value;
    var contrasena = document.getElementById('password').value;

    var json = { "nombre_usuario": nombre_usuario, "contrasena": contrasena };
    var json_string = JSON.stringify(json);
    
    xhttp.send(json_string);
}

//Verifica si hay sesión para brincarse el login
function documentListo() {
    var sesion = getSesion();

    if (sesion != null && Number.isInteger(sesion.id_sesion)) {  
        if (sesion.tipo_usuario === 3)
        {
            window.location.href = client + "administrador.html";
        }  
        else
        {
            window.location.href = client + "inicio.html";
             //window.location.href = client;
        } 
    }
}