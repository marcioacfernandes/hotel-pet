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

const formulario = document.getElementById("form-editar-reserva");

  formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const reservas = obterReservas();

    const indice = reservas.findIndex(function(item) {
      return item.id === id;
    });

    if (indice === -1) {
      mensagem.textContent = "Reserva não encontrada.";
      return;
    }

    reservas[indice].pet = document.getElementById("pet-editar-reserva").value;
    reservas[indice].chegada = document.getElementById("entrada-editar").value;
    reservas[indice].partida = document.getElementById("saida-editar").value;

    const status = document.getElementById("status-reserva").value;

    if (status === "andamento") {
      reservas[indice].status = "Em andamento";
    } else if (status === "finalizada") {
      reservas[indice].status = "Finalizada";
    } else {
      reservas[indice].status = "Confirmada";
    }

    localStorage.setItem("hotelPetReservas", JSON.stringify(reservas));

    mensagem.textContent = "Reserva atualizada com sucesso!";
  });
});