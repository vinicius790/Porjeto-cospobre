/**
 * PORJETO COSPOBRE - SCRIPT PRINCIPAL (v3.0.0)
 * Funcionalidades:
 * - Tema Dark / Light e Modo de Alto Contraste (WCAG 2.2 AAA)
 * - Navegação acessível, Skip Links e Menu Mobile
 * - Filtro dinâmico de galeria por categoria com lightbox acessível
 * - Planejador de materiais com estimativa de custo e tempo de montagem
 * - Exportação de ficha técnica em JSON e Markdown
 * - Comparador lado-a-lado visual com proporção deslizante
 * - Criador de card colecionável cospobre com Canvas exportável em PNG
 * - Sistema de votação e ranking dinâmico por categorias técnicas
 * - Internacionalização i18n completa (PT-BR / EN-US)
 * - PWA: Registro de Service Worker e suporte offline
 */

'use strict';

/* ==========================================================================
   DICIONÁRIO DE INTERNACIONALIZAÇÃO (i18n)
   ========================================================================== */
const TRANSLATIONS = {
  'pt-BR': {
    skip_main: 'Pular para o conteúdo principal',
    skip_gallery: 'Pular para a galeria de cospobres',
    skip_calculator: 'Pular para o planejador de materiais',
    skip_comparator: 'Pular para o comparador lado-a-lado',
    skip_card_maker: 'Pular para o criador de card cospobre',
    skip_ranking: 'Pular para votação e top 3 cospobres',
    skip_about: 'Pular para o nosso manifesto',
    skip_testimonials: 'Pular para o carrossel de depoimentos',
    skip_contest: 'Pular para o formulário de inscrição',
    nav_home: 'Início',
    nav_gallery: 'Galeria',
    nav_calculator: 'Planejador',
    nav_comparator: 'Comparador',
    nav_card_maker: 'Criador de Card',
    nav_ranking: 'Ranking',
    nav_about: 'Manifesto',
    nav_testimonials: 'Depoimentos',
    nav_contest: 'Concurso',
    nav_community: 'Comunidade',
    hero_title: 'Criatividade Extrema com <span>Zero Orçamento</span>',
    hero_subtitle: 'Quem disse que precisa gastar milhares de reais para homenagear seus heróis favoritos? Aqui o papelão, a garrafa pet e o bom humor criam lendas inesquecíveis dos eventos de anime e quadrinhos!',
    calc_tag: 'Planejador &amp; Economia Extrema',
    calc_heading: 'Planejador de Materiais &amp; <span>Calculadora Cospobre</span>',
    calc_subtitle: 'Planeje cada etapa da sua fantasia reciclável com estimativa de custo real, tempo de montagem e exportação de ficha técnica completa em JSON ou Markdown!',
    calc_builder_title: '📦 Monte sua Fantasia de Sucata',
    calc_ref_label: 'Cosplay Original de Referência:',
    calc_quick_label: '⚡ Itens Recicláveis Frequentes (Clique para Adicionar Custo + Tempo):',
    calc_add_custom_title: 'Adicionar Material ao Planejador:',
    calc_results_title: '📊 Orçamento, Tempo &amp; Ficha Técnica',
    comp_tag: 'Expectativa vs Realidade',
    comp_heading: 'Comparador Lado-a-Lado: <span>Referência vs Cospobre</span>',
    comp_subtitle: 'Analise tecnicamente a diferença entre produções milionárias de estúdio e a genialidade da sucata brasileira. Deslize o controle para equilibrar orçamento e carisma!',
    comp_select_label: 'Selecione o Duelo de Personagens:',
    card_tag: 'Colecionáveis Épicos',
    card_heading: 'Criador de Card <span>Cospobre Oficial</span>',
    card_subtitle: 'Transforme sua gambiarra em um card colecionável lendário! Carregue sua foto, escolha a moldura temática, defina os status de poder e baixe em alta resolução.',
    rank_tag: 'Voto Popular &amp; Categorias',
    rank_heading: 'Ranking &amp; <span>Votação da Comunidade</span>',
    rank_subtitle: 'Filtre o ranking por Critério Técnico (Geral, Criatividade, Baixo Custo ou Fidelidade) e avalie com estrelas de 1 a 5!',
    rank_cat_general: '🏆 Ranking Geral',
    rank_cat_creativity: '🧠 Criatividade',
    rank_cat_lowcost: '💰 Baixo Custo',
    rank_cat_fidelity: '🎯 Fidelidade'
  },
  'en-US': {
    skip_main: 'Skip to main content',
    skip_gallery: 'Skip to cospobre gallery',
    skip_calculator: 'Skip to material planner',
    skip_comparator: 'Skip to side-by-side comparator',
    skip_card_maker: 'Skip to cospobre card maker',
    skip_ranking: 'Skip to voting and top 3 cospobres',
    skip_about: 'Skip to our manifesto',
    skip_testimonials: 'Skip to testimonials carousel',
    skip_contest: 'Skip to registration form',
    nav_home: 'Home',
    nav_gallery: 'Gallery',
    nav_calculator: 'Planner',
    nav_comparator: 'Comparator',
    nav_card_maker: 'Card Maker',
    nav_ranking: 'Ranking',
    nav_about: 'Manifesto',
    nav_testimonials: 'Testimonials',
    nav_contest: 'Contest',
    nav_community: 'Community',
    hero_title: 'Extreme Creativity with <span>Zero Budget</span>',
    hero_subtitle: 'Who said you need thousands of dollars to cosplay your favorite heroes? Here cardboard, plastic bottles and pure humor create unforgettable convention legends!',
    calc_tag: 'Planner &amp; Extreme Economy',
    calc_heading: 'Material Planner &amp; <span>Cospobre Calculator</span>',
    calc_subtitle: 'Plan every step of your recyclable costume with real cost estimates, assembly time and full spec sheet export to JSON or Markdown!',
    calc_builder_title: '📦 Build Your Scrap Costume',
    calc_ref_label: 'Original Reference Cosplay:',
    calc_quick_label: '⚡ Frequent Recyclable Items (Click to Add Cost + Time):',
    calc_add_custom_title: 'Add Custom Material to Planner:',
    calc_results_title: '📊 Budget, Time &amp; Spec Sheet',
    comp_tag: 'Expectation vs Reality',
    comp_heading: 'Side-by-Side Comparator: <span>Reference vs Cospobre</span>',
    comp_subtitle: 'Technically compare million-dollar studio costumes with Brazilian scrap ingenuity. Move the slider to balance budget and charisma!',
    comp_select_label: 'Select Character Duel:',
    card_tag: 'Epic Collectibles',
    card_heading: 'Official Cospobre <span>Card Maker</span>',
    card_subtitle: 'Turn your DIY cosplay into a legendary collectible card! Upload your photo, choose the frame, customize RPG battle stats and download in high resolution.',
    rank_tag: 'Popular Vote &amp; Categories',
    rank_heading: 'Ranking &amp; <span>Community Voting</span>',
    rank_subtitle: 'Filter ranking by Technical Criteria (Overall, Creativity, Low Cost or Fidelity) and rate with 1 to 5 stars!',
    rank_cat_general: '🏆 Overall Ranking',
    rank_cat_creativity: '🧠 Creativity',
    rank_cat_lowcost: '💰 Low Cost',
    rank_cat_fidelity: '🎯 Fidelity'
  }
};

/* ==========================================================================
   PRESETS DO COMPARADOR LADO-A-LADO
   ========================================================================== */
const COMPARATOR_PRESETS = {
  ironman: {
    ref: {
      title: 'Homem de Ferro Mark 85 (Estúdio)',
      cost: 'R$ 4.200,00',
      time: '120 horas',
      materials: 'Fibra de vidro, impressão 3D SLA e pintura automotiva',
      fidelity: '100%',
      img: 'https://conteudo.imguol.com.br/c/entretenimento/2014/07/27/cosplayers-e-cospobre-1406486813367_300x300.jpg.webp'
    },
    cospobre: {
      title: 'Homem de Papelão Mark R$ 7,50',
      cost: 'R$ 7,50',
      time: '45 minutos',
      materials: 'Caixas de supermercado, fita crepe e lanterna do celular',
      charisma: '1000%',
      img: 'https://mega.ibxk.com.br/2018/01/05/05130214420217.jpg'
    },
    metrics: {
      costRatio: '560x mais barato',
      timeSaved: '119h 15min',
      roiScore: '99.8 / 100'
    }
  },
  goku: {
    ref: {
      title: 'Goku Super Saiyajin (Kimono + Peruca Importada)',
      cost: 'R$ 2.500,00',
      time: '40 horas',
      materials: 'Tecido oxford premium, peruca termorresistente estilizada e botas de couro',
      fidelity: '98%',
      img: 'https://i.pinimg.com/originals/79/92/af/7992af84283566aa984fc1dedd755571.jpg'
    },
    cospobre: {
      title: 'Goku Feirante com Cacho de Bananas',
      cost: 'R$ 6,00',
      time: '10 minutos',
      materials: 'Cacho de bananas nanicas maduras, camisa amarela e muita coragem',
      charisma: '999%',
      img: 'https://i.pinimg.com/originals/79/92/af/7992af84283566aa984fc1dedd755571.jpg'
    },
    metrics: {
      costRatio: '416x mais barato',
      timeSaved: '39h 50min',
      roiScore: '100 / 100'
    }
  },
  wonderwoman: {
    ref: {
      title: 'Mulher Maravilha (Armadura Themyscira Pro)',
      cost: 'R$ 3.800,00',
      time: '80 horas',
      materials: 'Couro sintético trabalhado, resina e tiara fundida em bronze',
      fidelity: '100%',
      img: 'https://mega.ibxk.com.br/2018/01/05/05130214420217.jpg'
    },
    cospobre: {
      title: 'Princesa de Themyscira em Papel Laminado',
      cost: 'R$ 3,50',
      time: '20 minutos',
      materials: 'Toalha de mesa vermelha, papel alumínio e bota de chuva de borracha',
      charisma: '950%',
      img: 'https://mega.ibxk.com.br/2018/01/05/05130214420217.jpg'
    },
    metrics: {
      costRatio: '1085x mais barato',
      timeSaved: '79h 40min',
      roiScore: '99.5 / 100'
    }
  },
  batman: {
    ref: {
      title: 'Batman Traje Tático WayneTech',
      cost: 'R$ 5.800,00',
      time: '150 horas',
      materials: 'Kevlar cinematográfico, neoprene e capacete de uretano injetado',
      fidelity: '100%',
      img: 'https://pm1.narvii.com/6354/6e5c41cdd76c6b4a23c2d13a70f1aba1b4ef9e06_hq.jpg'
    },
    cospobre: {
      title: 'Cavaleiro das Trevas de Saco de Lixo 100L',
      cost: 'R$ 2,00',
      time: '15 minutos',
      materials: 'Saco de lixo reciclado 100L, fita isolante e orelhas de papelão',
      charisma: '1200%',
      img: 'https://pm1.narvii.com/6354/6e5c41cdd76c6b4a23c2d13a70f1aba1b4ef9e06_hq.jpg'
    },
    metrics: {
      costRatio: '2900x mais barato',
      timeSaved: '149h 45min',
      roiScore: '100 / 100'
    }
  }
};

