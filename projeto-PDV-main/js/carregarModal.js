function carregarModalSucesso() {
  const modal = document.getElementById("modal-sucesso");
  if (modal) {
    modal.style.display = "flex"; 
  }
}

window.carregarModalSucesso = carregarModalSucesso;

function carregarModalNome(){
  const modal = document.getElementById("modal-nome");

  if(modal) {
    modal.style.display = "flex";
  }
}

function fecharModalSucesso() {
  const modal = document.getElementById("modal-sucesso");
  if (modal) modal.style.display = "none";
}

function fecharModalNome(){
  const modal = document.getElementById("modal-nome");
  if (modal) modal.style.display = "none";
}

window.carregarModalNome = carregarModalNome;