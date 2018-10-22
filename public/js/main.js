//$(document).ready(function() {}
$(function() {
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    fraseAleatoria();
    //$('#botao-reiniciar').on('click', reiniciaJogo);
    $('#botao-reiniciar').click(reinciaJogo);
})

function atualizaTempoInicial(tempo) {
    tempoInicial = tempo;
    $('#tempo-digitacao').text(tempo);
}

function atualizaTamanhoFrase() {
    var frase = $('.frase').text();
    var numPalavras = frase.split(' ').length;
    var tamanhoFrase = $('#tamanho-frase');
    tamanhoFrase.text(numPalavras);
}

var campo = $('.campo-digitacao');
function inicializaContadores() {
    campo.on('input', function() {  
        var conteudo = campo.val();
        $('#contador-caracteres').text(conteudo.length);
        var qtdPalavras = conteudo.split(/\S+/).length - 1;
        $('#contador-palavras').text(qtdPalavras);
    });
}

function inicializaCronometro() {
    campo.one('focus', function() {
        var tempoRestante = $('#tempo-digitacao').text();
        var cronometroID = setInterval(function() {
            tempoRestante--;
            $('#tempo-digitacao').text(tempoRestante);
            if (tempoRestante < 1) {
                clearInterval(cronometroID);
                finalizaJogo();
            }
        }, 1000);
    });
}

function finalizaJogo() {
    campo.attr('disabled', true);
    campo.toggleClass('campo-desativado');
    inserePlacar();
}

function inicializaMarcadores() {
    campo.on('input', function() {
        var frase = $('.frase').text();
        var digitado = campo.val();
        var comparavel = frase.substr(0, digitado.length);

        if (digitado == comparavel) {
            campo.addClass('campo-correto');
            campo.removeClass('campo-errado');      
        } else {
            campo.addClass('campo-errado');
            campo.removeClass('campo-correto');
        }
    });
}

function reinciaJogo() {
    campo.toggleClass('campo-desativado');
    campo.removeClass('campo-correto');
    campo.removeClass('campo-errado');
    campo.attr('disabled', false);
    campo.val('');
    $('#contador-palavras').text('0');
    $('#contador-caracteres').text('0');
    $('#tempo-digitacao').text(tempoInicial);
    inicializaCronometro();
}