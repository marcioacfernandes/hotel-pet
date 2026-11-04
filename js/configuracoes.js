"use strict";

document.addEventListener("DOMContentLoaded", function() {
  const formulario = document.getElementById("form-configuracoes");
  const valorDiaria = document.getElementById("valor-diaria");
  const vagasDisponiveis = document.getElementById("vagas-disponiveis");
  const mensagem = document.getElementById("mensagem-configuracoes");

  const configuracoesSalvas = localStorage.getItem("hotelPetConfiguracoes");

  if (configuracoesSalvas) {
    const configuracoes = JSON.parse(configuracoesSalvas);

    valorDiaria.value = configuracoes.valorDiaria;
    vagasDisponiveis.value = configuracoes.vagasDisponiveis;
  }

  formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const configuracoes = {
      valorDiaria: Number(valorDiaria.value),
      vagasDisponiveis: Number(vagasDisponiveis.value)
    };

    localStorage.setItem(
      "hotelPetConfiguracoes",
      JSON.stringify(configuracoes)
    );

    mensagem.textContent = "Configurações salvas com sucesso!";
  });
});