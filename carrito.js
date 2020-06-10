let id;

function cargar() {
    var session = getSesion();
    if (session == null) {
        window.location.href = loginPage;
    }
    id = session.id_usuario;

    menu();

    let carrito = JSON.parse(localStorage.getItem('carrito'));

    let carritoContendor = document.getElementById("carrito_c");
    let carritoHtml = "";
    let precioProductos = 0;
    carrito.productos.forEach((producto, i) => {
        img = 'https://picsum.photos/100/100';
        if (producto.img != "")
            img = `${serverUrl}/imagenes?id=${producto.img}`;
        precioProductos += producto.precio;
        carritoHtml += `
            <div class="contendor_productos">
                <div class="compra_producto">
                    <div class="compra_imagen">
                        <img src="${img}" alt="" class="img-carrito">
                    </div>
                    <div class="compra_titulo">
                        <a href="producto.html?id=${producto.id}">${producto.titulo}</a>
                    </div>
                    <div class="compra_precio">
                        $ ${producto.precio}
                        
                    </div>
                    <span class="borrar-boton" onclick="borrarCarrito(${i})">
                        <img src="https://img.icons8.com/flat_round/30/000000/delete-sign.png"/>
                    </span>
                </div>
            </div>`;
    });
    carritoContendor.innerHTML = carritoHtml;

    let textPrecioProducto = document.getElementById("precio_producto");
    textPrecioProducto.innerHTML = `Producto: $${precioProductos}`;

    let textPrecioEnvio = document.getElementById("precio_envio");
    textPrecioEnvio.innerHTML = `Envio: $${carrito.envio}`;

    let textPrecioTotal = document.getElementById("precio_total");
    textPrecioTotal.innerHTML = `Total: $${precioProductos + carrito.envio}`;

    if (carrito.productos.length == 0) {
        document.getElementById("c_total").innerHTML = "";
        carritoContendor.innerHTML = `
            <div class="centro">
                No hay productos en el carrito
            </div>`;
    }
}

function borrarCarrito(index) {
    let carrito = JSON.parse(localStorage.getItem('carrito'));
    carrito.productos.splice(index, 1);
    console.log(carrito);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    cargar();
}

function finalizarCompra() {
    var session = getSesion();
    if (session == null) {
        window.location.href = loginPage;
    }

    let id_usuario = session.id_usuario;

    let boton = document.getElementById('b_comprar');
    boton.innerHTML = '<div class="loader"></div>';

    let carrito = JSON.parse(localStorage.getItem('carrito'));
    carrito.productos.forEach((producto, i) => {
        var today = new Date();
        var fecha = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

        // Crea una nueva decripcion de compra
        const data = {
            id_usuario,
            id_producto: producto.id,
            cantidad: 1,
            fecha
        };

        const xhr = new XMLHttpRequest();
        xhr.open("POST", `${serverUrl}/carrito`, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader("Authorization", session.token_acceso);
        xhr.send(JSON.stringify(data));
        if (xhr.status === 201) {
            let dataR = JSON.parse(xhr.responseText);
        } else if (xhr.status == 401) {
            var dataR = JSON.parse(xhr.responseText);

            if (dataR.messages.indexOf("Token de acceso ha caducado") >= 0) {
                refreshToken();
            } else {
                window.location.href = loginPage;
            }
        }
    });

    localStorage.setItem('carrito', JSON.stringify({
        productos: [],
        envio: 50
    }));

    alert("Compra exitosa");
    cargar();
}