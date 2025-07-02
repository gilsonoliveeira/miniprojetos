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