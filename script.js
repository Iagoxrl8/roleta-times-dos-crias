const jogadores = [
  "andrew", "andrey", "Gustavo", "iago", "joao", "carlos", "lincoln",
  "gordão", "rick", "dudu", "jeza", "ricardo", "piero", "gurjas", "hudson"
];

// Jogadores fixos no Time Preto
const fixosPreto = ["iago", "ricardo", "joao", "gurjas", "hudson"];

function iniciarSorteio() {
  const roleta = document.getElementById("roleta");
  roleta.style.animation = "girar 0.8s linear infinite"; // ativa giro

  // Separar os fixos
  let timePreto = [...fixosPreto];
  let restantes = jogadores.filter(j => !fixosPreto.includes(j));
  restantes = shuffle(restantes);

  // Mostrar nomes um por um na roleta
  let idx = 0;
  const intervalo = setInterval(() => {
    if (idx < restantes.length) {
      roleta.textContent = restantes[idx].toUpperCase();
      idx++;
    } else {
      clearInterval(intervalo);
      roleta.style.animation = "none"; // parar giro
      roleta.textContent = "Resultado";
      sortearTimes(restantes, timePreto);
    }
  }, 800); // tempo entre cada nome mostrado
}

function sortearTimes(restantes, timePreto) {
  // Preencher o time preto até metade
  const metade = Math.ceil(jogadores.length / 2);
  const vagasPreto = metade - fixosPreto.length;
  const adicionaisPreto = restantes.slice(0, vagasPreto);
  const timeBranco = restantes.slice(vagasPreto);
  timePreto = timePreto.concat(adicionaisPreto);

  renderLista("timeBranco", timeBranco);
  renderLista("timePreto", timePreto);
}

// Embaralhamento Fisher-Yates
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
