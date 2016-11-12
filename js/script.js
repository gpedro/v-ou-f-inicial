'use strict';

// 11/10/2016 | Dourados-MS, Brasil
// Copyright (c) 2016 by Matheus Alves

if (!localStorage.getItem('maior')) {
    localStorage.setItem('maior', '0');
}

var record = localStorage.getItem('maior');
document.querySelector('#maior').innerHTML = record;

function rand(num) {
    return parseInt(Math.random() * (1 + num));
}

function adicionar() {
    var letras = 'ABCDEFGHIJLMNOPQRSTUVXZ'.split('');
    var palavras = [
        'AMOR', 'BANANA', 'CACHORRO', 'DADO', 'ERVA', 'FACA',
        'GALO', 'HISTÓRIA', 'IGUAL', 'JACA', 'LAGO', 'MACACO', 'NAVIO',
        'OBJETO', 'PATO', 'QUEIJO', 'RATO', 'SAPO', 'TATU', "UVA",
        'VACA', 'XICACA', 'ZEBRA'
    ];

    function buscar(letra1) {
        var l1, l2;

        function get(ltr) {
            var x;

            palavras.forEach(function (palavra) {
                if (palavra[0] === ltr) {
                    x = palavra;

                    return;
                }
            });

            return x;
        }

        letras = letras.join('').replace(letra1, '').split('');
        var letra2 = letras[rand(letras.length - 1)];

        return [
            get(letra1),
            get(letra2)
        ];
    }

    var letra = letras[rand(letras.length - 1)];
    var opcoes = buscar(letra)
    var palavra = opcoes[rand(opcoes.length - 1)];

    document.querySelector('#letra').innerHTML = letra;
    document.querySelector('#palavra').innerHTML = palavra;
}

adicionar();

var interval = function() {
    var seg = parseInt(document.querySelector('#tempo').innerHTML) - 1;

    document.querySelector('#tempo').innerHTML = seg;

    if (seg === -1) {
        fimDeJogo();
    }
}

var tempo = setInterval(interval, 1000);

function fimDeJogo() {
    clearInterval(tempo);

    document.querySelector('#fim').hidden = false;
    document.querySelector('#jogo').hidden = true;

    document.querySelector('#tempo').innerHTML = 3;

    var pontos = document.querySelector('#pontos').innerHTML;
    document.querySelector('#total').innerHTML = pontos;

    var maior = localStorage.getItem('maior');

    if (parseInt(pontos) > parseInt(maior)) {
        localStorage.setItem('maior', pontos);
        document.querySelector('#maior').innerHTML = pontos;
    }

    document.querySelector('#pontos').innerHTML = 0;
}

function voltar() {
  document.querySelector('#fim').hidden = true;
  document.querySelector('#jogo').hidden = false;

  document.querySelector('#total').innerHTML = 0;

  adicionar();
  tempo = setInterval(interval, 1000);
}

function avancar() {
    adicionar();

    clearInterval(tempo);
    document.querySelector('#tempo').innerHTML = 3;
    tempo = setInterval(interval, 1000);

    var pontos = parseInt(document.querySelector('#pontos').innerHTML) + 1;
    document.querySelector('#pontos').innerHTML = pontos;
}

function checar(val) {
    var l = document.querySelector('#letra').innerHTML;
    var p = document.querySelector('#palavra').innerHTML;

    if (val) {
        l === p[0] ? avancar() : fimDeJogo();
    } else {
        l === p[0] ? fimDeJogo() : avancar();
    }
}
