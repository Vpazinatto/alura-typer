$('#botao-frase').click(fraseAleatoria);
$('#botao-frase-id').click(buscaFrase);

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

function buscaFrase() {
    $("#spinner").toggle();
    var fraseId = $('#frase-id').val();
    var dados = { id: fraseId};

    $.get("http://localhost:3000/frases", dados, trocaFrase)
    .fail(function(){
        $("#erro").toggle();
        setTimeout(function(){
            $("#erro").toggle();
        },2000);
    })
    .always(function(){
        $("#spinner").toggle();
    });
}

function trocaFrase(data) {
    var frase = $(".frase");
    frase.text(data.texto); //cuidado, texto com "o" no final 
    atualizaTamanhoFrase();
    atualizaTempoInicial(data.tempo);
}
