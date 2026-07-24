
# Referência de Componentes e Páginas

## `src/components/Sidebar.tsx` → `Sidebar`

- **Props:** `current: Page`, `onChange: (p: Page) => void`, `collapsed: boolean`,
  `onToggle: () => void`.
- **Dados:** duas listas fixas declaradas no próprio arquivo — `navItems` (7 itens:
  Dashboard, Empresas, Clientes, Serviços, Usuários, Agendamentos, Financeiro) e
  `bottomItems` (3 itens: Configurações, Perfil, "IA AutoNova").
- **Comportamento:** alterna entre largura `w-16` (recolhida) e `w-56` (expandida) via a prop
  `collapsed`. Cada item de navegação é um `<button>` que chama `onChange(item.id as Page)`.
  O item ativo é destacado comparando `current === item.id`. Exibe, na parte inferior, um
  bloco fixo com `<Avatar name="Ana Beatriz Lima" size="xs" />` e os textos "Ana Beatriz" /
  "Admin" — não vindos de `src/data.ts`, escritos diretamente no componente.
- **Dependências:** `Avatar` (de `./ui`), ícones `lucide-react`
  (`LayoutDashboard, Building2, Users, Wrench, Calendar, DollarSign, Settings, User, Bot,
  Menu, Zap`).

## `src/components/Topbar.tsx` → `Topbar`

- **Props:** `page: Page`.
- **Dados:** objeto local `labels: Record<Page, string[]>` — mapeia cada página a um array
  de strings de breadcrumb (hoje sempre com um único item, ex.: `dashboard: ['Dashboard']`).
- **Comportamento:** renderiza o breadcrumb `AutoNova > <Página Atual>`, um campo de busca
  (`<input>` sem `onChange` conectado a qualquer estado — não filtra nada) e um ícone de
  sino com um indicador de notificação sempre visível (`<span>` com uma bolinha azul fixa,
  não condicionada a nenhuma notificação real).
- **Dependências:** `Avatar` (de `./ui`), ícones `lucide-react` (`ChevronRight, Search,
  Bell`).

## `src/components/ui.tsx` — biblioteca de componentes de UI

Arquivo único que exporta 14 componentes reutilizados por todas as páginas de
`src/features/`. Não há um componente equivalente a `cn()`/`clsx` para composição de
classes — apesar de `clsx` e `tailwind-merge` estarem declarados em `package.json`, este
arquivo (e o projeto inteiro) usa template strings manuais para classes condicionais (ex.:
`` `${base} ${sizes[size]} ${variants[variant]}` `` em `Btn`).

| Componente | Props principais | Usado em |
|---|---|---|
| `Badge` | `variant` (`success│danger│warning│info│neutral`), `children` | Base de `StatusBadge`; usado diretamente em várias páginas |
| `StatusBadge` | `status: string` | Todas as páginas de tabela (Empresas, Clientes, Serviços, Usuários, Agendamentos, Financeiro) — traduz valores como `ativo`/`pendente`/`confirmado` em um `Badge` colorido, via mapa fixo `map` no próprio componente |
| `KpiCard` | `label, value, sub, trend?, mono?` | `DashboardPage`, `FinanceiroPage` |
| `SectionHeader` | `title, subtitle?, actions?` | Todas as páginas de `src/features/` (exceto Dashboard e IA) |
| `Btn` | `variant, size, icon?, onClick?, disabled?` | Botão padrão de todo o projeto |
| `SearchInput` | `placeholder?, value, onChange` | Todas as páginas com listagem em tabela |
| `TableContainer`, `Th`, `Td` | — | Estrutura de tabela padrão de todas as páginas de listagem |
| `Pagination` | `current, total, onChange` | Empresas, Clientes, Serviços, Agendamentos — **`total` é um número fixo passado manualmente no JSX de cada página (ex.: `total={3}`), não calculado a partir do tamanho real do array filtrado** |
| `Avatar` | `name, size?` | Sidebar, Topbar, tabelas de Clientes/Usuários/Agendamentos, Perfil |
| `EmptyState` | `title, sub, action?` | Empresas (busca sem resultado), Clientes (busca sem resultado), Financeiro (aba "Faturas") |
| `Modal` | `open, onClose, title, children, footer?` | Empresas (criar/editar/excluir), Usuários (convidar) |
| `FormField`, `Input`, `Select` | — | Campos dentro dos `Modal`s e das páginas de Configurações/Perfil |

### Observação sobre `Pagination`

Em todas as páginas que a utilizam, o valor de `total` é um literal fixo no JSX (ex.:
`<Pagination current={page} total={3} onChange={setPage} />` em `EmpresasPage.tsx`) — não é
`Math.ceil(filtered.length / itemsPerPage)` nem qualquer outro cálculo. Isso significa que o
número de páginas exibido não reflete o número real de itens após uma busca filtrar a lista,
e clicar em uma página diferente de 1 não altera os itens exibidos na tabela (nenhuma página
usa `page` para fatiar (`.slice()`) o array `filtered`).

