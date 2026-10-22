# Segurança

## Relatar uma vulnerabilidade

Caso identifique qualquer falha de segurança, relate de forma privada e responsável através da aba **Security → Report a vulnerability** no repositório GitHub (ou abrindo uma issue solicitando canal de contato privado). Não publique vetores de ataque nem informações sensíveis em issues públicas.

Por favor, forneça:
- Descrição detalhada e passos para reprodução.
- Impacto esperado e escopo afetado.
- Navegador e sistema operacional utilizados.

## Modelo e escopo do projeto

O **Porjeto-cospobre** é um site puramente estático (HTML, CSS e JavaScript client-side):
- **Execução estritamente no cliente**: não existem APIs, serviços backend nem bancos de dados associados.
- **Isenção de dados privados**: não há coleta de dados de usuários, sessões, senhas ou armazenamento sensível em `localStorage`/`sessionStorage`.
- **Integridade visual e de recursos**: recursos estáticos locais não executam código dinâmico não verificado.

## Boas práticas para colaboradores

- Nunca comite segredos, arquivos de configuração com credenciais ou arquivos temporários.
- Garanta que dependências e links externos utilizem HTTPS estrito.
