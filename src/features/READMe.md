
# `src/features/` — Páginas do painel

Contém 10 arquivos, cada um implementando **uma página completa** do PainelAdmin, registrada
em `src/App.tsx` e alcançável pelo menu em `src/components/Sidebar.tsx`:

```
features/
├── DashboardPage.tsx        # KPIs fixos + gráficos (Recharts) + últimos agendamentos
├── EmpresasPage.tsx         # Tabela de empresas + modais de criar/editar/excluir (não conectados)
├── ClientesPage.tsx         # Tabela de clientes (ações de linha sem onClick)
├── ServicosPage.tsx         # Tabela de catálogo de serviços (ações sem onClick)
├── UsuariosPage.tsx         # Tabela de usuários + modal de convite (não conectado)
├── AgendamentosPage.tsx     # Tabela/lista alternável de agendamentos
├── FinanceiroPage.tsx       # KPIs calculados a partir de transacoes + abas (visão/transações/faturas)
├── ConfiguracoesPage.tsx    # 4 sub-seções (geral/integrações/notificações/segurança), todas estáticas
├── PerfilPage.tsx           # Perfil do usuário fixo "Ana Beatriz Lima", 3 abas
└── IAPage.tsx                # Chat com resposta simulada (setTimeout), sem integração de IA real
```

## Convenções observadas

- **Cada arquivo exporta uma função nomeada** (`export function NomePage() {…}`), nunca
  `export default`. `src/App.tsx` importa todas com import nomeado.
- **Todas as páginas importam seus dados diretamente de `../data`**, sem nenhuma camada de
  serviço ou hook intermediário (ver [`../../docs/DADOS.md`](../../docs/DADOS.md)).
- **Filtragem por busca é sempre local**, com `.filter()` + `.includes()` sobre o array já
  carregado — nenhuma página faz uma nova chamada de dados ao digitar na busca.
- **Nem todas as páginas usam `src/data.ts`.** `ConfiguracoesPage.tsx` e `PerfilPage.tsx`
  têm todo o seu conteúdo (textos, listas de integrações, sessões) declarado localmente
  dentro do próprio arquivo do componente.
- **Ações de escrita (criar, editar, excluir, salvar, convidar) não persistem
  nenhuma mudança** em nenhuma página — ver
  [`../../docs/ARQUITETURA.md#formulários-e-ações-criareditarexcluir`](../../docs/ARQUITETURA.md#formulários-e-ações-criareditarexcluir).

A referência detalhada de cada página está em
[`../../docs/COMPONENTES.md`](../../docs/COMPONENTES.md).


