// Lista original de jogadores
const jogadores = [
  "andrew", "andrey", "Gustavo", "iago", "joao", "carlos", "lincoln",
  "gordão", "rick", "dudu", "jeza", "ricardo", "piero", "gurjas", "hudson"
];

// Fixos no time preto (garantidos)
const fixosPreto = ["joao", "iago", "ricardo", "gurjas", "hudson", "andrew"].map(n => n.toLowerCase());

// Alvo de tamanho dos times (metade arredondada para cima)
const tamanhoTotal = jogadores.length;
const alvoPreto = Math.ceil(tamanhoTotal / 2); // preto terá ~metade

// Elementos
const btn = document.getElementById("btnSortear");
const roletaEl = document.getElementById("roleta");
const listaBranco = document.getElementById("timeBranco");
const listaPreto = document.getElementById("timePreto");

// Inicia o sorteio ao clique
btn.addEventListener("click", iniciarSorteio);

function iniciarSorteio() {
  // Reset visual e listas
  roletaEl.classList.add("spin");
  roletaEl.textContent = "?";
  listaBranco.innerHTML = "";
  listaPreto.innerHTML = "";

  // Estado dos times
  const timePreto = [];
  const timeBranco = [];

  // Ordem aleatória de revelação (nome por nome)
  const fila = shuffle(jogadores.map(n => n.toLowerCase()));

  // Processa um nome por vez com intervalo
  let idx = 0;
  const intervalo = setInterval(() => {
    if (idx >= fila.length) {
      clearInterval(intervalo);
      roletaEl.classList.remove("spin");
      roletaEl.textContent = "Fim!";
      return;
    }

    const nome = fila[idx];
    // Mostra na roleta
    roletaEl.textContent = toLabel(nome).toUpperCase();

    // Decide o time
    let vaiParaPreto;
    if (fixosPreto.includes(nome)) {
      vaiParaPreto = true; // regra fixa
    } else {
      // Distribuição para equilibrar até o alvo do preto
      if (timePreto.length < alvoPreto) {
        // chance de preencher preto até atingir alvo, senão branco
        // para garantir aleatoriedade leve, usamos um critério com folga
        const precisaPreto = alvoPreto - timePreto.length;
        const precisaBranco = alvoPreto - timeBranco.length; // referência de equilíbrio
        if (precisaPreto > precisaBranco || Math.random() < 0.5) {
          vaiParaPreto = true;
        } else {
          vaiParaPreto = false;
        }
      } else {
        vaiParaPreto = false;
      }
    }

    // Adiciona e atualiza visual
    if (vaiParaPreto) {
      timePreto.push(nome);
      appendItem(listaPreto, nome);
    } else {
      timeBranco.push(nome);
      appendItem(listaBranco, nome);
    }

    idx++;
  }, 900); // tempo entre cada nome (ajuste à vontade)
}

// Utilidades
function appendItem(listEl, nome) {
  const li = document.createElement("li");
  li.textContent = toLabel(nome);
  listEl.appendChild(li);
}

function toLabel(nomeLower) {
  // Padroniza exibição (capitalização simples)
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
