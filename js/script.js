var botaoAbrirCamera = document.querySelector('#btAbrirCamera');
    var botaoTirarFoto   = document.querySelector('#btTirarFoto');
    var botaoCancelar    = document.querySelector('#btCancelar');
    var botaoSalvarFoto  = document.querySelector('#btSalvarFoto');
    var formularioCamera = document.querySelector('#formCamera');

    function estadoInicial(){
        mostrar(botaoAbrirCamera);
        esconder(botaoTirarFoto);
        esconder(botaoCancelar);
        esconder(botaoSalvarFoto);
    }
    estadoInicial();

    function loadCamera(){
        //Captura elemento de vídeo
        var video = document.querySelector("#webCamera");
        //As opções abaixo são necessárias para o funcionamento correto no iOS
        video.setAttribute('autoplay', '');
        video.setAttribute('muted', '');
        video.setAttribute('playsinline', '');
        //--
        
        //Verifica se o navegador pode capturar mídia
        if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({audio: false, video: {facingMode: 'user'}})
            .then( function(stream) {
                //Definir o elemento vídeo a carregar o capturado pela webcam
                video.srcObject = stream;
                esconder(botaoAbrirCamera);
                mostrar(botaoTirarFoto);
            })
            .catch(function(error) {
                alert("Oooopps... Falhou :'(");
            });
        }
    }

    function takeSnapShot(){
        //Captura elemento de vídeo
        var video = document.querySelector("#webCamera");
        
        //Criando um canvas que vai guardar a imagem temporariamente
        var canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        var ctx = canvas.getContext('2d');
        
        //Desenhando e convertendo as dimensões
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        //Criando o JPG
        var dataURI = canvas.toDataURL('image/jpeg'); //O resultado é um BASE64 de uma imagem.
        document.querySelector("#base_img").value = dataURI;
        
        //sendSnapShot(dataURI); //Gerar Imagem e Salvar Caminho no Banco
        mostrarFoto();
        esconder(botaoTirarFoto);
        mostrar(botaoCancelar);
        mostrar(botaoSalvarFoto);
    }

    function mostrarFoto(){
        let img = document.querySelector("#base_img");
        let video = document.querySelector("#webCamera");
        let imagem = document.querySelector("#imagemConvertida");
        
        imagem.setAttribute("src", img.value);
        mostrar(imagem);
        esconder(video);
    }

    function cancelar(){
        let imagem = document.querySelector("#imagemConvertida");
        let video = document.querySelector("#webCamera");

        mostrar(video);
        esconder(imagem );
        mostrar(botaoTirarFoto);
        esconder(botaoCancelar);
        esconder(botaoSalvarFoto);
    }

    function mostrar(item){
        item.classList.add("mostrar");
        item.classList.remove('esconder');
    }

    function esconder(item){
        item.classList.add('esconder');
        item.classList.remove('mostrar');
    }

    function enviarFoto(){
        formularioCamera.submit();
    }

    function sendSnapShot(){
        let base64 = document.querySelector("#base_img").value;
        var request = new XMLHttpRequest();
        request.open('POST', 'camera/upload', true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        request.onload = function() {
            console.log(request);
            if (request.status >= 200 && request.status < 400) {
                
                //Colocar o caminho da imagem no SRC
                var data = JSON.parse(request.responseText);

                //verificar se houve erro
                if(data.error){
                    alert(data.error);
                    return false;
                }

                //Mostrar informações
                document.querySelector("#imagemConvertida").setAttribute("src", data.img);
                document.querySelector("#caminhoImagem a").setAttribute("href", data.img);
                document.querySelector("#caminhoImagem a").innerHTML = data.img.split("/")[1];
            } else {
                alert( "Erro ao salvar. Tipo:" + request.status );
            }
        };

        request.onerror = function() {
            alert("Erro ao salvar. Back-End inacessível.");
        }

        request.send("base_img="+base64); // Enviar dados
    }