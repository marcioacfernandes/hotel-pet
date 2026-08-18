# Mapa de permissões — Hotel Pet

Este documento organiza os requisitos das três visões do sistema. Embora o projeto entregue a **visão do gerente**, as permissões dos perfis de cliente e funcionário estão representadas porque o gerente herda todas as ações desses perfis e possui permissões adicionais.

| Módulo | Cliente | Funcionário | Gerente | Tela HTML correspondente |
|---|---|---|---|---|
| Acesso | Faz login ou cria conta | Faz login | Faz login | `index.html` |
| Reservas | Pesquisa, cria, visualiza e edita reservas em andamento | Faz as ações do cliente e registra anotações, imagens e status | Faz as ações do funcionário e edita reservas finalizadas | `reservas.html`, `reserva-nova.html`, `reserva-editar.html`, `reserva-visualizar.html`, `reserva-finalizada.html` |
| Reserva finalizada | Apenas visualiza | Apenas visualiza | Visualiza e edita | `reserva-finalizada.html` e `reserva-editar.html` |
| Pets | Pesquisa, cadastra, visualiza e edita seus próprios pets | Faz as ações do cliente e informa o proprietário no cadastro | Faz as ações do funcionário | `pets.html`, `pet-novo.html`, `pet-editar.html`, `pet-visualizar.html` |
| Usuários | Não possui este menu | Pesquisa, cadastra, remove, muda status, visualiza e edita clientes | Faz as ações do funcionário e muda a função para cliente, funcionário ou gerente | `usuarios.html`, `usuario-novo.html`, `usuario-editar.html`, `usuario-visualizar.html` |
| Configurações | Não possui este menu | Não possui este menu | Altera valor da diária e número de vagas | `configuracoes.html` |
| Perfil | Edita o próprio perfil | Edita o próprio perfil | Edita o próprio perfil | `perfil.html` |

## Observação sobre a primeira entrega

Todos os controles são estáticos. Os formulários, filtros, campos de arquivo e botões demonstram a estrutura de cada operação, mas não salvam, removem, calculam ou enviam dados. A diferença de permissões é comunicada por textos e pelo conteúdo de cada tela.

Na etapa de CSS, o menu lateral, os status, os botões, os campos, as tabelas e os formulários serão estilizados conforme o protótipo do Figma.
