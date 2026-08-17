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


form.addEventListener('submit', function (evento) {
  evento.preventDefault();
 
  const novaMovimentacao = {
    id: Date.now(), 
    tipo: document.getElementById('tipo').value,
    descricao: document.getElementById('descricao').value,
    valor: parseFloat(document.getElementById('valor').value),
    categoria: document.getElementById('categoria').value,
    data: document.getElementById('data').value
  };
 
  movimentacoes.push(novaMovimentacao);
  renderizarLista();
 
  form.reset();
});
 
 
listaMovimentacoes.addEventListener('click', function (evento) {
  if (evento.target.classList.contains('btn-excluir')) {
    const id = Number(evento.target.dataset.id);
 
    movimentacoes = movimentacoes.filter(function (mov) {
      return mov.id !== id;
    });
 
    renderizarLista();
  }
});
 
 
renderizarLista();
 

 