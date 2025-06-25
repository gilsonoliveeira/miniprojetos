const task = document.getElementById("tarefa");
const date = document.getElementById("idate");
const hora = document.getElementById("itime");
const submit = document.getElementById("submit");

function addTask() {
  const taskValue = task.value;
  const dateValue = date.value;
  const horaValue = hora.value;

  // Formata a data para dd/mm/aaaa
  const partes = dateValue.split("-");
  const dataFormatada = partes[2] + "/" + partes[1];

  if (taskValue && dateValue && horaValue) {
    const taskList = document.querySelector(".taskList");
    const newTask = document.createElement("li");
    newTask.classList.add("task-item");

    // Cria o span com o texto da tarefa
    const taskContent = document.createElement("span");
    taskContent.textContent = `${dataFormatada} || ${horaValue} \n || ${taskValue}`;
    taskContent.style.flex = "1";

    // Cria os botões
    const okButton = document.createElement("button");
    okButton.textContent = "✔️";
    okButton.classList.add("ok-button");

    const removeButton = document.createElement("button");
    removeButton.textContent = "🗑️";
    removeButton.classList.add("remove-button");

    // Agrupa os botões em um container
    const buttonGroup = document.createElement("div");
    buttonGroup.style.display = "flex";
    buttonGroup.style.gap = "5px"; // Espaço entre os botões
    buttonGroup.appendChild(okButton);
    buttonGroup.appendChild(removeButton);

    // Eventos dos botões
    okButton.addEventListener("click", function () {
      newTask.classList.toggle("completed");
    });

    removeButton.addEventListener("click", function () {
      taskList.removeChild(newTask);
    });

    // Monta o item da tarefa
    newTask.appendChild(taskContent);
    newTask.appendChild(buttonGroup);
    taskList.appendChild(newTask);

    // Limpa os campos
    task.value = "";
    date.value = "";
    hora.value = "";
  } else {
    alert("Por favor, preencha todos os campos.");
  }
}

// Evento de clique no botão de adicionar
submit.addEventListener("click", function (event) {
  event.preventDefault(); // Impede o envio do formulário
  addTask();
});
