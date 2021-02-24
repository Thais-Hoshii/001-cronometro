/* O código abaixo não funciona como esperado e foi descartado
var milissegundos = 0;
var segundos = 0;
var minutos = 0;

function atualizarContagem() {

    let min = minutos.toString().padStart(2, "0");
    let seg = segundos.toString().padStart(2, "0");
    let mseg = milissegundos.toString().padStart(2, "0");

    let contagem = min + ":" + seg + ":" + mseg;

    document.getElementById("contagem").innerHTML = contagem;
}

atualizarContagem();
*/

let offset = 0;
let pausado = true;
function $(txt) {return document.getElementById(txt);}

renderizar();

function iniciarContagem() {
    if (pausado) {
        pausado = false;
        offset -= Date.now();
        renderizar();
    }
}

function pausarContagem() {
    if (!pausado) {
        pausado = true;
        offset += Date.now();
    }
}

function zerarContagem() {
    if (pausado) {
        offset = 0;
        renderizar();
    } else {
        offset = 0;
        pausado = true;
    }
}

function formato(valor, escala, modulo, padding) {
    valor = Math.floor(valor / escala) % modulo;
    return valor.toString().padStart(padding, 0);
}

function renderizar() {
    var valor = pausado ? offset : Date.now() + offset;

    $("tempo-msegundos").textContent = formato(valor, 1, 1000, 3);
    $("tempo-segundos").textContent = formato(valor, 1000, 60, 2);
    $("tempo-minutos").textContent = formato(valor, 60000, 60, 2);

    if (!pausado) {
        requestAnimationFrame(renderizar);
    } 
}