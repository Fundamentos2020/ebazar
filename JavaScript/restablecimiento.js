function cargar()
{
    menu();
}

function actualizaContrasena()
{
    var name = document.getElementById("username").value;

    xhttp = new XMLHttpRequest();

    xhttp.open("PATCH", api +  `usuarios/restablece_usuario=${name} `, true);
    xhttp.setRequestHeader("Content-Type", "application/json");

    xhttp.onload = function() {
        if(this.status === 200) 
        {
            var data = JSON.parse(xhttp.responseText);
            if (data.success === true)
            {
                window.location.reload();
            }
            else {
                var data = JSON.parse(this.responseText);
                alert(data.messages);
            }
        }
    };

    var contrasena = document.getElementById('password').value;

    var obj = {};

    if(contrasena !== null)
    {
        obj['contrasena'] = contrasena;
    }

    var json_string = JSON.stringify(obj);
    
    xhttp.send(json_string);
}