function cargar() {
    // Cargar parametros del URL
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    let id = 1;
    if(urlParams.has("id")) {
        id = urlParams.get("id");
    }

    const xhr = new XMLHttpRequest();

    xhr.open("GET", `${serverUrl}/productos?id_vendedor=${id}`, true);
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
                productosHtml += `
                <div class="row producto">
                    <div class="col-2">
                        <img src="https://picsum.photos/200/200" class="img_producto" alt="">
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
        }
    }

    xhr.send();
}

function eliminarProducto(id) {
    console.log(id);

    var r = confirm("Seguro que quieres borrar el producto");

    if(r == true) {
        let botones = document.getElementById(`botones_${id}`);
        botones.innerHTML = '<div class="loader"></div>';

        // Realiza la peticion de borrar producto
        // Hace el post
        const xhr = new XMLHttpRequest();
        xhr.open("DELETE", `${serverUrl}/productos?producto_id=${id}`, true);
        xhr.onload = function() {
            if(this.status === 200) {
                let data = JSON.parse(this.responseText);
                cargar();
                console.log(data);
            } else {
                alert("Algo salio mal al borrar la pregunta, vuelve a intentar.");
                cargar();
                console.log(this.status);
                console.log(this.responseText);
            }
        }

        xhr.send();
    }
}