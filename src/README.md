
# `src/` — Código-fonte do PainelAdmin

Confirmado por inspeção direta: `src/` contém, além das subpastas `components/` e
`features/`, quatro arquivos na raiz:

| Arquivo | Responsabilidade |
|---|---|
| `main.tsx` | Ponto de entrada do React — monta `<App />` em `#root` dentro de `<StrictMode>`, importa `index.css` |
| `App.tsx` | Componente raiz — mantém o estado `page`/`collapsed`, monta o layout (Sidebar + Topbar + página atual) |
| `types.ts` | Define o tipo `Page`, união literal dos 10 identificadores de página válidos |
| `data.ts` | Única fonte de dados de todo o projeto — ver [`../docs/DADOS.md`](../docs/DADOS.md) |
| `index.css` | Único arquivo CSS do projeto — contém apenas `@import "tailwindcss";` |

Não existem, em `src/`, as pastas `hooks/`, `services/`, `lib/`, `utils/` ou `styles/` — o
README anterior deste projeto mencionava essas pastas, mas elas não estão presentes no
repositório analisado.

Detalhamento de cada subpasta:

- [`components/README.md`](components/README.md)
- [`features/README.md`](features/README.md)

Ver o fluxo completo de renderização e composição em
[`../docs/ARQUITETURA.md`](../docs/ARQUITETURA.md).


