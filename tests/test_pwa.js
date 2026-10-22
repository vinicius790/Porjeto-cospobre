// Testes de validação da infraestrutura PWA (manifest.json e Service Worker sw.js)
'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const ROOT_DIR = path.resolve(__dirname, '..');
const MANIFEST_PATH = path.join(ROOT_DIR, 'manifest.json');
const SW_PATH = path.join(ROOT_DIR, 'sw.js');
const INDEX_PATH = path.join(ROOT_DIR, 'index.html');

test('PWA: Validação do Web App Manifest (manifest.json)', () => {
  assert.ok(fs.existsSync(MANIFEST_PATH), 'manifest.json deve existir na raiz');

  const content = fs.readFileSync(MANIFEST_PATH, 'utf8');
  let manifest;
  assert.doesNotThrow(() => {
    manifest = JSON.parse(content);
  }, 'manifest.json deve ser um JSON válido');

  assert.ok(manifest.name && manifest.name.length > 5, 'Campo name preenchido');
  assert.ok(manifest.short_name, 'Campo short_name preenchido');
  assert.ok(manifest.start_url, 'Campo start_url configurado');
  assert.ok(manifest.display === 'standalone' || manifest.display === 'minimal-ui', 'Display configurado');
  assert.ok(manifest.theme_color, 'Campo theme_color preenchido');
  assert.ok(manifest.background_color, 'Campo background_color preenchido');
  assert.ok(Array.isArray(manifest.icons) && manifest.icons.length > 0, 'Ícones declarados no manifesto');

  for (const icon of manifest.icons) {
    assert.ok(icon.src, 'Ícone deve declarar src');
    const iconFile = path.join(ROOT_DIR, icon.src);
    assert.ok(fs.existsSync(iconFile), `Arquivo de ícone ${icon.src} deve existir no disco`);
  }
});

test('PWA: Validação do Service Worker e lista de Cache', () => {
  assert.ok(fs.existsSync(SW_PATH), 'sw.js deve existir na raiz');

  const swContent = fs.readFileSync(SW_PATH, 'utf8');
  assert.ok(swContent.includes('CACHE_NAME'), 'sw.js deve definir CACHE_NAME');
  assert.ok(swContent.includes('addEventListener'), 'sw.js deve registrar ouvintes de ciclo de vida');
  assert.ok(swContent.includes('install'), 'sw.js deve escutar evento install');
  assert.ok(swContent.includes('activate'), 'sw.js deve escutar evento activate');
  assert.ok(swContent.includes('fetch'), 'sw.js deve interceptar requisições fetch');

  // Extrair CORE_ASSETS do sw.js
  const match = swContent.match(/CORE_ASSETS\s*=\s*\[([\s\S]*?)\];/);
  assert.ok(match, 'CORE_ASSETS deve estar definido no sw.js');

  const rawAssets = match[1]
    .split(',')
    .map(s => s.trim().replace(/['"]/g, ''))
    .filter(Boolean);

  for (const asset of rawAssets) {
    if (asset === './' || asset === '/') continue;
    const cleanAsset = asset.replace(/^\.\//, '');
    const assetPath = path.join(ROOT_DIR, cleanAsset);
    assert.ok(fs.existsSync(assetPath), `Arquivo em cache "${asset}" deve existir em ${assetPath}`);
  }
});

test('PWA: Vinculação no index.html', () => {
  const indexContent = fs.readFileSync(INDEX_PATH, 'utf8');
  assert.match(indexContent, /<link[^>]+rel=["']manifest["'][^>]*>/i, 'index.html deve conter link para manifest.json');
  assert.match(indexContent, /<meta[^>]+name=["']theme-color["'][^>]*>/i, 'index.html deve conter metatag theme-color');
});
