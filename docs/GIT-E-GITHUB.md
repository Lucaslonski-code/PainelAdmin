
# Git e GitHub

## Estado real do repositório

Confirmado via `git log`, `git branch -a` e `git remote -v` no repositório fornecido:

- **Remoto (`origin`):** `https://github.com/Lucaslonski-code/PainelAdmin.git` (fetch e
  push).
- **Branches:** apenas `main` existe localmente e remotamente
  (`remotes/origin/main`, `remotes/origin/HEAD -> origin/main`). Não há outras branches,
  nem locais nem remotas, no repositório analisado.
- **Histórico:** exatamente 2 commits, ambos do mesmo autor
  (`Lucaslonski-code <lucaslonski890@gmail.com>`), ambos datados de 14 de julho de 2026:

  | Commit | Mensagem | Principais mudanças |
  |---|---|---|
  | `fd36fbe` | `first structure for testing, initial painel` | Estrutura inicial: `App.tsx` monolítico (1650 linhas), `AGENTS.md`, `CLAUDE.md`, `index.html`, `index.css` |
  | `00d0b14` | `re-structure, adapting for more organization` | Divisão do `App.tsx` monolítico em `src/components/` (`Sidebar.tsx`, `Topbar.tsx`, `ui.tsx`) e `src/features/` (as 10 páginas atuais); adição de `.gitignore`, `pnpm-workspace.yaml`; **remoção** de `AGENTS.md`, `CLAUDE.md` e `src/vite-env.d.ts` |

- **CI/CD:** não existe nenhum diretório `.github/workflows/` no repositório analisado.
- **Proteção de branch, templates de Issue/PR:** nenhuma configuração desse tipo está
  presente no repositório analisado.

## O que isso significa na prática

O projeto está, hoje, em um estágio inicial de organização: apenas um desenvolvedor
contribuiu até agora, diretamente na branch `main`, sem uso de branches de feature ou Pull
Requests neste histórico. Isso é uma descrição do que **já aconteceu**, não uma
recomendação — a seção abaixo descreve um fluxo recomendado para o crescimento do projeto,
que não é um comportamento automático nem obrigatório atualmente.

## Fluxo de trabalho recomendado (branches e Pull Requests)

Esta seção é uma recomendação de boas práticas, não uma política já configurada ou
obrigatória no repositório.

```bash
# Parta sempre da main atualizada
git checkout main
git pull

# Crie uma branch descritiva para a alteração
git checkout -b feature/conectar-envio-formulario-empresas

# Trabalhe, revisando o que foi alterado
git status
git diff

# Commits pequenos e descritivos
git add src/features/EmpresasPage.tsx
git commit -m "Conecta o formulário de edição de empresa ao estado local"

# Envie a branch
git push -u origin feature/conectar-envio-formulario-empresas
```

No GitHub, abra um Pull Request de `feature/conectar-envio-formulario-empresas` para `main`,
descrevendo a mudança. Após revisão, faça o merge e delete a branch.

## Comandos essenciais do dia a dia

| Objetivo | Comando |
|---|---|
| Ver o estado atual | `git status` |
| Ver diferenças não commitadas | `git diff` |
| Ver o histórico de commits | `git log --oneline --graph` |
| Trocar de branch | `git checkout nome-da-branch` |
| Criar e trocar para uma branch nova | `git checkout -b nome-da-branch` |
| Atualizar a branch atual com o remoto | `git pull` |
| Desfazer alterações não commitadas em um arquivo | `git checkout -- caminho/do/arquivo` |

## Resolver conflitos de merge

```bash
git pull   # ou git merge main dentro da sua branch
git status # lista os arquivos em conflito
# resolva manualmente os marcadores <<<<<<< / ======= / >>>>>>>
git add caminho/do/arquivo-resolvido
git commit
```

Dado que todo o conteúdo dinâmico do projeto está centralizado em `src/data.ts` (ver
[`DADOS.md`](DADOS.md)), esse é o arquivo com maior probabilidade real de gerar conflitos
quando duas pessoas editarem dados ao mesmo tempo.

## Adicionar CI/CD (se desejado no futuro)

Não existe, hoje, nenhum workflow de CI configurado. Se um pipeline for adicionado (por
exemplo, para rodar `pnpm lint` e `pnpm build` a cada Pull Request), documente aqui:

- o(s) arquivo(s) criados em `.github/workflows/`;
- os eventos que disparam o pipeline;
- os passos executados;
- como interpretar uma falha na aba **Actions** do GitHub.

