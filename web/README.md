<div align="center">

# Bookshelf Web

Front-end da Minha Estante: uma aplicação em Next.js para cadastrar, listar, filtrar, editar e excluir livros, integrada à API em [`api/`](../api/README.md).

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)](https://ui.shadcn.com/)
[![React Hook Form](https://img.shields.io/badge/React_Hook_Form-7-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white)](https://react-hook-form.com/)
[![Zod](https://img.shields.io/badge/Zod-4-3E67B1?style=for-the-badge&logo=zod&logoColor=white)](https://zod.dev/)
[![Axios](https://img.shields.io/badge/Axios-1-5A29E4?style=for-the-badge&logo=axios&logoColor=white)](https://axios-http.com/)
[![pnpm](https://img.shields.io/badge/pnpm-11-F69220?style=for-the-badge&logo=pnpm&logoColor=white)](https://pnpm.io/)

</div>

## Sobre o projeto

Este front-end foi desenvolvido para aprender, na prática, a estrutura de um projeto Next.js, HTML semântico, estilização com Tailwind CSS, formulários com React Hook Form e a integração com uma API REST. A interface está em português.

> **Atenção:** o projeto não possui autenticação nem autorização, assim como a API.

> **Sobre o processo:** foi feito com a ajuda do Claude, com o objetivo de aprender, e eu não domino tudo o que está aqui. Veja [Aprendizado e uso de IA](../README.md#aprendizado-e-uso-de-ia) no README principal.

## Funcionalidades

- Listagem de livros em cards, com título, autor, status e nota.
- Filtro por status controlado pela URL (`/books?status=READING`), o que permite compartilhar o link e usar o botão voltar do navegador.
- Cadastro de livros com validação em tempo de envio e mensagens de erro por campo.
- Edição de livros reaproveitando o mesmo formulário do cadastro.
- Exclusão com confirmação em diálogo.
- Estados de carregamento (skeleton), de erro (com opção de tentar novamente) e de lista vazia.
- Página 404 para livros inexistentes ou ids inválidos.
- HTML semântico (`header`, `main`, `section`, `article`, `nav`, `footer`) e atributos de acessibilidade (`label`, `aria-invalid`, `aria-describedby`, `aria-label`, `role="alert"`).

## Tecnologias

| Tecnologia                                                                                           | Uso                                         |
| ---------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| [Next.js](https://nextjs.org/) (App Router), [React](https://react.dev/) e [TypeScript](https://www.typescriptlang.org/) | Estrutura da aplicação e linguagem |
| [Tailwind CSS](https://tailwindcss.com/)                                                             | Estilização                                 |
| [shadcn/ui](https://ui.shadcn.com/) com [Base UI](https://base-ui.com/)                              | Componentes (button, card, dialog, input...) |
| [React Hook Form](https://react-hook-form.com/) e [@hookform/resolvers](https://github.com/react-hook-form/resolvers) | Estado e envio dos formulários |
| [Zod](https://zod.dev/)                                                                              | Validação dos dados do formulário e do filtro da URL |
| [Axios](https://axios-http.com/)                                                                     | Requisições à API                           |
| [Lucide](https://lucide.dev/)                                                                        | Ícones                                      |
| [pnpm](https://pnpm.io/)                                                                             | Gerenciamento de pacotes                    |

## Páginas

| Rota               | Tipo do componente | Descrição                                       |
| ------------------ | ------------------ | ----------------------------------------------- |
| `/`                | Server             | Redireciona para `/books`                       |
| `/books`           | Server             | Lista de livros com filtro por status           |
| `/books/new`       | Server + formulário client | Cadastro de um livro                    |
| `/books/[id]/edit` | Server + formulário client | Edição de um livro                      |

## Estrutura

```text
src/
├── app/
│   ├── books/
│   │   ├── [id]/edit/page.tsx   # Edição (rota dinâmica)
│   │   ├── new/page.tsx         # Cadastro
│   │   ├── page.tsx             # Listagem e filtro
│   │   ├── loading.tsx          # Skeleton enquanto carrega
│   │   └── error.tsx            # Tela de erro
│   ├── layout.tsx               # Layout base (header, main, footer)
│   └── page.tsx                 # Redirecionamento para /books
├── components/
│   ├── ui/                      # Componentes do shadcn/ui
│   ├── book-card.tsx
│   ├── book-form.tsx            # Formulário de cadastro e edição
│   ├── book-status-filter.tsx
│   ├── delete-book-button.tsx   # Botão com diálogo de confirmação
│   ├── header.tsx
│   └── footer.tsx
├── lib/
│   ├── api.ts                   # Instância do Axios
│   └── utils.ts                 # Utilitário cn() do shadcn/ui
├── schemas/book.ts              # Schema Zod do formulário
├── services/books.ts            # Funções que chamam a API
└── types/book.ts                # Tipos e rótulos de status
```

## Conceitos praticados

| Conceito                              | Onde ver                                                              |
| ------------------------------------- | --------------------------------------------------------------------- |
| Server Components com busca de dados  | `app/books/page.tsx` e `app/books/[id]/edit/page.tsx`                 |
| Client Components (`"use client"`)    | `book-form.tsx`, `delete-book-button.tsx` e `app/books/error.tsx`     |
| Rotas dinâmicas e `notFound()`        | `app/books/[id]/edit/page.tsx`                                        |
| Estado na URL (`searchParams`)        | `app/books/page.tsx` e `book-status-filter.tsx`                       |
| `loading.tsx` e `error.tsx`           | `app/books/`                                                          |
| React Hook Form com Zod               | `book-form.tsx` e `schemas/book.ts`                                   |
| Instância e camada de serviços do Axios | `lib/api.ts` e `services/books.ts`                                  |
| Componentes do shadcn/ui              | `components/ui/` e `delete-book-button.tsx`                           |

## Como executar localmente

### Requisitos

- Node.js `24 LTS`.
- pnpm.
- A [API](../api/README.md) em execução.

### 1. Instale as dependências

```bash
pnpm install
```

### 2. Configure as variáveis de ambiente

Crie o arquivo `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

| Variável              | Descrição                                          |
| --------------------- | -------------------------------------------------- |
| `NEXT_PUBLIC_API_URL` | URL base da API, usada pelo Axios                  |

O prefixo `NEXT_PUBLIC_` expõe a variável ao navegador, o que é necessário porque o formulário e a exclusão fazem requisições diretamente do navegador. Por isso o `CORS_ORIGIN` da API precisa apontar para a URL deste front-end.

### 3. Inicie o front-end

```bash
pnpm dev
```

O front-end ficará disponível em `http://localhost:3000`.

## Scripts úteis

| Comando      | Descrição                                |
| ------------ | ---------------------------------------- |
| `pnpm dev`   | Inicia o servidor de desenvolvimento     |
| `pnpm build` | Gera o build de produção                 |
| `pnpm start` | Executa o build de produção              |
| `pnpm lint`  | Executa o ESLint                         |

## Limitações atuais

- Não há autenticação nem autorização.
- A lista não possui paginação.
- Não há testes automatizados.
- A interface não tem alternância entre tema claro e escuro nem upload de capa dos livros.
