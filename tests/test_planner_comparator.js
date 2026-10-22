// Testes unitários e de integração para Planejador, Comparador, Ranking, Exportações e i18n
'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const ROOT_DIR = path.resolve(__dirname, '..');
const {
  formatBRL,
  formatTime,
  calculatePlan,
  exportPlanAsJSON,
  exportPlanAsMarkdown,
  sortRankingByCategory,
  COMPARATOR_PRESETS,
  TRANSLATIONS
} = require(path.join(ROOT_DIR, 'script.js'));

test('Formatadores monetários e de tempo', () => {
  assert.equal(formatBRL(0), 'R$\u00a00,00');
  assert.equal(formatBRL(7.5), 'R$\u00a07,50');
  assert.equal(formatBRL(1200), 'R$\u00a01.200,00');

  assert.equal(formatTime(0), '0 min');
  assert.equal(formatTime(25), '25 min');
  assert.equal(formatTime(60), '1h');
  assert.equal(formatTime(75), '1h 15m');
  assert.equal(formatTime(130), '2h 10m');
});

test('Planejador de Materiais: cálculo de custo, tempo e dificuldade', () => {
  const materials = [
    { name: 'Papelão', cost: 0.00, time: 25, part: 'Armadura' },
    { name: 'Fita Crepe', cost: 7.50, time: 15, part: 'Fixação' },
    { name: 'Giz de Cera', cost: 4.20, time: 15, part: 'Pintura' }
  ];

  const plan = calculatePlan(materials, 4200);
  assert.equal(plan.totalCost, 11.70);
  assert.equal(plan.totalTime, 55);
  assert.equal(plan.timeFormatted, '55 min');
  assert.equal(plan.savedCost, 4188.30);
  assert.equal(plan.savedPercent, '99.7');
  assert.equal(plan.difficultyBadge, '🔧 Rápido & Indolor');

  // Teste limite com lista vazia
  const emptyPlan = calculatePlan([], 1000);
  assert.equal(emptyPlan.totalCost, 0);
  assert.equal(emptyPlan.totalTime, 0);
  assert.equal(emptyPlan.savedCost, 1000);
  assert.equal(emptyPlan.difficultyBadge, '⚡ Ultra Rápido & Barato');

  // Teste de maratona (mais de 120 minutos)
  const heavyMaterials = [
    { name: 'Papelão Extra', cost: 10, time: 80, part: 'Armadura' },
    { name: 'Pintura automotiva barata', cost: 20, time: 60, part: 'Pintura' }
  ];
  const heavyPlan = calculatePlan(heavyMaterials, 3000);
  assert.equal(heavyPlan.totalTime, 140);
  assert.equal(heavyPlan.timeFormatted, '2h 20m');
  assert.equal(heavyPlan.difficultyBadge, '🏆 Maratona Suprema de Sucata');
});

test('Exportação de Ficha Técnica em JSON', () => {
  const materials = [
    { name: 'Papelão', cost: 0.00, time: 25, part: 'Armadura' },
    { name: 'Fita Crepe', cost: 7.50, time: 15, part: 'Fixação' }
  ];
  const plan = calculatePlan(materials, 4200);

  const jsonStr = exportPlanAsJSON({
    referenceName: 'Homem de Ferro Mark 85',
    originalCost: 4200,
    materials,
    ...plan
  });

  const parsed = JSON.parse(jsonStr);
  assert.equal(parsed.app, 'Porjeto Cospobre');
  assert.equal(parsed.versao, '3.0.0');
  assert.equal(parsed.referencia_original.nome, 'Homem de Ferro Mark 85');
  assert.equal(parsed.referencia_original.custo_estimado, 4200);
  assert.equal(parsed.resumo_cospobre.custo_total, 7.50);
  assert.equal(parsed.resumo_cospobre.quantidade_materiais, 2);
  assert.equal(parsed.materiais.length, 2);
  assert.equal(parsed.materiais[0].nome, 'Papelão');
});

test('Exportação de Ficha Técnica em Markdown', () => {
  const materials = [
    { name: 'Papelão', cost: 0.00, time: 25, part: 'Armadura' },
    { name: 'Fita Crepe', cost: 7.50, time: 15, part: 'Fixação' }
  ];
  const plan = calculatePlan(materials, 4200);

  const md = exportPlanAsMarkdown({
    referenceName: 'Homem de Ferro Mark 85',
    originalCost: 4200,
    materials,
    ...plan
  });

  assert.ok(md.includes('# 🎭 Ficha Técnica — Porjeto Cospobre'));
  assert.ok(md.includes('Homem de Ferro Mark 85'));
  assert.ok(md.includes('| # | Material Reciclável |'));
  assert.ok(md.includes('| 1 | Papelão | Armadura |'));
  assert.ok(md.includes('| 2 | Fita Crepe | Fixação |'));
  assert.ok(md.includes('Economia de'));
});

