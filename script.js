
let subtotal = 0;
let itens = [];

function adicionar(nome, valorUnitario, idQuantidade) {
    const quantidade = parseInt(document.getElementById(idQuantidade).value) || 0;
    const valorTotalProduto = valorUnitario * quantidade;
    subtotal += valorTotalProduto;

    const itemExistente = itens.find(item => item.nome === nome);

    if (itemExistente) {
        itemExistente.quantidade += quantidade;
    } else {
        itens.push({ nome, quantidade });
    }

    atualizarLista();
    atualizarTotal();
}

function atualizarLista() {
    const lista = document.getElementById('listaItens');
    lista.innerHTML = '';

    itens.forEach(item => {
        const li = document.createElement('li');
        li.innerText = `${item.nome} x${item.quantidade}`;
        lista.appendChild(li);
    });
}

function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function atualizarTotal() {
    const usarDesconto = document.getElementById('usarDesconto').checked;
    let totalFinal = subtotal;

    if (usarDesconto) {
        const desconto = subtotal * 0.20;
        totalFinal = subtotal - desconto;
    }

    totalFinal = Math.max(totalFinal, 0);
    document.getElementById('total').innerText = formatarMoeda(totalFinal);
}

function limpar() {
    subtotal = 0;
    itens = [];
    atualizarLista();
    atualizarTotal();

    const inputs = document.querySelectorAll('input[type="number"]');
    inputs.forEach(input => input.value = 1);

    document.getElementById('usarDesconto').checked = false;
    document.getElementById('passaporte').value = '';
}

function gerarNotaFiscal() {
    if (itens.length === 0) {
        alert("Nenhum item adicionado!");
        return;
    }

    const passaporte = document.getElementById('passaporte').value.trim();
    if (passaporte === "") {
        alert("Por favor, preencha o número do passaporte do cliente.");
        return;
    }

    const usarDesconto = document.getElementById('usarDesconto').checked;
    let nota = "----- NOTA FISCAL -----\n\n";
    nota += "Passaporte do Cliente: " + passaporte + "\n\n";

    itens.forEach(item => {
        nota += `${item.nome} - Quantidade: ${item.quantidade}\n`;
    });

    nota += "\nSubtotal: " + formatarMoeda(subtotal);

    if (usarDesconto) {
        const desconto = subtotal * 0.20;
        nota += "\nDesconto (20%): -" + formatarMoeda(desconto);
        nota += "\nTotal: " + formatarMoeda(subtotal - desconto);
    } else {
        nota += "\nTotal: " + formatarMoeda(subtotal);
    }

    nota += "\n\n------------------------";

    alert(nota);
}
