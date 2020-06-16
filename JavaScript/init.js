var rand;

function carga()
{
    menu();
    getLoMasVendido();
    getOfertas();
    getCategoria();
}

function compare( a, b ) {
    if ( a.vendidos < b.vendidos ){
      return -1;
    }
    if ( a.vendidos > b.vendidos ){
      return 1;
    }
    return 0;
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

          
        productos['productos'].sort(compare);

        productos['productos'].forEach(producto => {
            if (i < 5){
                img = 'https://picsum.photos/id/537/300/300';
                if(producto.img != "")
                    img = `${api}imagenes?id=${producto.img}`;
                html += 
                ` <div class = "col-m-2 col-s-10 card text-center ">
                <img class = "img-fluid" src="${img}" alt="" onclick="window.location.href = 'producto.html?id=${producto.id}'">
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
    var i = Math.floor(Math.random() * 4) + 1;  // returns a random integer from 1 to 4
    let titulo;

    switch(i)
    {
        case 1: titulo = "Electrónica";
            break;
        case 2: titulo = "Electrodomesticos";
            break;
        case 3: titulo = "Audio";
                i = 4;
            break;
        case 4: titulo = "Audio";
            break;
    }

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", api + `productos/id_depa=${i}`, false);

    xhttp.send();

    var data = JSON.parse(xhttp.responseText);

    if (data.success === true){
        productos = data.data;
        let i = 0;
        var html = `<h3 class="section-title border-b2 p-2">${titulo}</h3>`;
        productos['productos'].forEach(producto => {
            if (i < 5){
                img = 'https://picsum.photos/id/537/300/300';
                if(producto.img != "")
                    img = `${api}imagenes?id=${producto.img}`;
                html += 
                ` <div class = "col-m-2 col-s-10 card text-center ">
                    <img class = "img-fluid" src="${img}" alt="" onclick="window.location.href = 'producto.html?id=${producto.id}'">
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

    xhttp.open("GET", api + "productos/id_depa=3", false);

    xhttp.send();

    var data = JSON.parse(xhttp.responseText);

    if (data.success === true){
        productos = data.data;
        let i = 0;
        var html = `<h3 class="section-title border-b2 p-2">Alimentos y Bebidas</h3>`;
        productos['productos'].forEach(producto => {
            if (i < 5){
                img = 'https://picsum.photos/id/537/300/300';
                if(producto.img != "")
                    img = `${api}imagenes?id=${producto.img}`;
                html += 
                ` <div class = "col-m-2 col-s-10 card text-center ">
                <img class = "img-fluid" src="${img}" alt="" onclick="window.location.href = 'producto.html?id=${producto.id}'">
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


