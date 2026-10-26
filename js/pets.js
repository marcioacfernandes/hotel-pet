"use strict";

// Hotel Pet - Listagem e pesquisa de pets

// Exibe os pets na tabela
function carregarPets(lista = obterPets()) {

  const corpoTabela = document.getElementById("corpo-pets");
  const mensagem = document.getElementById("mensagem-pets");

  if (!corpoTabela) {
    console.error("Tabela de pets não encontrada.");
    return;
  }

  // Limpa os registros anteriores
  corpoTabela.innerHTML = "";

  // Verifica se existem resultados
  if (lista.length === 0) {

    if (mensagem) {
      mensagem.textContent = "Nenhum pet encontrado.";
    }

    return;
  }

  // Limpa mensagens anteriores
  if (mensagem) {
    mensagem.textContent = "";
  }

  // Cria uma linha para cada pet
  lista.forEach(function(pet) {

    const linha = document.createElement("tr");

    // Cria as células com segurança
    const selecao = document.createElement("td");
    const checkbox = document.createElement("input");

    checkbox.type = "checkbox";
    checkbox.setAttribute(
      "aria-label",
      "Selecionar " + pet.nome
    );

    selecao.appendChild(checkbox);
    linha.appendChild(selecao);

    // Dados do pet
    [
      pet.id,
      pet.nome,
      pet.tipo,
      pet.raca,
      pet.tamanho,
      pet.proprietario
    ].forEach(function(valor) {

      const celula = document.createElement("td");
      celula.textContent = valor;
      linha.appendChild(celula);

    });

    // Links de ações
    const acoes = document.createElement("td");

    const visualizar = document.createElement("a");
    visualizar.href =
      "pet-visualizar.html?id=" + encodeURIComponent(pet.id);
    visualizar.textContent = "Visualizar";

    const editar = document.createElement("a");
    editar.href =
      "pet-editar.html?id=" + encodeURIComponent(pet.id);
    editar.textContent = "Editar";

    acoes.appendChild(visualizar);
    acoes.appendChild(document.createTextNode(" | "));
    acoes.appendChild(editar);

    linha.appendChild(acoes);
    corpoTabela.appendChild(linha);

  });
}

// Configura a pesquisa
function configurarPesquisaPets() {

  const formulario = document.getElementById("form-busca-pets");

  if (!formulario) {
    console.error("Formulário de pesquisa não encontrado.");
    return;
  }

  formulario.addEventListener("submit", function(evento) {

    evento.preventDefault();

    const id = formulario.elements["id"].value.trim().toLowerCase();
    const nome = formulario.elements["nome"].value.trim().toLowerCase();
    const tipo = formulario.elements["tipo"].value.toLowerCase();
    const raca = formulario.elements["raca"].value.trim().toLowerCase();
    const tamanho = formulario.elements["tamanho"].value.toLowerCase();

    const resultados = obterPets().filter(function(pet) {

      return (
        pet.id.toLowerCase().includes(id) &&
        pet.nome.toLowerCase().includes(nome) &&
        (tipo === "" || pet.tipo.toLowerCase() === tipo) &&
        pet.raca.toLowerCase().includes(raca) &&
        (tamanho === "" || pet.tamanho.toLowerCase() === tamanho)
      );

    });

    carregarPets(resultados);

  });

  formulario.addEventListener("reset", function() {

    carregarPets();

  });

}

// Inicializa a página
document.addEventListener("DOMContentLoaded", function() {

  carregarPets();
  configurarPesquisaPets();

  console.log("Pets carregados com sucesso!");
  console.log("Pesquisa de pets ativada!");

});