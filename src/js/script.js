const videoElemento = document.getElementById("video");
const botaoScanear = document.getElementById("botao");
const resultado = document.getElementById("saida");
const canvas = document.getElementById("canvas");

async function configurarCamera(){
    try{
        const midia = await navigator.mediaDevices.getUserMedia({
            // habilitar camera traseira, não habilitar audio
            video: {facingMode: "enviroment"},
            audio: false
        })
        //recebe a função midia para ser executada
        videoElemento.srcObject = midia;
        //forçar reprodução do vídeo
        videoElemento.play();
    }
    catch(erro){
        resultado.innerText="Erro ao acessar a câmera",erro
    }
}

configurarCamera()