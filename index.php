<!DOCTYPE html>
<html lang="pt-br">
    <head>
        <title>Camera (Android, Iphone, WebCam)</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <link rel="stylesheet" href="css/estilo.css">
    </head>
    <body>
        <div class="area">
            <h1>Utilizando WebCam</h1>
            <hr>
            <button id="btAbrirCamera" type="button" onclick="loadCamera()" class="btn btn-primary btn-padrao invertido pl-5 pr-5 mt-4 mb-4"  >Abrir Camera</button>

            <video autoplay="true" id="webCamera"></video>
            <img id="imagemConvertida"/>
            
            <form id="formCamera" action="#" method="post">
                <input type="hidden" name="imagem"  id="base_img" />
            </form>
            
            <button id="btTirarFoto"   type="button" onclick="takeSnapShot()" >Tirar foto</button>
            <button id="btCancelar"    type="button" onclick="cancelar()"     >Cancelar</button>
            <button id="btSalvarFoto"  type="button" onclick="enviarFoto()"   >Enviar</button>
        </div>
    </body>

    <script src="js/script.js"></script>
</html>
