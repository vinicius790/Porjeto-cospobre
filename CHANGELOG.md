# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.0.0] - 2026-10-16 - Suíte Interativa, PWA, Comparador & Planejador

### Added
- **Planejador de Materiais com Custo & Tempo**:
  - Adição de cálculo em tempo real de custo financeiro e tempo de confecção em minutos.
  - Etiquetagem por etapas da confecção (`Armadura`, `Capacete`, `Pintura`, `Fixação`, `Arma/Prop`).
  - Painel de dificuldade dinâmica (`Ultra Rápido & Barato`, `Rápido & Indolor`, `Nível Médio de Gambiarra`, `Maratona Suprema de Sucata`).
  - Termômetro da gambiarra com badges cómicos e comparativo de economia contra cosplays oficiais.
- **Exportação de Ficha Técnica em JSON & Markdown**:
  - Exportação estruturada para arquivo `.json` com download automático e cópia para clipboard.
  - Exportação de relatório formatado para `.md` (Markdown) com tabelas GitHub Flavored Markdown e download.
  - Caixa de pré-visualização do conteúdo exportado com rolagem suave.
- **Comparador Lado-a-Lado (Expectativa vs Gambiarra)**:
  - Presets cinematográficos interativos: Homem de Ferro, Goku, Mulher Maravilha e Batman.
  - Slider responsivo de proporção e equilíbrio visual (`10% / 90%` a `90% / 10%`).
  - Indicadores técnicos de economia, tempo poupado e índice de ROI da risada.
- **Ranking Dinâmico por Categorias**:
  - Filtro por 4 categorias técnicas: *Geral*, *Criatividade*, *Baixo Custo* e *Fidelidade*.
  - Pódio interativo dos 3 melhores cospobres da semana com medalhas (Ouro, Prata e Bronze) e métricas dinâmicas.
  - Sistema de votação por 1 a 5 estrelas com persistência local no `localStorage`.
- **Progressive Web App (PWA)**:
  - Manifesto W3C `manifest.json` com ícones vetoriais, categorias e cores de tema.
  - Service Worker `sw.js` com estratégia *Stale-While-Revalidate* para funcionamento offline total.
  - Registro automático do Service Worker em `script.js`.
- **Internacionalização Bilíngue (i18n)**:
  - Botão de alternância `PT` / `EN` no cabeçalho com persistência em `localStorage`.
  - Dicionários completos em Português (`pt-BR`) e Inglês (`en-US`) cobrindo todas as seções e anúncios acessíveis.
- **Infraestrutura de Testes e Governança**:
  - Adição de `package.json` com scripts `test`, `check` e `start`.
  - Novos testes automatizados: `tests/test_planner_comparator.js` e `tests/test_pwa.js`.
  - Documento de arquitetura de software detalhado: `ARCHITECTURE.md` com diagramas Mermaid.
  - Atualização do workflow de CI do GitHub Actions (`.github/workflows/ci.yml`) para cobrir 100% dos testes.

### Changed
- **`script.js`**: Refatoração e modularização com desacoplamento de funções puras testáveis no Node.js.
- **`README.md`**: Atualização completa com tabela de recursos, guia de início rápido, arquitetura e instruções de teste.

## [2.0.0] - 2026-10-15 - Grand Modernization

### Added
- **Dark/Light Theme**: Suporte a alternância de temas com persistência em `localStorage` e detecção automática de preferências do sistema (`prefers-color-scheme`).
- **Filtro Dinâmico de Categorias**: Filtragem em tempo real de itens da galeria por categoria (Marvel, DC Comics, Animes e Clássicos).
- **Lightbox Interativo**: Modal de alta resolução para ampliação de imagens com suporte a navegação por teclado (tecla ESC para fechar).
- **Carrossel Interativo**: Slider responsivo com navegação tátil por gestos e paginação dinâmica para eventos cosplay.
- **Formulário com Validação & Toast Notifications**: Validação em tempo real de campos no envio de sugestões e feedback instantâneo via alertas Toast.
- **Novo Ponto de Entrada (`index.html`)**: Arquivo de inicialização compatível com servidores web modernos e plataformas de hospedagem estática.
- **Favicon Vetorial**: Ícone responsivo em SVG (`favicon.svg`).
- **Suíte de Testes Estruturais**: Testes de integridade do DOM, metadados e responsividade (`tests/test_structure.js`) via Node.js Test Runner.
- **Padrões de Governança e Qualidade**: Adição de `CONTRIBUTING.md`, `SECURITY.md`, `LICENSE` (MIT), `.editorconfig`, `.prettierrc` e `.prettierignore`.

### Changed
- **Arquitetura CSS**: Migração para variáveis CSS nativas (`var(--...)`), Flexbox, CSS Grid moderno e layout adaptável para mobile, tablet e desktop.
- **Arquitetura JavaScript**: Código reescrito em ES6+ modular (`script.js`) com separação de responsabilidades.
- **Documentação**: `README.md` reestruturado com badges de status, tabela comparativa de recursos e guia Quick Start em 3 passos.

### Fixed
- Correção de overflow horizontal e desalinhamento de cards em telas de smartphones.
- Correção de problemas de acessibilidade em botões de menu e elementos interativos sem atributos ARIA adequados.

## [1.0.0] - 2023-04-10 - Versão Inicial
### Added
- Versão inicial do projeto com galeria estática em `js.html` apresentando recriações cômicas de personagens populares com itens de baixo custo.
