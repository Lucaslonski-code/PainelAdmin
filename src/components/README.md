
# `src/components/` — Componentes compartilhados

Contém exatamente três arquivos, confirmados por inspeção direta:

```
components/
├── Sidebar.tsx   # Menu lateral de navegação entre as 10 páginas
├── Topbar.tsx    # Cabeçalho com breadcrumb, busca e sino de notificação
└── ui.tsx        # Biblioteca de 14 componentes de UI reutilizados por todas as páginas
```

Diferente de `src/features/`, onde cada arquivo é uma página completa, aqui cada arquivo é
compartilhado por múltiplas páginas:

- `Sidebar` e `Topbar` são renderizados uma única vez, em `src/App.tsx`, e ficam fixos
  independentemente de qual página está ativa.
- `ui.tsx` não exporta uma página nem uma seção — exporta blocos de UI de baixo nível
  (`Badge`, `StatusBadge`, `KpiCard`, `Btn`, `SearchInput`, `TableContainer`, `Th`, `Td`,
  `Pagination`, `Avatar`, `EmptyState`, `Modal`, `FormField`, `Input`, `Select`,
  `SectionHeader`) importados por praticamente todas as páginas de `src/features/`.

A referência completa de cada componente, incluindo props e comportamento real, está em
[`../../docs/COMPONENTES.md`](../../docs/COMPONENTES.md).

## Observação importante sobre `Pagination`

O componente `Pagination` (em `ui.tsx`) recebe seu total de páginas como um número fixo
passado por cada página consumidora — ele mesmo não calcula esse total a partir de nenhum
array. Ver [`../../docs/COMPONENTES.md`](../../docs/COMPONENTES.md#observação-sobre-pagination)
antes de reutilizá-lo em uma tela nova.

## Ausência de utilitário de composição de classes

Não existe, neste diretório nem em qualquer outro lugar do projeto, uma função equivalente a
`cn()` (combinação de `clsx` + `tailwind-merge`) — apesar de ambas as bibliotecas estarem
declaradas em `package.json`. Classes condicionais são montadas com template strings
diretamente dentro de cada componente (ver exemplo em
[`../../docs/DESENVOLVIMENTO.md#estilos`](../../docs/DESENVOLVIMENTO.md#estilos)).


