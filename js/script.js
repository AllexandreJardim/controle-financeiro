app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

const API_URL = 'http://127.0.0.1:8000';

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

  const dataFormatada = new Date(
    mov.data + 'T00:00:00'
  ).toLocaleDateString('pt-BR');

  tr.innerHTML = `
    <td>${dataFormatada}</td>
    <td>${mov.descricao}</td>
    <td>${mov.categoria}</td>
    <td>${mov.tipo === 'receita' ? 'Receita' : 'Despesa'}</td>
    <td>${formatarMoeda(mov.valor)}</td>
    <td>
      <button class="btn-excluir" data-id="${mov.id}">
        Excluir
      </button>
    </td>
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


async function carregarMovimentacoes() {
  try {
    const resposta = await fetch(`${API_URL}/movimentacoes`);

    if (!resposta.ok) {
      throw new Error('Erro ao buscar movimentações.');
    }

    movimentacoes = await resposta.json();

    renderizarLista();
  } catch (erro) {
    console.error('Erro:', erro);
  }
}


form.addEventListener('submit', async function (evento) {
  evento.preventDefault();

  const novaMovimentacao = {
    tipo: document.getElementById('tipo').value,
    descricao: document.getElementById('descricao').value,
    valor: parseFloat(document.getElementById('valor').value),
    categoria: document.getElementById('categoria').value,
    data: document.getElementById('data').value
  };

  try {
    const resposta = await fetch(`${API_URL}/movimentacoes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(novaMovimentacao)
    });

    if (!resposta.ok) {
      throw new Error('Erro ao salvar movimentação.');
    }

    const movimentacaoCriada = await resposta.json();

    movimentacoes.push(movimentacaoCriada);

    renderizarLista();

    form.reset();
  } catch (erro) {
    console.error('Erro:', erro);
  }
});


listaMovimentacoes.addEventListener('click', async function (evento) {
  if (evento.target.classList.contains('btn-excluir')) {
    const id = Number(evento.target.dataset.id);

    try {
      const resposta = await fetch(`${API_URL}/movimentacoes/${id}`, {
        method: 'DELETE'
      });

      if (!resposta.ok) {
        throw new Error('Erro ao excluir movimentação.');
      }

      movimentacoes = movimentacoes.filter(function (mov) {
        return mov.id !== id;
      });

      renderizarLista();
    } catch (erro) {
      console.error('Erro:', erro);
    }
  }
});


carregarMovimentacoes();