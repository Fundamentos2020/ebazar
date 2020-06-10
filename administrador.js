function cargaUsuarios()
{
    var session = getSesion();

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", api +  "usuarios", false);

    xhttp.send();

    var data = JSON.parse(xhttp.responseText);

    let html = '';

    if (data.success === true)
    {
        let usuarios = data.data;

        usuarios['usuarios'].forEach(usuario => {
                html+=  ` 
                <div class="font-campos p-2 text-bold">
                    Username
                    <div class="campoRedondo color-contCampo barra text-white font-size-1">${usuario.nombre_usuario}</div>
                </div>
                `;
        
        });
        
        document.getElementById('contenido').innerHTML = html;
    }
    else{
        alert(data.messages);
    }
}

function cargaProductos()
{
    var session = getSesion();

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", api +  "productos", false);

    xhttp.send();

    var data = JSON.parse(xhttp.responseText);

    let html = '';

    if (data.success === true)
    {
        let productos = data.data;

        productos['productos'].forEach(producto => {
                html+=  ` 
                <div class="font-campos p-2 text-bold">
                    Titulo
                    <div class="campoRedondo color-contCampo barra text-white font-size-1">${producto.titulo}</div>
                </div>
                `;
        
        });
        
        document.getElementById('contenido').innerHTML = html;
    }
    else{
        alert(data.messages);
    }
}