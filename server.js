const serverUrl = "http://localhost:8080/ebazar-back";
const loginPage = "login.html";
//const serverUrl = "https://ebazarmex.000webhostapp.com";

function getSesion() {
    var sesion = localStorage.getItem("lusuarios_sesion");
    
    if (sesion != null && sesion != "")
    {
        var sesion_json = JSON.parse(sesion);

        return sesion_json;
    }
    
    return null;
}

function refreshToken() {
    var sesion = getSesion();

    if (sesion == null) {
        window.location.href = "login.html";
    }

    var xhttp = new XMLHttpRequest();

    xhttp.open("PATCH", serverUrl + "/sesiones/id_sesion=" + sesion.id_sesion, false);
    xhttp.setRequestHeader("Authorization", sesion.token_acceso);
    xhttp.setRequestHeader("Content-Type", "application/json");

    var json = { "token_actualizacion": sesion.token_actualizacion };
    var json_string = JSON.stringify(json);

    xhttp.send(json_string);

    var data = JSON.parse(xhttp.responseText);

    if (data.success === true){
        localStorage.setItem('lusuarios_sesion', JSON.stringify(data.data));
        window.location.reload();
        //window.location.href = client;
    }
    else{
        alert(data.messages);
        window.location.href = "login.html";
    }
}

function menu()
{
    var session = getSesion();
    let htmlMenu = '';
    if(session == null) 
    {
       htmlMenu += `
       <li onclick="window.location.href = 'inicio.html'">Inicio</li>
       <li onclick="window.location.href = 'catProductos.html'">Productos</li>
       <li onclick="window.location.href = 'misProductos.html'">Vender</li>
       <li onclick="window.location.href = 'Carrito.html'">Carrito</li>
       <li onclick="window.location.href = 'login.html'">Iniciar Sesión</li>`
    }
    else{
        htmlMenu = `
       <li onclick="window.location.href = 'inicio.html'">Inicio</li>
       <li onclick="window.location.href = 'catProductos.html'">Productos</li>
       <li onclick="window.location.href = 'misProductos.html'">Vender</li>
       <li onclick="window.location.href = 'Carrito.html'">Carrito</li>
       <li onclick="window.location.href = 'miCuenta.html'">Mi Cuenta</li>
       <li onclick="logOut()">Log Out</li>`;
    }
    
    document.getElementById('zonaMenu').innerHTML = htmlMenu;
}

function logOut()
{
    var sesion = getSesion();

    if (sesion != null)// && Number.isInteger(sesion.id_sesion)) 
    {    
        var xhttp = new XMLHttpRequest();

        xhttp.open("DELETE", serverUrl + `sesiones/id_sesion=${sesion.id_sesion}`, true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.setRequestHeader("Authorization",sesion.token_acceso);

        xhttp.onload = function() 
        {
            var data = JSON.parse(this.responseText);
            if (data.success === true)
            {
                    localStorage.removeItem("lusuarios_sesion",JSON.stringify(data.data));
                    window.location.href = client;// + "inicio.html";
            }
            else 
            {
                var data = JSON.parse(this.responseText);
                alert(data.messages);
            }
        }

        xhttp.send();
    }

}