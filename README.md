
# PainelAdmin

Painel administrativo web construído em **React 19 + TypeScript + Vite**. É uma
aplicação de página única (sem roteamento por URL) que alterna entre 10 telas internas por
estado local, cada uma cobrindo um módulo de gestão: Dashboard, Empresas, Clientes,
Serviços, Usuários, Agendamentos, Financeiro, Configurações, Perfil e IA.

Repositório: `https://github.com/Lucaslonski-code/PainelAdmin` (branch única: `main`).

> ⚠️ Este README substitui a versão anterior do arquivo. A versão anterior descrevia uma
> pasta `docs/` com 6 arquivos numerados (`01-installation.md` a `06-conventions.md`) e uma
> estrutura `src/` com `hooks/`, `services/`, `types/`, `styles/`, `lib/` e `utils/`. Nenhum
> desses arquivos ou diretórios existe no repositório analisado — a estrutura documentada
> abaixo reflete exclusivamente o que foi encontrado no código.

---

## Índice

- [O que é este projeto](#o-que-é-este-projeto)
- [Stack técnica](#stack-técnica)
- [Estrutura real do repositório](#estrutura-real-do-repositório)
- [Instalação e execução](#instalação-e-execução)
- [Scripts disponíveis](#scripts-disponíveis)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Dependências declaradas e não utilizadas](#dependências-declaradas-e-não-utilizadas)
- [Mapa da documentação](#mapa-da-documentação)

## O que é este projeto

Uma aplicação `App.tsx` única que renderiza, condicionalmente, uma de 10 páginas de acordo
com um estado `page: Page` (definido em `src/types.ts`), sem usar roteamento de URL — a
biblioteca `react-router-dom`, embora declarada em `package.json`, **não é importada em
nenhum arquivo de `src/`**.

A marca exibida na interface (logo na barra lateral, breadcrumb no topo, e-mails de usuário
de exemplo, texto do assistente de IA) é **"AutoNova"** — confirmado em
`src/components/Sidebar.tsx`, `src/components/Topbar.tsx`, `src/data.ts` e
`src/features/ConfiguracoesPage.tsx` (campo "Nome da Empresa" com valor `AutoNova
Sistemas`, domínio `autonova.io`). O nome do projeto/repositório, por outro lado, é
**PainelAdmin**, confirmado pela URL do remoto Git (`origin`):
`https://github.com/Lucaslonski-code/PainelAdmin.git`.

Todos os dados exibidos nas telas (empresas, clientes, serviços, usuários, agendamentos,
transações e o histórico de chat da IA) vêm de arrays estáticos hardcoded em `src/data.ts` —
não há chamada de API, `fetch` ou `axios` em nenhum lugar de `src/` que leia ou grave esses
dados. Ver [`docs/DADOS.md`](docs/DADOS.md) para o detalhamento completo.

## Stack técnica

Confirmado em `package.json`, `vite.config.ts` e `tsconfig.json`:

| Camada | Tecnologia | Versão declarada |
|---|---|---|
| Build tool | Vite | `^6.2.3` |
| UI | React / React DOM | `^19.0.1` |
| Linguagem | TypeScript | `~5.8.2` |
| Estilos | Tailwind CSS (via `@tailwindcss/vite`) | `^4.1.14` |
| Gráficos | Recharts | `^3.9.2` (efetivamente usado em `DashboardPage` e `FinanceiroPage`) |
| Ícones | lucide-react | `^0.546.0` (efetivamente usado em 6 arquivos de `src/`) |

`vite.config.ts` contém um alias `@` apontando para a raiz do projeto (`path.resolve(__dirname, '.')`)
e comentários indicando que o projeto roda (ou rodou) dentro do **Google AI Studio**:
o HMR e o file watching são desativados quando a variável de ambiente `DISABLE_HMR` é
`'true'`. O arquivo `index.html` raiz confirma essa origem: o `<title>` da página é o valor
padrão gerado por essa ferramenta, `"My Google AI Studio App"`, e não foi customizado.

O histórico Git (2 commits) mostra que arquivos `AGENTS.md` e `CLAUDE.md` — comuns em
ambientes de desenvolvimento assistido por IA — existiam no primeiro commit
(`first structure for testing, initial painel`) e foram removidos no segundo commit
(`re-structure, adapting for more organization`).

## Estrutura real do repositório

```
.
├── src/
│   ├── components/
│   │   ├── Sidebar.tsx     # Menu lateral de navegação entre páginas
│   │   ├── Topbar.tsx      # Cabeçalho com breadcrumb, busca e sino de notificação
│   │   └── ui.tsx          # Todos os componentes de UI reutilizáveis do projeto
│   ├── features/
│   │   ├── DashboardPage.tsx
│   │   ├── EmpresasPage.tsx
│   │   ├── ClientesPage.tsx
│   │   ├── ServicosPage.tsx
│   │   ├── UsuariosPage.tsx
│   │   ├── AgendamentosPage.tsx
│   │   ├── FinanceiroPage.tsx
│   │   ├── ConfiguracoesPage.tsx
│   │   ├── PerfilPage.tsx
│   │   └── IAPage.tsx
│   ├── data.ts              # Única fonte de dados de todo o projeto (arrays hardcoded)
│   ├── types.ts             # Tipo `Page` — union das 10 telas existentes
│   ├── index.css            # Único ponto de entrada de CSS (`@import "tailwindcss"`)
│   ├── main.tsx             # Ponto de entrada do React (ReactDOM.createRoot)
│   └── App.tsx              # Componente raiz — estado `page`/`collapsed`, monta layout
├── index.html               # HTML raiz servido pelo Vite
├── vite.config.ts
├── tsconfig.json
├── pnpm-workspace.yaml
├── package.json / package-lock.json / pnpm-lock.yaml
├── .env / .env.example
├── .gitignore
└── dist/                    # Build de produção já gerado (presente no repositório analisado)
```

**Não existem**, no repositório analisado: pasta `docs/`, `src/hooks/`, `src/services/`,
`src/types/` (existe apenas o arquivo `src/types.ts`, não uma pasta), `src/styles/`,
`src/lib/`, `src/utils/`, arquivo `server.js`, nem qualquer diretório `.github/workflows/`.

READMEs específicos por diretório:

- [`src/README.md`](src/README.md)
- [`src/components/README.md`](src/components/README.md)
- [`src/features/README.md`](src/features/README.md)

## Instalação e execução

Pré-requisitos confirmados pelo projeto: **Node.js** (compatível com `@types/node: ^22`) e
um gerenciador de pacotes — o repositório contém **dois lockfiles simultâneos**:
`package-lock.json` (npm) e `pnpm-lock.yaml` (pnpm), além de um `pnpm-workspace.yaml`. Isso
indica que o fluxo pretendido é **pnpm**, mas o `package-lock.json` presente mostra que
`npm install` também já foi executado neste repositório em algum momento — ver
[`docs/TROUBLESHOOTING.md`](docs/TROUBLESHOOTING.md).

```bash
# Instale as dependências (pnpm é o gerenciador com workspace configurado)
pnpm install

# Configure as variáveis de ambiente (ver seção abaixo)
cp .env.example .env

# Rode o servidor de desenvolvimento
pnpm dev
```

O script `dev` (`vite --port=3000 --host=0.0.0.0`) expõe o servidor na porta `3000` em todas
as interfaces de rede (`0.0.0.0`), não apenas em `localhost`.

## Scripts disponíveis

Confirmado em `package.json`:

| Script | Comando | O que faz |
|---|---|---|
| `dev` | `vite --port=3000 --host=0.0.0.0` | Servidor de desenvolvimento com hot-reload |
| `build` | `vite build` | Gera o build de produção em `dist/` |
| `preview` | `vite preview` | Serve localmente o conteúdo já buildado em `dist/` |
| `clean` | `rm -rf dist server.js` | Remove `dist/` e um arquivo `server.js`. **`server.js` não existe no repositório analisado** — este comando remove um arquivo que, no estado atual do projeto, não está presente. |
| `lint` | `tsc --noEmit` | Executa apenas a checagem de tipos do TypeScript (não há ESLint configurado ou declarado no projeto) |

## Variáveis de ambiente

Confirmado em `.env.example` e `.env`:

| Variável | Valor no `.env.example` | Uso confirmado em `src/` |
|---|---|---|
| `VITE_API_URL` | `http://localhost:3000` | **Nenhum.** Não há nenhuma ocorrência de `import.meta.env` em todo o diretório `src/` — a variável está declarada mas não é lida por nenhum código-fonte analisado. |

O `.gitignore` do projeto ignora `.env`, `.env.*` **e também `.env.example`** — ou seja,
nenhum dos dois arquivos de ambiente é versionado no Git neste repositório, o que é atípico
(normalmente `.env.example` é commitado como referência para outros desenvolvedores).

## Dependências declaradas e não utilizadas

Uma verificação de importação em todo o diretório `src/` mostrou que as seguintes
dependências estão declaradas em `package.json` mas **não são importadas em nenhum arquivo
de `src/`**:

`@google/genai`, `axios`, `express`, `zod`, `react-hook-form`, `@hookform/resolvers`,
`date-fns`, `sonner`, `motion`, `react-router-dom`, `clsx`, `tailwind-merge`.

Isso é relevante especificamente para `IAPage.tsx`: a tela de "IA AutoNova" exibe o texto
"Assistente inteligente · GPT-4o" na interface, mas sua função de envio de mensagem
(`send()`) não faz nenhuma chamada de rede ou de SDK — ela apenas insere a mensagem do
usuário no estado local e, após um `setTimeout` de 1200ms, insere uma resposta fixa
predefinida no código. Não há uso de `@google/genai` (SDK do Gemini, que está declarado em
`package.json`) nem de qualquer integração com OpenAI/GPT em `IAPage.tsx` ou em qualquer
outro arquivo de `src/`. Ver [`docs/COMPONENTES.md`](docs/COMPONENTES.md#srcfeaturesiapagetsx--iapage)
para os detalhes.

## Mapa da documentação

| Documento | Conteúdo |
|---|---|
| [`docs/ARQUITETURA.md`](docs/ARQUITETURA.md) | Como `App.tsx` monta o layout, fluxo de troca de página, relação entre componentes |
| [`docs/COMPONENTES.md`](docs/COMPONENTES.md) | Referência de cada componente de `src/components/` e cada página de `src/features/` |
| [`docs/DADOS.md`](docs/DADOS.md) | Estrutura completa de `src/data.ts`: campos, tipos, quem consome cada array |
| [`docs/CONFIGURACAO.md`](docs/CONFIGURACAO.md) | `vite.config.ts`, `tsconfig.json`, `.env`, `pnpm-workspace.yaml` explicados |
| [`docs/DESENVOLVIMENTO.md`](docs/DESENVOLVIMENTO.md) | Como rodar localmente, adicionar uma página, adicionar um dado, checagem de tipos |
| [`docs/GIT-E-GITHUB.md`](docs/GIT-E-GITHUB.md) | Estado real do histórico Git deste repositório e fluxo recomendado |
| [`docs/TROUBLESHOOTING.md`](docs/TROUBLESHOOTING.md) | Problemas reais e verificáveis neste projeto |
| [`docs/COMO-FAZER.md`](docs/COMO-FAZER.md) | Índice de tarefas comuns |
# PainelAdmin

Painel administrativo web construído em **React 19 + TypeScript + Vite**. É uma
aplicação de página única (sem roteamento por URL) que alterna entre 10 telas internas por
estado local, cada uma cobrindo um módulo de gestão: Dashboard, Empresas, Clientes,
Serviços, Usuários, Agendamentos, Financeiro, Configurações, Perfil e IA.

Repositório: `https://github.com/Lucaslonski-code/PainelAdmin` (branch única: `main`).

> ⚠️ Este README substitui a versão anterior do arquivo. A versão anterior descrevia uma
> pasta `docs/` com 6 arquivos numerados (`01-installation.md` a `06-conventions.md`) e uma
> estrutura `src/` com `hooks/`, `services/`, `types/`, `styles/`, `lib/` e `utils/`. Nenhum
> desses arquivos ou diretórios existe no repositório analisado — a estrutura documentada
> abaixo reflete exclusivamente o que foi encontrado no código.

---

## Índice

- [O que é este projeto](#o-que-é-este-projeto)
- [Stack técnica](#stack-técnica)
- [Estrutura real do repositório](#estrutura-real-do-repositório)
- [Instalação e execução](#instalação-e-execução)
- [Scripts disponíveis](#scripts-disponíveis)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Dependências declaradas e não utilizadas](#dependências-declaradas-e-não-utilizadas)
- [Mapa da documentação](#mapa-da-documentação)

## O que é este projeto

Uma aplicação `App.tsx` única que renderiza, condicionalmente, uma de 10 páginas de acordo
com um estado `page: Page` (definido em `src/types.ts`), sem usar roteamento de URL — a
biblioteca `react-router-dom`, embora declarada em `package.json`, **não é importada em
nenhum arquivo de `src/`**.

A marca exibida na interface (logo na barra lateral, breadcrumb no topo, e-mails de usuário
de exemplo, texto do assistente de IA) é **"AutoNova"** — confirmado em
`src/components/Sidebar.tsx`, `src/components/Topbar.tsx`, `src/data.ts` e
`src/features/ConfiguracoesPage.tsx` (campo "Nome da Empresa" com valor `AutoNova
Sistemas`, domínio `autonova.io`). O nome do projeto/repositório, por outro lado, é
**PainelAdmin**, confirmado pela URL do remoto Git (`origin`):
`https://github.com/Lucaslonski-code/PainelAdmin.git`.

Todos os dados exibidos nas telas (empresas, clientes, serviços, usuários, agendamentos,
transações e o histórico de chat da IA) vêm de arrays estáticos hardcoded em `src/data.ts` —
não há chamada de API, `fetch` ou `axios` em nenhum lugar de `src/` que leia ou grave esses
dados. Ver [`docs/DADOS.md`](docs/DADOS.md) para o detalhamento completo.

## Stack técnica

Confirmado em `package.json`, `vite.config.ts` e `tsconfig.json`:

| Camada | Tecnologia | Versão declarada |
|---|---|---|
| Build tool | Vite | `^6.2.3` |
| UI | React / React DOM | `^19.0.1` |
| Linguagem | TypeScript | `~5.8.2` |
| Estilos | Tailwind CSS (via `@tailwindcss/vite`) | `^4.1.14` |
| Gráficos | Recharts | `^3.9.2` (efetivamente usado em `DashboardPage` e `FinanceiroPage`) |
| Ícones | lucide-react | `^0.546.0` (efetivamente usado em 6 arquivos de `src/`) |

`vite.config.ts` contém um alias `@` apontando para a raiz do projeto (`path.resolve(__dirname, '.')`)
e comentários indicando que o projeto roda (ou rodou) dentro do **Google AI Studio**:
o HMR e o file watching são desativados quando a variável de ambiente `DISABLE_HMR` é
`'true'`. O arquivo `index.html` raiz confirma essa origem: o `<title>` da página é o valor
padrão gerado por essa ferramenta, `"My Google AI Studio App"`, e não foi customizado.

O histórico Git (2 commits) mostra que arquivos `AGENTS.md` e `CLAUDE.md` — comuns em
ambientes de desenvolvimento assistido por IA — existiam no primeiro commit
(`first structure for testing, initial painel`) e foram removidos no segundo commit
(`re-structure, adapting for more organization`).

## Estrutura real do repositório

```
.
├── src/
│   ├── components/
│   │   ├── Sidebar.tsx     # Menu lateral de navegação entre páginas
│   │   ├── Topbar.tsx      # Cabeçalho com breadcrumb, busca e sino de notificação
│   │   └── ui.tsx          # Todos os componentes de UI reutilizáveis do projeto
│   ├── features/
│   │   ├── DashboardPage.tsx
│   │   ├── EmpresasPage.tsx
│   │   ├── ClientesPage.tsx
│   │   ├── ServicosPage.tsx
│   │   ├── UsuariosPage.tsx
│   │   ├── AgendamentosPage.tsx
│   │   ├── FinanceiroPage.tsx
│   │   ├── ConfiguracoesPage.tsx
│   │   ├── PerfilPage.tsx
│   │   └── IAPage.tsx
│   ├── data.ts              # Única fonte de dados de todo o projeto (arrays hardcoded)
│   ├── types.ts             # Tipo `Page` — union das 10 telas existentes
│   ├── index.css            # Único ponto de entrada de CSS (`@import "tailwindcss"`)
│   ├── main.tsx             # Ponto de entrada do React (ReactDOM.createRoot)
│   └── App.tsx              # Componente raiz — estado `page`/`collapsed`, monta layout
├── index.html               # HTML raiz servido pelo Vite
├── vite.config.ts
├── tsconfig.json
├── pnpm-workspace.yaml
├── package.json / package-lock.json / pnpm-lock.yaml
├── .env / .env.example
├── .gitignore
└── dist/                    # Build de produção já gerado (presente no repositório analisado)
```

**Não existem**, no repositório analisado: pasta `docs/`, `src/hooks/`, `src/services/`,
`src/types/` (existe apenas o arquivo `src/types.ts`, não uma pasta), `src/styles/`,
`src/lib/`, `src/utils/`, arquivo `server.js`, nem qualquer diretório `.github/workflows/`.

READMEs específicos por diretório:

- [`src/README.md`](src/README.md)
- [`src/components/README.md`](src/components/README.md)
- [`src/features/README.md`](src/features/README.md)

## Instalação e execução

Pré-requisitos confirmados pelo projeto: **Node.js** (compatível com `@types/node: ^22`) e
um gerenciador de pacotes — o repositório contém **dois lockfiles simultâneos**:
`package-lock.json` (npm) e `pnpm-lock.yaml` (pnpm), além de um `pnpm-workspace.yaml`. Isso
indica que o fluxo pretendido é **pnpm**, mas o `package-lock.json` presente mostra que
`npm install` também já foi executado neste repositório em algum momento — ver
[`docs/TROUBLESHOOTING.md`](docs/TROUBLESHOOTING.md).

```bash
# Instale as dependências (pnpm é o gerenciador com workspace configurado)
pnpm install

# Configure as variáveis de ambiente (ver seção abaixo)
cp .env.example .env

# Rode o servidor de desenvolvimento
pnpm dev
```

O script `dev` (`vite --port=3000 --host=0.0.0.0`) expõe o servidor na porta `3000` em todas
as interfaces de rede (`0.0.0.0`), não apenas em `localhost`.

## Scripts disponíveis

Confirmado em `package.json`:

| Script | Comando | O que faz |
|---|---|---|
| `dev` | `vite --port=3000 --host=0.0.0.0` | Servidor de desenvolvimento com hot-reload |
| `build` | `vite build` | Gera o build de produção em `dist/` |
| `preview` | `vite preview` | Serve localmente o conteúdo já buildado em `dist/` |
| `clean` | `rm -rf dist server.js` | Remove `dist/` e um arquivo `server.js`. **`server.js` não existe no repositório analisado** — este comando remove um arquivo que, no estado atual do projeto, não está presente. |
| `lint` | `tsc --noEmit` | Executa apenas a checagem de tipos do TypeScript (não há ESLint configurado ou declarado no projeto) |

## Variáveis de ambiente

Confirmado em `.env.example` e `.env`:

| Variável | Valor no `.env.example` | Uso confirmado em `src/` |
|---|---|---|
| `VITE_API_URL` | `http://localhost:3000` | **Nenhum.** Não há nenhuma ocorrência de `import.meta.env` em todo o diretório `src/` — a variável está declarada mas não é lida por nenhum código-fonte analisado. |

O `.gitignore` do projeto ignora `.env`, `.env.*` **e também `.env.example`** — ou seja,
nenhum dos dois arquivos de ambiente é versionado no Git neste repositório, o que é atípico
(normalmente `.env.example` é commitado como referência para outros desenvolvedores).

## Dependências declaradas e não utilizadas

Uma verificação de importação em todo o diretório `src/` mostrou que as seguintes
dependências estão declaradas em `package.json` mas **não são importadas em nenhum arquivo
de `src/`**:

`@google/genai`, `axios`, `express`, `zod`, `react-hook-form`, `@hookform/resolvers`,
`date-fns`, `sonner`, `motion`, `react-router-dom`, `clsx`, `tailwind-merge`.

Isso é relevante especificamente para `IAPage.tsx`: a tela de "IA AutoNova" exibe o texto
"Assistente inteligente · GPT-4o" na interface, mas sua função de envio de mensagem
(`send()`) não faz nenhuma chamada de rede ou de SDK — ela apenas insere a mensagem do
usuário no estado local e, após um `setTimeout` de 1200ms, insere uma resposta fixa
predefinida no código. Não há uso de `@google/genai` (SDK do Gemini, que está declarado em
`package.json`) nem de qualquer integração com OpenAI/GPT em `IAPage.tsx` ou em qualquer
outro arquivo de `src/`. Ver [`docs/COMPONENTES.md`](docs/COMPONENTES.md#srcfeaturesiapagetsx--iapage)
para os detalhes.

## Mapa da documentação

| Documento | Conteúdo |
|---|---|
| [`docs/ARQUITETURA.md`](docs/ARQUITETURA.md) | Como `App.tsx` monta o layout, fluxo de troca de página, relação entre componentes |
| [`docs/COMPONENTES.md`](docs/COMPONENTES.md) | Referência de cada componente de `src/components/` e cada página de `src/features/` |
| [`docs/DADOS.md`](docs/DADOS.md) | Estrutura completa de `src/data.ts`: campos, tipos, quem consome cada array |
| [`docs/CONFIGURACAO.md`](docs/CONFIGURACAO.md) | `vite.config.ts`, `tsconfig.json`, `.env`, `pnpm-workspace.yaml` explicados |
| [`docs/DESENVOLVIMENTO.md`](docs/DESENVOLVIMENTO.md) | Como rodar localmente, adicionar uma página, adicionar um dado, checagem de tipos |
| [`docs/GIT-E-GITHUB.md`](docs/GIT-E-GITHUB.md) | Estado real do histórico Git deste repositório e fluxo recomendado |
| [`docs/TROUBLESHOOTING.md`](docs/TROUBLESHOOTING.md) | Problemas reais e verificáveis neste projeto |
| [`docs/COMO-FAZER.md`](docs/COMO-FAZER.md) | Índice de tarefas comuns |
