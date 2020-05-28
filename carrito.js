function cargar() {
    // Cargar parametros del URL
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    let id = 1;
    if(urlParams.has("id")) {
        id = urlParams.get("id");
    }

    const xhr = new XMLHttpRequest();

    xhr.open("GET", `${serverUrl}/carrito?id_usuario=${id}`, true);

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
        }
    }

    xhr.send();
}