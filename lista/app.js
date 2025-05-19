const tarefas = [
  { id: 1, texto: "Trabalha Diguê? ", concluida: false },
  { id: 2, texto: "Diguê?", concluida: false },
  { id: 3, texto: "Cardiguê?", concluida: true },
  { id: 4, texto: "Calma Calabrezo", concluida: false },
  { id: 5, texto: "eu nao teo abigo", concluida: true },
  { id: 6, texto: "eu comprava fruta toda sebana ", concluida: false },
  { id: 7, texto: "Navio Diguê? ", concluida: false }
];

let filtroAtual = "todas"; // opções: todas, concluidas, pendentes

function tocarSom() {
  const audio = document.getElementById("somClick");
  if (audio) {
    audio.currentTime = 0;
    audio.play();
  }
}

function renderizarTarefas() {
  const lista = document.getElementById("lista-tarefas");
  lista.innerHTML = "";

  const filtradas = tarefas.filter((t) => {
    if (filtroAtual === "concluidas") return t.concluida;
    if (filtroAtual === "pendentes") return !t.concluida;
    return true;
  });

  filtradas.forEach((tarefa) => {
    const li = document.createElement("li");
    li.className = tarefa.concluida ? "concluida" : "";

    const img = document.createElement("img");
    img.src = tarefa.concluida
      ? "https://i.pinimg.com/736x/d2/ae/9c/d2ae9c9a7b012ebcedb21cb12c8b97c4.jpg"
      : "https://i.pinimg.com/736x/93/60/fd/9360fd982223b0642e1980e6eba4353e.jpg";
    img.alt = tarefa.concluida ? "Concluído" : "Pendente";

    const span = document.createElement("span");
    span.textContent = tarefa.texto;
    span.onclick = () => alternarStatus(tarefa.id);

    const botao = document.createElement("button");
    botao.textContent = tarefa.concluida ? "Desmarcar" : "Concluir";
    botao.className = "check-btn";
    botao.onclick = () => alternarStatus(tarefa.id);

    li.appendChild(img);
    li.appendChild(span);
    li.appendChild(botao);
    lista.appendChild(li);
  });
}

function alternarStatus(id) {
  const index = tarefas.findIndex((t) => t.id === id);
  if (index !== -1) {
    tarefas[index].concluida = !tarefas[index].concluida;
    tocarSom();
    renderizarTarefas();
  }
}

function definirFiltro(filtro) {
  filtroAtual = filtro;
  renderizarTarefas();
}

window.onload = renderizarTarefas;

// ✅ NOVO: adicionar tarefa ao pressionar Enter
document.getElementById("input-tarefa").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    const texto = event.target.value.trim();
    if (texto !== "") {
      const novaTarefa = {
        id: tarefas.length + 1,
        texto: texto,
        concluida: false
      };
      tarefas.push(novaTarefa);
      event.target.value = "";
      tocarSom();
      renderizarTarefas();
    }
  }
});
