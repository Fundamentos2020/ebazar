let id = 13;
let numCaracteristicas = 0;

function cargar() {
    var session = getSesion();
    if(session == null) {
        window.location.href = loginPage;
    }

    // Cargar parametros del URL
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    if (urlParams.has("id")) {
        id = parseInt(urlParams.get("id"));
    }

    const xhr = new XMLHttpRequest();

    xhr.open("GET", `${serverUrl}/productos?producto_id=${id}`, true);
    xhr.setRequestHeader("Authorization", session.token_acceso);

    //xhr.open("GET", "editarProducto.json", true);

    xhr.onload = function () {
        if (this.status === 200) {
            let producto = JSON.parse(this.responseText).data.producto;
            console.log(producto);

            let nombre = document.getElementById("i_titulo");
            nombre.value = producto.titulo;

            let departamento = document.getElementById("i_departamento");
            departamento.value = producto.id_departamento;

            let descripcionBasica = document.getElementById("i_descripcion_corta")
            descripcionBasica.value = producto.descripcion_corta;

            let descripcionCompleta = document.getElementById("i_descripcion_larga")
            descripcionCompleta.value = producto.descripcion_larga;

            let ubicacion = document.getElementById("i_ubicacion")
            ubicacion.value = producto.ubicacion;

            let precio = document.getElementById("i_precio")
            precio.value = producto.precio;

            let disponibles = document.getElementById("i_disponibles")
            disponibles.value = producto.disponibles;

            let caracteristicas = document.getElementById("contendor_caracteristicas");
            let caracteristicasHtml = "";
            let entries = Object.entries(producto.caracteristicas);
            for(const [caracteristica, valor] of entries) {
                numCaracteristicas ++;
                caracteristicasHtml += `
                <div>
                    <div class="col-6">
                        <input value="${caracteristica}" id="i_c_${numCaracteristicas}" type="text" class="input_caractersitica" placeholder="Ej. Color">
                    </div>
                    <div class="col-6">
                        <input value="${valor}" id="i_v_${numCaracteristicas}" type="text" class="input_caractersitica" placeholder="Ej. Rojo">
                    </div>
                </div>
                `
            }

            if(numCaracteristicas == 0)
                numCaracteristicas = 1;

            caracteristicas.innerHTML = caracteristicasHtml;
        }
    }

    xhr.send();
}

function actualizarProducto() {
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
        if (document.getElementById(`i_c_${i + 1}`).value != "")
            caracteristicas[document.getElementById(`i_c_${i + 1}`).value] = document.getElementById(`i_v_${i + 1}`).value
    }

    data['caracteristicas'] = caracteristicas;
    console.log(data);

    // Valida los datos
    if (data['titulo'] === "" ||
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
        xhr.open("PATCH", `${serverUrl}/productos?producto_id=${id}`, true);
        xhr.setRequestHeader("Authorization", session.token_acceso);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function () {
            if (this.status === 200) {
                const res = JSON.parse(this.responseText);
                let id = res.data.productos[0].id;
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

var loadFile = function (event) {
    var output = document.getElementById('mainImg');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
        URL.revokeObjectURL(output.src) // free memory
    }
};

function agregarCarac() {
    numCaracteristicas++;
    var contendor = document.getElementById("contendor_caracteristicas");

    contendor.innerHTML += ` 
                      <div class="col-6">
                          <input type="text" id="i_c_${numCaracteristicas}" class="input_caractersitica" placeholder="Ej. Color">

                      </div>
                      <div class="col-6">
                          <input type="text" id="i_v_${numCaracteristicas}" class="input_caractersitica" placeholder="Ej. Rojo">
                      </div>
      `;
}