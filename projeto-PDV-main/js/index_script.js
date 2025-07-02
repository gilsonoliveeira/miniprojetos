// Alternar visibilidade do valor do caixa
let caixaVisivel = true;
const botaoCaixa = document.getElementById("toggle-caixa");
const valorCaixa = document.getElementById("valor-caixa");

let valorCaixaAtual = 0; // Mantida no escopo global

// Carrega os produtos do localStorage e adiciona as entradas na tela
window.onload = function () {
  const movimentacoes = JSON.parse(localStorage.getItem("movimentacoes")) || [];

  movimentacoes.forEach((mov) => {
    if (mov.tipo === "entrada") {
      adicionarEntrada(mov.nome, mov.descricao, mov.preco);
    } else if (mov.tipo === "saida") {
      adicionarSaida(mov.nome, mov.descricao, mov.preco);
    } else if (mov.tipo === "venda") {
      const nomesProdutos = Array.isArray(mov.produtos)
        ? mov.produtos.map((prod) => prod.nome).join(", ")
        : "Nenhum produto";

      adicionarVenda(mov.nome, mov.produtos, mov.valor);
    }
  });
};

// Adiciona a data atual ao elemento com id "data-caixa"
function addData() {
  const dataCaixa = new Date();
  const dia = String(dataCaixa.getDate()).padStart(2, "0");
  const mes = String(dataCaixa.getMonth() + 1).padStart(2, "0");
  const ano = dataCaixa.getFullYear();
  const dataFormatada = `${dia}/${mes}/${ano}`;
  document.getElementById("data-caixa").innerHTML = `<h2>${dataFormatada}</h2>`;
}

addData();

function adicionarEntrada(nomeProduto, descricao, preco) {
  preco = parseFloat(preco) || 0;

  const novaMovimentacao = document.createElement("div");
  novaMovimentacao.classList.add("movimento");
  novaMovimentacao.innerHTML = `
    <div class="barra cor-verde"></div>
    <div class="info">
      <strong>${nomeProduto}</strong>
      <p>${descricao}</p>
    </div>
    <span class="valor verde">R$${preco.toFixed(2).replace(".", ",")}</span>
    <div class="opcoes">
      <button class="editar" onclick="toggleOpcoes(this)">📝</button>
      <button class="excluir" onclick="toggleOpcoes(this)">🗑️</button>
    </div>
  `;

  const container = document.querySelector(".movimentacoes");
  if (container) {
    container.appendChild(novaMovimentacao);
  }
}

window.adicionarEntrada = adicionarEntrada;

function adicionarSaida(nomeProduto, descricao, preco) {
  preco = parseFloat(preco) || 0;

  const novaMovimentacao = document.createElement("div");
  novaMovimentacao.classList.add("movimento");
  novaMovimentacao.innerHTML = `
    <div class="barra cor-vermelha"></div>
    <div class="info">
      <strong>${nomeProduto}</strong>
      <p>${descricao}</p>
    </div>
    <span class="valor vermelho">R$${preco.toFixed(2).replace(".", ",")}</span>
    <div class="opcoes">
      <button class="editar" onclick="toggleOpcoes(this)">📝</button>
      <button class="excluir" onclick="toggleOpcoes(this)">🗑️</button>
    </div>
  `;

  const container = document.querySelector(".movimentacoes");
  if (container) {
    container.appendChild(novaMovimentacao);
  }
}

window.adicionarSaida = adicionarSaida;

function adicionarVenda(nomeCliente, produtos, totalValor) {
  totalValor = parseFloat(totalValor) || 0;

  const novaMovimentacao = document.createElement("div");
  novaMovimentacao.classList.add("movimento");
  novaMovimentacao.innerHTML = `
    <div class="barra cor-azul"></div>
    <div class="info">
      <strong>${nomeCliente}</strong>
      <p>Itens: ${produtos}</p>
    </div>
    <span class="valor azul">R$${totalValor.toFixed(2).replace(".", ",")}</span>
    <div class="opcoes">
      <button class="editar" onclick="toggleOpcoes(this)">📝</button>
      <button class="excluir" onclick="toggleOpcoes(this)">🗑️</button>
    </div>
  `;

  const container = document.querySelector(".movimentacoes");
  if (container) {
    container.appendChild(novaMovimentacao);
  }
}

