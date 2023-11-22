const resultContainer = document.getElementById('mostrar-planos')

function trocarTela(){
    const calcContainer = document.querySelector("#calc-container")
    
    calcContainer.classList.toggle("hide")
    resultContainer.classList.toggle("hide")
}

function calcularImc() {
    const peso = document.getElementById('peso').value
    const altura = document.getElementById('altura').value

    const imc = peso / (altura * altura)
    return imc
}

function calcularComorbidade() {
    const imc = calcularImc()

    let fatorComorbidade = 0

    if (imc < 18.5) {
        fatorComorbidade = 10
    } else if (imc < 24.9) {
        fatorComorbidade = 1
    } else if (imc < 29.9) {
        fatorComorbidade = 6
    } else if (imc < 34.9) {
        fatorComorbidade = 10
    } else if (imc < 39.9) {
        fatorComorbidade = 20
    } else {
        fatorComorbidade = 30
    }

    return fatorComorbidade
}

function calcularOperadoraA() {
    const imc = calcularImc()
    const idade = document.getElementById('idade').value

    const basico = 100 + (idade * 10 * (imc / 10))
    const standard = (150 + (idade * 15)) * (imc / 10)
    const premium = (200 - (imc * 10) + (idade * 20)) * (imc / 10)

    return {
        'Básico': basico,
        'Standard': standard, 
        'Premium': premium
    } 
}

function calcularOperadoraB() {
    const imc = calcularImc()
    const comorbidade = calcularComorbidade()

    const basico = 100 + (comorbidade * 10 * (imc / 10))
    const standard = (150 + (comorbidade * 15)) * (imc / 10)
    const premium = (200 - (imc * 10) + (comorbidade * 20)) * (imc / 10)

    return {
        'Básico': basico,
        'Standard': standard, 
        'Premium': premium
    } 
}

function novaLinhaTabela(tabela, plano, preco) {
    const tabelaNova = document.getElementById(tabela)
    const tbody = tabelaNova.getElementsByTagName('tbody')[0]
    const linha = tbody.insertRow()
    

    var colunaPlano = linha.insertCell(0)
    var colunaPreco = linha.insertCell(1)

    colunaPlano.innerHTML = plano
    colunaPreco.innerHTML = preco
}

function destacarMenorPreco(idTabela, classeCor) {
    var tabela = document.getElementById(idTabela);
    var linhas = tabela.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    var menorValor = Infinity;
    var indexMenorValor = -1;

    // Encontrar o menor valor na coluna "valor"
    for (var i = 0; i < linhas.length; i++) {
        var valorFormatado = linhas[i].getElementsByTagName('td')[1].innerHTML;
        var valorAtual = parseFloat(valorFormatado.replace(/[^\d,-]/g, ''));
      if (valorAtual < menorValor) {
        menorValor = valorAtual;
        indexMenorValor = i;
      }
    }

    // Adicionar classe à linha com o menor valor
    if (indexMenorValor !== -1) {
      linhas[indexMenorValor].classList.add(classeCor);
    }
}

function exibirOperadora(resultadoTabela, tabela) {
    let tabelaAArray = Object.entries(resultadoTabela)

    for ([chave, valor] of tabelaAArray) {
            novaLinhaTabela(tabela, chave, valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))
    }

    destacarMenorPreco(tabela, 'precoBaixo') 
}

function exibirResultados() { 
    const tabelaA = calcularOperadoraA()
    const tabelaB = calcularOperadoraB()

    exibirOperadora(tabelaA, 'tabela1')
    exibirOperadora(tabelaB, 'tabela2')

    trocarTela()
}

function recarregarPagina() {
    location.reload();
}

document.getElementById('calc-btn').addEventListener('click', exibirResultados)

document.getElementById('back-btn').addEventListener('click', recarregarPagina)

