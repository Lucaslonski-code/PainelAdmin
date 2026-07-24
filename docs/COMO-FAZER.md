
# Como Fazer... — Índice de Tarefas

## Instalação e execução

- **Instalar e rodar pela primeira vez** → [`../README.md#instalação-e-execução`](../README.md#instalação-e-execução)
- **Entender por que há dois lockfiles (npm e pnpm)** → [`TROUBLESHOOTING.md#dois-gerenciadores-de-pacotes-npm-e-pnpm-presentes`](TROUBLESHOOTING.md#dois-gerenciadores-de-pacotes-npm-e-pnpm-presentes)
- **Rodar a checagem de tipos** → `pnpm lint` (equivalente a `tsc --noEmit`) — ver [`DESENVOLVIMENTO.md`](DESENVOLVIMENTO.md#ambiente-local)

## Estrutura e dados

- **Entender de onde vem cada dado exibido na tela** → [`DADOS.md`](DADOS.md)
- **Adicionar um novo item a uma lista existente (empresa, cliente, serviço etc.)** → [`DESENVOLVIMENTO.md#adicionar-ou-alterar-um-dado`](DESENVOLVIMENTO.md#adicionar-ou-alterar-um-dado)
- **Adicionar uma página nova ao painel** → [`DESENVOLVIMENTO.md#adicionar-uma-nova-página`](DESENVOLVIMENTO.md#adicionar-uma-nova-página)

## Entender comportamentos específicos

- **Por que os botões de salvar/criar/excluir não fazem nada** → [`ARQUITETURA.md#formulários-e-ações-criareditarexcluir`](ARQUITETURA.md#formulários-e-ações-criareditarexcluir)
- **Por que a paginação não muda os itens da tabela** → [`TROUBLESHOOTING.md#a-paginação-não-muda-os-itens-exibidos-na-tabela`](TROUBLESHOOTING.md#a-paginação-não-muda-os-itens-exibidos-na-tabela)
- **Por que a IA sempre responde a mesma coisa / diz "GPT-4o"** → [`COMPONENTES.md#srcfeaturesiapagetsx--iapage`](COMPONENTES.md#srcfeaturesiapagetsx--iapage)
- **Conectar as ações de formulário a uma mudança de estado real** → [`DESENVOLVIMENTO.md#conectar-uma-ação-criareditarexcluir-de-verdade`](DESENVOLVIMENTO.md#conectar-uma-ação-criareditarexcluir-de-verdade)

## Configuração

- **Entender `vite.config.ts`, `tsconfig.json`, `.env` e `pnpm-workspace.yaml`** → [`CONFIGURACAO.md`](CONFIGURACAO.md)
- **Entender por que `VITE_API_URL` não parece fazer nada** → [`TROUBLESHOOTING.md#variável-de-ambiente-vite_api_url-não-parece-ter-efeito`](TROUBLESHOOTING.md#variável-de-ambiente-vite_api_url-não-parece-ter-efeito)

## Git e GitHub

- **Ver o estado real do repositório (branches, commits, remoto)** → [`GIT-E-GITHUB.md#estado-real-do-repositório`](GIT-E-GITHUB.md#estado-real-do-repositório)
- **Criar uma branch e abrir um Pull Request** → [`GIT-E-GITHUB.md#fluxo-de-trabalho-recomendado-branches-e-pull-requests`](GIT-E-GITHUB.md#fluxo-de-trabalho-recomendado-branches-e-pull-requests)
- **Resolver um conflito de merge** → [`GIT-E-GITHUB.md#resolver-conflitos-de-merge`](GIT-E-GITHUB.md#resolver-conflitos-de-merge)

## Onde encontrar...

- **A lista de páginas existentes** → tipo `Page` em `src/types.ts`
- **O menu de navegação** → `navItems`/`bottomItems` em `src/components/Sidebar.tsx`
- **O breadcrumb do topo** → objeto `labels` em `src/components/Topbar.tsx`
- **Todos os dados exibidos no painel** → `src/data.ts` (ver [`DADOS.md`](DADOS.md))
- **Os componentes de UI reutilizáveis (botão, badge, modal, tabela...)** → `src/components/ui.tsx`
- **A referência de cada página e componente** → [`COMPONENTES.md`](COMPONENTES.md)


