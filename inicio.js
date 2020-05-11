function cargaInicial()
{
    const xhr = new XMLHttpRequest();

    xhr.open("GET","inicio.json",true);

    xhr.onload = function()
    {
        if (this.status == 200)
        {
            const productos = JSON.parse(this.responseText);
            
            //Generar el HTML
            let htmlImagenes = '<h3 class="section-title border-b2">Lo más vendido</h3>';

            //Imprimir cada imagen
            productos.forEach(function(producto){
                    htmlImagenes += `
                    <div class = "col-m-2 col-s-10 card text-center ">
                        <img class = "img-fluid" src=${producto.url} alt="" onclick="window.location.href = 'producto.html'">
                    </div>
                    `;
            });

            document.getElementById('masVendido').innerHTML = htmlImagenes;
        }
    }
    //Envía el mensaje
    xhr.send();
}