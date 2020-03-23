

function ClickImgsProducto(e) {
    var imgProducto = document.getElementById("imagen_producto");
    var imgsProducto = document.getElementById("imagenes_producto");

    imgProducto.src = e.src;

    var contendoresImgs = imgsProducto.children;
    for(var i = 0; i < contendoresImgs.length; i++) {
        var img = contendoresImgs[i].children[0];
        img.classList = "img_otras";
    }

    e.classList = "img_otras img_selec"
}