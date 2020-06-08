
function cargar(){
    var session = getSesion();
    if(session == null){
        window.location.href = "login.html"
    }
    menu();
    getInformation();
}

function getInformation()
{
    var session = getSesion();

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", api +  `usuarios/id_usuario=${session.id_user}`, false);

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
                
                <div class="font-campos p-2 text-bold">
                    Nombre
                    <div class="campoRedondo color-contCampo barra text-white font-size-1" id="nombre">${usuario.nombre}</div>
                </div>

                <div class="font-campos p-2 text-bold">
                    Dirección
                    <br>
                    <input class="campoRedondo color-contCampo barra text-white font-size-1" id="domicilio"
                    placeholder = ${usuario.domicilio}></input>
                </div>

                <div class="font-campos p-2 text-bold">
                   Teléfono
                   <br>
                   <input class="campoRedondo color-contCampo barra text-white font-size-1" id="num_telefono"
                   placeholder = ${usuario.num_telefono}></input>
                </div>

                <div class="font-campos p-2 text-bold">
                   Email
                   <div class="campoRedondo color-contCampo barra text-white font-size-1">${usuario.email}</div>
                </div>
                `;
        
        });
        
        document.getElementById('info').innerHTML = html;
    }
    else{
        alert(data.messages);
    }
}

function actualizaInfo()
{
    console.log("hola");


    var session = getSesion();

    var xhttp = new XMLHttpRequest();
    xhttp.open("PATCH", api + `usuarios/id_usuario=${session.id_user}`, true);
    xhttp.setRequestHeader("Content-Type", "application/json");

    xhttp.onload = function() {
        if (this.status == 200) {
            var data = JSON.parse(this.responseText);

            if (data.success === true){
                window.location.href =client;
            }
        }
        else {
            var data = JSON.parse(this.responseText);
            alert(data.messages);
        }
    };

    var num_telefono = document.getElementById('num_telefono').value;
    var domicilio = document.getElementById('domicilio').value;
    var str = '{ "num_telefono": num_telefono, "domicilio": domicilio}';

    if(num_telefono !== null)
    {
        
    }

    var json = str;
    var json_string = JSON.stringify(json);
    
    xhttp.send(json_string);
}