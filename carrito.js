function cargar() {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", "carrito.json", true);

    xhr.onload = function() {
        if(this.status === 200) {
            let carrito = JSON.parse(this.responseText);
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
                                <a href="producto.html">${producto.titulo}</a>
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
        }
    }

    xhr.send();
}