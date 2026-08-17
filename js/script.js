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
 