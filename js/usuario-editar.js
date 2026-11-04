"use strict";

document.addEventListener("DOMContentLoaded", function() {
  const formulario = document.getElementById("form-editar-usuario");
  const parametros = new URLSearchParams(window.location.search);
  const id = parametros.get("id");

  const usuarios = obterUsuarios();
  const usuario = usuarios.find(function(item) {
    return item.id === id;
  });

  if (!usuario) {
    alert("Usuário não encontrado.");
    window.location.href = "usuarios.html";
    return;
  }

  const partesNome = usuario.nome.trim().split(" ");

  document.getElementById("email-usuario").value = usuario.email;
  document.getElementById("nome-usuario").value = partesNome.shift();
  document.getElementById("sobrenome-usuario").value = partesNome.join(" ");
  document.getElementById("telefone-usuario").value = usuario.telefone || "";

  const funcoes = {
    "Cliente": "cliente",
    "Funcionário": "funcionario",
    "Gerente": "gerente"
  };

  document.getElementById("funcao-usuario").value = funcoes[usuario.funcao];

  formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const email = document.getElementById("email-usuario").value.trim();
    const nome = document.getElementById("nome-usuario").value.trim();
    const sobrenome = document.getElementById("sobrenome-usuario").value.trim();
    const telefone = document.getElementById("telefone-usuario").value.trim();
    const funcao = document.getElementById("funcao-usuario").value;

    const emailExistente = usuarios.some(function(item) {
      return item.id !== id &&
        item.email.toLowerCase() === email.toLowerCase();
    });

    if (emailExistente) {
      alert("Este e-mail já está cadastrado.");
      return;
    }

    const nomesFuncoes = {
      cliente: "Cliente",
      funcionario: "Funcionário",
      gerente: "Gerente"
    };

    usuario.email = email;
    usuario.nome = (nome + " " + sobrenome).trim();
    usuario.telefone = telefone;
    usuario.funcao = nomesFuncoes[funcao];

    salvarUsuarios(usuarios);

    window.location.href = "usuarios.html";
  });
});