<div align="center">

# Bookshelf — Minha Estante

Aplicação full stack para organizar a lista de leitura pessoal: cadastre livros, acompanhe o status (quero ler, lendo, lido) e registre notas. Projeto de estudo com front-end em Next.js e API em NestJS.

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![NestJS](https://img.shields.io/badge/NestJS-12-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-18-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Zod](https://img.shields.io/badge/Zod-4-3E67B1?style=for-the-badge&logo=zod&logoColor=white)](https://zod.dev/)
[![pnpm](https://img.shields.io/badge/pnpm-11-F69220?style=for-the-badge&logo=pnpm&logoColor=white)](https://pnpm.io/)

</div>

## Sobre o projeto

O repositório reúne duas aplicações independentes: uma API REST (`api/`) e um front-end (`web/`) que consome essa API. O projeto foi desenvolvido durante a formação em Engenharia de Software, com foco em aprender o front-end do zero e entender como ele se integra ao back-end.

> **Atenção:** o projeto não possui autenticação nem autorização. Não exponha a API publicamente nem utilize dados reais sem implementar essas proteções.

> **Sobre o processo:** este projeto foi feito com a ajuda do Claude, com o objetivo de aprender, e eu não domino tudo o que está aqui. Os detalhes estão em [Aprendizado e uso de IA](#aprendizado-e-uso-de-ia).

## Funcionalidades

- Cadastro, listagem, edição e exclusão de livros (título, autor, status e nota de 1 a 5).
- Filtro por status (`Quero ler`, `Lendo` e `Lido`) controlado pela URL.
- Formulário único reaproveitado para criar e editar livros.
- Confirmação em diálogo antes de excluir.
- Estados de carregamento (skeleton) e de erro nas telas de listagem.
- Validação dos dados no front-end e no back-end com Zod.
- HTML semântico e atributos de acessibilidade nos componentes.
- Documentação interativa da API em `/docs`.

## Tecnologias

| Tecnologia                                                                                                      | Uso                                  |
| --------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| [Next.js](https://nextjs.org/) (App Router), [React](https://react.dev/) e [TypeScript](https://www.typescriptlang.org/) | Front-end                  |
| [Tailwind CSS](https://tailwindcss.com/) e [shadcn/ui](https://ui.shadcn.com/)                                  | Estilização e componentes            |
| [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/) e [Axios](https://axios-http.com/)     | Formulários, validação e requisições |
| [NestJS](https://nestjs.com/) e [Fastify](https://fastify.dev/)                                                 | API REST                             |
| [Prisma](https://www.prisma.io/) e [PostgreSQL](https://www.postgresql.org/)                                    | Acesso a dados e banco relacional    |
| [OpenAPI](https://www.openapis.org/) e [Scalar](https://scalar.com/)                                            | Documentação interativa da API       |
| [Docker Compose](https://docs.docker.com/compose/)                                                              | Banco de dados local                 |
| [pnpm](https://pnpm.io/)                                                                                        | Gerenciamento de pacotes             |

## Estrutura do repositório

```text
.
├── api/   # API REST em NestJS
└── web/   # Front-end em Next.js
```

Não é um workspace: cada pasta tem seu próprio `package.json` e suas próprias dependências.

| Pasta  | Descrição                                           | Documentação                |
| ------ | --------------------------------------------------- | --------------------------- |
| `api/` | Endpoints, banco de dados, validação e arquitetura  | [api/README.md](api/README.md) |
| `web/` | Páginas, componentes, formulários e integração      | [web/README.md](web/README.md) |

## Como executar localmente

### Requisitos

- Node.js `24 LTS`.
- pnpm.
- Docker e Docker Compose.

### 1. Inicie a API

```bash
cd api
pnpm install
cp .env.example .env
docker compose up -d
pnpm exec prisma generate --config prisma7.config.ts
pnpm exec prisma migrate dev --config prisma7.config.ts
pnpm start:dev
```

A API ficará disponível em `http://localhost:3001`, com a documentação em `http://localhost:3001/docs`.

### 2. Inicie o front-end

Em outro terminal:

```bash
cd web
pnpm install
echo "NEXT_PUBLIC_API_URL=http://localhost:3001" > .env.local
pnpm dev
```

O front-end ficará disponível em `http://localhost:3000`.

Os detalhes de cada passo, as variáveis de ambiente e os scripts estão nos READMEs de [`api/`](api/README.md) e [`web/`](web/README.md).

## Limitações atuais

- Não há autenticação nem autorização.
- As listagens não possuem paginação.
- Não há testes automatizados do projeto. A API traz apenas os testes de exemplo gerados pelo template do NestJS.

## Aprendizado e uso de IA

Este projeto foi construído com a ajuda do Claude (Anthropic), com o objetivo de aprender mais sobre front-end e sobre a integração com o back-end. Os temas que quis praticar foram:

- Estrutura de projetos Next.js (App Router, Server e Client Components).
- HTML semântico e estilização com Tailwind CSS.
- Componentes do shadcn/ui.
- Formulários com React Hook Form e validação com Zod.
- Requisições com Axios e a comunicação entre front-end e API.

Eu não domino tudo o que está neste repositório. Entendo algumas partes, mas não todas, e ainda não saberia refazer o projeto sozinho. O que fica dele é o aprendizado, que era o objetivo. O back-end segue a estrutura que já uso em outros projetos (módulos por domínio e padrão Repository), então o foco do estudo foi o front-end e a integração entre os dois lados.

Os commits seguem o padrão [Conventional Commits](https://www.conventionalcommits.org/pt-br/), com os escopos `web` e `api` para indicar qual parte do repositório foi alterada.
