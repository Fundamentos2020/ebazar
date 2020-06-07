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

    const xhr = new XMLHttpRequest();

    xhr.open("GET","inicio.json",true);

    xhr.onload = function()
    {
        if (this.status == 200)
        {
            const productos = JSON.parse(this.responseText);
            
            //Generar el HTML
            let htmlImagenes = '<h3 class="section-title border-b2">Lo más vendido</h3>';

            //Imprimir cada imagen
            productos.forEach(function(producto){
                    htmlImagenes += `
                    <div class = "col-m-2 col-s-10 card text-center ">
                        <img class = "img-fluid" src=${producto.url} alt="" onclick="window.location.href = 'producto.html'">
                    </div>
                    `;
            });

            document.getElementById('masVendido').innerHTML = htmlImagenes;
        }
    }
    //Envía el mensaje
    xhr.send();
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