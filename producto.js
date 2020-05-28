function cargar() {
    // Cargar parametros del URL
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    let id = 1;
    if(urlParams.has("id")) {
        id = urlParams.get("id");
    }

    const xhr = new XMLHttpRequest();

    xhr.open("GET", `${serverUrl}/productos?producto_id=${id}`, true);
    //xhr.open("GET", "producto.json", true);

    xhr.onload = function() {
        if(this.status === 200) {
            let producto = JSON.parse(this.responseText).data.producto;
            console.log(producto);

            // Carga los valores del producto
            let titulo = document.getElementById("p_titulo");
            titulo.innerText = producto.titulo;

            let precio = document.getElementById("p_precio");
            precio.innerText = `$ ${producto.precio}`;

            let disponibles = document.getElementById("p_disponibles");
            disponibles.innerText = `${producto.disponibles} disponibles`;

            let ubicacion = document.getElementById("p_ubicacion");
            ubicacion.innerText = `Ubicacion: ${producto.ubicacion}`;

            let descripcion_c = document.getElementById("p_descripcion_c");
            descripcion_c.innerText = `${producto.descripcion_corta}`;
            
            let descripcion_l = document.getElementById("p_descripcion_l");
            descripcion_l.innerText = `${producto.descripcion_larga}`;

            let caracterisitcas = document.getElementById("p_caracteristicas");
            let c = "";
            for(let k in producto.caracteristicas) {
                c += `
                    <div class="producto_texto producto_caracteristica">
                        ${k}: ${producto.caracteristicas[k]}
                    </div>
                `;
            }
            caracterisitcas.innerHTML = c;

            let preguntas = document.getElementById("p_preguntas");
            let p = "";

            if(producto.preguntas.length == 0) {
                p = `
                    <div class="producto_texto producto_caracteristica no_hay">
                        No hay preguntas.
                    </div>
                `;
            }
            producto.preguntas.forEach(pregunta => {
                p += `
                    <div class="comment_box">
                        <div class="comment_titulo">
                            ${pregunta.pregunta}
                            <div class="comment_fecha">${pregunta.fecha}</div>
                        </div>
                        <div class="comment_texto">
                            ${pregunta.respuesta}
                        </div>
                    </div>
                `;
            });

            preguntas.innerHTML = p;
        } else if(this.status === 404) {
            let contendor = document.getElementById("contenedor_mamalon");
            contendor.innerHTML = `
                <div class="row p_producto">
                    <h1>404 Not Found</h1>
                </div>
            `;
        }
    }

    xhr.send();
}

function ClickImgsProducto(e) {
    var imgProducto = document.getElementById("imagen_producto");
    var imgsProducto = document.getElementById("imagenes_producto");

    imgProducto.src = e.src;

    var contendoresImgs = imgsProducto.children;
    for(var i = 0; i < contendoresImgs.length; i++) {
        var img = contendoresImgs[i].children[0];
        img.classList = "img_otras";
    }

    e.classList = "img_otras img_selec"
}