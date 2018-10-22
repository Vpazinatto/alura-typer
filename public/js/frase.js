$('#botao-frase').click(fraseAleatoria);

function fraseAleatoria() {
    $('#spinner').show();
    $.get('http://localhost:3000/frases', trocaFraseAleatoria).fail(function() {
        $('#erro').show();
        setTimeout(function() {
            $('#erro').hide();
        }, 1500);
    });
}

function trocaFraseAleatoria (data) {
    $('#spinner').hide();
    var frase = $('.frase');
    var numAleatorio = Math.floor(Math.random() * data.length);
    frase.text(data[numAleatorio].texto);
    atualizaTamanhoFrase();
    atualizaTempoInicial(data[numAleatorio].tempo);
}