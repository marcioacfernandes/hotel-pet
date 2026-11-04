"use strict";

document.addEventListener("DOMContentLoaded", function() {
  const formulario = document.getElementById("form-novo-usuario");

  formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const usuarios = obterUsuarios();

    const email = document.getElementById("email-usuario").value.trim();
    const nome = document.getElementById("nome-usuario").value.trim();
    const sobrenome = document.getElementById("sobrenome-usuario").value.trim();
    const telefone = document.getElementById("telefone-usuario").value.trim();
    const funcao = document.getElementById("funcao-usuario").value;

    const emailExistente = usuarios.some(function(usuario) {
      return usuario.email.toLowerCase() === email.toLowerCase();
    });

    if (emailExistente) {
      alert("Este e-mail já está cadastrado.");
      return;
    }

    const numeros = usuarios.map(function(usuario) {
      return Number(usuario.id.replace("U", "")) || 0;
    });

    const proximoNumero = Math.max(0, ...numeros) + 1;
    const novoId = "U" + String(proximoNumero).padStart(3, "0");

    const funcoes = {
      cliente: "Cliente",
      funcionario: "Funcionário",
      gerente: "Gerente"
    };

    const novoUsuario = {
      id: novoId,
      email: email,
      nome: (nome + " " + sobrenome).trim(),
      telefone: telefone,
      funcao: funcoes[funcao],
      status: "Ativo",
      criadoEm: new Date().toLocaleDateString("en-CA")
    };

    usuarios.push(novoUsuario);
    salvarUsuarios(usuarios);

    window.location.href = "usuarios.html";
  });
});