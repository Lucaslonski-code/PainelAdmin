
# Dados — `src/data.ts`

`src/data.ts` é o único arquivo de dados de todo o projeto. Ele exporta 9 constantes, cada
uma um array literal (não `as const`, diferente do padrão visto em outros arquivos de
dados de outros projetos — aqui os arrays são declarados com `export const nome = [...]`
sem anotação de tipo explícita, o que faz o TypeScript inferir o tipo a partir do primeiro
uso combinado de todos os itens).

## Visão geral

| Export | Consumido em |
|---|---|
| `revenueData` | `DashboardPage.tsx`, `FinanceiroPage.tsx` |
| `agendamentosData` | `DashboardPage.tsx` |
| `pieData` | `DashboardPage.tsx` |
| `empresas` | `EmpresasPage.tsx` |
| `clientes` | `ClientesPage.tsx` |
| `servicos` | `ServicosPage.tsx` |
| `usuarios` | `UsuariosPage.tsx` |
| `agendamentos` | `AgendamentosPage.tsx`, `DashboardPage.tsx` (apenas os 4 primeiros, via `.slice(0, 4)`) |
| `transacoes` | `FinanceiroPage.tsx` |
| `chatMessages` | `IAPage.tsx` (estado inicial do chat) |

## `revenueData`

Array de 7 objetos (um por mês, "Jan" a "Jul"), cada um com `month: string`,
`receita: number`, `despesa: number`. Usado nos gráficos `AreaChart` (Dashboard) e
`BarChart` (Financeiro) da biblioteca `recharts`.

## `agendamentosData`

Array de 7 objetos (um por dia da semana, "Seg" a "Dom"), cada um com `day: string`,
`total: number`. Usado no `BarChart` de "Agendamentos por Dia" do Dashboard.

## `pieData`

Array de 3 objetos com `name: string`, `value: number` (percentual) e `color: string`
(código hex). Usado no gráfico de pizza "Distribuição Empresas" do Dashboard. Os três itens
presentes são `Ativo` (68%, verde `#22C55E`), `Pendente` (18%, âmbar `#F59E0B`) e `Inativo`
(14%, cinza `#3F3F46`).

## `empresas`

7 objetos, cada um com os campos: `id: number`, `nome: string`, `cnpj: string`,
`status: string` (valores usados: `ativo`, `pendente`, `inativo`), `plano: string` (valores
usados: `Starter`, `Pro`, `Enterprise`), `clientes: number`, `mrr: number`, `cidade: string`,
`criado: string` (data já formatada como texto, ex.: `"12 Jan 2024"`).

## `clientes`

6 objetos, com: `id`, `nome`, `email`, `empresa: string` (nome da empresa, texto livre — não
é uma referência por `id` ao array `empresas`), `status` (`ativo`, `inativo`, `pendente`),
`ultimo: string` (data formatada), `agendamentos: number`, `gasto: number`.

## `servicos`

6 objetos, com: `id`, `nome`, `categoria: string` (`Manutenção`, `TI`, `Suporte`,
`Consultoria`, `Educação`), `duracao: string` (texto livre, ex.: `"2h"`, `"30min"`),
`preco: number`, `ativo: boolean`, `agendamentos: number`.

## `usuarios`

5 objetos, com: `id`, `nome`, `email` (todos no domínio `@autonova.io`), `cargo: string`
(texto livre, ex.: `"Administradora"`), `role: string` (valores usados: `admin`, `manager`,
`viewer`), `status` (`ativo`, `inativo`), `ultimo: string` (texto livre relativo, ex.:
`"2h atrás"`, `"Agora"`).

## `agendamentos`

6 objetos, com: `id`, `cliente: string` (nome, texto livre), `servico: string` (nome do
serviço, texto livre), `data: string` (formatada), `hora: string` (formato `"HH:MM"`),
`status: string` (valores usados: `confirmado`, `em_andamento`, `pendente`, `cancelado`),
`tecnico: string` (nome, texto livre), `empresa: string` (nome, texto livre).

Nenhum desses campos de texto livre (`cliente`, `servico`, `tecnico`, `empresa`) é uma chave
estrangeira real — são strings duplicadas manualmente que precisam bater com os nomes
usados nos demais arrays para a informação parecer consistente entre telas, mas não existe
nenhuma validação ou relação estruturada entre eles.

## `transacoes`

7 objetos, com: `id`, `descricao: string`, `tipo: string` (`receita` ou `despesa`),
`valor: number`, `data: string` (formatada), `status: string` (valores usados: `pago`,
`pendente`), `metodo: string` (texto livre: `Transferência`, `Pix`, `Cartão`, `Débito`,
`Boleto`).

## `chatMessages`

Array de 2 objetos com `role: 'assistant' | 'user'` e `content: string`. É o histórico
inicial exibido na tela de IA antes de qualquer interação do usuário — a primeira mensagem é
uma saudação fixa da "IA do AutoNova" e a segunda simula uma pergunta de exemplo do usuário
com uma resposta de exemplo já pronta (uma lista de 3 empresas "em risco de churn").

## Observações gerais sobre os dados

- Todos os valores monetários são números inteiros em reais, sem centavos, formatados na
  interface com `.toLocaleString('pt-BR')`.
- Nenhum array possui campo de imagem, avatar ou URL — os avatares exibidos na interface
  (componente `Avatar` em `src/components/ui.tsx`) são gerados a partir das iniciais do
  campo `nome`, não de uma imagem.
- Como os arrays não usam `as const` nem uma interface/tipo explícito exportado, o
  TypeScript infere os tipos de `status`, `role`, `tipo` etc. como `string` genérico (não
  como uniões literais como `'ativo' | 'pendente' | 'inativo'`). Isso significa que
  atribuir um valor de status não previsto em nenhum lugar (ex.: `status: 'suspenso'`) não
  gera erro de tipo — o mapeamento de exibição em `StatusBadge` (`src/components/ui.tsx`)
  simplesmente cairia no fallback `{ label: status, variant: 'neutral' }` para qualquer
  valor não reconhecido.

