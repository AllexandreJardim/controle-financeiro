let movimentacoes = [];
 
const form = document.getElementById('form-movimentacao');
const listaMovimentacoes = document.getElementById('lista-movimentacoes');
const mensagemVazio = document.getElementById('mensagem-vazio');
const saldoEl = document.getElementById('saldo');
const totalReceitasEl = document.getElementById('total-receitas');
const totalDespesasEl = document.getElementById('total-despesas');
 
 
function calcularTotais() {
  let totalReceitas = 0;
  let totalDespesas = 0;
 
  movimentacoes.forEach(function (mov) {
    if (mov.tipo === 'receita') {
      totalReceitas += mov.valor;
    } else {
      totalDespesas += mov.valor;
    }
  });
 
  const saldo = totalReceitas - totalDespesas;
 
  return { saldo, totalReceitas, totalDespesas };
}
 
function formatarMoeda(valor) {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}
 
function atualizarResumo() {
  const { saldo, totalReceitas, totalDespesas } = calcularTotais();
 
  saldoEl.textContent = formatarMoeda(saldo);
  totalReceitasEl.textContent = formatarMoeda(totalReceitas);
  totalDespesasEl.textContent = formatarMoeda(totalDespesas);
}


 
// Cria uma linha <tr> da tabela para uma movimentação
function criarLinha(mov) {
  const tr = document.createElement('tr');
 
  const dataFormatada = new Date(mov.data + 'T00:00:00').toLocaleDateString('pt-BR');
 
  tr.innerHTML = `
    <td>${dataFormatada}</td>
    <td>${mov.descricao}</td>
    <td>${mov.categoria}</td>
    <td>${mov.tipo === 'receita' ? 'Receita' : 'Despesa'}</td>
    <td>${formatarMoeda(mov.valor)}</td>
    <td><button class="btn-excluir" data-id="${mov.id}">Excluir</button></td>
  `;
 
  return tr;
}
 
 
// Redesenha a tabela inteira a partir do array de movimentações
function renderizarLista() {
  listaMovimentacoes.innerHTML = '';
 
  if (movimentacoes.length === 0) {
    mensagemVazio.style.display = 'block';
  } else {
    mensagemVazio.style.display = 'none';
 
    movimentacoes.forEach(function (mov) {
      const linha = criarLinha(mov);
      listaMovimentacoes.appendChild(linha);
    });
  }
 
  atualizarResumo();
}


 