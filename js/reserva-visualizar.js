"use strict";

document.addEventListener("DOMContentLoaded", function() {
  const parametros = new URLSearchParams(window.location.search);
  const id = parametros.get("id");

  const reserva = obterReservas().find(function(item) {
    return item.id === id;
  });

  const mensagem = document.getElementById("mensagem-visualizar-reserva");

  if (!reserva) {
    mensagem.textContent = "Reserva não encontrada.";
    document.querySelector(".dados-visualizacao").hidden = true;
    return;
  }

  function formatarData(data) {
    if (!data) {
      return "";
    }

    const partes = data.split("-");
    return partes[2] + "/" + partes[1] + "/" + partes[0];
  }

  document.getElementById("visualizar-codigo").textContent = reserva.id;
  document.getElementById("visualizar-pet").textContent = reserva.pet;
  document.getElementById("visualizar-responsavel").textContent = reserva.responsavel;
  document.getElementById("visualizar-chegada").textContent = formatarData(reserva.chegada);
  document.getElementById("visualizar-partida").textContent = formatarData(reserva.partida);

  const status = document.getElementById("visualizar-status");
  status.textContent = reserva.status;

  if (reserva.status === "Finalizada") {
    status.className = "status status-finalizada";
  } else if (reserva.status === "Em andamento") {
    status.className = "status status-andamento";
  } else {
    status.className = "status";
  }

  document.getElementById("visualizar-total").textContent =
    Number(reserva.total || 0).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });

    const linkEditar = document.getElementById("editar-reserva-finalizada");

  if (linkEditar) {
    linkEditar.href = "reserva-editar.html?id=" + encodeURIComponent(reserva.id);
  }
  });