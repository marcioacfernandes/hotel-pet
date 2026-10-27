"use strict";

// Exibe as reservas cadastradas na tabela
function carregarReservas(lista = obterReservas()) {
  const corpoTabela = document.getElementById("corpo-reservas");

  if (!corpoTabela) {
    console.error("Tabela de reservas não encontrada.");
    return;
  }

  corpoTabela.innerHTML = "";

  lista.forEach(function(reserva) {
    const linha = document.createElement("tr");

    const selecao = document.createElement("td");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.setAttribute("aria-label", "Selecionar reserva " + reserva.id);
    selecao.appendChild(checkbox);
    linha.appendChild(selecao);

    [reserva.id, reserva.pet].forEach(function(valor) {
      const celula = document.createElement("td");
      celula.textContent = valor;
      linha.appendChild(celula);
    });

    [reserva.chegada, reserva.partida].forEach(function(data) {
      const celula = document.createElement("td");
      const partes = data.split("-");
      celula.textContent = partes.reverse().join("/");
      linha.appendChild(celula);
    });

    const status = document.createElement("td");
    const textoStatus = document.createElement("span");
    textoStatus.textContent = reserva.status;
    textoStatus.className = "status status-" +
      reserva.status.toLowerCase().replaceAll(" ", "-");
    status.appendChild(textoStatus);
    linha.appendChild(status);

    const total = document.createElement("td");
    total.textContent = reserva.total.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });
    linha.appendChild(total);

    const acoes = document.createElement("td");

    const editar = document.createElement("a");
    editar.href = "reserva-editar.html?id=" + encodeURIComponent(reserva.id);
    editar.textContent = "Editar";

    const visualizar = document.createElement("a");
    visualizar.href = (reserva.status === "Finalizada"
      ? "reserva-finalizada.html?id="
      : "reserva-visualizar.html?id=") + encodeURIComponent(reserva.id);
    visualizar.textContent = reserva.status === "Finalizada"
      ? "Visualizar recibo e histórico"
      : "Visualizar";

    acoes.appendChild(editar);
    acoes.appendChild(document.createTextNode(" | "));
    acoes.appendChild(visualizar);
    linha.appendChild(acoes);

    corpoTabela.appendChild(linha);
  });
}
function configurarPesquisaReservas() {
  const formulario = document.getElementById("form-busca-reservas");

  if (!formulario) {
    return;
  }

  formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const pet = formulario.elements["pet"].value.trim().toLowerCase();
    const cliente = formulario.elements["cliente"].value.trim().toLowerCase();
    const status = formulario.elements["status"].value.toLowerCase();

    const resultados = obterReservas().filter(function(reserva) {
      return (
        reserva.pet.toLowerCase().includes(pet) &&
        reserva.responsavel.toLowerCase().includes(cliente) &&
        (status === "" ||
          reserva.status.toLowerCase().replace("em ", "").replaceAll(" ", "") === status)
      );
    });

    carregarReservas(resultados);
  });

  formulario.addEventListener("reset", function() {
    carregarReservas();
  });
}
document.addEventListener("DOMContentLoaded", function() {
  carregarReservas();
  configurarPesquisaReservas();
});

