"use strict";

function carregarUsuarios(lista = obterUsuarios()) {
  const corpoTabela = document.getElementById("corpo-usuarios");

  if (!corpoTabela) {
    return;
  }

  corpoTabela.innerHTML = "";

  lista.forEach(function(usuario) {
    const linha = document.createElement("tr");

    const campos = [
      usuario.id,
      usuario.email,
      usuario.nome,
      usuario.funcao,
      usuario.status,
      usuario.criadoEm
    ];

    campos.forEach(function(valor) {
      const celula = document.createElement("td");
      celula.textContent = valor;
      linha.appendChild(celula);
    });

   const celulaAcoes = document.createElement("td");

    const linkEditar = document.createElement("a");
    linkEditar.href = "usuario-editar.html?id=" + encodeURIComponent(usuario.id);
    linkEditar.textContent = "Editar";

   celulaAcoes.appendChild(linkEditar);
celulaAcoes.appendChild(document.createTextNode(" | "));

const linkVisualizar = document.createElement("a");
linkVisualizar.href = "usuario-visualizar.html?id=" + encodeURIComponent(usuario.id);
linkVisualizar.textContent = "Visualizar";

celulaAcoes.appendChild(linkVisualizar);
celulaAcoes.appendChild(document.createTextNode(" | "));

const botaoExcluir = document.createElement("button");
botaoExcluir.type = "button";
botaoExcluir.textContent = "Excluir";

botaoExcluir.addEventListener("click", function() {
  const confirmar = confirm("Deseja realmente excluir o usuário " + usuario.nome + "?");

  if (confirmar) {
    const usuarios = obterUsuarios();
    const listaAtualizada = usuarios.filter(function(item) {
      return item.id !== usuario.id;
    });

    salvarUsuarios(listaAtualizada);
    carregarUsuarios();
  }
});

celulaAcoes.appendChild(botaoExcluir);
linha.appendChild(celulaAcoes);

    corpoTabela.appendChild(linha);
  });
}

document.addEventListener("DOMContentLoaded", function() {
  carregarUsuarios();
  configurarPesquisaUsuarios();
});

function configurarPesquisaUsuarios() {
  const formulario = document.querySelector("form.filtros");

  if (!formulario) {
    return;
  }

  formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const id = formulario.elements["id"].value.trim().toLowerCase();
    const email = formulario.elements["email"].value.trim().toLowerCase();
    const status = formulario.elements["status"].value.toLowerCase();
    const funcao = formulario.elements["funcao"].value.toLowerCase();
    const inicio = formulario.elements["criado-inicio"].value;
    const fim = formulario.elements["criado-fim"].value;

    const resultados = obterUsuarios().filter(function(usuario) {
      return (
        usuario.id.toLowerCase().includes(id) &&
        usuario.email.toLowerCase().includes(email) &&
        (status === "" || usuario.status.toLowerCase() === status) &&
        (funcao === "" || usuario.funcao.toLowerCase() === funcao) &&
        (inicio === "" || usuario.criadoEm >= inicio) &&
        (fim === "" || usuario.criadoEm <= fim)
      );
    });

    carregarUsuarios(resultados);
  });

  formulario.addEventListener("reset", function() {
    setTimeout(function() {
      carregarUsuarios();
    }, 0);
  });
}