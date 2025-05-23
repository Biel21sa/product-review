# Aplicação de E-commerce com Avaliações de Produtos

## Visão Geral

Este projeto consiste em um frontend construído com **React** e um backend com **Node.js**, **Express.js** e **MongoDB**. A aplicação permite aos usuários visualizar produtos, adicionar avaliações e aos administradores cadastrar novos produtos.

## Estrutura do Projeto

```
product-review/
├── backend/ # Código do servidor (Node.js, Express)
├── frontend/ # Código da interface do usuário (React)
├── docker-compose.yml # Definição dos serviços Docker
└── README.md
```

## Backend (`backend/`)

### Tecnologias

- **Node.js**
- **Express.js** (Framework web)
- **MongoDB** (Banco de dados NoSQL)
- **Mongoose** (ODM para MongoDB)
- **TypeScript**

### Entidades

#### 🛒 `products`

| Campo         | Tipo     | Descrição                  |
| ------------- | -------- | -------------------------- |
| `name`        | `string` | Nome do produto            |
| `description` | `string` | Descrição do produto       |
| `price`       | `number` | Preço do produto           |
| `category`    | `string` | Categoria do produto       |
| `createdAt`   | `Date`   | Data de criação do produto |

#### 📝 `reviews`

| Campo       | Tipo                                 | Descrição                        |
| ----------- | ------------------------------------ | -------------------------------- |
| `productId` | `ObjectId` (referência a `products`) | ID do produto avaliado           |
| `author`    | `string`                             | Nome do autor da avaliação       |
| `rating`    | `number` (1 a 5)                     | Classificação da avaliação (1-5) |
| `comment`   | `string`                             | Comentário da avaliação          |
| `createdAt` | `Date`                               | Data de criação da avaliação     |

### Funcionalidades da API

- **Produtos:**
  - `POST /products`: Criar um novo produto.
  - `GET /products`: Listar todos os produtos.
  - `GET /products/:productId`: Obter detalhes de um produto.
- **Avaliações:**
  - `POST /products/:productId/reviews`: Adicionar uma avaliação a um produto.
  - `GET /products/:productId/reviews`: Listar as avaliações de um produto.
  - `GET /products/:productId/average-rating`: Obter a média de avaliações de um produto.

### Como executar o Backend

#### Pré-requisitos

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- MongoDB rodando localmente na porta padrão (`27017`) ou configurado via URI.

#### Passos

1.  Navegue até o diretório `backend`: `cd backend`
2.  Instale as dependências: `npm install`
3.  Execute o servidor de desenvolvimento: `npm run dev`

O backend estará rodando em `http://localhost:3000`.

## Frontend (`frontend/`)

### Tecnologias

- **React** (Biblioteca JavaScript para interfaces de usuário)
- **Axios** (Cliente HTTP para fazer requisições ao backend)
- **React Router** (Para navegação)
- **CSS Modules** (Para estilos locais)

### Funcionalidades

- Listagem de produtos, separados por categoria.
- Visualização de detalhes de um produto, incluindo avaliações.
- Adição de novas avaliações a um produto.
- Cadastro de novos produtos (para administradores).

### Como executar o Frontend

#### Pré-requisitos

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

#### Passos

1.  Navegue até o diretório `frontend`: `cd frontend`
2.  Instale as dependências: `npm install`
3.  Execute o servidor de desenvolvimento: `npm run dev`

O frontend estará acessível em `http://localhost:5173`.

## Execução com Docker Compose

Para executar toda a aplicação (backend, frontend e MongoDB) usando Docker:

1.  Certifique-se de ter o [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/) instalados.
2.  Navegue até a raiz do projeto (onde o arquivo `docker-compose.yml` está localizado).
3.  Execute o seguinte comando:

    ```bash
    docker-compose up --build
    ```

A aplicação estará disponível em:

- Backend: `http://localhost:3000`
- Frontend: `http://localhost:5173`
- MongoDB: Rodando internamente nos containers.

---

Este README fornece uma visão geral da aplicação, suas funcionalidades e como executá-la. Sinta-se à vontade para explorar o código e contribuir!
