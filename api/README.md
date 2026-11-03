<div align="center">

# Bookshelf API

API REST para gerenciamento de livros de uma lista de leitura pessoal, desenvolvida como projeto de estudo e consumida pelo front-end em [`web/`](../web/README.md).

[![NestJS](https://img.shields.io/badge/NestJS-12-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Fastify](https://img.shields.io/badge/Fastify-5-000000?style=for-the-badge&logo=fastify&logoColor=white)](https://fastify.dev/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-18-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Zod](https://img.shields.io/badge/Zod-4-3E67B1?style=for-the-badge&logo=zod&logoColor=white)](https://zod.dev/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![pnpm](https://img.shields.io/badge/pnpm-11-F69220?style=for-the-badge&logo=pnpm&logoColor=white)](https://pnpm.io/)

</div>

## Sobre o projeto

A API implementa o CRUD de livros de uma estante pessoal: cada livro tem título, autor, status de leitura e uma nota opcional. O código segue a organização por módulo de domínio com o padrão Repository, a mesma que uso em outros projetos de estudo.

> **Atenção:** o projeto não possui autenticação nem autorização. Não exponha suas rotas publicamente nem utilize dados reais sem implementar essas proteções.

## Funcionalidades

- CRUD de livros.
- Filtro opcional da listagem por status de leitura.
- Validação de payloads, parâmetros e query strings com Zod.
- Validação das variáveis de ambiente na inicialização.
- Tratamento global de exceções, com resposta padronizada para erros não documentados.
- CORS configurável por variável de ambiente.
- Documentação interativa da API.

## Tecnologias

| Tecnologia                                                                    | Uso                                   |
| ----------------------------------------------------------------------------- | ------------------------------------- |
| [NestJS](https://nestjs.com/) e [TypeScript](https://www.typescriptlang.org/) | Estrutura da aplicação e linguagem    |
| [Fastify](https://fastify.dev/)                                               | Adaptador HTTP                        |
| [Prisma](https://www.prisma.io/)                                              | Acesso ao banco de dados e migrations |
| [PostgreSQL](https://www.postgresql.org/)                                     | Banco de dados relacional             |
| [Zod](https://zod.dev/)                                                       | Validação de dados e configuração     |
| [OpenAPI](https://www.openapis.org/) e [Scalar](https://scalar.com/)          | Documentação interativa               |
| [Vitest](https://vitest.dev/)                                                 | Testes                                |
| [oxlint](https://oxc.rs/docs/guide/usage/linter) e [Prettier](https://prettier.io/) | Lint e formatação               |
| [Docker Compose](https://docs.docker.com/compose/)                            | Banco de dados local                  |
| [pnpm](https://pnpm.io/)                                                      | Gerenciamento de pacotes              |

## Arquitetura

O código é organizado por módulo de domínio (`book`) e utiliza o padrão Repository para separar o serviço da implementação de persistência.

```text
Controller → Service → BookRepository (abstrato) → PrismaBookRepository → PrismaService → PostgreSQL
```

O contrato abstrato (`BookRepository`) é usado na injeção de dependências do NestJS, enquanto o repositório concreto cuida apenas das consultas ao banco. O serviço é quem decide o que fazer com o resultado, como lançar `NotFoundException` quando o livro não existe.

A validação usa o `StandardSchemaValidationPipe` do NestJS 12 como pipe global. Os schemas Zod são passados direto nos decorators, por exemplo `@Body({ schema: createBookSchema })`.

```text
src/
├── book/
│   ├── dtos/            # Schemas Zod e tipos de entrada
│   ├── entities/        # Tipos do domínio
│   ├── repositories/    # Contrato abstrato e implementação com Prisma
│   ├── book.controller.ts
│   ├── book.service.ts
│   └── book.module.ts
├── common/
│   ├── filters/         # Filtro global de exceções
│   └── schemas/         # Schemas reutilizáveis (id)
├── config/              # Schema das variáveis de ambiente
├── prisma/              # PrismaService e módulo
├── generated/prisma/    # Prisma Client gerado (não versionado)
├── app.module.ts
└── main.ts
```

## Como executar localmente

### Requisitos

- Node.js `24 LTS`.
- pnpm.
- Docker e Docker Compose.

### 1. Instale as dependências

```bash
pnpm install
```

### 2. Configure as variáveis de ambiente

Copie o arquivo de exemplo:

```bash
cp .env.example .env
```

O exemplo já vem com valores compatíveis com o banco do Docker Compose:

```env
NODE_ENV=development
PORT=3001
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/bookshelf?schema=public"
CORS_ORIGIN=http://localhost:3000
```

| Variável       | Descrição                                                   |
| -------------- | ----------------------------------------------------------- |
| `NODE_ENV`     | Ambiente de execução (`development`, `production` ou `test`) |
| `PORT`         | Porta da API                                                |
| `DATABASE_URL` | URL de conexão com o PostgreSQL                             |
| `CORS_ORIGIN`  | Origem liberada no CORS (a URL do front-end)                |

As credenciais do exemplo servem apenas para o ambiente local.

### 3. Inicie o banco de dados

```bash
docker compose up -d
```

### 4. Gere o Prisma Client e aplique as migrations

```bash
pnpm exec prisma generate --config prisma7.config.ts
pnpm exec prisma migrate dev --config prisma7.config.ts
```

O arquivo de configuração do Prisma se chama `prisma7.config.ts`, por isso o uso da opção `--config`. O Prisma Client é gerado em `src/generated/prisma`, que não é versionado, então esse passo é necessário após clonar o repositório.

### 5. Inicie a API

```bash
pnpm start:dev
```

A API ficará disponível em `http://localhost:3001`. A documentação interativa estará em `http://localhost:3001/docs`.

## Endpoints

Todas as rotas são relativas a `http://localhost:3001`. O parâmetro `:id` deve ser um UUID válido.

| Método   | Rota         | Sucesso          | Descrição                                |
| -------- | ------------ | ---------------- | ---------------------------------------- |
| `POST`   | `/books`     | `201 Created`    | Cadastra um livro                        |
| `GET`    | `/books`     | `200 OK`         | Lista livros, com filtro opcional        |
| `GET`    | `/books/:id` | `200 OK`         | Busca um livro                           |
| `PATCH`  | `/books/:id` | `200 OK`         | Atualiza um ou mais campos de um livro   |
| `DELETE` | `/books/:id` | `204 No Content` | Remove um livro                          |

### Parâmetros de consulta

| Rota         | Parâmetro | Descrição                                                          |
| ------------ | --------- | ------------------------------------------------------------------ |
| `GET /books` | `status`  | Filtra por status: `WANT_TO_READ`, `READING` ou `READ`             |

### Modelo do livro

| Campo       | Tipo                                      | Regras                                         |
| ----------- | ----------------------------------------- | ---------------------------------------------- |
| `id`        | UUID                                      | Gerado pelo banco                              |
| `title`     | texto                                     | Obrigatório, de 1 a 150 caracteres             |
| `author`    | texto                                     | Obrigatório, de 1 a 100 caracteres             |
| `status`    | `WANT_TO_READ`, `READING` ou `READ`       | Obrigatório                                    |
| `rating`    | inteiro ou `null`                         | Opcional, de 1 a 5                             |
| `createdAt` | data                                      | Gerada pelo banco                              |
| `updatedAt` | data                                      | Atualizada automaticamente                     |

No `PATCH`, todos os campos são opcionais, mas pelo menos um deve ser enviado.

### Exemplo: cadastrar um livro

```bash
curl -X POST http://localhost:3001/books \
  -H 'Content-Type: application/json' \
  -d '{
    "title": "Dom Casmurro",
    "author": "Machado de Assis",
    "status": "READING",
    "rating": null
  }'
```

### Erros

Payloads, parâmetros ou query strings inválidos retornam `400 Bad Request`. A busca de um id inexistente em `GET /books/:id` retorna `404 Not Found`. O filtro global mantém o status e o corpo das exceções do NestJS e acrescenta `statusCode` e `timestamp`:

```json
{
  "message": "Book 6ba7b810-9dad-41d1-80b4-00c04fd430c8 not found",
  "error": "Not Found",
  "statusCode": 404,
  "timestamp": "2026-11-03T21:00:00.000Z"
}
```

Exceções não previstas retornam `500` com uma mensagem genérica, e o detalhe fica apenas no log do servidor.

## Scripts úteis

| Comando           | Descrição                                |
| ----------------- | ---------------------------------------- |
| `pnpm start:dev`  | Inicia a API em modo de desenvolvimento  |
| `pnpm build`      | Compila a aplicação                      |
| `pnpm start:prod` | Executa a versão compilada               |
| `pnpm lint`       | Executa o oxlint                         |
| `pnpm format`     | Formata o código com Prettier            |
| `pnpm test`       | Executa os testes unitários              |
| `pnpm test:e2e`   | Executa os testes e2e                    |

Outros comandos disponíveis estão definidos no `package.json`.

## Limitações atuais

- Não há autenticação nem autorização.
- A listagem não possui paginação.
- Os únicos testes são os exemplos gerados pelo template do NestJS, e não cobrem o módulo de livros.
- A rota `GET /` ainda retorna o "Hello World" do template.
