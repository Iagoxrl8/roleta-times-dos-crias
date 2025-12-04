const jogadores = [
  "andrew", "andrey", "Gustavo", "iago", "joao", "carlos", "lincoln",
  "gordão", "rick", "hudson", "dudu", "jeza", "ricardo", "piero", "gurjas"
];

// Jogadores fixos no Time Preto
const fixosPreto = ["iago", "ricardo", "joao", "gurjas", "hudson"];

function iniciarSorteio() {
  const roleta = document.getElementById("roleta");
  roleta.innerText = "Girando...";

  let contador = 0;
  const intervalo = setInterval(() => {
    // Mostrar um nome aleatório na roleta
    const nomeAleatorio = jogadores[Math.floor(Math.random() * jogadores.length)];
    roleta.innerText = nomeAleatorio.toUpperCase();
    contador++;

    // Depois de alguns giros, parar e mostrar os times
    if (contador > 25) {
      clearInterval(intervalo);
      sortearTimes();
    }
  }, 100); // velocidade da roleta
}

function sortearTimes() {
  const roleta = document.getElementById("roleta");
  roleta.innerText = "Resultado!";

  // Separar os fixos
  let timePreto = [...fixosPreto];

  // Restante dos jogadores
  let restantes = jogadores.filter(j => !fixosPreto.includes(j));

  // Embaralhar os restantes
  restantes = shuffle(restantes);

  // Dividir em dois times (equilibrando quantidade)
  const vagasPreto = Math.ceil(jogadores.length / 2) - fixosPreto.length;
  const adicionaisPreto = restantes.slice(0, vagasPreto);
  const timeBranco = restantes.slice(vagasPreto);
  timePreto = timePreto.concat(adicionaisPreto);

  // Mostrar na tela
  renderLista("timeBranco", timeBranco);
  renderLista("timePreto", timePreto);
}

// Função de embaralhar (Fisher-Yates)
function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function renderLista(id, nomes) {
  document.getElementById(id).innerHTML =
    nomes.map(j => `<li>${j}</li>`).join("");
}
