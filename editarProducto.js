function cargar() {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", "editarProducto.json", true);

    xhr.onload = function() {
        if(this.status === 200) {
            let producto = JSON.parse(this.responseText);
            console.log(producto);

            let nombre = document.getElementById("producto_nombre");
            nombre.value = producto.nombre;

            let descripcionBasica = document.getElementById("producto_descripcion_basica")
            descripcionBasica.value = producto.descripcionBasica;

            let descripcionCompleta = document.getElementById("producto_descripcion_completa")
            descripcionCompleta.value = producto.descripcionCompleta;

            let ubicacion = document.getElementById("producto_ubicacion")
            ubicacion.value = producto.ubicacion;

            let precio = document.getElementById("producto_precio")
            precio.value = producto.precio;

            let caracteristicas = document.getElementById("contendor_caracteristicas");
            let caracteristicasHtml = "";
            producto.caracteristicas.forEach(caracteristica => {
                caracteristicasHtml += `
                <div id="caracteristicas">
                    <div class="col-6">
                        <input value="${caracteristica.caracteristica}"
                        type="text" class="input_caractersitica" placeholder="Ej. Color">

                    </div>
                    <div class="col-6">
                        <input value="${caracteristica.valor}"
                        type="text" class="input_caractersitica" placeholder="Ej. Rojo">
                    </div>
                </div>
                `
            });

            caracteristicas.innerHTML = caracteristicasHtml;
        }
    }

    xhr.send();
}

var loadFile = function(event) {
    var output = document.getElementById('mainImg');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function() {
      URL.revokeObjectURL(output.src) // free memory
    }
  };

  function agregarCarac() {
      var contendor = document.getElementById("caracteristicas");

      contendor.innerHTML += `
                      <div class="col-6">
                          <input type="text" class="input_caractersitica" placeholder="Ej. Color">

                      </div>
                      <div class="col-6">
                          <input type="text" class="input_caractersitica" placeholder="Ej. Rojo">
                      </div>
      `;
  }