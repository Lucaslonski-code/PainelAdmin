
# Troubleshooting

Problemas reais e verificáveis a partir do código e da configuração deste projeto.

---

## Dois gerenciadores de pacotes (npm e pnpm) presentes

**Sintoma:** comportamento de instalação inconsistente entre máquinas diferentes da equipe.

**Causa confirmada:** o repositório contém `package-lock.json` (npm) **e**
`pnpm-lock.yaml` (pnpm) simultaneamente, além de um `pnpm-workspace.yaml` — que só tem
efeito quando o projeto é instalado com pnpm.

**Diagnóstico:**
```bash
ls package-lock.json pnpm-lock.yaml pnpm-workspace.yaml
```

**Solução recomendada:** como `pnpm-workspace.yaml` só faz sentido com pnpm (é o arquivo que
define a chave `allowBuilds`, necessária para permitir o script de build da dependência
`@google/genai` durante a instalação), padronize em **pnpm** e remova `package-lock.json`:
```bash
rm package-lock.json
pnpm install
```

---

## `pnpm run lint` não denuncia problemas de estilo/qualidade de código

**Sintoma:** código com problemas de estilo, variáveis não utilizadas ou padrões
inconsistentes passa despercebido mesmo após rodar `pnpm lint`.

**Causa confirmada:** o script `lint` executa apenas `tsc --noEmit` (checagem de tipos do
TypeScript). Não há ESLint instalado (`eslint` não está em `package.json`) nem qualquer
arquivo `.eslintrc.*`/`eslint.config.*` no repositório.

**Solução:** se for necessário lint de estilo, será preciso instalar e configurar o ESLint
do zero (`npm install -D eslint` ou `pnpm add -D eslint`, seguido da criação de um
`eslint.config.mjs`) — isso não existe hoje no projeto.

---

## Clicar em "Salvar", "Criar", "Excluir" ou "Enviar Convite" não muda nada na tela

Este não é um bug — é o comportamento atual confirmado do projeto. Todos os modais de
criação/edição/exclusão (`EmpresasPage.tsx`, `UsuariosPage.tsx`) e todos os formulários das
páginas de Configurações e Perfil têm botões de ação que **apenas fecham o modal ou não têm
`onClick`**, sem alterar nenhum dado. Ver o detalhamento completo em
[`ARQUITETURA.md#formulários-e-ações-criareditarexcluir`](ARQUITETURA.md#formulários-e-ações-criareditarexcluir)
e em [`COMPONENTES.md`](COMPONENTES.md).

---

## A paginação não muda os itens exibidos na tabela

**Sintoma:** clicar em "2" ou "3" no rodapé de uma tabela (Empresas, Clientes, Serviços,
Agendamentos) não altera as linhas exibidas.

**Causa confirmada:** o componente `Pagination` recebe um valor de `total` fixo, escrito
diretamente no JSX de cada página (ex.: `total={3}` em `EmpresasPage.tsx`), e nenhuma página
usa o estado `page` para fatiar (`.slice()`) o array de dados exibido — a tabela sempre
mostra todos os itens do array `filtered` inteiro, independentemente da página selecionada.

**Diagnóstico:** procure, na página em questão, pela linha `<Pagination current={page}
total={N} onChange={setPage} />` e confirme que nenhum `.slice()` é aplicado a `filtered`
antes do `.map()` que renderiza as linhas da tabela.

---

## A tela de IA sempre responde a mesma coisa, independente da pergunta

Este não é um bug de rede — é o comportamento implementado. Ver o detalhamento completo em
[`COMPONENTES.md#srcfeaturesiapagetsx--iapage`](COMPONENTES.md#srcfeaturesiapagetsx--iapage):
a função `send()` em `IAPage.tsx` sempre insere a mesma string de resposta fixa após um
`setTimeout` de 1200ms, sem chamar nenhuma API ou SDK de IA.

---

## `pnpm run clean` falha ou não remove tudo que o nome sugere

**Sintoma:** ao rodar `pnpm clean`, nada acontece com relação a um arquivo `server.js`.

**Causa confirmada:** o script é `"clean": "rm -rf dist server.js"`. O arquivo `server.js`
não existe no repositório analisado — `rm -rf` não falha por um caminho inexistente (ele
simplesmente não encontra nada para remover naquele caminho), então o script "funciona" sem
erro, mas a menção a `server.js` no comando não corresponde a nenhum arquivo presente hoje
no projeto.

---

## Variável de ambiente `VITE_API_URL` não parece ter efeito

**Sintoma:** alterar o valor de `VITE_API_URL` no `.env` não muda nenhum comportamento
visível da aplicação.

**Causa confirmada:** não há nenhuma ocorrência de `import.meta.env` em todo o diretório
`src/` — a variável está declarada em `.env`/`.env.example`, mas não é lida por nenhum
código-fonte analisado.

---

## Deploy e produção

Não há, no repositório analisado, nenhuma configuração de deploy (Vercel, Netlify, Docker,
servidor próprio) nem workflow de CI/CD. A pasta `dist/` presente no repositório é um build
já gerado localmente (via `vite build`), mas não há evidência, no material analisado, de
como ou onde esse build é publicado.

