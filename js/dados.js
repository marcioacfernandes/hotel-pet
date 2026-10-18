"use strict";

// Hotel Pet - Dados iniciais do sistema

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
    chegada: "2026-08-14",
    partida: "2026-08-18",
    status: "Em andamento",
    total: 320
  },
  {
    id: "R002",
    pet: "Thor",
    chegada: "2026-08-01",
    partida: "2026-08-05",
    status: "Finalizada",
    total: 280
  }
];

console.log("Hotel Pet: dados iniciais carregados.");