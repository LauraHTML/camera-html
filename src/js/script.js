const videoElemento = document.getElementById("video");
const botaoScanear = document.getElementById("botao");
const resultado = document.getElementById("saida");
const canvas = document.getElementById("canvas");

async function configurarCamera(){
    try{
        const midia = await navigator.mediaDevices.getUserMedia({
            // habilitar camera traseira, não habilitar audio
            video: {facingMode: { exact: "environment" }},
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

botaoScanear.onClick = async ()=> {
    botaoScanear.disabled=true;
    resultado.innerText="Fazendo a leitura do texto, aguarde"

    //define o canvas para iniciar leitura
    const contexto = canvas.getContext('2d')

    //ajusta o tamanho do canvas para o tamanho real do vídeo
    canvas.width = videoElemento.videoWidth;
    canvas.height = videoElemento.videoHeight;

    //aplicando filtro para melhorar OCR
    contexto.filter='contrast(1.2) grayscale(1)'

    //desenha o vídeo no canvas
    contexto.drawImage(videoElemento,0,0, canvas.width, canvas.height);

    try{
        //pegando o texto pelo tesseract
        const {data: {text}} = await Tesseract.recognize(
            'por' //idioma
        );

        //removendo espaços em branco
        const textoFinal = text.trim();
        resultado.innerText = textoFinal.lenght > 0 ? textoFinal : 'Não foi possível identificar o texto';
    }
    catch(erro){
        resultado.innerText="Não foi possível extrair o texto, erro no processamento",erro
    }
    finally{
       botaoScanear.disabled=false; 
    }
}