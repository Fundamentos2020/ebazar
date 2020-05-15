function cargar() {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", "comentarios.json", true);

    xhr.onload = function() {
        if(this.status === 200) {
            let comentarios = JSON.parse(this.responseText);
            console.log(comentarios);

            let comentariosSinCDiv = document.getElementById("comentarios_sin_contestar");
            let comentariosSinCHtml = "";

            let comentariosContestadosDiv = document.getElementById("comentarios_contestados");
            let comentariosContestadosHtml = "";

            comentarios.forEach(comentario => {
                if(comentario.tieneRespuesta === false) {
                    comentariosSinCHtml += `
                        <div class="row comentario">
                            <div class="col-12">
                                <div class="texto_titulo">${comentario.pregunta}</div>
                                <div class="texto_caracterisitica"> ${comentario.fechaPregunta}</div>
                                <div class="respuesta">
                                    <span>Respuesta: </span><input type="text" name="" id="respuesta_input">
                                </div>
                            </div>

                            <div class="col-12">
                                <div id="b_eleminar">
                                    <div style="padding: 0.5em 0.5em;">
                                        <a href="#" class="myButtonR">Eliminar</a>
                                    </div>
                                    <div style="padding: 0.5em 0.5em;">
                                        <a href="#" class="myButtonV">Enviar</a>                            
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                } else {
                    comentariosContestadosHtml += `
                        <div class="row comentario">
                            <div class="col-12">
                                <div class="texto_titulo">${comentario.pregunta}</div>
                                <div class="texto_caracterisitica"> ${comentario.fechaPregunta}</div>
                                <div class="texto_respuesta">${comentario.respuesta}</div>
                            </div>
                            <div class="col-12">
                                <div id="b_eleminar">
                                    <a href="#" class="myButtonR">Eliminar</a>
                                </div>
                            </div>
                        </div>
                    `;
                }
            });
            comentariosSinCDiv.innerHTML = comentariosSinCHtml;
            comentariosContestadosDiv.innerHTML = comentariosContestadosHtml;
        }
    }

    xhr.send();
}