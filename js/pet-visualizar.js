"use strict";

// Hotel Pet - Visualização dinâmica de pets

document.addEventListener("DOMContentLoaded", function() {

  const parametros = new URLSearchParams(window.location.search);
  const idPet = parametros.get("id");

  const mensagem = document.getElementById(
    "mensagem-visualizar-pet"
  );

  const dadosPet = document.getElementById("dados-pet");
  const linkEditar = document.getElementById("link-editar-pet");
  const historico = document.getElementById("historico-reservas");
  const legenda = document.getElementById("legenda-reservas");
  const botaoExcluir = document.getElementById("excluir-pet");

  // Localiza o pet selecionado
  const pet = obterPets().find(function(item) {
    return item.id === idPet;
  });

  if (!pet) {
    mensagem.textContent = "Pet não encontrado.";

    linkEditar.hidden = true;
    botaoExcluir.disabled = true;
    legenda.textContent = "Nenhuma reserva disponível.";

    return;
  }

  // Apresenta os dados do pet
  const campos = [
    ["ID", pet.id],
    ["Nome", pet.nome],
    ["Tipo", pet.tipo],
    ["Raça", pet.raca],
    ["Tamanho", pet.tamanho],
    ["Proprietário", pet.proprietario]
  ];

  campos.forEach(function(campo) {

    const paragrafo = document.createElement("p");
    const destaque = document.createElement("strong");

    destaque.textContent = campo[0] + ": ";

    paragrafo.appendChild(destaque);
    paragrafo.appendChild(
      document.createTextNode(campo[1])
    );

    dadosPet.appendChild(paragrafo);

  });

  // Atualiza o link de edição
  linkEditar.href =
    "pet-editar.html?id=" + encodeURIComponent(pet.id);

  // Histórico demonstrativo de reservas
  const reservas = reservasIniciais.filter(function(reserva) {
    return reserva.pet === pet.nome;
  });

  legenda.textContent = "Reservas do pet " + pet.nome;

  if (reservas.length === 0) {

    const linha = document.createElement("tr");
    const celula = document.createElement("td");

    celula.colSpan = 3;
    celula.textContent = "Nenhuma reserva encontrada.";

    linha.appendChild(celula);
    historico.appendChild(linha);

  } else {

    reservas.forEach(function(reserva) {

      const linha = document.createElement("tr");

      const codigo = document.createElement("td");
      codigo.textContent = reserva.id;

      const periodo = document.createElement("td");

      // Converte a data sem depender do fuso horário
      function formatarData(data) {
        const partes = data.split("-");
        return partes[2] + "/" + partes[1] + "/" + partes[0];
      }

      periodo.textContent =
        formatarData(reserva.chegada) +
        " a " +
        formatarData(reserva.partida);

      const status = document.createElement("td");
      const etiqueta = document.createElement("span");

      etiqueta.className = "status";

      if (reserva.status === "Finalizada") {
        etiqueta.classList.add("status-finalizada");
      } else {
        etiqueta.classList.add("status-andamento");
      }

      etiqueta.textContent = reserva.status;
      status.appendChild(etiqueta);

      linha.appendChild(codigo);
      linha.appendChild(periodo);
      linha.appendChild(status);

      historico.appendChild(linha);

    });

  }
  
  botaoExcluir.disabled = false;
botaoExcluir.title = "Excluir este pet";

botaoExcluir.addEventListener("click", function () {
  const confirmar = window.confirm(
    "Deseja realmente excluir o pet " + pet.nome + "?"
  );

  if (!confirmar) {
    return;
  }
  const petsAtualizados = obterPets().filter(function (item) {
  return item.id !== idPet;
});

salvarPets(petsAtualizados);
window.location.href = "pets.html";
});
  console.log("Pet visualizado:", pet.nome);

});