## `src/features/DashboardPage.tsx` → `DashboardPage`

- **Dados:** `revenueData`, `agendamentosData`, `pieData`, `agendamentos` (apenas os 4
  primeiros, via `.slice(0, 4)`) de `../data`.
- **Comportamento:** 4 `KpiCard`s com valores **fixos no JSX** (`"R$ 13.600"`, `"6"`,
  `"189"`, `"R$ 480"` e seus respectivos `trend`) — não calculados a partir de
  `revenueData`/`agendamentos`. Um `AreaChart` de receita vs. despesa (Recharts), um
  `PieChart` de distribuição de empresas por status, uma lista dos 4 agendamentos mais
  recentes e um `BarChart` de agendamentos por dia da semana.
- **Dependências:** `KpiCard`, `Btn`, `StatusBadge`, `Avatar` (de `../components/ui`);
  componentes de `recharts` (`AreaChart`, `Area`, `BarChart`, `Bar`, `XAxis`, `YAxis`,
  `CartesianGrid`, `Tooltip`, `ResponsiveContainer`, `PieChart as RPieChart`, `Pie`, `Cell`).

## `src/features/EmpresasPage.tsx` → `EmpresasPage`

- **Dados:** `empresas` de `../data`.
- **Estado:** `search`, `page`, `modalOpen`, `deleteOpen`, `selected`.
- **Comportamento:** tabela filtrável por nome ou CNPJ. Botões de editar/excluir (visíveis
  em hover) abrem, respectivamente, um `Modal` de edição pré-preenchido com os dados de
  `selected`, ou um `Modal` de confirmação de exclusão. **Nenhum dos dois modais executa a
  ação que anuncia** — ambos os botões de confirmação (`"Salvar Alterações"`/`"Criar
  Empresa"`/`"Excluir"`) apenas chamam `setModalOpen(false)`/`setDeleteOpen(false)`, sem
  alterar o array `empresas` nem qualquer estado que refletiria a mudança na tabela.
- **Dependências:** `SectionHeader, SearchInput, Btn, TableContainer, Th, Td, Badge,
  StatusBadge, Pagination, Modal, EmptyState, FormField, Input, Select` (de `../components/ui`).

## `src/features/ClientesPage.tsx` → `ClientesPage`

- **Dados:** `clientes` de `../data`.
- **Estado:** `search`, `page`.
- **Comportamento:** tabela filtrável por nome ou e-mail. Os três botões de ação por linha
  (ver, editar, excluir) **não possuem `onClick`** — são puramente visuais, sem nenhuma
  função associada.
- **Dependências:** `SectionHeader, SearchInput, Btn, TableContainer, Th, Td, Avatar,
  StatusBadge, Pagination, EmptyState`.

## `src/features/ServicosPage.tsx` → `ServicosPage`

- **Dados:** `servicos` de `../data`.
- **Estado:** `search`, `page`.
- **Comportamento:** tabela filtrável por nome. Botões "Novo Serviço" e os ícones de
  editar/excluir por linha **não possuem `onClick`**.
- **Dependências:** `SectionHeader, SearchInput, Btn, TableContainer, Th, Td, Badge,
  Pagination`.

## `src/features/UsuariosPage.tsx` → `UsuariosPage`

- **Dados:** `usuarios` de `../data`.
- **Estado:** `search`, `modalOpen`.
- **Comportamento:** tabela filtrável por nome. O botão "Convidar" abre um `Modal` com
  campos de e-mail, cargo e permissão; o botão "Enviar Convite" apenas fecha o modal
  (`setModalOpen(false)`), sem processar os dados digitados. Os ícones de editar/excluir por
  linha não possuem `onClick`.
- **Dependências:** `SectionHeader, SearchInput, Btn, TableContainer, Th, Td, Avatar,
  StatusBadge, Modal, FormField, Input, Select`.

## `src/features/AgendamentosPage.tsx` → `AgendamentosPage`

- **Dados:** `agendamentos` de `../data`.
- **Estado:** `view` (`'tabela' | 'lista'`), `search`, `page`.
- **Comportamento:** alterna entre uma visão de tabela e uma visão de lista de cards para o
  mesmo array filtrado. Um ícone diferente (`CheckCircle`, `RefreshCw`, `XCircle`, `Clock`)
  é escolhido por status via a função local `statusIcon`. Botão "Novo Agendamento" e o ícone
  de editar por linha não possuem `onClick`.
- **Dependências:** `SectionHeader, SearchInput, Btn, TableContainer, Th, Td, Avatar,
  StatusBadge, Pagination`.

## `src/features/FinanceiroPage.tsx` → `FinanceiroPage`

