let numCaracteristicas = 1;

function carga()
{
    menu();
    getDepartamentos();
}

var loadFile = function (event) {
    var output = document.getElementById('mainImg');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
        URL.revokeObjectURL(output.src) // free memory
    }
};

function agregarCarac() {
    numCaracteristicas++;
    var contendor = document.getElementById("caracteristicas");

    contendor.innerHTML += `
        <div>
        <div class="col-6">
            <input id="i_c_${numCaracteristicas}" type="text" class="input_caractersitica" placeholder="Ej. Color">
        </div>
        <div class="col-6">
            <input id="i_v_${numCaracteristicas}" type="text" class="input_caractersitica" placeholder="Ej. Rojo">
        </div>
        </div>
      `;
}

function publicarProducto() {
    // 
    var session = getSesion();
    if(session == null) {
        window.location.href = loginPage;
    }
    
 

    let id_usuario = session.id_usuario;

    // Obtiene los datos del producto
    let data = {
        id_usuario,
        titulo: document.getElementById('i_titulo').value,
        id_departamento: parseInt(document.getElementById('i_departamento').value),
        descripcion_corta: document.getElementById('i_descripcion_corta').value,
        descripcion_larga: document.getElementById('i_descripcion_larga').value,
        ubicacion: document.getElementById('i_ubicacion').value,
        precio: parseFloat(document.getElementById('i_precio').value),
        disponibles: parseInt(document.getElementById('i_disponibles').value)
    }

    // Caracterisitcas
    let caracteristicas = {}
    for (let i = 0; i < numCaracteristicas; i++) {
        if(document.getElementById(`i_c_${i+1}`).value != "")
            caracteristicas[document.getElementById(`i_c_${i+1}`).value] = document.getElementById(`i_v_${i+1}`).value
    }

    data['caracteristicas'] = caracteristicas;
    console.log(data);

    // Valida los datos
    if(data['titulo'] === "" ||
       data['descripcion_corta'] === "" ||
       data['descripcion_larga'] === "" ||
       data['ubicacion'] === "" ||
       data['precio'] == 0 || data['precio'] < 0 ||
       Object.keys(data['caracteristicas']).length === 0) {
        // Muestra alerta
        alert("Falta llenar algun campo");
    } else {
        var div = document.getElementById('b_vender');
        div.innerHTML = '<div class="loader"></div>';

        // Hace el post
        const xhr = new XMLHttpRequest();
        xhr.open("POST", `${serverUrl}/productos`, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader("Authorization", session.token_acceso);
        xhr.onload = function() {
            if(this.status === 201) {
                let id = JSON.parse(this.responseText).data.producto.id;
                console.log(id);
                window.location.href = `producto.html?id=${id}`;
            } else if(this.status == 401) {
                var data = JSON.parse(this.responseText);
    
                if (data.messages.indexOf("Token de acceso ha caducado") >= 0) {
                    console.log(data);
                    refreshToken();
                    //window.location.reload();
                } else {
                    window.location.href = loginPage;
                }
            } else {
                console.log(this.status);
                console.log(this.responseText)
                alert("Algo salio mal al publicar el producto, vuelve a intentar");
            }
        }
    
        xhr.send(JSON.stringify(data));

    }
}

//Obtener los departamentos de manera asíncrona.
function getDepartamentos() {
    var xhttp = new XMLHttpRequest();

    xhttp.open("GET", serverUrl + "/departamentos", false);

    xhttp.send();

    var data = JSON.parse(xhttp.responseText);

    if (data.success === true){
        departamentos = data.data;
        var html = "";
        departamentos['departamentos'].forEach(departamento => {
            html += 
                `
                <option value=${departamento.id}>${departamento.nombre}</option>
                `;
        });

        document.getElementById('i_departamento').innerHTML = html;

    }
    else {
        alert(data.messages);
    }
}