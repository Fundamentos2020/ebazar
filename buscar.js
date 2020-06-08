function cargar() {
    var session = getSesion();
    if(session == null) {
        window.location.href = loginPage;
    }
    menu();
    // Cargar parametros del URL
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    let titulo = "monitor";
    if(urlParams.has("titulo")) {
        titulo = urlParams.get("titulo");
    }

    let pag = 1;
    if(urlParams.has("pag")) {
        pag = urlParams.get("pag");
    }

    const xhr = new XMLHttpRequest();

    xhr.open("GET", `${serverUrl}/buscar?titulo=${titulo}&pag=${pag}`, true);
    xhr.setRequestHeader("Authorization", session.token_acceso);
    //xhr.open("GET", "buscar.json", true);

    xhr.onload = function() {
        if(this.status === 200) {
            let resultadoBusqueda = JSON.parse(this.responseText).data.busqueda;
            console.log(resultadoBusqueda);

            // Carga los valores del producto
            let tituloD = document.getElementById("texto_res");
            tituloD.innerText = `${resultadoBusqueda.resultados} de ${resultadoBusqueda.totalResultados} resultados para "${resultadoBusqueda.consulta}"`;

            let productos = document.getElementById("productos");
            let productosHtml = "";

            if(resultadoBusqueda.productos.length == 0) {
                productosHtml = `
                    <div class="texto_titulo centro">No hay resultados</div>
                `;
            }

            resultadoBusqueda.productos.forEach(producto => {
                productosHtml += `
                <div class="row producto_contendor">
                    <div class="col-m-2 col-s-4">
                        <img class="img_producto" src="https://picsum.photos/200/200" alt="">
                    </div>
                    <div class="col-m-10 col-s-8">
                        <div class="texto_titulo"> <a href="producto.html?id=${producto.id}">${producto.titulo}</a> </div>
                        <div class="texto_precio">$ ${producto.precio}</div>
                        <div class="texto_caracterisitica">Ubicacion: ${producto.ubicacion}</div>
                        <div class="texto_caracterisitica">${producto.disponibles} Disponibles</div>
                    </div>
                </div>
                `;
            });
            productos.innerHTML = productosHtml;

            let paginas = document.getElementById("paginas");
            p = "";
            for (let i = 1; i <= resultadoBusqueda.totalPaginas; i++) {
                if(i == resultadoBusqueda.pagina) {
                    p += `<div class="pagina pagina_actual"><a href="buscar.html?pag=${i}&titulo=${titulo}">${i}</a></div>`;
                } else {
                    p += `<div class="pagina"><a href="buscar.html?pag=${i}&titulo=${titulo}">${i}</a></div>`;
                }
                
            }

            if(resultadoBusqueda.totalPaginas > 1 && resultadoBusqueda.pagina < resultadoBusqueda.totalPaginas)
                p += `<div class="pagina"><a href="buscar.html?pag=${parseInt(resultadoBusqueda.pagina)+1}&titulo=${titulo}">Siguiente ></a></div>`;

            paginas.innerHTML = p;
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