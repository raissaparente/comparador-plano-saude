resultado = document.getElementById('resultado')

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
    const linha = tabelaNova.insertRow()

    var colunaPlano = linha.insertCell(0)
    var colunaPreco = linha.insertCell(1)

    colunaPlano.innerHTML = plano
    colunaPreco.innerHTML = preco

}

function tabelaMenorPreco(tabela, arrayResultados) {
    tabelaMenor = document.getElementById(tabela)
    
    let menorChave
    let menorValor = Infinity

    for ([chave, valor] of arrayResultados) {
        if (valor < menorValor) {
            menorValor = valor
            menorChave = chave
        }
    }
    
    novaLinhaTabela(tabela, menorChave, menorValor)

    tabela.bgColor = '#b2e288'

}

function exibirOperadora(resultadoTabela, tabela, melhorTabela) {
    let tabelaAArray = Object.entries(resultadoTabela)

    for ([chave, valor] of tabelaAArray) {
            novaLinhaTabela(tabela, chave, valor)
    }

    tabelaMenorPreco(melhorTabela, tabelaAArray)
}

function exibirResultados() {
    const tabelaA = calcularOperadoraA()
    const tabelaB = calcularOperadoraB()

    exibirOperadora(tabelaA, 'tabela1', 'melhorTabela1')
    exibirOperadora(tabelaB, 'tabela2', 'melhorTabela2')

    resultado.classList.toggle('hidden') 
}

document.getElementById('botaover').addEventListener("click", exibirResultados)

