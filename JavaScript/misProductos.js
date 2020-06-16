function cargar() {
    var session = getSesion();
    if(session == null) {
        window.location.href = loginPage;
    }

    menu();
    
    let id = session.id_usuario;
    // Cargar parametros del URL
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const xhr = new XMLHttpRequest();

    xhr.open("GET", `${serverUrl}/producto?id_vendedor=${id}`, true);
    xhr.setRequestHeader("Authorization", session.token_acceso);
    //xhr.open("GET", "misProductos.json", true);

    xhr.onload = function() {
        if(this.status === 200) {
            let productos = JSON.parse(this.responseText).data.productos;
            console.log(productos);

            let productosDiv = document.getElementById("productos_c");
            let productosHtml = "";
            if(productos.length == 0) {
                productosHtml = `
                <div class="row producto">
                    Todavia no has publicado ningun producto
                </div>
                `;
            }

            productos.forEach(producto => {
                var img = 'https://picsum.photos/200/200';
                if(producto.img != "")
                    img = `${serverUrl}/imagenes?id=${producto.img}`;
                productosHtml += `
                <div class="row producto">
                    <div class="col-2">
                        <img src="${img}" class="img_producto" alt="">
                    </div>

                    <div class="col-m-7 col-s-5">
                        <div class="texto_titulo"> <a href="producto.html?id=${producto.id}">${producto.titulo}</a> </div>
                        <div class="texto_precio">$ ${producto.precio}</div>
                        <div class="texto_caracterisitica">Vendidos: ${producto.vendidos}</div>
                        <div class="texto_caracterisitica">Comentarios: ${producto.comentarios}</div>

                    </div>

                    <div class="col-m-3 col-s-5" id="botones_${producto.id}">
                        <div id="b_editar">
                            <a href="editarProducto.html?id=${producto.id}" class="myButtonV">Editar producto</a>
                        </div>
                        <div id="b_comentarios">
                            <a href="comentarios.html?id=${producto.id}" class="myButtonV">Ver Preguntas</a>
                        </div>
                        <div id="b_eleminar">
                            <div onclick="eliminarProducto(${producto.id})" class="myButtonR">Eliminar</div>
                        </div>
                    </div>
                </div>
                `;
            });
            productosDiv.innerHTML = productosHtml;
        } else if(this.status == 404) {
            let productosDiv = document.getElementById("productos_c");
            let productosHtml =  `
                <div class="row producto centro">
                    Todavia no has publicado ningun producto
                </div>
                `;
            productosDiv.innerHTML = productosHtml;
        } else if(this.status == 401) {
            console.log(this.responseText);
            var data = JSON.parse(this.responseText);

            if (data.messages.indexOf("Token de acceso ha caducado") >= 0) {
                console.log(data);
                refreshToken();
                //window.location.reload();
            } else {
                window.location.href = loginPage;
            }
        } else {
            console.log(JSON.parse(this.responseText));
        }
    }

    xhr.send();
}

function eliminarProducto(id) {
    var session = getSesion();
    if(session == null) {
        window.location.href = loginPage;
    }

    console.log(id);

    var r = confirm("Seguro que quieres borrar el producto");

    if(r == true) {
        let botones = document.getElementById(`botones_${id}`);
        botones.innerHTML = '<div class="loader"></div>';

        // Realiza la peticion de borrar producto
        // Hace el post
        const xhr = new XMLHttpRequest();
        xhr.open("DELETE", `${serverUrl}/producto?producto_id=${id}`, true);
        xhr.setRequestHeader("Authorization", session.token_acceso);
        xhr.onload = function() {
            if(this.status === 200) {
                let data = JSON.parse(this.responseText);
                cargar();
                console.log(data);
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
                alert("Algo salio mal al borrar el producto, vuelve a intentar.");
                cargar();
                console.log(this.status);
                console.log(this.responseText);
            }
        }

        xhr.send();
    }
}