window.adicionarVenda = adicionarVenda;

if (botaoCaixa) {
  botaoCaixa.addEventListener("click", () => {
    caixaVisivel = !caixaVisivel;
    valorCaixa.textContent = caixaVisivel
      ? `R$${valorCaixaAtual.toFixed(2).replace(".", ",")}`
      : "••••••";
  });
}

const botaoToggle = document.getElementById("toggle-botoes");
const botoesFlutuantes = document.getElementById("botoes-flutuantes");
let botoesVisiveis = false;

if (botaoToggle && botoesFlutuantes) {
  botaoToggle.addEventListener("click", () => {
    botoesVisiveis = !botoesVisiveis;
    botoesFlutuantes.style.display = botoesVisiveis ? "block" : "none";
  });
}

function toggleOpcoes(elemento) {
  elemento.classList.toggle("ativo");
}

const botaoCadeado = document.getElementById("botao-cadeado");
if (botaoCadeado) {
  botaoCadeado.addEventListener("click", () => {
    abrirModal(1);
  });
}

function abrirModal(numero) {
  const modal = document.getElementById(`modal${numero}`);
  if (modal) modal.style.display = "flex";
}

function fecharModal(numero) {
  const modal = document.getElementById(`modal${numero}`);
  if (modal) modal.style.display = "none";
}

function proximoModal(numero) {
  fecharModal(numero - 1);
  abrirModal(numero);
}

function finalizarFechamento() {
  fecharModal(4);

  const resumoEntrada = document.querySelector(".resumo-entrada");
  const resumoSaida = document.querySelector(".resumo-saida");
  if (resumoEntrada) resumoEntrada.textContent = "+0,00";
  if (resumoSaida) resumoSaida.textContent = "-0,00";

  const container = document.querySelector(".movimentacoes");
  if (container) container.innerHTML = "<h3>Movimentações</h3>";
}

let movimentoParaExcluir = null;

document.querySelectorAll(".movimento").forEach((mov) => {
  mov.addEventListener("click", (e) => {
    const botao = e.target;
    if (botao.classList.contains("excluir")) {
      e.stopPropagation();
      movimentoParaExcluir = botao.closest(".movimento");
      const modalExcluir = document.getElementById("modal-excluir");
      if (modalExcluir) modalExcluir.style.display = "flex";
    }
  });
});

const btnConfirmar = document.getElementById("confirmar-exclusao");
const btnCancelar = document.getElementById("cancelar-exclusao");

if (btnConfirmar) {
  btnConfirmar.addEventListener("click", () => {
    if (movimentoParaExcluir) {
      movimentoParaExcluir.remove();
      movimentoParaExcluir = null;
    }
    const modalExcluir = document.getElementById("modal-excluir");
    if (modalExcluir) modalExcluir.style.display = "none";
  });
}

if (btnCancelar) {
  btnCancelar.addEventListener("click", () => {
    movimentoParaExcluir = null;
    const modalExcluir = document.getElementById("modal-excluir");
    if (modalExcluir) modalExcluir.style.display = "none";
  });
}

window.addEventListener("DOMContentLoaded", () => {
  const movimentacoes = JSON.parse(localStorage.getItem("movimentacoes")) || [];

  const totalEntrada = somarEntradas(movimentacoes);
  const totalSaida = somarSaidas(movimentacoes);

  const resumoEntrada = document.querySelector(".resumo-entrada");
  if (resumoEntrada) {
    resumoEntrada.textContent = `+${totalEntrada.toFixed(2).replace(".", ",")}`;
  }

  const resumoSaida = document.querySelector(".resumo-saida");
  if (resumoSaida) {
    resumoSaida.textContent = `-${totalSaida.toFixed(2).replace(".", ",")}`;
  }

  const valorCaixaEl = document.getElementById("valor-caixa");
  if (valorCaixaEl) {
    const valorCaixaAtual = totalEntrada - totalSaida;
    valorCaixaEl.textContent = `R$${valorCaixaAtual
      .toFixed(2)
      .replace(".", ",")}`;
  }
});
