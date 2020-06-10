let id;

function cargar() {
    var session = getSesion();
    if(session == null) {
        window.location.href = loginPage;
    }
    id = session.id_usuario;

    menu();

    const xhr = new XMLHttpRequest();

    xhr.open("GET", `${serverUrl}/carrito?id_usuario=${id}`, true);
    xhr.setRequestHeader("Authorization", session.token_acceso);
    //xhr.open("GET", "carrito.json", true);

    xhr.onload = function() {
        if(this.status === 200) {
            let compras = JSON.parse(this.responseText).data.compras;
            console.log(compras);

            let carritoContendor = document.getElementById("carrito_c");
            let carritoHtml = "";
            let precioProductos = 0;
            compras.productos.forEach(producto => {
                img = 'https://picsum.photos/100/100';
                if(producto.img != "")
                    img = producto.img;
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
                                Fecha compra: ${producto.fecha_compra}
                            </div>
                        </div>
                    </div>
                `;
            });
            carritoContendor.innerHTML = carritoHtml;


            if(compras.productos.length == 0) {
                carritoContendor.innerHTML = `
                    <div class="centro">
                        No has comprado nada
                    </div>
                    <br>
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