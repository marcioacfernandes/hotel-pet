"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const parametros = new URLSearchParams(window.location.search);
  const idPet = parametros.get("id");

  const formulario = document.getElementById("form-editar-pet");
  const mensagem = document.getElementById("mensagem-editar-pet");

const pet = obterPets().find(function (item) {
  return item.id === idPet;
});

if (!pet) {
  mensagem.textContent = "Pet não encontrado.";
  formulario.hidden = true;
  return;
}

document.getElementById("proprietario-editar-pet").value = pet.proprietario;
document.getElementById("nome-editar-pet").value = pet.nome;
document.getElementById("tipo-editar-pet").value = pet.tipo;
document.getElementById("raca-editar-pet").value = pet.raca;
document.getElementById("tamanho-editar-pet").value = pet.tamanho;

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

pet.nome = document.getElementById("nome-editar-pet").value.trim();
pet.proprietario = document.getElementById("proprietario-editar-pet").value;
pet.tipo = document.getElementById("tipo-editar-pet").value;
pet.raca = document.getElementById("raca-editar-pet").value.trim();
pet.tamanho = document.getElementById("tamanho-editar-pet").value;

const pets = obterPets();
salvarPets(pets.map(function (item) {
    return item.id === idPet ? pet : item;
}));
mensagem.textContent = "Alterações salvas com sucesso!";
});
});