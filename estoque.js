// Variáveis globais
let saldo = 0;
let sistemaIniciado = false;

// Elementos da interface
const saldoInicialInput = document.getElementById('saldoInicial');
const iniciarButton = document.getElementById('iniciar');
const operacoesDiv = document.getElementById('operacoes');
const tipoEntradaSelect = document.getElementById('tipoEntrada');
const quantidadeInput = document.getElementById('quantidade');
const processarButton = document.getElementById('processar');
const encerrarButton = document.getElementById('encerrar');
const saldoAtualSpan = document.getElementById('saldoAtual');
const mensagemP = document.getElementById('mensagem');

// Função para iniciar o sistema
iniciarButton.addEventListener('click', () => {
    const saldoInicial = parseInt(saldoInicialInput.value);

    // Validação do saldo inicial
    if (isNaN(saldoInicial) || saldoInicial < 0) {
        alert("Por favor, insira um saldo inicial válido.");
        return;
    }

    saldo = saldoInicial;
    saldoAtualSpan.textContent = saldo;
    sistemaIniciado = true;
    operacoesDiv.classList.remove('hidden');
    saldoInicialInput.disabled = true;
    iniciarButton.disabled = true;
    mensagemP.textContent = ""; // Limpa mensagens anteriores
});

// Função para processar a entrada (compra ou venda)
processarButton.addEventListener('click', () => {
    if (!sistemaIniciado) {
        alert("O sistema ainda não foi iniciado.");
        return;
    }

    const tipo = parseInt(tipoEntradaSelect.value);
    const quantidade = parseInt(quantidadeInput.value);

    // Validação da quantidade
    if (isNaN(quantidade) || quantidade <= 0) {
        mensagemP.textContent = "Por favor, insira uma quantidade válida.";
        return;
    }

    if (tipo === 1) {
        // Compra: adiciona ao estoque
        saldo += quantidade;
        mensagemP.textContent = `Compra de ${quantidade} peças realizada.`;
    } else if (tipo === 2) {
        // Venda: verifica se há saldo suficiente
        if (quantidade > saldo) {
            mensagemP.textContent = "Saldo insuficiente.";
            return;
        }
        saldo -= quantidade;
        mensagemP.textContent = `Venda de ${quantidade} peças realizada.`;
    } else {
        mensagemP.textContent = "Tipo de operação inválido.";
        return;
    }

    // Atualiza o saldo na tela
    saldoAtualSpan.textContent = saldo;
    quantidadeInput.value = ''; // Limpa o campo de quantidade
});

// Função para encerrar o sistema
encerrarButton.addEventListener('click', () => {
    sistemaIniciado = false;
    operacoesDiv.classList.add('hidden');
    saldoInicialInput.disabled = false;
    iniciarButton.disabled = false;
    mensagemP.textContent = "Sistema encerrado.";
});