# Guia de Contribuição — Porjeto Cospobre 🎭

Ficamos felizes com o seu interesse em contribuir com o **Porjeto Cospobre**! Para manter a organização, acessibilidade e evolução saudável da plataforma, siga as orientações deste documento.

---

## 🛠️ Boas Práticas e Diretrizes de Código

1. **Responsividade & UX**:
   - Assegure que os cards, grids e sliders funcionem perfeitamente em telas pequenas e grandes.
   - Utilize a folha de estilos `style.css` mantendo a consistência visual do projeto.
2. **HTML Semântico & Acessibilidade**:
   - Imagens devem possuir textos alternativos (`alt`) descritivos.
   - Componentes interativos devem permitir navegação por teclado.
3. **Imagens e Mídias**:
   - Utilize links com URLs seguras (HTTPS) e formatos otimizados (WebP/JPEG compacto) para não sobrecarregar o carregamento.

---

## 📋 Padrão de Commits (Conventional Commits)

Seguimos a convenção de [Conventional Commits](https://www.conventionalcommits.org/pt-br/v1.0.0/):

```text
<tipo>(<escopo opcional>): <descrição no imperativo>
```

### Exemplos:
- `feat(slider): adiciona novos cards de cospobre no Swiper`
- `fix(layout): corrige quebra de linha no header em dispositivos mobile`
- `docs(readme): atualiza instruções de início rápido`
- `style(cards): melhora o espaçamento e sombras dos elementos`
- `refactor(js): modulariza manipulação de eventos no main.js`

---

## 🚀 Como Enviar um Pull Request (PR)

1. **Fork e Clone**:
   Faça o fork do repositório no seu perfil e clone-o.
2. **Branch Semântica**:
   ```bash
   git checkout -b feat/adiciona-secao-anime
   ```
3. **Desenvolvimento e Teste**:
   Abra `js.html` ou inicie um servidor local (`npx serve .`) e teste as alterações em diferentes resoluções.
4. **Commit Semântico**:
   ```bash
   git commit -m "feat(galeria): adiciona novos exemplos de cosplay de baixo custo"
   ```
5. **Abertura do PR**:
   - Explique as mudanças implementadas.
   - Inclua capturas de tela das novidades.
   - Certifique-se de que não há código duplicado ou quebrado.
