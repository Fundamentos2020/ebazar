function cargar() {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", "buscar.json", true);

    xhr.onload = function() {
        if(this.status === 200) {
            let resultadoBusqueda = JSON.parse(this.responseText);
            console.log(resultadoBusqueda);

            // Carga los valores del producto
            let titulo = document.getElementById("texto_res");
            titulo.innerText = `${resultadoBusqueda.resultados} de ${resultadoBusqueda.totalResultados} resultados para "${resultadoBusqueda.consulta}"`;

            let productos = document.getElementById("productos");
            let productosHtml = "";
            resultadoBusqueda.productos.forEach(producto => {
                productosHtml += `
                <div class="row producto_contendor">
                    <div class="col-m-2 col-s-4">
                        <img class="img_producto" src="https://picsum.photos/200/200" alt="">
                    </div>
                    <div class="col-m-10 col-s-8">
                        <div class="texto_titulo"> <a href="producto.html">${producto.titulo}</a> </div>
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
                    p += `<div class="pagina pagina_actual"><a href="buscar.html">${i}</a></div>`;
                } else {
                    p += `<div class="pagina"><a href="buscar.html">${i}</a></div>`;
                }
                
            }

            p += `<div class="pagina"><a href="buscar.html">Siguiente ></a></div>`;

            paginas.innerHTML = p;
        }
    }

    xhr.send();
}