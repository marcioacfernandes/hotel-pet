"use strict";

// Hotel Pet - Cadastro de novos pets

document.addEventListener("DOMContentLoaded", function() {

  const formulario = document.getElementById("form-novo-pet");
  const mensagem = document.getElementById("mensagem-novo-pet");

  if (!formulario) {
    console.error("Formulário de cadastro não encontrado.");
    return;
  }

  formulario.addEventListener("submit", function(evento) {

    // Impede o envio tradicional do formulário
    evento.preventDefault();

    // Verifica os campos obrigatórios
    if (!formulario.reportValidity()) {
      return;
    }

    // Obtém os dados preenchidos
    const nome = document.getElementById("nome-novo-pet")
      .value.trim();

    const tipo = document.getElementById("tipo-novo-pet")
      .value;

    const raca = document.getElementById("raca-novo-pet")
      .value.trim();

    const tamanho = document.getElementById("tamanho-novo-pet")
      .value;

    const proprietario = document.getElementById("proprietario-pet")
      .value;

    if (!nome || !raca) {
      mensagem.textContent = "Preencha todos os campos obrigatórios.";
      return;
    }

    // Consulta os pets existentes
    const lista = obterPets();

    // Monta o novo registro
    const novoPet = {
      id: gerarIdPet(lista),
      nome: nome,
      tipo: tipo,
      raca: raca,
      tamanho: tamanho,
      proprietario: proprietario
    };

    // Adiciona o novo pet à lista
    lista.push(novoPet);

    try {
      // Armazena os registros no navegador
      salvarPets(lista);

      mensagem.textContent = "Pet cadastrado com sucesso!";

      console.log("Novo pet cadastrado:", novoPet);

      // Retorna à listagem
      window.location.href = "pets.html";

    } catch (erro) {
      console.error("Erro ao salvar o pet:", erro);
      mensagem.textContent =
        "Não foi possível salvar o pet. Tente novamente.";
    }

  });

  console.log("Cadastro de pets ativado!");

});