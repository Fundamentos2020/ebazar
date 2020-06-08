

function carga()
{
    menu();

    getDepartamentos();
    getProductos();

}


//Obtener los departamentos de manera asíncrona.
function getDepartamentos() {
    var xhttp = new XMLHttpRequest();

    xhttp.open("GET", api + "departamentos", false);

    xhttp.send();

    var data = JSON.parse(xhttp.responseText);

    if (data.success === true){
        departamentos = data.data;
        var html = `<span class="font-campos text-bold">Departamentos</span>`;
        departamentos['departamentos'].forEach(departamento => {
            html += 
                `<li onclick="cargaCategorias(id)" id=${departamento.id}>${departamento.nombre}</li>`;
        });

        document.getElementById('departamentos').innerHTML = html;

    }
    else {
        alert(data.messages);
    }
}

//Obtiene los productos de la base de datos, de manera asíncrona.
function getProductos() {
    var xhttp = new XMLHttpRequest();

    xhttp.open("GET", api + "productos", false);

    xhttp.send();

    var data = JSON.parse(xhttp.responseText);

    if (data.success === true){
        productos = data.data;
        var html = ``;
        productos['productos'].forEach(producto => {
            html += 
                `<div class="col-m-2 col-s-5 card text-center">
                <img class = "img-fluid" src="https://picsum.photos/id/537/300/300" alt="">
                <div class="text-left">
                    <span>$${producto.precio}</span>
                    <br>
                    <span>${producto.titulo}</span>
                    <br>
                    <span>Valoración</span>
                    <br>
                    <button class="oferta" type="sumbit" onclick="window.location.href = 'producto.html?id=${producto.id}'">Ver Producto</button>
                </div>
            </div>    `;
        });

        document.getElementById('catalogo').innerHTML = html;

    }
    else {
        alert(data.messages);
    }
}

function cargaCategorias(id)
{
    console.log(id);
    var xhttp = new XMLHttpRequest();

    xhttp.open("GET", api + `productos/id_depa=${id}`, false);

    xhttp.send();

    var data = JSON.parse(xhttp.responseText);

    if (data.success === true){
        productos = data.data;
        var html = ``;
        productos['productos'].forEach(producto => {
            html += 
                `<div class="col-m-2 col-s-5 card text-center">
                <img class = "img-fluid" src="https://picsum.photos/id/537/300/300" alt="">
                <div class="text-left">
                    <span>$${producto.precio}</span>
                    <br>
                    <span>${producto.titulo}</span>
                    <br>
                    <span>Valoración</span>
                    <br>
                    <button class="oferta" type="sumbit" onclick="window.location.href = 'producto.html'">Ver Producto</button>
                </div>
            </div>    `;
        });

        document.getElementById('catalogo').innerHTML = html;

    }
    else {
        alert(data.messages);
    }
}

function cargaPrecios(id)
{
    var cantidadMenor;
    var cantidadMayor;

    switch(id)
    {
        case '1': cantidadMenor = 0;
                cantidadMayor = 250;
            break;
        case '2': cantidadMenor = 250;
                cantidadMayor = 500;
            break;
        case '3': cantidadMenor = 500;
                cantidadMayor = 1000;
            break;
        case '4': cantidadMenor = 1000;
                cantidadMayor = 10000;
            break; 
    }  

    var xhttp = new XMLHttpRequest();

    xhttp.open("GET", api + "productos", false);

    xhttp.send();

    var data = JSON.parse(xhttp.responseText);

    if (data.success === true){
        productos = data.data;
        var html = ``;
        productos['productos'].forEach(producto => {
            if (producto.precio > cantidadMenor && producto.precio < cantidadMayor)
            {
                html += 
                    `<div class="col-m-2 col-s-5 card text-center">
                    <img class = "img-fluid" src="https://picsum.photos/id/537/300/300" alt="">
                    <div class="text-left">
                        <span>$${producto.precio}</span>
                        <br>
                        <span>${producto.titulo}</span>
                        <br>
                        <span>Valoración</span>
                        <br>
                        <button class="oferta" type="sumbit" onclick="window.location.href = 'producto.html'">Ver Producto</button>
                    </div>
                </div>    `;
            }
        });

        document.getElementById('catalogo').innerHTML = html;

    }
    else {
        alert(data.messages);
    }
}