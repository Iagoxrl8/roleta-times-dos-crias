// Lista de jogadores
const jogadores = [
  "andrew", "andrey", "Gustavo", "iago", "joao", "carlos", "lincoln",
  "gordão", "rick", "dudu", "jeza", "ricardo", "piero", "gurjas", "hudson"
];

// Fixos no time preto (garantidos)
const fixosPreto = ["joao", "iago", "ricardo", "gurjas", "hudson", "andrew"].map(n => n.toLowerCase());

// Elementos
const btn = document.getElementById("btnSortear");
const roletaEl = document.getElementById("roleta");
const listaBranco = document.getElementById("timeBranco");
const listaPreto = document.getElementById("timePreto");

// Inicia o sorteio ao clique
btn.addEventListener("click", iniciarSorteio);

async function iniciarSorteio() {
  // Reset visual e listas
  roletaEl.classList.add("spin");
  roletaEl.textContent = "?";
  listaBranco.innerHTML = "";
  listaPreto.innerHTML = "";

  // Fila aleatória (nome por nome)
  const fila = shuffle(jogadores.map(n => n.toLowerCase()));

  // Revela e aloca um por um (sequencial)
  for (const nome of fila) {
    roletaEl.textContent = toLabel(nome).toUpperCase();

    // Alocação determinística:
    // - Se está em fixosPreto -> vai para Preto
    // - Caso contrário -> vai para Branco
    const vaiPreto = fixosPreto.includes(nome);

    if (vaiPreto) {
      appendItem(listaPreto, nome);
    } else {
      appendItem(listaBranco, nome);
    }

    // Espera antes de ir para o próximo (mostra um por um)
    await sleep(900);
  }

  // Finaliza animação
  roletaEl.classList.remove("spin");
  roletaEl.textContent = "Fim!";
}

// Utilidades
function appendItem(listEl, nome) {
  const li = document.createElement("li");
  li.textContent = toLabel(nome);
  listEl.appendChild(li);
}

function toLabel(nomeLower) {
  const mapa = {
    "gordão": "Gordão",
    "joao": "João",
    "iago": "Iago",
    "ricardo": "Ricardo",
    "gurjas": "Gurjas",
    "hudson": "Hudson",
    "andrew": "Andrew",
    "andrey": "Andrey",
    "gustavo": "Gustavo",
    "carlos": "Carlos",
    "lincoln": "Lincoln",
    "rick": "Rick",
    "dudu": "Dudu",
    "jeza": "Jeza",
    "piero": "Piero"
  };
  return mapa[nomeLower] || nomeLower.charAt(0).toUpperCase() + nomeLower.slice(1);
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

// Pausa assíncrona
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
