
# Guia de Desenvolvimento

## Ambiente local

```bash
pnpm install
pnpm dev
```

Abre em `http://localhost:3000` (porta fixa definida no script `dev`:
`vite --port=3000 --host=0.0.0.0`). O `--host=0.0.0.0` expõe o servidor em todas as
interfaces de rede da máquina, não apenas em `localhost`.

Checagem de tipos (equivalente ao "lint" do projeto):

```bash
pnpm lint
# equivalente a: tsc --noEmit
```

Build de produção e pré-visualização local:

```bash
pnpm build     # gera dist/
pnpm preview   # serve o conteúdo de dist/ localmente
```

## Adicionar uma nova página

Checklist, seguindo o padrão real observado em `App.tsx`, `types.ts` e `Sidebar.tsx`:

1. Adicione o novo identificador ao tipo `Page` em `src/types.ts`:
   ```ts
   export type Page =
     | 'dashboard'
     | 'empresas'
     // ...
     | 'minha-pagina';
   ```
2. Crie o componente em `src/features/MinhaPagina.tsx`, seguindo o padrão das páginas
   existentes: import de `SectionHeader` e dos demais componentes necessários de
   `../components/ui`, e import de dados de `../data` caso a página liste algo baseado em
   array (ver [`DADOS.md`](DADOS.md) antes de adicionar um array novo).
3. Registre a página em `src/App.tsx`:
   - importe o componente;
   - adicione a entrada correspondente ao objeto `pages`:
     `'minha-pagina': <MinhaPaginaPage />`.
4. Adicione uma entrada em `navItems` ou `bottomItems` em `src/components/Sidebar.tsx`, com
   `id: 'minha-pagina'` (deve bater exatamente com o valor adicionado ao tipo `Page`) e um
   ícone de `lucide-react`.
5. Adicione a entrada correspondente ao objeto `labels` em `src/components/Topbar.tsx`
   (`'minha-pagina': ['Minha Página']`), para que o breadcrumb do topo mostre o nome correto.

Sem os passos 3–5, a página existe como componente mas não é alcançável por nenhuma
navegação da interface (não há como um usuário chegar a ela).

## Adicionar ou alterar um dado

Ver o guia completo de estrutura de cada array em [`DADOS.md`](DADOS.md). Regra geral:
adicionar um item a um array de `src/data.ts` é suficiente para ele aparecer automaticamente
na tabela/gráfico correspondente, já que todas as páginas usam `.map()`/`.filter()` sobre
esses arrays.

Atenção ao adicionar um novo valor de `status`, `role` ou `tipo` que ainda não exista nos
dados atuais (ex.: um `status: 'suspenso'` em `empresas`): o componente `StatusBadge`
(`src/components/ui.tsx`) precisa de uma entrada correspondente no seu mapa interno `map`
para exibir o rótulo e a cor corretos — sem isso, ele usa o fallback `{ label: status,
variant: 'neutral' }`.

## Conectar uma ação (criar/editar/excluir) de verdade

Como documentado em [`ARQUITETURA.md`](ARQUITETURA.md#formulários-e-ações-criareditarexcluir),
nenhuma ação de formulário do projeto está conectada a uma mudança de estado real. Para
conectar, por exemplo, o botão "Salvar Alterações" do modal de edição de empresa em
`EmpresasPage.tsx`:

1. Torne os campos do modal controlados: adicione um estado de formulário (`useState`) com
   os valores atuais, e conecte o `onChange` de cada `Input`/`Select` a esse estado (hoje
   `Select` no modal de Empresas usa `onChange={() => {}}` — uma função vazia).
2. No `onClick` do botão "Salvar Alterações", substitua `() => setModalOpen(false)` por uma
   função que efetivamente atualiza os dados (ex.: atualiza um estado local do array de
   empresas na própria página, já que não há backend/API neste projeto para persistir a
   mudança — ver [`README.md`](../README.md#dependências-declaradas-e-não-utilizadas) sobre
   `axios`/`express` estarem declarados mas não implementados).
3. Repita o padrão para o modal de exclusão e para o modal de "Convidar Usuário" em
   `UsuariosPage.tsx`.

## Estilos

O projeto usa **Tailwind CSS v4** via o plugin `@tailwindcss/vite` (não há arquivo
`tailwind.config.js/ts` nem `postcss.config.*` no repositório analisado — a configuração do
Tailwind v4 é feita inteiramente pelo plugin do Vite). `src/index.css` contém apenas uma
linha: `@import "tailwindcss";`. Não há variáveis de tema customizadas (`@theme`) nem
utilitários customizados declarados em CSS — todas as cores usadas nos componentes são
classes utilitárias padrão do Tailwind (ex.: `bg-[#0F172A]`, `text-emerald-400`) ou valores
arbitrários entre colchetes.

Não há um sistema de composição de classes condicionais (`clsx`/`tailwind-merge`, ambos
declarados em `package.json` mas não usados) — classes condicionais são montadas com
template strings diretamente em cada componente, como em `Btn`
(`src/components/ui.tsx`):
```ts
`${base} ${sizes[size]} ${variants[variant]} ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`
```
Ao criar um componente novo com classes condicionais, siga esse mesmo padrão de template
string para manter consistência com o restante do projeto — ou introduza `clsx`/
`tailwind-merge` (já instalados) como uma melhoria, documentando essa mudança quando feita.

## Verificação de tipos antes de commitar

```bash
pnpm lint
```

Como não há `strict: true` em `tsconfig.json` (ver [`CONFIGURACAO.md`](CONFIGURACAO.md)),
esse comando pode não capturar todos os problemas de tipo que uma configuração estrita
capturaria (ex.: `any` implícito, `null`/`undefined` não verificados). Rode o comando mesmo
assim antes de qualquer alteração — é a única verificação automatizada disponível no
projeto (não há testes).

