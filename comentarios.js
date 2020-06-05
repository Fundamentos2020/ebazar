function cargar() {
    var session = getSesion();
    if(session == null) {
        window.location.href = loginPage;
    }

    // Cargar parametros del URL
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    let id = 1;
    if(urlParams.has("id")) {
        id = urlParams.get("id");
    }

    const xhr = new XMLHttpRequest();

    xhr.open("GET", `${serverUrl}/preguntas?id_producto=${id}`, true);
    xhr.setRequestHeader("Authorization", session.token_acceso);
    //xhr.open("GET", "comentarios.json", true);

    xhr.onload = function() {
        if(this.status === 200) {
            let comentarios = JSON.parse(this.responseText).data.preguntas;
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
                                    <span>Respuesta: </span><input type="text" name="" id="${comentario.id}_respuesta_input" class="respuesta_input">
                                </div>
                            </div>

                            <div class="col-12">
                                <div id="b_eleminar_${comentario.id}" class="b_eleminar">
                                    <div style="padding: 0.5em 0.5em;">
                                        <div onclick="borrarPregunta(${comentario.id})" class="myButtonR">Eliminar</div>
                                    </div>
                                    <div style="padding: 0.5em 0.5em;">
                                        <div onclick="contestarPregunta(${comentario.id})" class="myButtonV">Enviar</div>                            
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
                                <div id="b_eleminar_${comentario.id}" class="b_eleminar">
                                    <div onclick="borrarPregunta(${comentario.id})" class="myButtonR">Eliminar</div>
                                </div>
                            </div>
                        </div>
                    `;
                }
            });

            if(comentariosSinCHtml == "") {
                comentariosSinCHtml = `
                <div class="texto_titulo centro"> No hay preguntas.</div>
                `;
            }

            if(comentariosContestadosHtml == "") {
                comentariosContestadosHtml = `
                    <div class="texto_titulo centro"> No hay preguntas.</div>
                `;
            }

            comentariosSinCDiv.innerHTML = comentariosSinCHtml;
            comentariosContestadosDiv.innerHTML = comentariosContestadosHtml;
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

function contestarPregunta(id) {
    let respuesta = document.getElementById(`${id}_respuesta_input`).value;
    console.log(respuesta);

    if(respuesta == "") {
        alert("La respuesta no puede estar vacia");
    } else {
        var session = getSesion();
        if(session == null) {
            window.location.href = loginPage;
        }

        let botones = document.getElementById(`b_eleminar_${id}`);
        botones.innerHTML = '<div class="loader"></div>';
2
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() + ' ' + today.getHours()+':'+today.getMinutes();
        
        const data = {
            respuesta: respuesta,
            fecha: date
        }

        //console.log(data);

        const xhr = new XMLHttpRequest();

        xhr.open("PATCH", `${serverUrl}/preguntas?id_pregunta=${id}`, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader("Authorization", session.token_acceso);
        xhr.onload = function() {
            if(this.status === 200) {
                let data = JSON.parse(this.responseText);
                console.log(data);
                cargar();
            } else if(this.status == 401) {
                var data = JSON.parse(this.responseText);
    
                if (data.messages.indexOf("Token de acceso ha caducado") >= 0) {
                    console.log(data);
                    refreshToken();
                    //window.location.reload();
                } else {
                    window.location.href = loginPage;
                }
            } else {
                alert("Algo salio mal al borrar la pregunta, vuelve a intentar.");
                cargar();
                console.log(this.status);
                console.log(this.responseText);
            }
        }
        xhr.send(JSON.stringify(data));
    }
}

function borrarPregunta(id) {
    console.log(id);
    var r = confirm("Seguro que quieres borrar la pregunta?");

    if(r == true) {
        var session = getSesion();
        if(session == null) {
            window.location.href = loginPage;
        }

        let botones = document.getElementById(`b_eleminar_${id}`);
        botones.innerHTML = '<div class="loader"></div>';

        const xhr = new XMLHttpRequest();
        xhr.open("DELETE", `${serverUrl}/preguntas?id_pregunta=${id}`, true);
        xhr.setRequestHeader("Authorization", session.token_acceso);
        xhr.onload = function() {
            if(this.status === 200) {
                let data = JSON.parse(this.responseText);
                cargar();
                console.log(data);
            } else if(this.status == 401) {
                var data = JSON.parse(this.responseText);
    
                if (data.messages.indexOf("Token de acceso ha caducado") >= 0) {
                    console.log(data);
                    refreshToken();
                    //window.location.reload();
                } else {
                    window.location.href = loginPage;
                }
            } else {
                alert("Algo salio mal al borrar la pregunta, vuelve a intentar.");
                cargar();
                console.log(this.status);
                console.log(this.responseText);
            }
        }
        xhr.send();
    }
}