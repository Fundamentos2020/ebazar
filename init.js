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

    getLoMasVendido();
    getOfertas();
    getCategoria();
}

function getLoMasVendido()
{
    var xhttp = new XMLHttpRequest();

    xhttp.open("GET", api + "productos", false);

    xhttp.send();

    var data = JSON.parse(xhttp.responseText);

    if (data.success === true){
        productos = data.data;
        let i = 0;
        var html = `<h3 class="section-title border-b2">Lo más vendido</h3>`;
        productos['productos'].forEach(producto => {
            if (i < 5){
                html += 
                ` <div class = "col-m-2 col-s-10 card text-center ">
                <img class = "img-fluid" src="https://picsum.photos/id/537/300/300" alt="" onclick="window.location.href = 'producto.html'">
            </div> `;
            }
            i++;
            alert(i);
        });

        document.getElementById('masVendido').innerHTML = html;

    }
    else {
        alert(data.messages);
    }
}

function getOfertas()
{
    var xhttp = new XMLHttpRequest();

    xhttp.open("GET", api + "productos", false);

    xhttp.send();

    var data = JSON.parse(xhttp.responseText);

    if (data.success === true){
        productos = data.data;
        let i = 0;
        var html = `<h3 class="section-title border-b2 p-2">Ofertas destacadas</h3>`;
        productos['productos'].forEach(producto => {
            if (i < 5){
                html += 
                ` <div class = "col-m-2 col-s-10 card text-center ">
                <img class = "img-fluid" src=${producto.img} alt="" onclick="window.location.href = 'producto.html'">
            </div> `;
            }
            i++;
           
        });

        document.getElementById('ofertas').innerHTML = html;
    }
    else {
        alert(data.messages);
    }
}

function getCategoria()
{
    var xhttp = new XMLHttpRequest();

    xhttp.open("GET", api + "productos", false);

    xhttp.send();

    var data = JSON.parse(xhttp.responseText);

    if (data.success === true){
        productos = data.data;
        let i = 0;
        var html = `<h3 class="section-title border-b2 p-2">Entretenimiento</h3>`;
        productos['productos'].forEach(producto => {
            if (i < 5){
                html += 
                ` <div class = "col-m-2 col-s-10 card text-center ">
                <img class = "img-fluid" src=${producto.img} alt="" onclick="window.location.href = 'producto.html'">
            </div> `;
            i++;
            }
           
        });

        document.getElementById('entretenimiento').innerHTML = html;
    }
    else {
        alert(data.messages);
    }
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