- **Dados:** `transacoes`, `revenueData` de `../data`.
- **Estado:** `tab` (`'visao' | 'transacoes' | 'faturas'`).
- **Comportamento:** os KPIs de "Receita Mês" e "Despesas Mês" **são calculados em tempo de
  execução** a partir de `transacoes` (`.filter(t => t.tipo === 'receita').reduce(...)`) —
  diferente do Dashboard, aqui os números não são fixos. A aba "Visão Geral" mostra um
  `BarChart` de `revenueData`; "Transações" lista `transacoes` em tabela; "Faturas" mostra um
  `EmptyState` com o texto "Módulo de Faturas ... Em desenvolvimento" e um `Badge` "Em
  breve" — **este é o único lugar do projeto onde o próprio código sinaliza explicitamente
  que uma funcionalidade ainda não foi implementada.**
- **Dependências:** `SectionHeader, KpiCard, TableContainer, Th, Td, StatusBadge, Badge,
  EmptyState`; `BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer` de
  `recharts`.

## `src/features/ConfiguracoesPage.tsx` → `ConfiguracoesPage`

- **Dados:** nenhum de `../data` — todo o conteúdo (informações da conta, lista de
  integrações, lista de notificações) é declarado localmente dentro do componente.
- **Estado:** `section` (`'geral' | 'integracoes' | 'notificacoes' | 'seguranca'`).
- **Comportamento:** navegação interna por sub-seção (sidebar própria dentro da página).
  - **Geral:** formulário com valores fixos (`"AutoNova Sistemas"`, `"autonova.io"`,
    `"contato@autonova.io"`); botão "Salvar Alterações" não possui `onClick`.
  - **Integrações:** lista fixa de 4 integrações (`Stripe`, `SendGrid`, `Twilio`, `Google
    Calendar`) com um campo `ativo: boolean` também fixo no array local; os botões
    "Configurar"/"Conectar" não possuem `onClick`.
  - **Notificações:** lista fixa de 4 preferências; os toggles visuais não possuem `onClick`
    nem estado — a aparência ligado/desligado de cada um é determinada estaticamente por
    `i % 2 === 0` (índice par/ímpar), não por uma preferência real.
  - **Segurança:** dois cartões estáticos (2FA "Ativo", senha "alterada há 42 dias"); botão
    "Alterar" sem `onClick`.
- **Dependências:** `SectionHeader, Btn, FormField, Input, Select, Badge`.

## `src/features/PerfilPage.tsx` → `PerfilPage`

- **Dados:** nenhum de `../data` — nome, e-mail e sessões são valores fixos no componente.
- **Estado:** `tab` (`'info' | 'sessoes' | '2fa'`).
- **Comportamento:** aba "Informações" com formulário pré-preenchido (`"Ana Beatriz"`,
  `"Lima"`, `"ana@autonova.io"` etc.), botão "Salvar" sem `onClick`. Aba "Sessões" lista 3
  sessões fixas (`Chrome 126`/`macOS 14`, `Safari Mobile`/`iOS 17`, `Firefox 127`/`Windows
  11`) com IPs e localizações de exemplo; botão "Encerrar" nas sessões não ativas não possui
  `onClick`. Aba "2FA" mostra um estado fixo de "2FA Ativo" e um campo de código de
  verificação sem validação.
- **Dependências:** `SectionHeader, Avatar, Badge, Btn, FormField, Input`.

## `src/features/IAPage.tsx` → `IAPage`

- **Dados:** `chatMessages` (estado inicial) de `../data`.
- **Estado:** `messages` (inicializado com `chatMessages`), `input`, `loading`.
- **Comportamento real da função `send()`:**
  ```ts
  const send = () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input };
    setMessages(m => [...m, userMsg]);
    setInput('');
    setLoading(true);
    setTimeout(() => {
      setMessages(m => [...m, {
        role: 'assistant',
        content: 'Com base nos dados disponíveis, posso analisar esse ponto com mais detalhes. Gostaria que eu gere um relatório completo ou apenas um resumo executivo?'
      }]);
      setLoading(false);
    }, 1200);
  };
  ```
  A mensagem do usuário é adicionada ao estado local; após 1200ms, **uma resposta de texto
  fixa e idêntica para qualquer pergunta** é adicionada como se fosse da IA. Não há chamada a
  `fetch`, `axios` ou a qualquer SDK (incluindo `@google/genai`, que está declarado em
  `package.json` mas não é importado neste arquivo nem em nenhum outro de `src/`).
- **Discrepância confirmada entre a interface e o código:** o cabeçalho da página exibe o
  texto `"Assistente inteligente · GPT-4o"` (`src/features/IAPage.tsx`), mas nenhuma
  integração com OpenAI, GPT ou qualquer outro provedor de IA está implementada no código —
  a resposta é o literal de string mostrado acima.
- **Também presentes, sem função conectada:** 4 botões de "sugestão" que apenas preenchem o
  campo de texto (`onClick={() => setInput(s)}` — isso funciona, mas não envia a mensagem
  automaticamente); uma barra lateral de "Histórico" com 5 conversas fixas, sem `onClick`
  algum; um botão "Nova conversa" sem `onClick`.
- **Dependências:** `Btn` (de `../components/ui`), ícones `lucide-react` (`Sparkles, Send,
  Plus`).


