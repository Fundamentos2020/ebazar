

function carga()
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

    getDepartamentos();
    getProductos();

}

function logOut()
{
    var sesion = getSesion();

    if (sesion != null && Number.isInteger(sesion.id_sesion)) 
    {    
        var xhttp = new XMLHttpRequest();

        xhttp.open("DELETE", api + `sesiones/id_sesion=${sesion.id_sesion}`, true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.setRequestHeader("Authorization",sesion.token_acceso);

        xhttp.onload = function() 
        {
            var data = JSON.parse(this.responseText);
            if (data.success === true)
            {
                    localStorage.removeItem("lusuarios_sesion",JSON.stringify(data.data));
                    window.location.href = client + "inicio.html";
            }
            else 
            {
                var data = JSON.parse(this.responseText);
                alert(data.messages);
            }
        }
    }
    xhttp.send();
}


//Obtener los departamentos de manera asíncrona.
function getDepartamentos() {
    var xhttp = new XMLHttpRequest();

    xhttp.open("GET", api + "departamentos", false);

    xhttp.send();

    var data = JSON.parse(xhttp.responseText);

    if (data.success === true){
        departamentos = data.data;
        var html = `<span class="font-campos text-bold">Departamentos</span>`;
        departamentos['departamentos'].forEach(departamento => {
            html += 
                `<li><a style="text-decoration:none" href="catProductos.html" id="${departamento.id}">${departamento.nombre}</a></li>`;
        });

        document.getElementById('departamentos').innerHTML = html;

    }
    else {
        alert(data.messages);
    }
}

//Obtiene los productos de la base de datos, de manera asíncrona.
function getProductos() {
    var xhttp = new XMLHttpRequest();

    xhttp.open("GET", api + "productos", false);

    xhttp.send();

    var data = JSON.parse(xhttp.responseText);

    if (data.success === true){
        productos = data.data;
        var html = ``;
        productos['productos'].forEach(producto => {
            html += 
                `<div class="col-m-2 col-s-5 card text-center">
                <img class = "img-fluid" src="https://picsum.photos/id/537/300/300" alt="">
                <div class="text-left">
                    <span>$${producto.precio}</span>
                    <br>
                    <span>${producto.titulo}</span>
                    <br>
                    <span>Valoración</span>
                    <br>
                    <button class="oferta" type="sumbit" onclick="window.location.href = 'producto.html'">Ver Producto</button>
                </div>
            </div>    `;
        });

        document.getElementById('catalogo').innerHTML = html;

    }
    else {
        alert(data.messages);
    }
}