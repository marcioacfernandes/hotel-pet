"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.getElementById("form-nova-reserva");
  const mensagem = document.getElementById("mensagem-nova-reserva");

  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const responsavel = document.getElementById("cliente-reserva").value;
    const pet = document.getElementById("pet-reserva").value;
    const chegada = document.getElementById("entrada").value;
    const partida = document.getElementById("saida").value;

    if (partida <= chegada) {
      mensagem.textContent = "A data de saída deve ser posterior à data de entrada.";
      return;
    }

    const reservas = obterReservas();

    const maiorId = reservas.reduce(function (maior, reserva) {
      const numero = Number(reserva.id.replace("R", ""));
      return Math.max(maior, numero);
    }, 0);

    const novoId = "R" + String(maiorId + 1).padStart(3, "0");

    const dataEntrada = new Date(chegada + "T00:00:00");
    const dataSaida = new Date(partida + "T00:00:00");

    const dias = Math.round(
      (dataSaida - dataEntrada) / (1000 * 60 * 60 * 24)
    );

    const novaReserva = {
      id: novoId,
      pet: pet,
      responsavel: responsavel,
      chegada: chegada,
      partida: partida,
      status: "Em andamento",
      total: dias * 80
    };

    reservas.push(novaReserva);
    salvarReservas(reservas);

    window.location.href = "reservas.html";
  });
});