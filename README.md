# API REST de Produtos e Avaliações

## Informações do Projeto

Este é um backend construído com **Node.js**, utilizando o framework **Express.js** e o banco de dados **MongoDB**. A API REST implementada permite gerenciar produtos e suas respectivas avaliações.

### Entidades

#### 🛒 `products`

| Campo         | Tipo     | Descrição                  |
| ------------- | -------- | -------------------------- |
| `name`        | `string` | Nome do produto            |
| `description` | `string` | Descrição do produto       |
| `price`       | `number` | Preço do produto           |
| `category`    | `string` | Categoria do produto       |
| `createdAt`   | `date`   | Data de criação do produto |

#### 📝 `reviews`

| Campo       | Tipo                         | Descrição                        |
| ----------- | ---------------------------- | -------------------------------- |
| `productId` | `ObjectId` (ref: `products`) | Referência ao produto avaliado   |
| `author`    | `string`                     | Autor da avaliação               |
| `rating`    | `number` (1 a 5)             | Classificação da avaliação (1-5) |
| `comment`   | `string`                     | Comentário da avaliação          |
| `createdAt` | `date`                       | Data de criação da avaliação     |

**Regras:** Cada produto pode ter várias avaliações.

## Funcionalidades da API

A API REST implementada permite as seguintes operações:

- **Produtos:**
  - `POST /products`: Criar um novo produto.
  - `GET /products`: Listar todos os produtos.
- **Avaliações por Produto:**
  - `POST /products/:productId/reviews`: Criar uma nova avaliação para um produto específico.
  - `GET /products/:productId/reviews`: Listar todas as avaliações de um produto específico.
- **Média de Avaliações:**
  - `GET /products/:productId/average-rating`: Obter a média das avaliações de um produto específico.

## Como executar

### Pré-requisitos

- [Node.js](https://nodejs.org/) instalado
- [npm](https://www.npmjs.com/) (geralmente instalado com o Node.js)
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/) (opcional, para a execução com Docker)

### Execução Local

1.  Clone este repositório (se aplicável).
2.  Navegue até a pasta do projeto no seu terminal.
3.  Instale as dependências:
    ```bash
    npm install
    ```
4.  Certifique-se de que o MongoDB esteja rodando localmente (na porta padrão `27017`).
5.  Inicie o servidor backend:
    ```bash
    npm run dev # Ou node server.js, dependendo da sua configuração
    ```
    O servidor estará rodando em `http://localhost:3000`.

### Execução com Docker

1.  Certifique-se de ter o Docker e o Docker Compose instalados.
2.  Navegue até a pasta do projeto no seu terminal.
3.  Inicie os containers com Docker Compose:
    ```bash
    docker-compose up -d
    ```
    O backend estará acessível em `http://localhost:3000`. O MongoDB estará rodando dentro do container.

## Endpoints da API

Aqui estão os endpoints da API que você pode consumir:

- `POST http://localhost:3000/products` - Cria um novo produto (requer um corpo JSON com as informações do produto).
- `GET http://localhost:3000/products` - Retorna uma lista de todos os produtos.
- `POST http://localhost:3000/products/:productId/reviews` - Cria uma nova avaliação para o produto com o ID especificado (requer um corpo JSON com as informações da avaliação).
- `GET http://localhost:3000/products/:productId/reviews` - Retorna uma lista de avaliações para o produto com o ID especificado.
- `GET http://localhost:3000/products/:productId/average-rating` - Retorna a média das avaliações para o produto com o ID especificado.

## Tecnologias Utilizadas

- Node.js
- Express.js
- MongoDB
- Mongoose
- TypeScript (opcional, dependendo da implementação)
- Docker (opcional, para containerização)
- Docker Compose (opcional, para orquestração de containers)

---

Este é um backend simples para um teste técnico, demonstrando a criação de uma API REST com Node.js, Express.js e MongoDB para gerenciar produtos e avaliações.
