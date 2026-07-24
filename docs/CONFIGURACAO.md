
# Configuração

Documentação dos arquivos de configuração reais do PainelAdmin.

## `vite.config.ts`

```ts
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
```

Pontos confirmados:

- O alias `@` aponta para a **raiz do projeto** (`path.resolve(__dirname, '.')`), não para
  `src/`. Nenhum arquivo de `src/` analisado usa esse alias em seus imports — todos os
  imports observados em `src/` usam caminhos relativos (`./`, `../`).
- Os comentários no bloco `server` confirmam explicitamente que o projeto foi criado ou é
  executado dentro do **Google AI Studio**, e que a variável de ambiente `DISABLE_HMR`
  desativa o Hot Module Reload e o watch de arquivos quando definida como `'true'` — usado,
  segundo o comentário, para evitar "flickering" durante edições feitas por um agente.

## `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "experimentalDecorators": true,
    "useDefineForClassFields": false,
    "module": "ESNext",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "isolatedModules": true,
    "moduleDetection": "force",
    "allowJs": true,
    "jsx": "react-jsx",
    "paths": { "@/*": ["./*"] },
    "allowImportingTsExtensions": true,
    "noEmit": true
  }
}
```

Pontos confirmados:

- `paths: { "@/*": ["./*"] }` replica, no TypeScript, o mesmo alias `@` configurado no Vite
  (raiz do projeto) — mas, como já indicado acima, nenhum arquivo em `src/` o utiliza
  atualmente.
- Não existe a flag `"strict": true` nem qualquer uma das flags individuais de modo estrito
  (`strictNullChecks`, `noImplicitAny` etc.) neste arquivo — o projeto **não está em modo
  estrito do TypeScript**.
- `noEmit: true` é consistente com o script `"lint": "tsc --noEmit"` — o TypeScript é usado
  apenas para checagem de tipos, nunca para gerar arquivos `.js` (quem faz isso é o Vite/
  esbuild durante `vite build`).

## `.env` e `.env.example`

Ambos os arquivos contêm uma única variável:

```
VITE_API_URL=http://localhost:3000
```

Conforme detalhado no [`README.md`](../README.md#variáveis-de-ambiente), essa variável não é
lida por nenhum arquivo de `src/` (nenhuma ocorrência de `import.meta.env` no projeto). O
`.gitignore` ignora `.env`, `.env.*` **e também `.env.example`** — os três estão fora do
controle de versão neste repositório.

## `pnpm-workspace.yaml`

```yaml
allowBuilds:
  '@google/genai': true
  esbuild: true
  protobufjs: false
```

Esta chave `allowBuilds` do pnpm controla quais dependências têm permissão para executar
scripts de build/postinstall durante a instalação. As três entradas listadas
(`@google/genai`, `esbuild`, `protobufjs`) são as únicas dependências do projeto com essa
permissão explicitamente configurada — `@google/genai` e `esbuild` autorizadas, `protobufjs`
(uma dependência transitiva, não declarada diretamente em `package.json`) explicitamente
bloqueada.

## `package.json` — scripts

Ver a tabela completa em [`../README.md#scripts-disponíveis`](../README.md#scripts-disponíveis).

## Ausência de configuração de lint dedicada

Não existe nenhum arquivo `.eslintrc.*` ou `eslint.config.*`, nem a dependência `eslint`
declarada em `package.json`. O script `lint` do projeto (`tsc --noEmit`) executa apenas
checagem de tipos, não análise de estilo/qualidade de código.

## Ausência de configuração de deploy/CI

Não há, no repositório analisado, nenhum arquivo de configuração de deploy (Vercel,
Netlify, Docker, etc.) nem diretório `.github/workflows/`. O único artefato de build
presente é a pasta `dist/`, já gerada localmente (contém `dist/index.html` e
`dist/assets/index-*.js`/`.css`), mas gerada manualmente via `vite build` — não há evidência,
no material analisado, de que essa pasta seja publicada automaticamente em algum ambiente.


