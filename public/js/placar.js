$('#botao-placar').click(mostraPlacar);

function mostraPlacar() {
    $('.placar').stop().slideToggle(600);
}

function inserePlacar() {
    var corpoTabela = $('.placar').find('tbody');
    var usuario = 'Vinicius';
    var numPalavras =$('#contador-palavras').text();

    var linha = novaLinha(usuario, numPalavras);
    linha.find('.botao-remover').click(removeLinha);

    corpoTabela.prepend(linha);
    $('.placar').slideDown(500);
    scrollPlacar();
}

function scrollPlacar() {
    var posicaoPlacar = $('.placar').offset().top;
    $('html, body').animate({
        scrollTop: posicaoPlacar+"px"
    }, 1000);
}

function novaLinha(usuario, numPalavras) {

    var linha = $('<tr>');
    var colunaUsuario = $('<td>').text(usuario);
    var colunaPalavras = $('<td>').text(numPalavras);
    var colunaRemover = $('<td>');
    var link = $('<a>').addClass('botao-remover').attr("href", "#");
    var icone = $('<i>').addClass('small').addClass('material-icons').text('delete');

    link.append(icone);
    colunaRemover.append(link);

    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;
}

function removeLinha() {
    event.preventDefault();
    var linha = $(this).parent().parent();
    linha.fadeOut();
    setTimeout(function() {
        linha.remove();
    }, 1000);
    
}