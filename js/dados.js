"use strict";

// Hotel Pet - Dados iniciais e armazenamento local

const petsIniciais = [
  {
    id: "PET001",
    nome: "Mel",
    tipo: "Cachorro",
    raca: "Golden Retriever",
    tamanho: "Grande",
    proprietario: "Ana Souza"
  },
  {
    id: "PET002",
    nome: "Luna",
    tipo: "Gato",
    raca: "Siamês",
    tamanho: "Pequeno",
    proprietario: "Maria Oliveira"
  }
];

const reservasIniciais = [
  {
    id: "R001",
    pet: "Mel",
    responsavel: "Ana Souza",
    chegada: "2026-08-14",
    partida: "2026-08-18",
    status: "Em andamento",
    total: 320
  },
  {
    id: "R002",
    pet: "Thor",
    responsavel: "Carlos Lima",
    chegada: "2026-08-01",
    partida: "2026-08-05",
    status: "Finalizada",
    total: 280
  }
];

const usuariosIniciais = [
  {
    id: "U001",
    email: "joaodasilva@pet.com",
    nome: "João da Silva",
    funcao: "Gerente",
    status: "Ativo",
    criadoEm: "2020-02-19"
  },
  {
    id: "U002",
    email: "ana@pet.com",
    nome: "Ana Souza",
    funcao: "Cliente",
    status: "Ativo",
    criadoEm: "2026-08-01"
  },
  {
    id: "U003",
    email: "carlos@pet.com",
    nome: "Carlos Lima",
    funcao: "Funcionário",
    status: "Inativo",
    criadoEm: "2026-08-05"
  }
];

// Chave utilizada no armazenamento do navegador
const CHAVE_PETS = "hotelPet_pets";

// Retorna os pets armazenados ou os dados iniciais
function obterPets() {
  const dadosSalvos = localStorage.getItem(CHAVE_PETS);

  if (dadosSalvos !== null) {
    try {
      const pets = JSON.parse(dadosSalvos);

      if (Array.isArray(pets)) {
        return pets;
      }
    } catch (erro) {
      console.error("Erro ao ler os pets salvos:", erro);
    }
  }

  return [...petsIniciais];
}

function obterReservas() {
  const dadosSalvos = localStorage.getItem("hotelPetReservas");

  if (dadosSalvos !== null) {
    try {
      const reservas = JSON.parse(dadosSalvos);

      if (Array.isArray(reservas)) {
        return reservas;
      }
    } catch (erro) {
      console.error("Erro ao ler as reservas salvas:", erro);
    }
  }

  return [...reservasIniciais];
}

// Salva a lista de pets
function salvarPets(lista) {
  localStorage.setItem(CHAVE_PETS, JSON.stringify(lista));
}

// Gera o próximo identificador disponível
function gerarIdPet(lista) {
  const numeros = lista.map(function(pet) {
    return Number(String(pet.id).replace("PET", "")) || 0;
  });

  const maiorNumero = Math.max(0, ...numeros);

  return "PET" + String(maiorNumero + 1).padStart(3, "0");
}

console.log("Hotel Pet: dados iniciais carregados.");

function obterUsuarios() {
  const dadosSalvos = localStorage.getItem("hotelPetUsuarios");

  if (dadosSalvos !== null) {
    try {
      const usuarios = JSON.parse(dadosSalvos);

      if (Array.isArray(usuarios)) {
        return usuarios;
      }
    } catch (erro) {
      console.error("Erro ao ler os usuários salvos:", erro);
    }
  }

  return [...usuariosIniciais];
}

function salvarReservas(lista) {
  localStorage.setItem("hotelPetReservas", JSON.stringify(lista));
}