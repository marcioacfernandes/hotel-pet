"use strict";

// Hotel Pet - Listagem dinâmica de pets

function carregarPets() {

  const corpoTabela = document.getElementById("corpo-pets");

  if (!corpoTabela) {
    console.error("Tabela de pets não encontrada.");
    return;
  }

  // Limpa os registros estáticos da tabela
  corpoTabela.innerHTML = "";

  // Percorre os pets cadastrados nos dados iniciais
  petsIniciais.forEach(function(pet) {

    const linha = document.createElement("tr");

    linha.innerHTML = `
      <td>
        <input type="checkbox"
               aria-label="Selecionar ${pet.nome}">
      </td>

      <td>${pet.id}</td>
      <td>${pet.nome}</td>
      <td>${pet.tipo}</td>
      <td>${pet.raca}</td>
      <td>${pet.tamanho}</td>
      <td>${pet.proprietario}</td>

      <td>
        <a href="pet-visualizar.html?id=${pet.id}">
          Visualizar
        </a>
        |
        <a href="pet-editar.html?id=${pet.id}">
          Editar
        </a>
      </td>
    `;

    corpoTabela.appendChild(linha);
  });

  console.log("Pets carregados com sucesso!");
}

// Executa quando o HTML estiver pronto
document.addEventListener("DOMContentLoaded", carregarPets);