test('Comparador Lado-a-Lado: Integridade dos presets oficiais', () => {
  const requiredPresets = ['ironman', 'goku', 'wonderwoman', 'batman'];

  for (const key of requiredPresets) {
    const preset = COMPARATOR_PRESETS[key];
    assert.ok(preset, `Preset ${key} deve existir`);
    assert.ok(preset.ref.title, `Título da referência em ${key}`);
    assert.ok(preset.ref.cost, `Custo da referência em ${key}`);
    assert.ok(preset.ref.time, `Tempo da referência em ${key}`);
    assert.ok(preset.ref.materials, `Materiais da referência em ${key}`);
    assert.ok(preset.ref.img.startsWith('http'), `URL da imagem de ref em ${key}`);

    assert.ok(preset.cospobre.title, `Título cospobre em ${key}`);
    assert.ok(preset.cospobre.cost, `Custo cospobre em ${key}`);
    assert.ok(preset.cospobre.time, `Tempo cospobre em ${key}`);
    assert.ok(preset.cospobre.materials, `Materiais cospobre em ${key}`);
    assert.ok(preset.cospobre.img.startsWith('http'), `URL da imagem cospobre em ${key}`);

    assert.ok(preset.metrics.costRatio, `Razão de custo em ${key}`);
    assert.ok(preset.metrics.timeSaved, `Tempo economizado em ${key}`);
    assert.ok(preset.metrics.roiScore, `ROI da risada em ${key}`);
  }
});

test('Ranking Dinâmico: ordenação por categorias técnicas', () => {
  const sampleContestants = [
    { id: '1', name: 'A', baseRating: 4.5, creativityScore: 90, costNum: 10, fidelityScore: 92 },
    { id: '2', name: 'B', baseRating: 4.9, creativityScore: 100, costNum: 5, fidelityScore: 85 },
    { id: '3', name: 'C', baseRating: 4.7, creativityScore: 80, costNum: 2, fidelityScore: 98 }
  ];

  // Geral: maior baseRating primeiro (B: 4.9, C: 4.7, A: 4.5)
  const sortedGeral = sortRankingByCategory(sampleContestants, 'geral');
  assert.deepEqual(sortedGeral.map(x => x.name), ['B', 'C', 'A']);

  // Criatividade: maior creativityScore primeiro (B: 100, A: 90, C: 80)
  const sortedCreativity = sortRankingByCategory(sampleContestants, 'criatividade');
  assert.deepEqual(sortedCreativity.map(x => x.name), ['B', 'A', 'C']);

  // Baixo Custo: menor costNum primeiro (C: 2, B: 5, A: 10)
  const sortedLowCost = sortRankingByCategory(sampleContestants, 'baixo-custo');
  assert.deepEqual(sortedLowCost.map(x => x.name), ['C', 'B', 'A']);

  // Fidelidade: maior fidelityScore primeiro (C: 98, A: 92, B: 85)
  const sortedFidelity = sortRankingByCategory(sampleContestants, 'fidelidade');
  assert.deepEqual(sortedFidelity.map(x => x.name), ['C', 'A', 'B']);
});

test('Internacionalização (i18n): correspondência e cobertura de chaves PT e EN', () => {
  const ptKeys = Object.keys(TRANSLATIONS['pt-BR']);
  const enKeys = Object.keys(TRANSLATIONS['en-US']);

  assert.ok(ptKeys.length >= 40, `Dicionário PT deve conter ao menos 40 chaves (encontrado: ${ptKeys.length})`);
  assert.deepEqual(ptKeys.sort(), enKeys.sort(), 'As chaves em PT-BR e EN-US devem ser estritamente idênticas');

  // Validar que todas as tags data-i18n de index.html estão no dicionário
  const htmlContent = fs.readFileSync(path.join(ROOT_DIR, 'index.html'), 'utf8');
  const foundKeys = [...htmlContent.matchAll(/data-i18n="([^"]+)"/g)].map(m => m[1]);
  const uniqueKeys = [...new Set(foundKeys)];

  for (const key of uniqueKeys) {
    assert.ok(
      TRANSLATIONS['pt-BR'][key],
      `Chave data-i18n "${key}" encontrada no index.html deve constar em TRANSLATIONS['pt-BR']`
    );
    assert.ok(
      TRANSLATIONS['en-US'][key],
      `Chave data-i18n "${key}" encontrada no index.html deve constar em TRANSLATIONS['en-US']`
    );
  }
});
