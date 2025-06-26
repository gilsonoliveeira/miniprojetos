const task = document.getElementById("tarefa");
const date = document.getElementById("idate");
const hora = document.getElementById("itime");
const submit = document.getElementById("submit");
const dataAtual = new Date();
const ano = dataAtual.getFullYear();



function addTask() {
  const taskValue = task.value;
  const dateValue = date.value;
  const horaValue = hora.value;

  // Formata a data para dd/mm/aaaa
  const partes = dateValue.split("-");
  const dataFormatada = partes[2] + "/" + partes[1];
  const anoDigitado = partes[0];

  if(anoDigitado < ano) {
    alert("O ano digitado é inválido. Por favor, insira um ano atual ou futuro.");
    return;
  }
  
  if (taskValue && dateValue && horaValue) {
    const taskList = document.querySelector(".taskList");
    const newTask = document.createElement("li");
    newTask.classList.add("task-item");

    //cria o Titulo das minhas tarefas
    const taskTitle = document.createElement("h2");
    taskTitle.classList.add("task-title");
    taskTitle.textContent = "Minhas Tarefas";

    if(taskList.children.length === 0) {
      taskList.appendChild(taskTitle);
    }

    // Se não houver tarefas, esconde o titulo
    if (taskList.children.length > 1) {
      taskTitle.style.display = "none";
    } else {
      taskTitle.style.display = "block";
    }

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

      // Verifica se a lista de tarefas está vazia e esconde o título
      if( taskList.children.length === 1) {
        const taskTitle = document.querySelector(".task-title");
        taskTitle.style.display = "none"; 
      }
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
