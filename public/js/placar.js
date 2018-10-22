$('#botao-placar').click(mostraPlacar);
$('#botao-sync').click(sincronizaPlacar);

function sincronizaPlacar() {
    var placar = [];
    var linhas = $('tbody>tr');
    linhas.each(function() {
        var usuario = $(this).find('td:nth-child(1)').text();
        var palavras = $(this).find('td:nth-child(2)').text();

        var score = {
            usuario: usuario,
            pontos: palavras
        };

        placar.push(score);
    });

    var dados = {
        placar: placar
    };

    $.post('http://localhost:3000/placar', dados, function() {
        console.log('Placar salvo no servidor.');
    });
}

function atualizaPlacar() {
    $.get('http://localhost:3000/placar', function(data) {
        $(data).each(function() {
            $('tbody').append(novaLinha(this.usuario, this.pontos));
        });
    });
}

function mostraPlacar() {
    $('.placar').stop().slideToggle(600);
}

function inserePlacar() {
    var corpoTabela = $('.placar').find('tbody');
    var usuario = 'Vinicius';
    var numPalavras =$('#contador-palavras').text();

    var linha = novaLinha(usuario, numPalavras);

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
    linha.find('.botao-remover').click(removeLinha);

    return linha;
}

function removeLinha() {
    event.preventDefault();
    var linha = $(this).parent().parent();
    linha.fadeOut();
    setTimeout(function() {
        linha.remove();
        sincronizaPlacar();
    }, 1000);
}