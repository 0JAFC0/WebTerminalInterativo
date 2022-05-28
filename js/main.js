
var antes = document.getElementById("antes")
var terminal = document.getElementById("terminal")
var linha = document.getElementById("linha")
var comandoDiv = document.getElementById("typer")
var textarea = document.getElementById("textea")

var password = false;
var comandos = [];
var git = 0;

setTimeout(function() {
    repeteLinhas(banner, "", 80);
    textarea.focus();
}, 100);

window.addEventListener("keyup",teclaEnter);
document.addEventListener("keypress",redimensionaTextArea);

//inicio
textarea.value = "";
comandoDiv.innerHTML = textarea.value;

function teclaEnter(e) {
    if(e.keyCode == 181){
        document.location.reload(true);
    }
    if (e.keyCode == 13) {
        comandos.push(comandoDiv.innerHTML);
        git = comandos.length;
        adicionaLinha(`visitante@${document.location.href.slice(7,)}:~$ ` + comandoDiv.innerHTML, "no-animation", 0);
        comando(textarea.value.toLowerCase());
        comandoDiv.innerHTML = "";
        textarea.value = "";
        redimensionaTextArea();
      }
    if (e.keyCode == 38 && git != 0) {
        git -= 1;
        textarea.value = comandoDiv[git];
        comandoDiv.innerHTML = textarea.value;
    }
    if (e.keyCode == 40 && git != comandos.length) {
        git += 1;
    if (comandos[git] === undefined) {
        textarea.value = "";
    } else {
        textarea.value = comandos[git];
    }
    }
    comandoDiv.innerHTML = textarea.value;
}

function comando(cmd) {
    if(cmd.localeCompare("ajuda")){
        repeteLinhas(ajuda, "color2 margin", 80);
    }else{
        repeteLinhas(naoEncontrado,"error", 100);
    }
}

function adicionaLinha(texto,estilo,tempo) {
    var t = "";
    for(let i = 0;i<texto.length;i++){
        if(texto.charAt(i) == " " && texto.charAt(i + 1) == " "){
            t += "&nbsp;&nbsp;";
        }else{
            t += texto.charAt(i);
        }
    }
    setTimeout(function() {
        var proximo = document.createElement("p");
        proximo.innerHTML = t;
        proximo.className = estilo;

        antes.parentNode.insertBefore(proximo, antes);

        window.scrollTo(0,document.body.offsetHeight);
    }, tempo);
}

function repeteLinhas(nome,estilo,tempo) {
    nome.forEach(function(elemento, index){
        adicionaLinha(elemento,estilo,index*tempo);
    });
}

function redimensionaTextArea(e) {
  let textArea = document.getElementById("textea");
  let tamanho = textArea.value.length;
  if(tamanho < 5){
    textArea.cols = 5;
  }else{
    textArea.cols = tamanho;
  }
}