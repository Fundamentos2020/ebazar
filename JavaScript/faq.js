
function cargar()
{
    menu();

    cargaPreguntas();
}

function cargaPreguntas()
{
    var xhttp = new XMLHttpRequest();

    xhttp.open("GET", api + "faq", true);

    xhttp.onload = function() {
        if (this.status == 200) {
            let html ="";
            var data = JSON.parse(this.responseText);

            if (data.success == true) 
            {
                let preguntas = data.data.preguntas;
                preguntas.forEach(pregunta => {
                html += 
                    `<h3>${pregunta.titulo}</h3>
                    <div class="bb">
                        <p>${pregunta.descripcion}</p>
                    </div>`;
                 });
                
                 document.getElementById('contenido').innerHTML = html;

            }
        }
        else {
            var data = JSON.parse(this.responseText);

            alert(data.messages);
        }
    }
    xhttp.send();
}