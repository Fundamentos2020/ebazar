let id = 1;
let producto;

function cargar() {
    var session = getSesion();
    if(session == null) {
        window.location.href = loginPage;
    }
    
    menu();
    // Cargar parametros del URL
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    if(urlParams.has("id")) {
        id = parseInt(urlParams.get("id"));
    }

    const xhr = new XMLHttpRequest();

    xhr.open("GET", `${serverUrl}/producto?producto_id=${id}`, true);
    xhr.setRequestHeader("Authorization", session.token_acceso);
    //xhr.open("GET", "producto.json", true);

    xhr.onload = function() {
        if(this.status === 200) {
            console.log(this.responseText);

            producto = JSON.parse(this.responseText).data.producto;
            console.log(producto);

            if(producto.id_usuario == session.id_usuario) {
                document.getElementById('pregunta-div').innerHTML = "";
                document.getElementById('b_comprar').innerHTML = "";
            }

            // Imagenes del producto
            let imagenes_contendor = document.getElementById('imagenes_producto');
            imagenes_contendor.innerHTML = "";
            imagenes_contendor.innerHTML +=
            `
            <div class="col-12">
                <img class="img_otras img_selec" src="${serverUrl}/imagenes?id=${producto.img}" alt="" onclick="ClickImgsProducto(this)">
            </div>
            `;

            var imgProducto = document.getElementById("imagen_producto");
            imgProducto.src = `${serverUrl}/imagenes?id=${producto.img}`;

            producto.imagenes.forEach(imagen => {
                imagenes_contendor.innerHTML +=
                `
                <div class="col-12">
                    <img class="img_otras" src="${serverUrl}/imagenes?id=${imagen}" alt="" onclick="ClickImgsProducto(this)">
                </div>
                `;
            });

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
                if(pregunta.respuesta === null) {
                    pregunta.respuesta = "Sin respuesta";
                }
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
            console.log(this.responseText);
        }
    }

    xhr.send();
}

function pregunta() {
    let pregunta = document.getElementById('pregunta_input').value;
    if(pregunta == '') {
        alert("Pregunta no valida");
    } else {
        let boton = document.getElementById('b_pregunta');
        boton.innerHTML = '<div class="loader"></div>';

        var session = getSesion();
        if(session == null) {
            window.location.href = loginPage;
        }
    
        let id_usuario = session.id_usuario;

        var today = new Date();
        var fecha = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() + ' ' + today.getHours()+':'+today.getMinutes();

        const data = {
            id_usuario,
            id_producto: id,
            pregunta,
            fecha
        };

        const xhr = new XMLHttpRequest();

        xhr.open("POST", `${serverUrl}/preguntas`, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader("Authorization", session.token_acceso);
        xhr.onload = function() {
            if(this.status === 201) {
                let data = JSON.parse(this.responseText);
                console.log(data);
                cargar();
                document.getElementById('pregunta_input').value = "";
                boton.innerHTML = '<div onclick="pregunta()" class="myButtonV">Enviar</div>';
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
                alert("Algo salio mal al realizar la pregunta, vuelve a intentar.");
                cargar();
                console.log(this.status);
                console.log(this.responseText);
            }
        }
        xhr.send(JSON.stringify(data));
    }
}

function comprar() {
    var carrito = JSON.parse(localStorage.getItem("carrito"));
    carrito.productos.push(producto);

    localStorage.setItem('carrito', JSON.stringify(carrito));
    
    window.location.href = 'carrito.html';
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