let id;

function cargar() {
    var session = getSesion();
    if(session == null) {
        window.location.href = loginPage;
    }

    id = session.id_usuario;

    const xhr = new XMLHttpRequest();

    xhr.open("GET", `${serverUrl}/carrito?id_usuario=${id}`, true);
    xhr.setRequestHeader("Authorization", session.token_acceso);
    //xhr.open("GET", "carrito.json", true);

    xhr.onload = function() {
        if(this.status === 200) {
            let carrito = JSON.parse(this.responseText).data.carrito;
            console.log(carrito);

            let carritoContendor = document.getElementById("carrito_c");
            let carritoHtml = "";
            let precioProductos = 0;
            carrito.productos.forEach(producto => {
                precioProductos += producto.precio;
                carritoHtml += `
                    <div class="contendor_productos">
                        <div class="compra_producto">
                            <div class="compra_imagen">
                                <img src="https://picsum.photos/100/100" alt="">
                            </div>
                            <div class="compra_titulo">
                                <a href="producto.html?id=${producto.id}">${producto.titulo}</a>
                            </div>
                            <div class="compra_precio">
                                $ ${producto.precio}
                            </div>
                        </div>
                    </div>
                `;
            });
            carritoContendor.innerHTML = carritoHtml;

            let textPrecioProducto = document.getElementById("precio_producto");
            textPrecioProducto.innerHTML = `Producto: $${precioProductos}`;

            let textPrecioEnvio = document.getElementById("precio_envio");
            textPrecioEnvio.innerHTML = `Envio: $${carrito.envio}`;

            let textPrecioTotal = document.getElementById("precio_total");
            textPrecioTotal.innerHTML = `Total: $${precioProductos + carrito.envio}`;

            if(carrito.productos.length == 0) {
                document.getElementById("c_total").innerHTML = "";
                carritoContendor.innerHTML = `
                    <div class="centro">
                        No hay productos en el carrito
                    </div>
                `;
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
        }
    }

    xhr.send();
}

function finalizarCompra() {
    var session = getSesion();
    if(session == null) {
        window.location.href = loginPage;
    }
    
    let boton = document.getElementById('b_comprar');
    boton.innerHTML = '<div class="loader"></div>';

    // PATCH 
    const xhr = new XMLHttpRequest();
    xhr.open("PATCH", `${serverUrl}/carrito?id_usuario=${id}`, true);
    xhr.setRequestHeader("Authorization", session.token_acceso);
    xhr.onload = function() {
        if(this.status === 200) {
            let data = JSON.parse(this.responseText);
            console.log(data);
            cargar();
            alert("Compra finalizada");
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
            alert("Algo salio mal al finalizar la compra, vuelve a intentar.");
            cargar();
            console.log(this.status);
            console.log(this.responseText);

            boton.innerHTML = '<div onclick="comprar()" class="myButton">Comprar</div>';
        }
    }
    xhr.send();
}