/* ==========================================================================
   FUNÇÕES PURAS & AUXILIARES (COMPATÍVEIS COM TESTES UNITÁRIOS)
   ========================================================================== */

function sanitizeHtml(dirty) {
  if (typeof dirty !== 'string') return '';
  if (typeof DOMParser !== 'undefined') {
    const parser = new DOMParser();
    const doc = parser.parseFromString(dirty, 'text/html');
    const allowedTags = new Set([
      'DIV', 'SPAN', 'STRONG', 'EM', 'B', 'I', 'BR', 'SMALL', 'LI', 'UL', 'P',
      'ARTICLE', 'H3', 'H4', 'IMG', 'BUTTON', 'LABEL', 'SELECT', 'OPTION'
    ]);
    doc.body.querySelectorAll('*').forEach((node) => {
      if (!allowedTags.has(node.tagName)) {
        node.remove();
      } else {
        Array.from(node.attributes).forEach((attr) => {
          const name = attr.name.toLowerCase();
          if (name.startsWith('on') || (name === 'src' && attr.value.toLowerCase().startsWith('javascript:'))) {
            node.removeAttribute(attr.name);
          }
        });
      }
    });
    return doc.body.innerHTML;
  }
  return dirty.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
}

function formatBRL(value) {
  if (typeof value !== 'number' || isNaN(value)) value = 0;
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function formatTime(minutes) {
  if (typeof minutes !== 'number' || isNaN(minutes) || minutes <= 0) return '0 min';
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;
  return remaining > 0 ? `${hours}h ${remaining}m` : `${hours}h`;
}

function calculatePlan(materials, originalCost) {
  const safeMaterials = Array.isArray(materials) ? materials : [];
  const safeOriginal = typeof originalCost === 'number' && !isNaN(originalCost) && originalCost > 0 ? originalCost : 3500;

  const totalCost = safeMaterials.reduce((acc, item) => acc + (parseFloat(item.cost) || 0), 0);
  const totalTime = safeMaterials.reduce((acc, item) => acc + (parseInt(item.time, 10) || 15), 0);
  const savedCost = Math.max(0, safeOriginal - totalCost);
  const savedPercent = safeOriginal > 0 ? ((savedCost / safeOriginal) * 100).toFixed(1) : '0.0';

  let difficultyBadge = '🔧 Rápido & Indolor';
  if (totalTime <= 25 && totalCost <= 5) {
    difficultyBadge = '⚡ Ultra Rápido & Barato';
  } else if (totalTime <= 60) {
    difficultyBadge = '🔧 Rápido & Indolor';
  } else if (totalTime <= 120) {
    difficultyBadge = '✂️ Nível Médio de Gambiarra';
  } else {
    difficultyBadge = '🏆 Maratona Suprema de Sucata';
  }

  return {
    totalCost,
    totalTime,
    timeFormatted: formatTime(totalTime),
    savedCost,
    savedPercent,
    difficultyBadge
  };
}

function exportPlanAsJSON(planData) {
  const payload = {
    app: 'Porjeto Cospobre',
    versao: '3.0.0',
    tipo: 'Ficha Técnica de Planejamento de Materiais',
    data_exportacao: planData.date || new Date().toISOString(),
    referencia_original: {
      nome: planData.referenceName || 'Cosplay Desconhecido',
      custo_estimado: planData.originalCost || 0
    },
    resumo_cospobre: {
      custo_total: planData.totalCost || 0,
      custo_formatado: formatBRL(planData.totalCost || 0),
      tempo_total_minutos: planData.totalTime || 0,
      tempo_formatado: planData.timeFormatted || '0 min',
      total_economizado: planData.savedCost || 0,
      percentual_economia: `${planData.savedPercent || 0}%`,
      nivel_dificuldade: planData.difficultyBadge || 'Rápido & Indolor',
      quantidade_materiais: Array.isArray(planData.materials) ? planData.materials.length : 0
    },
    materiais: (planData.materials || []).map((m, idx) => ({
      item: idx + 1,
      nome: m.name,
      etapa: m.part || 'Geral',
      custo: parseFloat(m.cost) || 0,
      tempo_minutos: parseInt(m.time, 10) || 15
    }))
  };

  return JSON.stringify(payload, null, 2);
}

function exportPlanAsMarkdown(planData) {
  const materials = planData.materials || [];
  const refName = planData.referenceName || 'Cosplay Desconhecido';
  const originalCost = formatBRL(planData.originalCost || 0);
  const cospobreCost = formatBRL(planData.totalCost || 0);
  const saved = formatBRL(planData.savedCost || 0);
  const dateStr = new Date().toLocaleDateString('pt-BR');

  const rows = materials.map((m, idx) => {
    return `| ${idx + 1} | ${m.name} | ${m.part || 'Geral'} | ${formatBRL(parseFloat(m.cost) || 0)} | ${m.time || 15} min |`;
  }).join('\n');

  return `# 🎭 Ficha Técnica — Porjeto Cospobre

> **Personagem de Referência:** ${refName}  
> **Data de Emissão:** ${dateStr}  
> **Nível de Gambiarra:** ${planData.difficultyBadge || 'Rápido & Indolor'}

---

## 📊 Comparativo Econômico & de Tempo

| Métrica | Cosplay Original | Cospobre Low Cost | Balanço Geral |
| :--- | :--- | :--- | :--- |
| **Custo Total** | ${originalCost} | **${cospobreCost}** | **Economia de ${saved} (${planData.savedPercent}%)** |
| **Tempo de Execução** | ~80h a 150h | **${planData.timeFormatted}** | **Tempo Recorde** |

---

## 📦 Lista Detalhada de Materiais (${materials.length} itens planejados)

| # | Material Reciclável | Etapa / Aplicação | Custo Estimado | Tempo de Montagem |
| :-: | :--- | :--- | :-: | :-: |
${rows}

---

*Gerado com amor, fita crepe e papelão pelo [Porjeto Cospobre](https://cospobre.vercel.app/).*
`;
}

function sortRankingByCategory(items, category) {
  if (!Array.isArray(items)) return [];
  const cloned = [...items];

  switch (category) {
    case 'criatividade':
      return cloned.sort((a, b) => (b.creativityScore || 0) - (a.creativityScore || 0));
    case 'baixo-custo':
      return cloned.sort((a, b) => (a.costNum || 0) - (b.costNum || 0));
    case 'fidelidade':
      return cloned.sort((a, b) => (b.fidelityScore || 0) - (a.fidelityScore || 0));
    case 'geral':
    default:
      return cloned.sort((a, b) => (b.baseRating || 0) - (a.baseRating || 0));
  }
}

/* ==========================================================================
   EXECUÇÃO NO NAVEGADOR (DOM READY)
   ========================================================================== */

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {

    /* ------------------------------------------------------------------------
       PWA - REGISTRO DE SERVICE WORKER
       ------------------------------------------------------------------------ */
    if ('serviceWorker' in navigator && (window.location.protocol === 'https:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
      navigator.serviceWorker.register('./sw.js').then((reg) => {
        console.log('[PWA] Service Worker registrado com sucesso:', reg.scope);
      }).catch((err) => {
        console.warn('[PWA] Registro do Service Worker:', err);
      });
    }

    /* ------------------------------------------------------------------------
       ACESSIBILIDADE: LIVE REGION PARA LEITORES DE TELA
       ------------------------------------------------------------------------ */
    function announceA11y(message) {
      const liveRegion = document.getElementById('a11y-live-region');
      if (liveRegion) {
        liveRegion.textContent = '';
        setTimeout(() => {
          liveRegion.textContent = message;
        }, 50);
      }
    }

    /* ------------------------------------------------------------------------
       TOAST NOTIFICATIONS
       ------------------------------------------------------------------------ */
    function showToast(message) {
      let toast = document.getElementById('toast-notification');
      if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast-notification';
        toast.className = 'toast';
        toast.setAttribute('role', 'status');
        toast.setAttribute('aria-live', 'polite');
        document.body.appendChild(toast);
      }
      toast.textContent = message;
      toast.classList.add('show');

      setTimeout(() => {
        toast.classList.remove('show');
      }, 4500);
    }

    /* ------------------------------------------------------------------------
       1. INTERNACIONALIZAÇÃO (i18n) PT / EN
       ------------------------------------------------------------------------ */
    const langToggleBtn = document.getElementById('lang-toggle');
    let currentLang = 'pt-BR';

    try {
      const savedLang = localStorage.getItem('cospobre-lang');
      if (savedLang && (savedLang === 'pt-BR' || savedLang === 'en-US')) {
        currentLang = savedLang;
      }
    } catch {
      // Storage restrito
    }

    function applyLanguage(lang) {
      currentLang = lang;
      document.documentElement.lang = lang;
      try {
        localStorage.setItem('cospobre-lang', lang);
      } catch {
        // Storage restrito
      }

      const dict = TRANSLATIONS[lang] || TRANSLATIONS['pt-BR'];

      document.querySelectorAll('[data-i18n]').forEach((el) => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) {
          el.innerHTML = dict[key];
        }
      });

      if (langToggleBtn) {
        langToggleBtn.setAttribute('data-lang', lang);
        langToggleBtn.textContent = lang === 'pt-BR' ? 'PT' : 'EN';
        langToggleBtn.setAttribute(
          'aria-label',
          lang === 'pt-BR' ? 'Alternar idioma para English' : 'Switch language to Portuguese'
        );
        langToggleBtn.setAttribute(
          'title',
          lang === 'pt-BR' ? 'Mudar para Inglês' : 'Switch to Portuguese'
        );
      }
    }

    applyLanguage(currentLang);

    if (langToggleBtn) {
      langToggleBtn.addEventListener('click', () => {
        const nextLang = currentLang === 'pt-BR' ? 'en-US' : 'pt-BR';
        applyLanguage(nextLang);
        const feedback = nextLang === 'en-US' ? 'Language switched to English! 🌐' : 'Idioma alterado para Português! 🇧🇷';
        showToast(feedback);
        announceA11y(feedback);
      });
    }

    /* ------------------------------------------------------------------------
       2. TEMA DARK / LIGHT COM PERSISTÊNCIA
       ------------------------------------------------------------------------ */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIconSun = document.getElementById('theme-icon-sun');
    const themeIconMoon = document.getElementById('theme-icon-moon');

    function getSavedTheme() {
      try {
        const saved = localStorage.getItem('cospobre-theme');
        if (saved) return saved;
      } catch {}
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function applyTheme(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      try {
        localStorage.setItem('cospobre-theme', theme);
      } catch {}

      if (theme === 'dark') {
        if (themeIconSun) themeIconSun.style.display = 'block';
        if (themeIconMoon) themeIconMoon.style.display = 'none';
        if (themeToggleBtn) {
          themeToggleBtn.setAttribute('aria-label', 'Mudar para modo claro');
          themeToggleBtn.setAttribute('title', 'Mudar para modo claro');
        }
      } else {
        if (themeIconSun) themeIconSun.style.display = 'none';
        if (themeIconMoon) themeIconMoon.style.display = 'block';
        if (themeToggleBtn) {
          themeToggleBtn.setAttribute('aria-label', 'Mudar para modo escuro');
          themeToggleBtn.setAttribute('title', 'Mudar para modo escuro');
        }
      }
    }

    applyTheme(getSavedTheme());

    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') || 'light';
        const target = current === 'dark' ? 'light' : 'dark';
        applyTheme(target);
        showToast(`Modo ${target === 'dark' ? 'escuro' : 'claro'} ativado! 🎭`);
      });
    }

    /* ------------------------------------------------------------------------
       3. ALTO CONTRASTE (WCAG 2.2 AAA)
       ------------------------------------------------------------------------ */
    const contrastToggleBtn = document.getElementById('contrast-toggle');

    function getSavedContrast() {
      try {
        const saved = localStorage.getItem('cospobre-contrast');
        if (saved) return saved;
      } catch {}
      return window.matchMedia && window.matchMedia('(prefers-contrast: more)').matches ? 'high' : 'normal';
    }

    function applyContrast(contrast) {
      document.documentElement.setAttribute('data-contrast', contrast);
      try {
        localStorage.setItem('cospobre-contrast', contrast);
      } catch {}

      if (contrastToggleBtn) {
        const isHigh = contrast === 'high';
        contrastToggleBtn.setAttribute('aria-pressed', String(isHigh));
        contrastToggleBtn.setAttribute(
          'aria-label',
          isHigh ? 'Desativar modo de alto contraste' : 'Ativar modo de alto contraste'
        );
        contrastToggleBtn.setAttribute(
          'title',
          isHigh ? 'Desativar alto contraste' : 'Ativar alto contraste'
        );
      }
    }

    applyContrast(getSavedContrast());

    if (contrastToggleBtn) {
      contrastToggleBtn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-contrast') || 'normal';
        const target = current === 'high' ? 'normal' : 'high';
        applyContrast(target);
        const msg = target === 'high' ? 'Modo de alto contraste ativado! 👁️' : 'Modo de alto contraste desativado.';
        showToast(msg);
        announceA11y(msg);
      });
    }

    /* ------------------------------------------------------------------------
       4. NAVEGAÇÃO & MENU MOBILE
       ------------------------------------------------------------------------ */
    const navMenu = document.querySelector('nav .menu');
    const toggleMenuBtn = document.querySelector('.toggle-menu-btn');
    const navLinks = document.querySelectorAll('nav .menu ul li a');
    const header = document.querySelector('#header');

    if (toggleMenuBtn && navMenu) {
      toggleMenuBtn.addEventListener('click', () => {
        const isExpanded = toggleMenuBtn.getAttribute('aria-expanded') === 'true';
        toggleMenuBtn.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('show');
      });
    }

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (navMenu && navMenu.classList.contains('show')) {
          navMenu.classList.remove('show');
          if (toggleMenuBtn) toggleMenuBtn.setAttribute('aria-expanded', 'false');
        }
      });
    });

    function handleHeaderScroll() {
      if (!header) return;
      if (window.scrollY > 40) {
        header.classList.add('scroll');
      } else {
        header.classList.remove('scroll');
      }
    }

    const backToTopBtn = document.querySelector('.back-to-top');
    function handleBackToTop() {
      if (!backToTopBtn) return;
      if (window.scrollY >= 400) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }

    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    const sections = document.querySelectorAll('main section[id]');
    function highlightActiveMenu() {
      const scrollY = window.pageYOffset;
      sections.forEach((current) => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 120;
        const sectionId = current.getAttribute('id');
        const targetLink = document.querySelector(`nav .menu a[href*="${sectionId}"]`);

        if (targetLink) {
          if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            targetLink.classList.add('active');
          } else {
            targetLink.classList.remove('active');
          }
        }
      });
    }

    window.addEventListener('scroll', () => {
      handleHeaderScroll();
      handleBackToTop();
      highlightActiveMenu();
    });

    handleHeaderScroll();
    handleBackToTop();

    /* ------------------------------------------------------------------------
       5. FILTRO DE GALERIA POR CATEGORIA
       ------------------------------------------------------------------------ */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterButtons.forEach((b) => {
          b.classList.remove('active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');

        const filterValue = btn.getAttribute('data-filter');
        let visibleCount = 0;

        galleryItems.forEach((item) => {
          const itemCategory = item.getAttribute('data-category');
          if (filterValue === 'todos' || itemCategory === filterValue) {
            item.classList.remove('hidden');
            visibleCount++;
          } else {
            item.classList.add('hidden');
          }
        });

        announceA11y(`Filtro aplicado: ${btn.textContent.trim()}. ${visibleCount} cospobres visíveis.`);
      });
    });

    /* ------------------------------------------------------------------------
       6. MODAL LIGHTBOX ACESSÍVEL
       ------------------------------------------------------------------------ */
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxCloseBtn = document.getElementById('lightbox-close-btn');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDesc = document.getElementById('lightbox-desc');
    const lightboxCost = document.getElementById('lightbox-cost');
    const lightboxMaterials = document.getElementById('lightbox-materials');
    let lastActiveGalleryElement = null;

    function openLightbox(item) {
      if (!lightboxModal) return;
      lastActiveGalleryElement = document.activeElement;

      const img = item.querySelector('img');
      const title = item.querySelector('h3')?.textContent || 'Cospobre Lendário';
      const desc = item.querySelector('p')?.textContent || '';
      const cost = item.getAttribute('data-cost') || 'R$ 0,00';
      const materials = item.getAttribute('data-materials') || 'Papelão, fita crepe e criatividade';

      if (lightboxImg && img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = title;
      }
      if (lightboxTitle) lightboxTitle.textContent = title;
      if (lightboxDesc) lightboxDesc.textContent = desc;
      if (lightboxCost) lightboxCost.textContent = `Custo Total: ${cost}`;
      if (lightboxMaterials) lightboxMaterials.textContent = `Materiais: ${materials}`;

      lightboxModal.classList.add('active');
      lightboxModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';

      if (lightboxCloseBtn) lightboxCloseBtn.focus();
      announceA11y(`Janela modal de detalhes aberta: ${title}`);
    }

    function closeLightbox() {
      if (!lightboxModal) return;
      lightboxModal.classList.remove('active');
      lightboxModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';

      if (lastActiveGalleryElement && typeof lastActiveGalleryElement.focus === 'function') {
        lastActiveGalleryElement.focus();
      }
      announceA11y('Janela modal fechada.');
    }

    galleryItems.forEach((item) => {
      const thumb = item.querySelector('.gallery-thumb');
      if (thumb) {
        thumb.addEventListener('click', () => openLightbox(item));
        thumb.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openLightbox(item);
          }
        });
      }
    });

    if (lightboxCloseBtn) {
      lightboxCloseBtn.addEventListener('click', closeLightbox);
    }

    if (lightboxModal) {
      lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal) closeLightbox();
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightboxModal && lightboxModal.classList.contains('active')) {
        closeLightbox();
      }
    });

    /* ------------------------------------------------------------------------
       7. CARROSSEL ACESSÍVEL DE DEPOIMENTOS
       ------------------------------------------------------------------------ */
    const carouselContainer = document.getElementById('testimonials-carousel');
    const carouselTrack = document.getElementById('carousel-track');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    const dotsContainer = document.getElementById('carousel-dots');
    const carouselAnnouncer = document.getElementById('carousel-live-announcer');

    if (carouselContainer && carouselTrack) {
      const slides = Array.from(carouselTrack.querySelectorAll('.carousel-slide'));
      let currentIndex = 0;
      let isPaused = false;

      function updateCarousel(newIndex, announce = true) {
        if (newIndex < 0) newIndex = slides.length - 1;
        if (newIndex >= slides.length) newIndex = 0;
        currentIndex = newIndex;

        carouselTrack.style.transform = `translateX(-${currentIndex * 100}%)`;

        slides.forEach((slide, idx) => {
          const isActive = idx === currentIndex;
          slide.setAttribute('aria-hidden', !isActive);
          slide.tabIndex = isActive ? 0 : -1;
        });

        if (dotsContainer) {
          const dots = dotsContainer.querySelectorAll('.carousel-dot');
          dots.forEach((dot, idx) => {
            const isSelected = idx === currentIndex;
            dot.classList.toggle('active', isSelected);
            dot.setAttribute('aria-selected', isSelected ? 'true' : 'false');
          });
        }

        if (announce && carouselAnnouncer) {
          const currentAuthor = slides[currentIndex].querySelector('.carousel-author')?.textContent || '';
          carouselAnnouncer.textContent = `Slide ${currentIndex + 1} de ${slides.length}: ${currentAuthor}`;
        }
      }

      if (prevBtn) {
        prevBtn.addEventListener('click', () => updateCarousel(currentIndex - 1));
      }

      if (nextBtn) {
        nextBtn.addEventListener('click', () => updateCarousel(currentIndex + 1));
      }

      if (dotsContainer) {
        slides.forEach((slide, idx) => {
          const dot = document.createElement('button');
          dot.type = 'button';
          dot.className = `carousel-dot ${idx === 0 ? 'active' : ''}`;
          dot.setAttribute('role', 'tab');
          dot.setAttribute('aria-label', `Ir para slide ${idx + 1}`);
          dot.setAttribute('aria-selected', idx === 0 ? 'true' : 'false');
          dot.addEventListener('click', () => updateCarousel(idx));
          dotsContainer.appendChild(dot);
        });
      }

      carouselContainer.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          updateCarousel(currentIndex - 1);
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          updateCarousel(currentIndex + 1);
        }
      });

      carouselContainer.addEventListener('mouseenter', () => { isPaused = true; });
      carouselContainer.addEventListener('mouseleave', () => { isPaused = false; });
      carouselContainer.addEventListener('focusin', () => { isPaused = true; });
      carouselContainer.addEventListener('focusout', () => { isPaused = false; });

      setInterval(() => {
        if (!isPaused) updateCarousel(currentIndex + 1, false);
      }, 6000);

      updateCarousel(0, false);
    }

    /* ------------------------------------------------------------------------
       8. PLANEJADOR DE MATERIAIS COM CUSTO / TEMPO & EXPORTAÇÃO
       ------------------------------------------------------------------------ */
    const cosplayPreset = document.getElementById('calc-cosplay-preset');
    const customCostGroup = document.getElementById('calc-custom-cost-group');
    const customOriginalCost = document.getElementById('calc-custom-original-cost');
    const quickChips = document.querySelectorAll('.btn-material-chip');
    const customMatName = document.getElementById('custom-mat-name');
    const customMatPrice = document.getElementById('custom-mat-price');
    const customMatTime = document.getElementById('custom-mat-time');
    const customMatPart = document.getElementById('custom-mat-part');
    const btnAddCustomMat = document.getElementById('btn-add-custom-mat');
    const btnClearMaterials = document.getElementById('btn-clear-materials');
    const materialsListEl = document.getElementById('calc-materials-list');
    const materialsCountEl = document.getElementById('calc-materials-count');

    const displayOriginal = document.getElementById('calc-display-original');
    const displayCospobre = document.getElementById('calc-display-cospobre');
    const displayTime = document.getElementById('calc-display-time');
    const difficultyBadgeEl = document.getElementById('calc-difficulty-badge');
    const displaySaved = document.getElementById('calc-display-saved');
    const savingsPercentEl = document.getElementById('calc-savings-percent');
    const chartBarSaved = document.getElementById('chart-bar-saved');
    const chartBarCost = document.getElementById('chart-bar-cost');
    const gambiarraIcon = document.getElementById('gambiarra-icon');
    const gambiarraTitle = document.getElementById('gambiarra-title');
    const gambiarraDesc = document.getElementById('gambiarra-desc');

    const btnShareBudget = document.getElementById('btn-share-budget');
    const btnExportJson = document.getElementById('btn-export-json');
    const btnExportMd = document.getElementById('btn-export-md');
    const exportPreviewBox = document.getElementById('export-preview-box');
    const exportPreviewText = document.getElementById('export-preview-text');

    let currentMaterials = [
      { name: 'Papelão de Supermercado', cost: 0.00, time: 25, part: 'Armadura' },
      { name: 'Fita Crepe 50m', cost: 7.50, time: 15, part: 'Fixação' },
      { name: 'Caixa de Giz de Cera', cost: 4.20, time: 15, part: 'Pintura' }
    ];

    function getOriginalCosplayCost() {
      if (!cosplayPreset) return 4200;
      if (cosplayPreset.value === 'custom') {
        return parseFloat(customOriginalCost?.value || 3500) || 3500;
      }
      return parseFloat(cosplayPreset.value) || 4200;
    }

    function getSelectedReferenceName() {
      if (!cosplayPreset) return 'Homem de Ferro (Armadura Mark 85)';
      const selectedOption = cosplayPreset.options[cosplayPreset.selectedIndex];
      return selectedOption?.getAttribute('data-char') || selectedOption?.text || 'Cosplay de Referência';
    }

    function renderMaterialsList() {
      if (!materialsListEl) return;
      materialsListEl.innerHTML = '';

      if (currentMaterials.length === 0) {
        materialsListEl.innerHTML = sanitizeHtml(
          '<li style="color: var(--text-muted); font-size: 0.85rem;">Nenhum material adicionado ainda. Escolha itens rápidos acima ou cadastre!</li>'
        );
      } else {
        currentMaterials.forEach((item, index) => {
          const li = document.createElement('li');
          li.className = 'material-tag-item';
          li.innerHTML = sanitizeHtml(`
            <span>${item.name}</span>
            <small class="badge-part" style="background: rgba(245,158,11,0.15); color: var(--base-color); padding: 2px 6px; border-radius: 4px; font-size: 0.75rem;">${item.part || 'Geral'}</small>
            <span style="font-size: 0.8rem; color: var(--text-muted);">⏱️ ${item.time || 15}m</span>
            <strong>${formatBRL(item.cost)}</strong>
            <button type="button" class="btn-remove-material" data-index="${index}" aria-label="Remover ${item.name}">×</button>
          `);
          materialsListEl.appendChild(li);
        });

        materialsListEl.querySelectorAll('.btn-remove-material').forEach((btn) => {
          btn.addEventListener('click', () => {
            const idx = parseInt(btn.getAttribute('data-index'), 10);
            currentMaterials.splice(idx, 1);
            renderMaterialsList();
            recalculateBudget();
          });
        });
      }

      if (materialsCountEl) {
        materialsCountEl.textContent = currentMaterials.length;
      }
    }

    function recalculateBudget() {
      const originalCost = getOriginalCosplayCost();
      const plan = calculatePlan(currentMaterials, originalCost);

      if (displayOriginal) displayOriginal.textContent = formatBRL(originalCost);
      if (displayCospobre) displayCospobre.textContent = formatBRL(plan.totalCost);
      if (displayTime) displayTime.textContent = plan.timeFormatted;
      if (difficultyBadgeEl) difficultyBadgeEl.textContent = plan.difficultyBadge;
      if (displaySaved) displaySaved.textContent = formatBRL(plan.savedCost);
      if (savingsPercentEl) savingsPercentEl.textContent = `${plan.savedPercent}%`;

      if (chartBarSaved) {
        chartBarSaved.style.width = `${plan.savedPercent}%`;
        const textSpan = chartBarSaved.querySelector('.bar-text');
        if (textSpan) textSpan.textContent = `Economia: ${plan.savedPercent}%`;
      }

      if (chartBarCost) {
        chartBarCost.style.width = `${Math.min(100 - parseFloat(plan.savedPercent), 100)}%`;
      }

      if (gambiarraIcon && gambiarraTitle && gambiarraDesc) {
        const percentNum = parseFloat(plan.savedPercent);
        const coxinhas = Math.floor(plan.savedCost / 15);

        if (percentNum >= 99) {
          gambiarraIcon.textContent = '👑';
          gambiarraTitle.textContent = 'Mestre Supremo da Reciclagem Cósmica!';
          gambiarraDesc.textContent = `Você economizou impressionantes ${formatBRL(plan.savedCost)}! Dá para comprar nada menos que ${coxinhas} coxinhas com catupiry para a plateia inteira!`;
        } else if (percentNum >= 95) {
          gambiarraIcon.textContent = '🏆';
          gambiarraTitle.textContent = 'Engenheiro de Gambiarra Nível NASA!';
          gambiarraDesc.textContent = `Uma economia lendária de ${plan.savedPercent}%. O papelão e a fita crepe salvaram seu salário e garantiram seu troféu!`;
        } else if (percentNum >= 85) {
          gambiarraIcon.textContent = '✂️';
          gambiarraTitle.textContent = 'Cospobrer Ousado com Grife de Sucata!';
          gambiarraDesc.textContent = `Muito bom! Você poupou ${formatBRL(plan.savedCost)}. Dica de ouro: procure mais garrafas pet para baratear ainda mais!`;
        } else {
          gambiarraIcon.textContent = '💸';
          gambiarraTitle.textContent = 'Cospobre Burguês Detectado!';
          gambiarraDesc.textContent = `Você está gastando demais com materiais novos! Recicle itens da cozinha e baixe esse orçamento!`;
        }
      }
    }

    if (cosplayPreset) {
      cosplayPreset.addEventListener('change', () => {
        if (customCostGroup) {
          customCostGroup.style.display = cosplayPreset.value === 'custom' ? 'block' : 'none';
        }
        recalculateBudget();
      });
    }

    if (customOriginalCost) {
      customOriginalCost.addEventListener('input', recalculateBudget);
    }

    quickChips.forEach((chip) => {
      chip.addEventListener('click', () => {
        const name = chip.getAttribute('data-name');
        const cost = parseFloat(chip.getAttribute('data-cost')) || 0;
        const time = parseInt(chip.getAttribute('data-time'), 10) || 15;
        const part = chip.getAttribute('data-part') || 'Geral';

        currentMaterials.push({ name, cost, time, part });
        renderMaterialsList();
        recalculateBudget();
        showToast(`Adicionado: ${name} (${formatBRL(cost)} • ${time}m)`);
      });
    });

    if (btnAddCustomMat) {
      btnAddCustomMat.addEventListener('click', () => {
        const name = (customMatName?.value || '').trim();
        const cost = parseFloat(customMatPrice?.value || '0');
        const time = parseInt(customMatTime?.value || '20', 10);
        const part = customMatPart?.value || 'Geral';

        if (!name) {
          showToast('Por favor, informe o nome do material reciclável!');
          customMatName?.focus();
          return;
        }

        currentMaterials.push({
          name,
          cost: isNaN(cost) ? 0 : cost,
          time: isNaN(time) ? 15 : time,
          part
        });

        if (customMatName) customMatName.value = '';
        if (customMatPrice) customMatPrice.value = '0.00';
        if (customMatTime) customMatTime.value = '20';

        renderMaterialsList();
        recalculateBudget();
        showToast(`Material "${name}" adicionado com sucesso! 📦`);
      });
    }

    if (btnClearMaterials) {
      btnClearMaterials.addEventListener('click', () => {
        currentMaterials = [];
        renderMaterialsList();
        recalculateBudget();
        showToast('Lista de materiais zerada! 🧹');
      });
    }

    function triggerFileDownload(filename, content, mimeType) {
      try {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } catch (err) {
        console.warn('Erro no download:', err);
      }
    }

    function copyToClipboard(text, successMsg) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
          showToast(successMsg);
        }).catch(() => {
          showToast('Ficha técnica gerada com sucesso!');
        });
      } else {
        showToast('Ficha técnica gerada com sucesso!');
      }
    }

    if (btnExportJson) {
      btnExportJson.addEventListener('click', () => {
        const originalCost = getOriginalCosplayCost();
        const plan = calculatePlan(currentMaterials, originalCost);
        const jsonContent = exportPlanAsJSON({
          referenceName: getSelectedReferenceName(),
          originalCost,
          materials: currentMaterials,
          ...plan
        });

        if (exportPreviewBox && exportPreviewText) {
          exportPreviewBox.style.display = 'block';
          exportPreviewText.value = jsonContent;
          exportPreviewText.scrollIntoView({ behavior: 'smooth' });
        }

        triggerFileDownload('ficha-cospobre.json', jsonContent, 'application/json');
        copyToClipboard(jsonContent, 'JSON copiado para a área de transferência e download iniciado! 📄');
      });
    }

    if (btnExportMd) {
      btnExportMd.addEventListener('click', () => {
        const originalCost = getOriginalCosplayCost();
        const plan = calculatePlan(currentMaterials, originalCost);
        const mdContent = exportPlanAsMarkdown({
          referenceName: getSelectedReferenceName(),
          originalCost,
          materials: currentMaterials,
          ...plan
        });

        if (exportPreviewBox && exportPreviewText) {
          exportPreviewBox.style.display = 'block';
          exportPreviewText.value = mdContent;
          exportPreviewText.scrollIntoView({ behavior: 'smooth' });
        }

        triggerFileDownload('ficha-cospobre.md', mdContent, 'text/markdown');
        copyToClipboard(mdContent, 'Markdown copiado para a área de transferência e download iniciado! 📝');
      });
    }

    if (btnShareBudget) {
      btnShareBudget.addEventListener('click', () => {
        const original = displayOriginal?.textContent || 'R$ 4.200,00';
        const cospobre = displayCospobre?.textContent || 'R$ 11,70';
        const saved = displaySaved?.textContent || 'R$ 4.188,30';
        const percent = savingsPercentEl?.textContent || '99.7%';
        const time = displayTime?.textContent || '55 min';

        const shareMsg = `🎭 Minha Economia no Porjeto Cospobre!\n` +
          `Cosplay Original: ${original}\n` +
          `Meu Cospobre: ${cospobre} (Tempo: ${time})\n` +
          `Total Economizado: ${saved} (${percent} de economia!)\n` +
          `Simule o seu também em: ${window.location.href.split('#')[0]}#calculator`;

        copyToClipboard(shareMsg, 'Resumo da sua economia copiado para compartilhar! 📢');
      });
    }

    renderMaterialsList();
    recalculateBudget();

    /* ------------------------------------------------------------------------
       9. COMPARADOR LADO-A-LADO VISUAL
       ------------------------------------------------------------------------ */
    const comparatorPresetSelect = document.getElementById('comparator-preset');
    const comparatorSplitSlider = document.getElementById('comparator-split-slider');
    const comparatorSplitVal = document.getElementById('comparator-split-val');
    const comparatorGrid = document.getElementById('comparator-grid');

    const compRefTitle = document.getElementById('comp-ref-title');
    const compRefCost = document.getElementById('comp-ref-cost');
    const compRefTime = document.getElementById('comp-ref-time');
    const compRefMaterials = document.getElementById('comp-ref-materials');
    const compRefFidelity = document.getElementById('comp-ref-fidelity');
    const compRefImg = document.getElementById('comp-ref-img');

    const compCospobreTitle = document.getElementById('comp-cospobre-title');
    const compCospobreCost = document.getElementById('comp-cospobre-cost');
    const compCospobreTime = document.getElementById('comp-cospobre-time');
    const compCospobreMaterials = document.getElementById('comp-cospobre-materials');
    const compCospobreCharisma = document.getElementById('comp-cospobre-charisma');
    const compCospobreImg = document.getElementById('comp-cospobre-img');

    const compCostRatio = document.getElementById('comp-cost-ratio');
    const compTimeSaved = document.getElementById('comp-time-saved');
    const compRoiScore = document.getElementById('comp-roi-score');

    function applyComparatorPreset(key) {
      const data = COMPARATOR_PRESETS[key] || COMPARATOR_PRESETS.ironman;

      if (compRefTitle) compRefTitle.textContent = data.ref.title;
      if (compRefCost) compRefCost.textContent = data.ref.cost;
      if (compRefTime) compRefTime.textContent = data.ref.time;
      if (compRefMaterials) compRefMaterials.textContent = data.ref.materials;
      if (compRefFidelity) compRefFidelity.textContent = data.ref.fidelity;
      if (compRefImg) compRefImg.src = data.ref.img;

      if (compCospobreTitle) compCospobreTitle.textContent = data.cospobre.title;
      if (compCospobreCost) compCospobreCost.textContent = data.cospobre.cost;
      if (compCospobreTime) compCospobreTime.textContent = data.cospobre.time;
      if (compCospobreMaterials) compCospobreMaterials.textContent = data.cospobre.materials;
      if (compCospobreCharisma) compCospobreCharisma.textContent = data.cospobre.charisma;
      if (compCospobreImg) compCospobreImg.src = data.cospobre.img;

      if (compCostRatio) compCostRatio.textContent = data.metrics.costRatio;
      if (compTimeSaved) compTimeSaved.textContent = data.metrics.timeSaved;
      if (compRoiScore) compRoiScore.textContent = data.metrics.roiScore;
    }

    if (comparatorPresetSelect) {
      comparatorPresetSelect.addEventListener('change', (e) => {
        applyComparatorPreset(e.target.value);
        showToast(`Comparador atualizado para: ${e.target.options[e.target.selectedIndex].text}`);
      });
      applyComparatorPreset(comparatorPresetSelect.value);
    }

    if (comparatorSplitSlider) {
      comparatorSplitSlider.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10);
        const otherVal = 100 - val;
        if (comparatorSplitVal) {
          comparatorSplitVal.textContent = `${val}% / ${otherVal}%`;
        }
        if (comparatorGrid && window.innerWidth > 900) {
          comparatorGrid.style.gridTemplateColumns = `${val}fr ${otherVal}fr`;
        }
      });
    }

    /* ------------------------------------------------------------------------
       10. CRIADOR DE CARD COSPOBRE OFICIAL (CANVAS EXPORTÁVEL)
       ------------------------------------------------------------------------ */
    const cardCanvas = document.getElementById('card-canvas');
    const cardCanvasCtx = cardCanvas ? cardCanvas.getContext('2d') : null;
    const cardPhotoInput = document.getElementById('card-photo-input');
    const cardPhotoName = document.getElementById('card-photo-name');
    const cardCharNameInput = document.getElementById('card-char-name');
    const cardAuthorNameInput = document.getElementById('card-author-name');
    const cardFrameThemeSelect = document.getElementById('card-frame-theme');
    const cardStatCriatividade = document.getElementById('card-stat-criatividade');
    const statCriatividadeVal = document.getElementById('stat-criatividade-val');
    const cardStatCusto = document.getElementById('card-stat-custo');
    const statCustoVal = document.getElementById('stat-custo-val');
    const cardStatDurabilidade = document.getElementById('card-stat-durabilidade');
    const btnCardRandomExample = document.getElementById('btn-card-random-example');
    const btnDownloadCard = document.getElementById('btn-download-card');

    let currentCardImg = new Image();
    currentCardImg.crossOrigin = 'anonymous';
    currentCardImg.src = 'https://conteudo.imguol.com.br/c/entretenimento/2014/07/27/cosplayers-e-cospobre-1406486813367_300x300.jpg.webp';

    const randomCardExamples = [
      {
        char: 'Thor de Garrafa PET & Martelo de Caixa',
        author: 'Toninho Trovão',
        theme: 'lendario',
        criatividade: 98,
        custo: 6,
        durabilidade: '20 min ou ventania forte',
        img: 'https://mega.ibxk.com.br/2018/01/05/05130214420217.jpg'
      },
      {
        char: 'Goku Super Saiyajin com Cacho de Bananas',
        author: 'Cláudio Kamehameha',
        theme: 'gambiarra',
        criatividade: 100,
        custo: 4,
        durabilidade: 'Até as bananas madurarem',
        img: 'https://i.pinimg.com/originals/79/92/af/7992af84283566aa984fc1dedd755571.jpg'
      },
      {
        char: 'Sailor Moon de Toalha & Balde de Sorvete',
        author: 'Lari Lua',
        theme: 'esforco',
        criatividade: 95,
        custo: 3,
        durabilidade: 'Enquanto a toalha não cair',
        img: 'https://cdn1.mundodastribos.com/685234-30-cospobres-para-voce-usar-no-anime-friends-600x600.jpg'
      },
      {
        char: 'Darth Vader de Balde Preto & Vassoura',
        author: 'Marcão Sombrio',
        theme: 'comiccon',
        criatividade: 97,
        custo: 9,
        durabilidade: 'Até a vassoura quebrar',
        img: 'https://pm1.narvii.com/6354/6e5c41cdd76c6b4a23c2d13a70f1aba1b4ef9e06_hq.jpg'
      }
    ];

    function drawCard() {
      if (!cardCanvas || !cardCanvasCtx) return;

      const w = cardCanvas.width;
      const h = cardCanvas.height;

      cardCanvasCtx.clearRect(0, 0, w, h);

      const theme = cardFrameThemeSelect?.value || 'gambiarra';
      const charName = (cardCharNameInput?.value || 'Herói do Papelão').trim();
      const authorName = (cardAuthorNameInput?.value || 'Mestre da Gambiarra').trim();
      const criatividade = cardStatCriatividade ? parseInt(cardStatCriatividade.value, 10) : 99;
      const custo = cardStatCusto ? parseInt(cardStatCusto.value, 10) : 5;
      const durabilidade = (cardStatDurabilidade?.value || '15 min').trim();

      let frameColor1, frameBorder, themeTitle, badgeText;
      if (theme === 'lendario') {
        frameColor1 = '#f59e0b';
        frameBorder = '#fbbf24';
        themeTitle = '🌟 COSPOBRE LENDÁRIO 🌟';
        badgeText = 'CLASSE: MÍTICO';
      } else if (theme === 'comiccon') {
        frameColor1 = '#10b981';
        frameBorder = '#34d399';
        themeTitle = '⚡ TERROR DA COMIC CON ⚡';
        badgeText = 'CLASSE: CYBERPUNK';
      } else if (theme === 'esforco') {
        frameColor1 = '#ec4899';
        frameBorder = '#f472b6';
        themeTitle = '💖 NOTA 10 PELO ESFORÇO 💖';
        badgeText = 'CLASSE: PURO AMOR';
      } else {
        frameColor1 = '#d97706';
        frameBorder = '#f59e0b';
        themeTitle = '🔧 MESTRE DA GAMBIARRA 🔧';
        badgeText = 'SELO INMETRO GAMBIARRA';
      }

      const cardBgGrad = cardCanvasCtx.createLinearGradient(0, 0, w, h);
      cardBgGrad.addColorStop(0, '#111827');
      cardBgGrad.addColorStop(0.5, '#1f2937');
      cardBgGrad.addColorStop(1, '#0f172a');
      cardCanvasCtx.fillStyle = cardBgGrad;
      cardCanvasCtx.fillRect(0, 0, w, h);

      cardCanvasCtx.lineWidth = 14;
      cardCanvasCtx.strokeStyle = frameBorder;
      cardCanvasCtx.strokeRect(7, 7, w - 14, h - 14);

      cardCanvasCtx.lineWidth = 2;
      cardCanvasCtx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      cardCanvasCtx.strokeRect(18, 18, w - 36, h - 36);

      cardCanvasCtx.fillStyle = frameColor1;
      cardCanvasCtx.fillRect(20, 20, w - 40, 46);

      cardCanvasCtx.fillStyle = '#ffffff';
      cardCanvasCtx.font = '900 16px Poppins, sans-serif';
      cardCanvasCtx.textAlign = 'center';
      cardCanvasCtx.fillText(themeTitle, w / 2, 49);

      const photoX = 35;
      const photoY = 80;
      const photoW = w - 70;
      const photoH = 290;

      cardCanvasCtx.fillStyle = '#030712';
      cardCanvasCtx.fillRect(photoX, photoY, photoW, photoH);

      if (currentCardImg.complete && currentCardImg.naturalWidth > 0) {
        const imgRatio = currentCardImg.naturalWidth / currentCardImg.naturalHeight;
        const targetRatio = photoW / photoH;
        let sW, sH, sX, sY;

        if (imgRatio > targetRatio) {
          sH = currentCardImg.naturalHeight;
          sW = sH * targetRatio;
          sX = (currentCardImg.naturalWidth - sW) / 2;
          sY = 0;
        } else {
          sW = currentCardImg.naturalWidth;
          sH = sW / targetRatio;
          sX = 0;
          sY = (currentCardImg.naturalHeight - sH) / 2;
        }

        cardCanvasCtx.drawImage(currentCardImg, sX, sY, sW, sH, photoX, photoY, photoW, photoH);
      } else {
        cardCanvasCtx.fillStyle = '#ffffff';
        cardCanvasCtx.font = 'bold 16px sans-serif';
        cardCanvasCtx.textAlign = 'center';
        cardCanvasCtx.fillText('Carregando foto...', w / 2, photoY + photoH / 2);
      }

      cardCanvasCtx.lineWidth = 4;
      cardCanvasCtx.strokeStyle = frameBorder;
      cardCanvasCtx.strokeRect(photoX, photoY, photoW, photoH);

      cardCanvasCtx.fillStyle = 'rgba(0, 0, 0, 0.85)';
      cardCanvasCtx.fillRect(photoX + 8, photoY + 8, 170, 26);
      cardCanvasCtx.fillStyle = frameColor1;
      cardCanvasCtx.font = '800 11px Poppins, sans-serif';
      cardCanvasCtx.textAlign = 'left';
      cardCanvasCtx.fillText(badgeText, photoX + 16, photoY + 25);

      const bannerY = 385;
      cardCanvasCtx.fillStyle = '#0f172a';
      cardCanvasCtx.fillRect(30, bannerY, w - 60, 62);
      cardCanvasCtx.lineWidth = 2;
      cardCanvasCtx.strokeStyle = frameBorder;
      cardCanvasCtx.strokeRect(30, bannerY, w - 60, 62);

      cardCanvasCtx.fillStyle = '#ffffff';
      cardCanvasCtx.font = '800 18px Poppins, sans-serif';
      cardCanvasCtx.textAlign = 'center';
      cardCanvasCtx.fillText(charName, w / 2, bannerY + 27);

      cardCanvasCtx.fillStyle = '#94a3b8';
      cardCanvasCtx.font = '500 13px DM Sans, sans-serif';
      cardCanvasCtx.fillText(`Criado por: ${authorName}`, w / 2, bannerY + 49);

      const statsY = 465;
      cardCanvasCtx.fillStyle = 'rgba(0, 0, 0, 0.45)';
      cardCanvasCtx.fillRect(30, statsY, w - 60, 160);
      cardCanvasCtx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      cardCanvasCtx.strokeRect(30, statsY, w - 60, 160);

      cardCanvasCtx.fillStyle = '#f8fafc';
      cardCanvasCtx.font = '700 13px Poppins, sans-serif';
      cardCanvasCtx.textAlign = 'left';
      cardCanvasCtx.fillText(`🧠 Criatividade: ${criatividade}/100`, 45, statsY + 30);

      const barW = w - 90;
      cardCanvasCtx.fillStyle = '#374151';
      cardCanvasCtx.fillRect(45, statsY + 38, barW, 10);
      cardCanvasCtx.fillStyle = '#10b981';
      cardCanvasCtx.fillRect(45, statsY + 38, (barW * criatividade) / 100, 10);

      cardCanvasCtx.fillStyle = '#f8fafc';
      cardCanvasCtx.fillText(`💰 Custo do Projeto: R$ ${custo},00`, 45, statsY + 75);
      cardCanvasCtx.fillStyle = '#374151';
      cardCanvasCtx.fillRect(45, statsY + 83, barW, 10);
      cardCanvasCtx.fillStyle = '#f59e0b';
      cardCanvasCtx.fillRect(45, statsY + 83, Math.min(barW, (barW * custo) / 50), 10);

      cardCanvasCtx.fillStyle = '#f8fafc';
      cardCanvasCtx.fillText(`🛡️ Durabilidade: ${durabilidade}`, 45, statsY + 120);

      cardCanvasCtx.fillStyle = '#64748b';
      cardCanvasCtx.font = '700 11px monospace';
      cardCanvasCtx.textAlign = 'center';
      cardCanvasCtx.fillText('★ EDIÇÃO OFICIAL PORJETO COSPOBRE 2026 ★', w / 2, h - 25);
    }

    currentCardImg.onload = drawCard;

    [cardCharNameInput, cardAuthorNameInput, cardStatDurabilidade].forEach((inp) => {
      if (inp) inp.addEventListener('input', drawCard);
    });

    if (cardFrameThemeSelect) {
      cardFrameThemeSelect.addEventListener('change', drawCard);
    }

    if (cardStatCriatividade && statCriatividadeVal) {
      cardStatCriatividade.addEventListener('input', (e) => {
        statCriatividadeVal.textContent = e.target.value;
        drawCard();
      });
    }

    if (cardStatCusto && statCustoVal) {
      cardStatCusto.addEventListener('input', (e) => {
        statCustoVal.textContent = `R$ ${e.target.value},00`;
        drawCard();
      });
    }

    if (cardPhotoInput) {
      cardPhotoInput.addEventListener('change', (e) => {
        const file = e.target.files?.[0];
        if (file) {
          if (cardPhotoName) cardPhotoName.textContent = `Foto: ${file.name}`;
          const reader = new FileReader();
          reader.onload = (event) => {
            currentCardImg = new Image();
            currentCardImg.onload = () => {
              drawCard();
              showToast('Foto do cospobre aplicada ao card com sucesso! 📷');
            };
            currentCardImg.src = event.target.result;
          };
          reader.readAsDataURL(file);
        }
      });
    }

    if (btnCardRandomExample) {
      btnCardRandomExample.addEventListener('click', () => {
        const random = randomCardExamples[Math.floor(Math.random() * randomCardExamples.length)];
        if (cardCharNameInput) cardCharNameInput.value = random.char;
        if (cardAuthorNameInput) cardAuthorNameInput.value = random.author;
        if (cardFrameThemeSelect) cardFrameThemeSelect.value = random.theme;
        if (cardStatCriatividade) cardStatCriatividade.value = random.criatividade;
        if (statCriatividadeVal) statCriatividadeVal.textContent = random.criatividade;
        if (cardStatCusto) cardStatCusto.value = random.custo;
        if (statCustoVal) statCustoVal.textContent = `R$ ${random.custo},00`;
        if (cardStatDurabilidade) cardStatDurabilidade.value = random.durabilidade;

        currentCardImg = new Image();
        currentCardImg.crossOrigin = 'anonymous';
        currentCardImg.onload = drawCard;
        currentCardImg.src = random.img;

        showToast(`Exemplo "${random.char}" carregado! 🎲`);
      });
    }

    if (btnDownloadCard && cardCanvas) {
      btnDownloadCard.addEventListener('click', () => {
        try {
          const dataUrl = cardCanvas.toDataURL('image/png');
          const link = document.createElement('a');
          link.download = `card-cospobre-${Date.now()}.png`;
          link.href = dataUrl;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          showToast('Card colecionável baixado em alta resolução! 📥');
        } catch (err) {
          console.warn('Erro ao baixar card:', err);
          showToast('Clique com o botão direito no card e selecione "Salvar imagem como..."');
        }
      });
    }

    drawCard();

    /* ------------------------------------------------------------------------
       11. SISTEMA DE VOTAÇÃO E RANKING DINÂMICO POR CATEGORIAS
       ------------------------------------------------------------------------ */
    const defaultContestants = [
      {
        id: 'cospobre-1',
        name: 'Homem de Ferro de Papelão',
        author: 'Toninho da Sucata',
        cost: 'R$ 7,50',
        costNum: 7.50,
        materials: 'Caixas de papelão, fita crepe amarela, lanterna de celular no peito',
        image: 'https://mega.ibxk.com.br/2018/01/05/05130214420217.jpg',
        baseRating: 4.9,
        totalVotes: 142,
        creativityScore: 98,
        fidelityScore: 89,
        categoryTag: 'Cinema & Heróis'
      },
      {
        id: 'cospobre-2',
        name: 'Goku Super Saiyajin de Bananas',
        author: 'Cláudio Saiyajin',
        cost: 'R$ 6,00',
        costNum: 6.00,
        materials: 'Cacho de bananas maduras na cabeça, camisa rasgada de academia',
        image: 'https://i.pinimg.com/originals/79/92/af/7992af84283566aa984fc1dedd755571.jpg',
        baseRating: 4.8,
        totalVotes: 128,
        creativityScore: 100,
        fidelityScore: 84,
        categoryTag: 'Animes & Mangás'
      },
      {
        id: 'cospobre-3',
        name: 'Sailor Moon de Toalha & Balde',
        author: 'Mariana Gambiarra',
        cost: 'R$ 3,50',
        costNum: 3.50,
        materials: 'Toalha de banho amarela, pregadores, tiara de papel alumínio',
        image: 'https://cdn1.mundodastribos.com/685234-30-cospobres-para-voce-usar-no-anime-friends-600x600.jpg',
        baseRating: 4.7,
        totalVotes: 115,
        creativityScore: 94,
        fidelityScore: 91,
        categoryTag: 'Animes & Mangás'
      },
      {
        id: 'cospobre-4',
        name: 'Darth Vader de Balde Preto',
        author: 'Marcão das Galáxias',
        cost: 'R$ 12,00',
        costNum: 12.00,
        materials: 'Balde de lixo preto, cabo de vassoura vermelho, capa de saco de lixo',
        image: 'https://pm1.narvii.com/6354/6e5c41cdd76c6b4a23c2d13a70f1aba1b4ef9e06_hq.jpg',
        baseRating: 4.6,
        totalVotes: 98,
        creativityScore: 92,
        fidelityScore: 95,
        categoryTag: 'Cinema & Sci-Fi'
      },
      {
        id: 'cospobre-5',
        name: 'Tartaruga Ninja de Bacia',
        author: 'Leonardo da Quebrada',
        cost: 'R$ 8,00',
        costNum: 8.00,
        materials: 'Bacia plástica verde amarrada nas costas, máscara de pano velho',
        image: 'https://4.bp.blogspot.com/-WhXqEwEw5Ug/WSQnEHzq4FI/AAAAAAAAGiA/qtarjF751xsLePjy2-_SSJ3JS07GvlQAACLcB/s1600/57065-para-um-cospobre-de-tartarugas-ninja-diapo-2.jpg',
        baseRating: 4.5,
        totalVotes: 87,
        creativityScore: 96,
        fidelityScore: 88,
        categoryTag: 'Animação & HQs'
      }
    ];

    function getStoredRatings() {
      try {
        const saved = localStorage.getItem('cospobre_community_ratings');
        if (saved) {
          const parsed = JSON.parse(saved);
          return parsed.map((item, i) => ({ ...defaultContestants[i], ...item }));
        }
      } catch {}
      return defaultContestants;
    }

    function saveStoredRatings(data) {
      try {
        localStorage.setItem('cospobre_community_ratings', JSON.stringify(data));
      } catch {}
    }

    function getUserVotes() {
      try {
        const saved = localStorage.getItem('cospobre_user_votes');
        return saved ? JSON.parse(saved) : {};
      } catch {
        return {};
      }
    }

    function saveUserVote(contestantId, score) {
      try {
        const userVotes = getUserVotes();
        userVotes[contestantId] = score;
        localStorage.setItem('cospobre_user_votes', JSON.stringify(userVotes));
      } catch {}
    }

    let contestants = getStoredRatings();
    let currentRankingCategory = 'geral';

    const podiumContainer = document.getElementById('podium-container');
    const podiumHeading = document.getElementById('podium-category-heading');
    const votingCardsGrid = document.getElementById('voting-cards-grid');
    const rankingTabs = document.querySelectorAll('.ranking-tab');

    function renderPodium() {
      if (!podiumContainer) return;

      const sorted = sortRankingByCategory(contestants, currentRankingCategory);
      const top1 = sorted[0];
      const top2 = sorted[1];
      const top3 = sorted[2];

      if (!top1 || !top2 || !top3) return;

      function getMetricText(item) {
        if (currentRankingCategory === 'criatividade') {
          return `🧠 <strong>${item.creativityScore}/100</strong> Criatividade`;
        } else if (currentRankingCategory === 'baixo-custo') {
          return `💰 Custo: <strong>${item.cost}</strong>`;
        } else if (currentRankingCategory === 'fidelidade') {
          return `🎯 <strong>${item.fidelityScore}%</strong> Fidelidade`;
        }
        return `⭐ ${item.baseRating.toFixed(1)} <small>(${item.totalVotes} votos)</small>`;
      }

      podiumContainer.innerHTML = sanitizeHtml(`
        <!-- 2º Lugar (Prata) -->
        <div class="podium-item podium-2">
          <span class="podium-medal" aria-hidden="true">🥈</span>
          <img src="${top2.image}" alt="Cospobre ${top2.name}" class="podium-img" loading="lazy" />
          <strong class="podium-name">${top2.name}</strong>
          <span class="podium-char">por ${top2.author}</span>
          <div class="podium-score">${getMetricText(top2)}</div>
        </div>

        <!-- 1º Lugar (Ouro) -->
        <div class="podium-item podium-1">
          <span class="podium-crown" aria-hidden="true">👑</span>
          <span class="podium-medal" aria-hidden="true">🥇</span>
          <img src="${top1.image}" alt="Cospobre campeão ${top1.name}" class="podium-img" loading="lazy" />
          <strong class="podium-name">${top1.name}</strong>
          <span class="podium-char">por ${top1.author}</span>
          <div class="podium-score">${getMetricText(top1)}</div>
        </div>

        <!-- 3º Lugar (Bronze) -->
        <div class="podium-item podium-3">
          <span class="podium-medal" aria-hidden="true">🥉</span>
          <img src="${top3.image}" alt="Cospobre ${top3.name}" class="podium-img" loading="lazy" />
          <strong class="podium-name">${top3.name}</strong>
          <span class="podium-char">por ${top3.author}</span>
          <div class="podium-score">${getMetricText(top3)}</div>
        </div>
      `);
    }

    function renderVotingCards() {
      if (!votingCardsGrid) return;
      votingCardsGrid.innerHTML = '';

      const userVotes = getUserVotes();
      const sorted = sortRankingByCategory(contestants, currentRankingCategory);

      sorted.forEach((item) => {
        const myVote = userVotes[item.id] || 0;
        const card = document.createElement('article');
        card.className = 'vote-card';
        card.setAttribute('data-id', item.id);

        card.innerHTML = sanitizeHtml(`
          <div class="vote-card-thumb">
            <img src="${item.image}" alt="Cospobre de ${item.name}" loading="lazy" />
            <span class="vote-cost-badge">Custo: ${item.cost}</span>
          </div>
          <div class="vote-card-body">
            <h4>${item.name}</h4>
            <span class="vote-author">Por: ${item.author} • <small style="color: var(--base-color);">${item.categoryTag || 'Geral'}</small></span>
            <p class="vote-materials"><strong>Materiais:</strong> ${item.materials}</p>

            <div class="vote-stars-box">
              <div class="stars-interactive-row" data-id="${item.id}" aria-label="Avaliar de 1 a 5 estrelas">
                ${[1, 2, 3, 4, 5].map((starNum) => `
                  <button
                    type="button"
                    class="star-btn ${starNum <= myVote ? 'active' : ''}"
                    data-star="${starNum}"
                    aria-label="Dar nota ${starNum} estrelas para ${item.name}"
                  >★</button>
                `).join('')}
              </div>

              <div class="vote-score-meta">
                <span>Média: <strong>${item.baseRating.toFixed(1)} ★</strong> (${item.totalVotes} votos)</span>
                <span class="user-vote-indicator" id="user-vote-${item.id}">
                  ${myVote > 0 ? `Seu voto: ${myVote} ★` : 'Vote agora'}
                </span>
              </div>
            </div>
          </div>
        `);

        const starsRow = card.querySelector('.stars-interactive-row');
        const starBtns = starsRow.querySelectorAll('.star-btn');

        starBtns.forEach((btn) => {
          const starVal = parseInt(btn.getAttribute('data-star'), 10);

          btn.addEventListener('mouseenter', () => {
            starBtns.forEach((b, i) => {
              if (i < starVal) b.classList.add('hovered');
              else b.classList.remove('hovered');
            });
          });

          btn.addEventListener('mouseleave', () => {
            starBtns.forEach((b) => b.classList.remove('hovered'));
          });

          btn.addEventListener('click', () => {
            handleVote(item.id, starVal);
          });
        });

        votingCardsGrid.appendChild(card);
      });
    }

    function handleVote(contestantId, score) {
      const item = contestants.find((c) => c.id === contestantId);
      if (!item) return;

      const userVotes = getUserVotes();
      const hadVoted = userVotes[contestantId];

      if (!hadVoted) {
        item.totalVotes += 1;
        item.baseRating = ((item.baseRating * (item.totalVotes - 1)) + score) / item.totalVotes;
      } else {
        item.baseRating = ((item.baseRating * item.totalVotes) - hadVoted + score) / item.totalVotes;
      }

      saveUserVote(contestantId, score);
      saveStoredRatings(contestants);

      renderPodium();
      renderVotingCards();

      showToast(`Obrigado pelo seu voto de ${score} ★ em ${item.name}! 🌟`);
    }

    rankingTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        rankingTabs.forEach((t) => {
          t.classList.remove('active');
          t.setAttribute('aria-pressed', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-pressed', 'true');

        currentRankingCategory = tab.getAttribute('data-rank-cat') || 'geral';

        if (podiumHeading) {
          if (currentRankingCategory === 'criatividade') {
            podiumHeading.textContent = '🧠 Pódio: Criatividade Extrema & Inovação';
          } else if (currentRankingCategory === 'baixo-custo') {
            podiumHeading.textContent = '💰 Pódio: Baixo Custo Absoluto (Menor Orçamento)';
          } else if (currentRankingCategory === 'fidelidade') {
            podiumHeading.textContent = '🎯 Pódio: Fidelidade Visual da Gambiarra';
          } else {
            podiumHeading.textContent = '🏆 Pódio dos Melhores Cospobres da Semana';
          }
        }

        renderPodium();
        renderVotingCards();
        announceA11y(`Ranking atualizado para categoria: ${tab.textContent.trim()}`);
      });
    });

    renderPodium();
    renderVotingCards();

    /* ------------------------------------------------------------------------
       12. FORMULÁRIO DE INSCRIÇÃO COM VALIDAÇÃO EM TEMPO REAL
       ------------------------------------------------------------------------ */
    const registrationForm = document.getElementById('cospobre-form');
    const nameInput = document.getElementById('cosplay-name');
    const emailInput = document.getElementById('cosplay-email');
    const charInput = document.getElementById('cosplay-char');
    const costInput = document.getElementById('cosplay-cost');
    const materialsInput = document.getElementById('cosplay-materials');

    function setValidationState(input, isValid, errorMsg) {
      const parent = input.closest('.form-group');
      if (!parent) return isValid;

      const errorEl = parent.querySelector('.error-message');

      if (isValid) {
        parent.classList.remove('error');
        parent.classList.add('success');
        if (errorEl) errorEl.style.display = 'none';
      } else {
        parent.classList.remove('success');
        parent.classList.add('error');
        if (errorEl) {
          errorEl.textContent = errorMsg;
          errorEl.style.display = 'block';
        }
      }
      return isValid;
    }

    function validateName() {
      if (!nameInput) return true;
      const val = nameInput.value.trim();
      if (val.length < 3) {
        return setValidationState(nameInput, false, 'O nome deve ter no mínimo 3 caracteres.');
      }
      return setValidationState(nameInput, true);
    }

    function validateEmail() {
      if (!emailInput) return true;
      const val = emailInput.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(val)) {
        return setValidationState(emailInput, false, 'Informe um endereço de e-mail válido.');
      }
      return setValidationState(emailInput, true);
    }

    function validateCharacter() {
      if (!charInput) return true;
      const val = charInput.value.trim();
      if (val.length < 2) {
        return setValidationState(charInput, false, 'Informe o personagem ou inspiração.');
      }
      return setValidationState(charInput, true);
    }

    function validateCost() {
      if (!costInput) return true;
      const val = parseFloat(costInput.value);
      if (isNaN(val) || val < 0) {
        return setValidationState(costInput, false, 'Informe um custo válido em R$ (pode ser 0).');
      }
      if (val > 50) {
        return setValidationState(costInput, false, 'Passou de R$ 50 já é burguês! Mantenha o espírito cospobre.');
      }
      return setValidationState(costInput, true);
    }

    function validateMaterials() {
      if (!materialsInput) return true;
      const val = materialsInput.value.trim();
      if (val.length < 6) {
        return setValidationState(materialsInput, false, 'Cite ao menos os principais materiais usados (ex: papelão, fita).');
      }
      return setValidationState(materialsInput, true);
    }

    if (nameInput) {
      nameInput.addEventListener('input', validateName);
      nameInput.addEventListener('blur', validateName);
    }
    if (emailInput) {
      emailInput.addEventListener('input', validateEmail);
      emailInput.addEventListener('blur', validateEmail);
    }
    if (charInput) {
      charInput.addEventListener('input', validateCharacter);
      charInput.addEventListener('blur', validateCharacter);
    }
    if (costInput) {
      costInput.addEventListener('input', validateCost);
      costInput.addEventListener('blur', validateCost);
    }
    if (materialsInput) {
      materialsInput.addEventListener('input', validateMaterials);
      materialsInput.addEventListener('blur', validateMaterials);
    }

    if (registrationForm) {
      registrationForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isCharValid = validateCharacter();
        const isCostValid = validateCost();
        const isMatValid = validateMaterials();

        if (isNameValid && isEmailValid && isCharValid && isCostValid && isMatValid) {
          const cosplayerName = nameInput.value.trim();
          showToast(`Inscrição enviada com sucesso! Boa sorte, ${cosplayerName}! 🏆`);
          registrationForm.reset();

          document.querySelectorAll('.form-group').forEach((group) => {
            group.classList.remove('success', 'error');
          });
        } else {
          showToast('Por favor, corrija os campos indicados em vermelho antes de enviar.');
        }
      });
    }

  });
}

/* ==========================================================================
   EXPORTAÇÃO PARA TESTES AUTOMATIZADOS EM NODE.JS
   ========================================================================== */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    sanitizeHtml,
    formatBRL,
    formatTime,
    calculatePlan,
    exportPlanAsJSON,
    exportPlanAsMarkdown,
    sortRankingByCategory,
    COMPARATOR_PRESETS,
    TRANSLATIONS
  };
}
