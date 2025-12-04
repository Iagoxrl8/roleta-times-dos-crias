// Lista completa de jogadores (inclui Gurjas)
const jogadores = [
  "andrew", "andrey", "gustavo", "iago", "joao", "carlos", "lincoln",
  "gordão", "rick", "dudu", "jeza", "ricardo", "piero", "gurjas", "hudson"
];

// Fixos no time preto (garantidos)
const fixosPreto = ["joao", "iago", "ricardo", "gurjas", "hudson", "andrew"];

// Fixos em "Próximos"
const fixosProximos = ["dudu", "gustavo", "lincoln"];

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

  const fila = shuffle(jogadores).map(n => n.toLowerCase());

  for (const nomeLower of fila) {
    const label = toLabel(nomeLower);
    roletaEl.textContent = label.toUpperCase();

    if (fixosPreto.includes(nomeLower)) {
      appendItem(listaPreto, label);
    } else if (fixosProximos.includes(nomeLower)) {
      appendItem(listaProximos, label);
    } else {
      appendItem(listaBranco, label);
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
    "piero": "Piero"
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
