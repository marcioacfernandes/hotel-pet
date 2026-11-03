"use strict";

document.addEventListener("DOMContentLoaded", function() {
  const parametros = new URLSearchParams(window.location.search);
  const id = parametros.get("id");

  const reserva = obterReservas().find(function(item) {
    return item.id === id;
  });

  const mensagem = document.getElementById("mensagem-editar-reserva");

  if (!reserva) {
    mensagem.textContent = "Reserva não encontrada.";
    return;
  }

  document.getElementById("codigo-reserva").value = reserva.id;
  document.getElementById("pet-editar-reserva").value = reserva.pet;
  document.getElementById("entrada-editar").value = reserva.chegada;
  document.getElementById("saida-editar").value = reserva.partida;
});