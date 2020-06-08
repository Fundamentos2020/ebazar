function carga()
{
    menu();

    getLoMasVendido();
    getOfertas();
    getCategoria();
}



function getLoMasVendido()
{
    var xhttp = new XMLHttpRequest();

    xhttp.open("GET", api + "productos", false);

    xhttp.send();

    var data = JSON.parse(xhttp.responseText);

    if (data.success === true){
        productos = data.data;
        let i = 0;
        var html = `<h3 class="section-title border-b2">Lo más vendido</h3>`;
        productos['productos'].forEach(producto => {
            if (i < 5){
                html += 
                ` <div class = "col-m-2 col-s-10 card text-center ">
                <img class = "img-fluid" src="https://picsum.photos/id/537/300/300" alt="" onclick="window.location.href = 'producto.html?id=${producto.id}'">
            </div> `;
            }
            i++;
        });

        document.getElementById('masVendido').innerHTML = html;

    }
    else {
        alert(data.messages);
    }
}

function getOfertas()
{
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", api + "productos", false);

    xhttp.send();

    var data = JSON.parse(xhttp.responseText);

    if (data.success === true){
        productos = data.data;
        let i = 0;
        var html = `<h3 class="section-title border-b2 p-2">Ofertas destacadas</h3>`;
        productos['productos'].forEach(producto => {
            if (i < 5){
                html += 
                ` <div class = "col-m-2 col-s-10 card text-center ">
                <img class = "img-fluid" src=${producto.img} alt="" onclick="window.location.href = 'producto.html?id=${producto.id}'">
            </div> `;
            }
            i++;
           
        });

        document.getElementById('ofertas').innerHTML = html;
    }
    else {
        alert(data.messages);
    }
}

function getCategoria()
{
    var xhttp = new XMLHttpRequest();

    xhttp.open("GET", api + "productos", false);

    xhttp.send();

    var data = JSON.parse(xhttp.responseText);

    if (data.success === true){
        productos = data.data;
        let i = 0;
        var html = `<h3 class="section-title border-b2 p-2">Entretenimiento</h3>`;
        productos['productos'].forEach(producto => {
            if (i < 5){
                html += 
                ` <div class = "col-m-2 col-s-10 card text-center ">
                <img class = "img-fluid" src=${producto.img} alt="" onclick="window.location.href = 'producto.html?id=${producto.id}'">
            </div> `;
            i++;
            }
           
        });

        document.getElementById('entretenimiento').innerHTML = html;
    }
    else {
        alert(data.messages);
    }
}


