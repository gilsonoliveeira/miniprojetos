const nomeProduto = document.getElementById("nome");
const descricao = document.getElementById("descricao");
const preco = document.getElementById("valor");
const confirmar = document.getElementById("confirmar");
const valorEntrada = document.querySelector(".valor.verde");

function validarEntrada() {
  if (nomeProduto.value === "") {
    alert("O nome do produto é obrigatório.");
    return false;
  }
  if (descricao.value === "") {
    alert("A descrição do produto é obrigatória.");
    return false;
  }
  if (
    preco.value === "" ||
    isNaN(preco.value) ||
    parseFloat(preco.value) <= 0
  ) {
    alert("O preço do produto deve ser um número positivo.");
    return false;
  }
  return true;
}

function somarEntradas(movimentacoes) {
  const entradas = movimentacoes.filter(mov => mov.tipo === "entrada");
  return entradas.reduce((total, entrada) => total + (parseFloat(entrada.preco) || 0), 0);
}
window.somarEntradas = somarEntradas;


function salvarNoLocalStorage(produto) {
  let produtosSalvos = JSON.parse(localStorage.getItem("movimentacoes")) || [];
  produtosSalvos.push(produto);
  localStorage.setItem("movimentacoes", JSON.stringify(produtosSalvos));
}

confirmar.addEventListener("click", function (event) {
  event.preventDefault();
  if (validarEntrada()) {
    const produto = {
      nome: nomeProduto.value,
      descricao: descricao.value,
      preco: parseFloat(preco.value),
      tipo: "entrada",
    };

    salvarNoLocalStorage(produto); // <- Aqui salva

    console.log("Produto adicionado:", produto);
    alert("Produto adicionado com sucesso!");

    // Atualiza o valor na interface
    valorEntrada.textContent = `R$${produto.preco.toFixed(2)}`;

    // Chama a função para adicionar a entrada
    adicionarEntrada(produto.nome, produto.descricao, produto.preco);
    
    // Limpa o formulário 
    nomeProduto.value = "";
    descricao.value = "";
    preco.value = "";
  }
});
