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
    xhttp.open("GET", api +  `usuarios/id_usuario=${session.id_usuario}`, false);

    xhttp.send();

    var data = JSON.parse(xhttp.responseText);

    let html = '';
    let html_img ='';

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

                html_img += ` 
                    <div class="flex" id="foto" style="background-image: url('https://picsum.photos/310/400');">
                    </div>
                `;
        
        });
        
        document.getElementById('info').innerHTML = html;
        document.getElementById('zona_img').innerHTML = html_img;
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
    xhttp.open("PATCH", api + `usuarios/id_usuario=${session.id_usuario}`, true);
    xhttp.setRequestHeader("Content-Type", "application/json");

    xhttp.onload = function() {
        if (this.status == 200) {
            console.log(this.responseText);
            var data = JSON.parse(this.responseText);

            if (data.success === true){
                window.location.reload();
            }
        }
        else {
            var data = JSON.parse(this.responseText);
            alert(data.messages);
        }
    };

    var num_telefono = document.getElementById('num_telefono').value;
    var domicilio = document.getElementById('domicilio').value;
    //var str = '{ "num_telefono": num_telefono, "domicilio": domicilio}';
    var obj = {};

    if(num_telefono !== null)
    {
        obj['num_telefono'] = num_telefono;
    }

    if(domicilio !== null)
    {
        obj['domicilio'] = domicilio;
    }

    var json_string = JSON.stringify(obj);
    
    xhttp.send(json_string);
}