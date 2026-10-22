// Testes de validação estrutural dos componentes e navegação do Porjeto Cospobre
// Rodar com: node --test tests/test_structure.js ou node tests/test_structure.js
'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const ROOT_DIR = path.resolve(__dirname, '..');
const INDEX_HTML = path.join(ROOT_DIR, 'index.html');
const JS_HTML = path.join(ROOT_DIR, 'js.html');

function parseTags(html) {
  const clean = html.replace(/<!--[\s\S]*?-->/g, '');
  const tags = [];
  const tagRegex = /<([a-zA-Z][\w-]*)((?:\s+[^\s"'<>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'<>]+))?)*)\s*\/?>/g;
  const attrRegex = /([^\s"'<>\/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'<>]+)))?/g;

  for (const match of clean.matchAll(tagRegex)) {
    const tagName = match[1].toLowerCase();
    const rawAttrs = match[2];
    const attrs = {};

    for (const attrMatch of rawAttrs.matchAll(attrRegex)) {
      const key = attrMatch[1].toLowerCase();
      const val = attrMatch[2] ?? attrMatch[3] ?? attrMatch[4] ?? '';
      attrs[key] = val;
    }

    tags.push({ name: tagName, attrs });
  }

  return tags;
}

const htmlContent = fs.readFileSync(INDEX_HTML, 'utf8');
const tags = parseTags(htmlContent);
const allIds = tags.filter(t => t.attrs.id).map(t => t.attrs.id);

test('Estrutura global e meta tags essenciais de index.html', () => {
  assert.match(htmlContent, /<!DOCTYPE\s+html>/i, 'index.html deve conter doctype HTML5');

  const htmlTag = tags.find(t => t.name === 'html');
  assert.ok(htmlTag, 'Elemento <html> deve estar presente');
  assert.equal(htmlTag.attrs.lang, 'pt-BR', 'Atributo lang deve ser pt-BR');

  const charsetMeta = tags.find(t => t.name === 'meta' && t.attrs.charset);
  assert.ok(charsetMeta, 'Meta charset presente');
  assert.equal(charsetMeta.attrs.charset.toLowerCase(), 'utf-8', 'Meta charset deve ser UTF-8');

  const viewportMeta = tags.find(t => t.name === 'meta' && t.attrs.name === 'viewport');
  assert.ok(viewportMeta, 'Meta viewport configurada para responsividade');

  const titleMatch = htmlContent.match(/<title>([^<]+)<\/title>/i);
  assert.ok(titleMatch && titleMatch[1].trim().length > 5, 'Tag title preenchida');

  const mainElements = tags.filter(t => t.name === 'main');
  assert.equal(mainElements.length, 1, 'Deve existir exatamente uma tag <main>');
  assert.equal(mainElements[0].attrs.id, 'main-content', 'Tag <main> deve possuir id="main-content"');
});

test('Espelhamento e redirecionamento de compatibilidade em js.html', () => {
  assert.ok(fs.existsSync(JS_HTML), 'js.html deve existir para compatibilidade retroativa');
  const jsContent = fs.readFileSync(JS_HTML, 'utf8');
  assert.match(jsContent, /index\.html/, 'js.html deve apontar ou redirecionar para index.html');
});

test('Unicidade de IDs em index.html', () => {
  const duplicates = allIds.filter((id, idx) => allIds.indexOf(id) !== idx);
  assert.deepEqual(duplicates, [], `IDs duplicados encontrados: ${duplicates.join(', ')}`);
});

test('Componente de Navegação e Integridade das Âncoras', () => {
  assert.ok(allIds.includes('header'), 'Header com ID #header deve existir');

  // Skip link acessível
  const skipLink = tags.find(t => t.name === 'a' && t.attrs.class && t.attrs.class.includes('skip-link'));
  assert.ok(skipLink, 'Link de acessibilidade skip-link deve existir');
  assert.equal(skipLink.attrs.href, '#main-content', 'skip-link deve direcionar para #main-content');

  // Botão voltar ao topo
  const backToTop = tags.find(t => t.name === 'a' && t.attrs.class && t.attrs.class.includes('back-to-top'));
  assert.ok(backToTop, 'Botão .back-to-top deve existir');
  assert.ok(backToTop.attrs['aria-label'], 'Botão .back-to-top deve ter aria-label acessível');

  // Verificação de todas as âncoras locais
  const internalAnchors = tags
    .filter(t => t.name === 'a' && t.attrs.href && t.attrs.href.startsWith('#'))
    .map(t => t.attrs.href.slice(1))
    .filter(id => id.length > 0);

  const brokenAnchors = internalAnchors.filter(id => !allIds.includes(id));
  assert.deepEqual(brokenAnchors, [], `Âncoras quebradas apontando para IDs inexistentes: ${brokenAnchors.join(', ')}`);
  assert.ok(internalAnchors.length >= 8, `Links de navegação suficientes esperados (encontrados ${internalAnchors.length})`);
});

test('Componente: Alternador de Tema Dark/Light', () => {
  assert.ok(allIds.includes('theme-toggle'), 'Botão #theme-toggle ausente');
  assert.ok(allIds.includes('theme-icon-sun'), 'Ícone de sol #theme-icon-sun ausente');
  assert.ok(allIds.includes('theme-icon-moon'), 'Ícone de lua #theme-icon-moon ausente');

  const toggleBtn = tags.find(t => t.attrs.id === 'theme-toggle');
  assert.equal(toggleBtn.name, 'button', '#theme-toggle deve ser uma tag <button>');
  assert.equal(toggleBtn.attrs.type, 'button', '#theme-toggle deve ter type="button"');
  assert.ok(toggleBtn.attrs['aria-label'] || toggleBtn.attrs.title, '#theme-toggle deve possuir rótulo acessível');
});

test('Componente: Alternador de Modo de Alto Contraste (WCAG 2.2 AAA)', () => {
  assert.ok(allIds.includes('contrast-toggle'), 'Botão #contrast-toggle ausente');
  const contrastBtn = tags.find(t => t.attrs.id === 'contrast-toggle');
  assert.equal(contrastBtn.name, 'button', '#contrast-toggle deve ser uma tag <button>');
  assert.equal(contrastBtn.attrs.type, 'button', '#contrast-toggle deve ter type="button"');
  assert.ok(contrastBtn.attrs['aria-label'] || contrastBtn.attrs.title, '#contrast-toggle deve possuir rótulo acessível');
  assert.equal(contrastBtn.attrs['aria-pressed'], 'false', '#contrast-toggle deve iniciar com aria-pressed="false"');
});

test('Componente: Galeria e Filtros por Categoria', () => {
  assert.ok(allIds.includes('gallery'), 'Seção de galeria #gallery deve existir');
  assert.ok(allIds.includes('cospobre-gallery'), 'Container de itens #cospobre-gallery deve existir');

  // Botões de filtro
  const filterButtons = tags.filter(t => t.name === 'button' && t.attrs.class && t.attrs.class.includes('filter-btn'));
  assert.ok(filterButtons.length >= 4, 'Devem existir ao menos 4 botões de filtro de categoria');

  const filterValues = filterButtons.map(b => b.attrs['data-filter']);
  assert.ok(filterValues.includes('todos'), 'Filtro "todos" deve estar presente');

  // Itens da galeria
  const articles = tags.filter(t => t.name === 'article' && t.attrs.class && t.attrs.class.includes('gallery-item'));
  assert.ok(articles.length >= 4, 'Galeria deve conter múltiplos artigos de cospobre');

  for (const item of articles) {
    const category = item.attrs['data-category'];
    assert.ok(category, 'Todo item de galeria deve possuir atributo data-category');
    assert.ok(filterValues.includes(category), `Categoria ${category} deve ter botão de filtro correspondente`);
    assert.ok(item.attrs['data-cost'], 'Item de galeria deve declarar data-cost');
    assert.ok(item.attrs['data-materials'], 'Item de galeria deve declarar data-materials');
  }
});

test('Componente: Modal Lightbox', () => {
  assert.ok(allIds.includes('lightbox-modal'), 'Container #lightbox-modal deve existir');
  assert.ok(allIds.includes('lightbox-close-btn'), 'Botão de fechar #lightbox-close-btn deve existir');
  assert.ok(allIds.includes('lightbox-img'), 'Imagem #lightbox-img deve existir');
  assert.ok(allIds.includes('lightbox-title'), 'Título #lightbox-title deve existir');
  assert.ok(allIds.includes('lightbox-desc'), 'Descrição #lightbox-desc deve existir');
  assert.ok(allIds.includes('lightbox-cost'), 'Tag de custo #lightbox-cost deve existir');
  assert.ok(allIds.includes('lightbox-materials'), 'Tag de materiais #lightbox-materials deve existir');

  const modal = tags.find(t => t.attrs.id === 'lightbox-modal');
  assert.equal(modal.attrs.role, 'dialog', 'Modal deve possuir role="dialog"');
  assert.equal(modal.attrs['aria-modal'], 'true', 'Modal deve possuir aria-modal="true"');
  assert.equal(modal.attrs['aria-hidden'], 'true', 'Modal deve iniciar com aria-hidden="true"');
});

test('Componente: Formulário de Inscrição com Validação', () => {
  assert.ok(allIds.includes('cospobre-form'), 'Formulário #cospobre-form deve existir');

  const requiredInputs = [
    'cosplay-name',
    'cosplay-email',
    'cosplay-char',
    'cosplay-category',
    'cosplay-cost',
    'cosplay-materials'
  ];

  for (const inputId of requiredInputs) {
    assert.ok(allIds.includes(inputId), `Campo obrigatório #${inputId} não encontrado no formulário`);

    // Cada campo deve possuir um <label for="..."> correspondente
    const matchingLabel = tags.find(t => t.name === 'label' && t.attrs.for === inputId);
    assert.ok(matchingLabel, `Campo #${inputId} deve possuir uma <label for="${inputId}"> associada`);
  }

  // Botão de submissão do formulário
  const submitButton = tags.find(t => t.name === 'button' && t.attrs.type === 'submit');
  assert.ok(submitButton, 'Formulário deve possuir um botão com type="submit"');
});

test('Acessibilidade de Imagens e Recursos Locais', () => {
  const images = tags.filter(t => t.name === 'img');
  const imagesWithoutAlt = images.filter(img => typeof img.attrs.alt !== 'string');
  assert.deepEqual(imagesWithoutAlt, [], 'Todas as imagens do documento devem conter atributo alt');

  // Arquivos locais referenciados
  assert.ok(fs.existsSync(path.join(ROOT_DIR, 'style.css')), 'style.css deve existir');
  assert.ok(fs.existsSync(path.join(ROOT_DIR, 'script.js')), 'script.js deve existir');
});
