var tempoInicial = $('#tempo-digitacao').text();

//$(document).ready(function() {}
$(function() {
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    //$('#botao-reiniciar').on('click', reiniciaJogo);
    $('#botao-reiniciar').click(reinciaJogo);
})

var frase = $('.frase').text();
function atualizaTamanhoFrase() {
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

function inicializaMarcadores() {
    campo.on('input', function() {
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

function inicializaCronometro() {
    var tempoRestante = tempoInicial;
    campo.one('focus', function() {
        var cronometroID = setInterval(function() {
            tempoRestante--;
            $('#tempo-digitacao').text(tempoRestante);
            if (tempoRestante < 1) {
                campo.attr('disabled', true);
                clearInterval(cronometroID);
                campo.toggleClass('campo-desativado');
            }
        }, 1000);
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


