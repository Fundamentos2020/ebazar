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

function cargar()
{
    var session = getSesion();
    {
        if (session.tipo_usuario !== 3 || session === null)
        {
            alert("¡No tienes los permisos necesarios para estar aquí!");
            window.location.href = "inicio.html";
        }
    }
    getInformation();
}

function getInformation()
{
    var session = getSesion();

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", api +  `usuarios/id_usuario=${session.id_usuario}`, false);

    xhttp.send();

    var data = JSON.parse(xhttp.responseText);

    let html = '';

    if (data.success === true)
    {
        let usuarios = data.data;

        usuarios['usuarios'].forEach(usuario => {
                html+=  ` 
                <br>
                <div class="pb-1">
                    Nombre: <span>${usuario.nombre}</span>
                </div>
                <br>
                <div class="pb-1">
                    Username: <span>${usuario.nombre_usuario}</span>
                </div>
                <br>
                <div class="pb-1">
                    Username: <span>${usuario.email}</span>
                </div>
                `;   
        });
        
        document.getElementById('informacionPersonal').innerHTML = html;
    }
    else{
        alert(data.messages);
    }
}

function creaDepartamento()
{
    var xhttp = new XMLHttpRequest();

    var nombre = document.getElementById('nombre_depa').value;

    xhttp.open("POST", api + "departamentos", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.onload = function() {
        if (this.status == 201) {
            var data = JSON.parse(this.responseText);

            if (data.success == true) 
            {
                alert("Creado");
            }
        }
        else {
            var data = JSON.parse(this.responseText);

            alert(data.messages);
        }
    };
    var json = {"nombre": nombre};
    var json_string = JSON.stringify(json);
    xhttp.send(json_string);
}

function creaFAQ()
{
    var xhttp = new XMLHttpRequest();

    var titulo = document.getElementById('titulo').value;
    var descripcion = document.getElementById('descripcion').value;

    xhttp.open("POST", api + "faq", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.onload = function() {
        if (this.status == 201) {
            var data = JSON.parse(this.responseText);

            if (data.success == true) 
            {
                alert("Creado");
            }
        }
        else {
            var data = JSON.parse(this.responseText);

            alert(data.messages);
        }
    };

    var json = {"titulo": titulo, "descripcion":descripcion};
    var json_string = JSON.stringify(json);
    xhttp.send(json_string);
}