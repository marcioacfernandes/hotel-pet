"use strict";

document.addEventListener("DOMContentLoaded", function() {
  const parametros = new URLSearchParams(window.location.search);
  const id = parametros.get("id");

  const usuario = obterUsuarios().find(function(item) {
    return item.id === id;
  });

  if (!usuario) {
    alert("Usuário não encontrado.");
    window.location.href = "usuarios.html";
    return;
  }

  document.getElementById("visualizar-codigo").textContent = usuario.id;
  document.getElementById("visualizar-email").textContent = usuario.email;
  document.getElementById("visualizar-nome").textContent = usuario.nome;
  document.getElementById("visualizar-telefone").textContent = usuario.telefone || "Não informado";
  document.getElementById("visualizar-funcao").textContent = usuario.funcao;
  document.getElementById("visualizar-status").textContent = usuario.status;

  const dataCadastro = usuario.criadoEm;

  if (dataCadastro) {
    const partes = dataCadastro.split("-");
    document.getElementById("visualizar-criado").textContent =
      partes.length === 3
        ? partes[2] + "/" + partes[1] + "/" + partes[0]
        : dataCadastro;
  } else {
    document.getElementById("visualizar-criado").textContent = "Não informado";
  }
});