const sacola = JSON.parse(localStorage.getItem("sacola")) || [];
const lista = document.querySelector(".sacola-lista");

lista.innerHTML = ""; // Limpa antes de preencher

sacola.forEach((produto) => {
  const item = document.createElement("div");
  item.classList.add("item-sacola");

  item.innerHTML = `
    <img src="img/produto1.png" alt="">
    <div class="info">
        <strong>${produto.nome}</strong>
        <p>R$ ${produto.preco.toFixed(2)}</p>
    </div>
    <div class="controle">
        <button class="menos">−</button>
        <span class="quantidade">${produto.quantidade}</span>
        <button class="mais">+</button>
        <button class="excluir">🗑️</button>
    </div>
  `;

  lista.appendChild(item);
});

const resumo = document.querySelector(".resumo-venda");
let totalItens = 0;
let totalValor = 0;
sacola.forEach((produto) => {
  totalItens += produto.quantidade;
  totalValor += produto.preco * produto.quantidade;
});

resumo.innerHTML = `
  <span><strong>Itens:</strong> ${totalItens}</span>
  <span><strong>Total:</strong> R$ ${totalValor.toFixed(2)}</span>
`;

document.addEventListener("click", function (evento) {
  if (evento.target.classList.contains("mais")) {
    const item = evento.target.closest(".item-sacola");
    const quantidadeSpan = item.querySelector(".quantidade");
    let quantidade = parseInt(quantidadeSpan.textContent);
    quantidade++;
    quantidadeSpan.textContent = quantidade;

    atualizarResumoVenda();
  } else if (evento.target.classList.contains("menos")) {
    const item = evento.target.closest(".item-sacola");
    const quantidadeSpan = item.querySelector(".quantidade");
    let quantidade = parseInt(quantidadeSpan.textContent);

    if (quantidade > 1) {
      quantidade--;
      quantidadeSpan.textContent = quantidade;
      atualizarResumoVenda();
    } else {
      alert("Quantidade mínima atingida!");
    }
  } else if (evento.target.classList.contains("excluir")) {
    const item = evento.target.closest(".item-sacola");
    item.remove();

    atualizarResumoVenda();
  }
});

function atualizarResumoVenda() {
  const itens = document.querySelectorAll(".item-sacola");
  let totalItens = 0;
  let totalValor = 0;

  itens.forEach((item) => {
    const quantidade = parseInt(item.querySelector(".quantidade").textContent);
    const preco = parseFloat(
      item.querySelector(".info p").textContent.replace("R$ ", "")
    );

    totalItens += quantidade;
    totalValor += quantidade * preco;
  });

  const resumo = document.querySelector(".resumo-venda");
  resumo.innerHTML = `
    <span><strong>Itens:</strong> ${totalItens}</span>
    <span><strong>Total:</strong> R$ ${totalValor.toFixed(2)}</span>
  `;
}

document
  .querySelector(".botao-ver-sacola")
  .addEventListener("click", function () {
    if (sacola.length === 0) {
      alert("Sua sacola está vazia!");
      return;
    }

    //Verifica se o cliente foi informado
    const nomeCliente = document.getElementById("cliente").value;
    if (!nomeCliente) {
      carregarModalNome();
      return;
    }

    carregarModalSucesso();

    setTimeout(() => {
      window.location.href = "index.html";
      
    }, 3000);
    

    // Salva a venda no localStorage
    const movimentacoes =
      JSON.parse(localStorage.getItem("movimentacoes")) || [];

    movimentacoes.push({
      tipo: "venda",
      nome: `Venda para ${nomeCliente}`,
      valor: totalValor,
      data: new Date().toLocaleString("pt-BR"),
      produtos: sacola.map((produto) => ({
        nome: produto.nome,
        preco: produto.preco,
        quantidade: produto.quantidade,
      })),
    });

    localStorage.setItem("movimentacoes", JSON.stringify(movimentacoes));

    adicionarVenda(nomeCliente, produtos, totalValor);

    // Limpa a sacola após finalizar a venda
    localStorage.removeItem("sacola");
    sacola.length = 0;
    lista.innerHTML = "";
    atualizarResumoVenda();
  });
