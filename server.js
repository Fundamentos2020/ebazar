const serverUrl = "http://localhost:8080/ebazar-back";
const loginPage = "login.html";
//const serverUrl = "https://ebazarmex.000webhostapp.com";

function getSesion() {
    var sesion = localStorage.getItem("lusuarios_sesion");
    
    if (sesion != null && sesion != "")
    {
        var sesion_json = JSON.parse(sesion);

        return sesion_json;
    }
    
    return null;
}

function refreshToken() {
    var sesion = getSesion();

    if (sesion == null) {
        window.location.href = "login.html";
    }

    var xhttp = new XMLHttpRequest();

    xhttp.open("PATCH", serverUrl + "/sesiones/id_sesion=" + sesion.id_sesion, false);
    xhttp.setRequestHeader("Authorization", sesion.token_acceso);
    xhttp.setRequestHeader("Content-Type", "application/json");

    var json = { "token_actualizacion": sesion.token_actualizacion };
    var json_string = JSON.stringify(json);

    xhttp.send(json_string);

    var data = JSON.parse(xhttp.responseText);

    if (data.success === true){
        localStorage.setItem('lusuarios_sesion', JSON.stringify(data.data));
        window.location.reload();
        //window.location.href = client;
    }
    else{
        alert(data.messages);
        window.location.href = "login.html";
    }
}