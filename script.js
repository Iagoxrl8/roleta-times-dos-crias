const jogadores = [
  "andrew", "andrey", "gustavo", "iago", "joao", "carlos", "lincoln",
  "gordão", "rick", "dudu", "jeza", "ricardo", "piero", "gurjas", "hudson", "matheus"
];

// Fixos no time branco
const fixosBranco = ["carlos", "piero", "jeza", "andrey"];

// Fixos no time preto
const fixosPreto = ["joao", "iago", "andrew", "gurjas"];

// Fixos em "Próximos"
const fixosProximos = ["gordão"];

// Limite máximo de jogadores por time
const limitePorTime = 6;

const btn = document.getElementById("btnSortear");
const roletaEl = document.getElementById("roleta");
const listaBranco = document.getElementById("timeBranco");
const listaPreto = document.getElementById("timePreto");
const listaProximos = document.getElementById("timeProximos");

btn.addEventListener("click", iniciarSorteio);

async function iniciarSorteio() {
  roletaEl.classList.add("spin");
  roletaEl.textContent = "?";
  listaBranco.innerHTML = "";
  listaPreto.innerHTML = "";
  listaProximos.innerHTML = "";

  const timeBranco = [];
  const timePreto = [];
  const timeProximos = [];

  const fila = shuffle(jogadores).map(n => n.toLowerCase());

  for (const nomeLower of fila) {
    const label = toLabel(nomeLower);
    roletaEl.textContent = label.toUpperCase();

    if (fixosPreto.includes(nomeLower)) {
      if (timePreto.length < limitePorTime) {
        timePreto.push(nomeLower);
        appendItem(listaPreto, label);
      }
    } else if (fixosProximos.includes(nomeLower)) {
      timeProximos.push(nomeLower);
      appendItem(listaProximos, label);
    } else if (fixosBranco.includes(nomeLower)) {
      if (timeBranco.length < limitePorTime) {
        timeBranco.push(nomeLower);
        appendItem(listaBranco, label);
      }
    } else {
      // Distribuição aleatória respeitando limite
      if (timeBranco.length >= limitePorTime && timePreto.length < limitePorTime) {
        timePreto.push(nomeLower);
        appendItem(listaPreto, label);
      } else if (timePreto.length >= limitePorTime && timeBranco.length < limitePorTime) {
        timeBranco.push(nomeLower);
        appendItem(listaBranco, label);
      } else {
        if (Math.random() < 0.5 && timeBranco.length < limitePorTime) {
          timeBranco.push(nomeLower);
          appendItem(listaBranco, label);
        } else if (timePreto.length < limitePorTime) {
          timePreto.push(nomeLower);
          appendItem(listaPreto, label);
        }
      }
    }

    await sleep(900);
  }

  roletaEl.classList.remove("spin");
  roletaEl.textContent = "Fim!";
}

function appendItem(listEl, label) {
  const li = document.createElement("li");
  li.textContent = label;
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
    "piero": "Piero",
    "matheus": "Matheus"
  };
  return mapa[nomeLower] || nomeLower.charAt(0).toUpperCase() + nomeLower.slice(1);
}

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
