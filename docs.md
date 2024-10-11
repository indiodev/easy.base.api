
# Documentação API - EasyBase

## Resumo
Esta API permite a manipulação de dados relacionados a usuários, permissões, papéis, grupos, formulários e tabelas. Ela suporta operações de criação, leitura, atualização e exclusão (CRUD).

### Autenticação
Os endpoints requerem autenticação com **Bearer Token**.

---

## Endpoints

### 1. Users

#### **GET /users**
- **Descrição**: Retorna uma lista de todos os usuários.
- **Exemplo de Resposta**:
  ```json
  [
    {
      "_id": "615c1f23bcf86cd799439011",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "role": "USER",
      "created_at": "2023-10-01T12:34:56.789Z"
    },
    ...
  ]
  ```

#### **POST /users**
- **Descrição**: Cria um novo usuário.
- **Corpo da Requisição**:
  ```json
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "123456",
    "role": "USER"
  }
  ```
- **Exemplo de Resposta**:
  ```json
  {
    "_id": "615c1f23bcf86cd799439011",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "role": "USER",
    "created_at": "2023-10-01T12:34:56.789Z"
  }
  ```

#### **GET /users/:id**
- **Descrição**: Retorna um usuário específico pelo ID.
- **Parâmetros**:
  - `id` (String) — ID do usuário.
- **Exemplo de Resposta**:
  ```json
  {
    "_id": "615c1f23bcf86cd799439011",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "role": "USER"
  }
  ```

#### **PUT /users/:id**
- **Descrição**: Atualiza as informações de um usuário existente.
- **Parâmetros**:
  - `id` (String) — ID do usuário.
- **Corpo da Requisição**:
  ```json
  {
    "name": "Jane Doe",
    "email": "jane.doe@example.com"
  }
  ```
- **Exemplo de Resposta**:
  ```json
  {
    "_id": "615c1f23bcf86cd799439011",
    "name": "Jane Doe",
    "email": "jane.doe@example.com",
    "updated_at": "2023-10-09T12:00:00.789Z"
  }
  ```

#### **DELETE /users/:id**
- **Descrição**: Exclui um usuário específico pelo ID.
- **Parâmetros**:
  - `id` (String) — ID do usuário.
- **Exemplo de Resposta**:
  ```json
  {
    "message": "Usuário excluído com sucesso"
  }
  ```

---

### 2. Roles

#### **GET /roles**
- **Descrição**: Retorna uma lista de todos os papéis (roles).
- **Exemplo de Resposta**:
  ```json
  [
    {
      "_id": "615c1f23bcf86cd799439012",
      "role": "ADMIN",
      "permissions": ["615c1f23bcf86cd799439014"],
      "users": ["615c1f23bcf86cd799439011"]
    },
    ...
  ]
  ```

---

### 3. Columns

#### **POST /columns**
- **Descrição**: Cria uma nova coluna em uma tabela.
- **Corpo da Requisição**:
  ```json
  {
    "title": "Nome da Coluna",
    "type": "string",
    "identifier": "nome_coluna",
    "tableId": "615c1f23bcf86cd799439015"
  }
  ```
- **Exemplo de Resposta**:
  ```json
  {
    "_id": "615c1f23bcf86cd799439017",
    "title": "Nome da Coluna",
    "type": "string",
    "identifier": "nome_coluna",
    "tableId": "615c1f23bcf86cd799439015",
    "created_at": "2023-10-01T12:34:56.789Z"
  }
  ```

#### **PATCH /columns/:id**
- **Descrição**: Atualiza uma coluna existente.
- **Parâmetros**:
  - `id` (String) — ID da coluna.
- **Corpo da Requisição**:
  ```json
  {
    "title": "Novo Nome da Coluna"
  }
  ```
- **Exemplo de Resposta**:
  ```json
  {
    "_id": "615c1f23bcf86cd799439017",
    "title": "Novo Nome da Coluna",
    "type": "string",
    "identifier": "nome_coluna",
    "tableId": "615c1f23bcf86cd799439015",
    "updated_at": "2023-10-09T15:30:00.789Z"
  }
  ```

#### **GET /tables/:tableId/columns**
- **Descrição**: Retorna todas as colunas de uma tabela.
- **Parâmetros**:
  - `tableId` (String) — ID da tabela.
- **Exemplo de Resposta**:
  ```json
  [
    {
      "_id": "615c1f23bcf86cd799439017",
      "title": "Nome da Coluna",
      "type": "string",
      "identifier": "nome_coluna",
      "tableId": "615c1f23bcf86cd799439015"
    }
  ]
  ```

#### **GET /tables/:tableId/columns/:id**
- **Descrição**: Retorna uma coluna específica de uma tabela.
- **Parâmetros**:
  - `tableId` (String) — ID da tabela.
  - `id` (String) — ID da coluna.
- **Exemplo de Resposta**:
  ```json
  {
    "_id": "615c1f23bcf86cd799439017",
    "title": "Nome da Coluna",
    "type": "string",
    "identifier": "nome_coluna",
    "tableId": "615c1f23bcf86cd799439015"
  }
  ```

... (continua com os outros endpoints)



---

### 6. Tables

#### **GET /tables**
- **Descrição**: Retorna uma lista de todas as tabelas.
- **Exemplo de Resposta**:
  ```json
  [
    {
      "_id": "615c1f23bcf86cd799439015",
      "title": "Tabela 1",
      "identifier": "tabela_1",
      "columns": [],
      "rows": []
    },
    ...
  ]
  ```

#### **GET /tables/:id**
- **Descrição**: Retorna uma tabela específica pelo ID.
- **Parâmetros**:
  - `id` (String) — ID da tabela.
- **Exemplo de Resposta**:
  ```json
  {
    "_id": "615c1f23bcf86cd799439015",
    "title": "Tabela 1",
    "identifier": "tabela_1",
    "columns": [],
    "rows": []
  }
  ```

#### **GET /tables/:id/filter**
- **Descrição**: Filtra e retorna informações específicas de uma tabela.
- **Parâmetros**:
  - `id` (String) — ID da tabela.
- **Exemplo de Resposta**:
  ```json
  {
    "_id": "615c1f23bcf86cd799439015",
    "filteredData": [...]
  }
  ```

#### **POST /tables**
- **Descrição**: Cria uma nova tabela.
- **Corpo da Requisição**:
  ```json
  {
    "title": "Nova Tabela",
    "identifier": "nova_tabela"
  }
  ```
- **Exemplo de Resposta**:
  ```json
  {
    "_id": "615c1f23bcf86cd799439018",
    "title": "Nova Tabela",
    "identifier": "nova_tabela",
    "created_at": "2023-10-01T12:34:56.789Z"
  }
  ```

#### **PUT /tables/:id**
- **Descrição**: Atualiza informações de uma tabela existente.
- **Parâmetros**:
  - `id` (String) — ID da tabela.
- **Corpo da Requisição**:
  ```json
  {
    "title": "Título Atualizado"
  }
  ```
- **Exemplo de Resposta**:
  ```json
  {
    "_id": "615c1f23bcf86cd799439018",
    "title": "Título Atualizado",
    "updated_at": "2023-10-09T12:00:00.789Z"
  }
  ```

#### **DELETE /tables/:id**
- **Descrição**: Exclui uma tabela específica pelo ID.
- **Parâmetros**:
  - `id` (String) — ID da tabela.
- **Exemplo de Resposta**:
  ```json
  {
    "message": "Tabela excluída com sucesso"
  }
  ```

---

### 7. Settings

#### **GET /settings**
- **Descrição**: Retorna informações relacionadas às configurações do sistema.
- **Exemplo de Resposta**:
  ```json
  {
    "message": "Settings"
  }
  ```

---

### 8. Authentication

#### **POST /login**
- **Descrição**: Endpoint para autenticação de um usuário existente.
- **Corpo da Requisição**:
  ```json
  {
    "email": "example@example.com",
    "password": "password123"
  }
  ```
- **Exemplo de Resposta**:
  ```json
  {
    "token": "jwt-token",
    "user": {
      "_id": "615c1f23bcf86cd799439011",
      "name": "John Doe",
      "email": "john.doe@example.com"
    }
  }
  ```

#### **POST /register**
- **Descrição**: Endpoint para registrar um novo usuário.
- **Corpo da Requisição**:
  ```json
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```
- **Exemplo de Resposta**:
  ```json
  {
    "_id": "615c1f23bcf86cd799439011",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "created_at": "2023-10-01T12:34:56.789Z"
  }
  ```

---



### 4. Forms

#### **POST /form**
- **Descrição**: Cria um novo formulário.
- **Corpo da Requisição**:
  ```json
  {
    "title": "Título do Formulário",
    "table": "615c1f23bcf86cd799439015",
    "description": "Descrição do formulário",
    "published": true
  }
  ```
- **Exemplo de Resposta**:
  ```json
  {
    "_id": "615c1f23bcf86cd799439020",
    "title": "Título do Formulário",
    "table": "615c1f23bcf86cd799439015",
    "description": "Descrição do formulário",
    "published": true,
    "created_at": "2023-10-01T12:34:56.789Z"
  }
  ```

#### **GET /form**
- **Descrição**: Retorna uma lista de todos os formulários.
- **Exemplo de Resposta**:
  ```json
  [
    {
      "_id": "615c1f23bcf86cd799439020",
      "title": "Título do Formulário",
      "table": "615c1f23bcf86cd799439015",
      "description": "Descrição do formulário",
      "published": true
    },
    ...
  ]
  ```

#### **GET /form/:id**
- **Descrição**: Retorna um formulário específico pelo ID.
- **Parâmetros**:
  - `id` (String) — ID do formulário.
- **Exemplo de Resposta**:
  ```json
  {
    "_id": "615c1f23bcf86cd799439020",
    "title": "Título do Formulário",
    "table": "615c1f23bcf86cd799439015",
    "description": "Descrição do formulário",
    "published": true
  }
  ```

#### **PUT /form**
- **Descrição**: Atualiza as informações de um formulário existente.
- **Corpo da Requisição**:
  ```json
  {
    "_id": "615c1f23bcf86cd799439020",
    "title": "Novo Título do Formulário",
    "description": "Nova descrição"
  }
  ```
- **Exemplo de Resposta**:
  ```json
  {
    "_id": "615c1f23bcf86cd799439020",
    "title": "Novo Título do Formulário",
    "description": "Nova descrição",
    "updated_at": "2023-10-09T12:00:00.789Z"
  }
  ```

#### **DELETE /form/:id**
- **Descrição**: Exclui um formulário pelo ID.
- **Parâmetros**:
  - `id` (String) — ID do formulário.
- **Exemplo de Resposta**:
  ```json
  {
    "message": "Formulário excluído com sucesso"
  }
  ```

---

### 5. Rows

#### **POST /tables/:id/row**
- **Descrição**: Cria uma nova linha (`row`) em uma tabela específica.
- **Parâmetros**:
  - `id` (String) — ID da tabela.
- **Corpo da Requisição**:
  ```json
  {
    "value": {
      "coluna1": "valor1",
      "coluna2": "valor2"
    }
  }
  ```
- **Exemplo de Resposta**:
  ```json
  {
    "_id": "615c1f23bcf86cd799439025",
    "value": {
      "coluna1": "valor1",
      "coluna2": "valor2"
    },
    "tableId": "615c1f23bcf86cd799439015",
    "created_at": "2023-10-01T12:34:56.789Z"
  }
  ```

#### **PATCH /tables/:tableId/row/:id**
- **Descrição**: Atualiza uma linha existente em uma tabela.
- **Parâmetros**:
  - `tableId` (String) — ID da tabela.
  - `id` (String) — ID da linha.
- **Corpo da Requisição**:
  ```json
  {
    "value": {
      "coluna1": "novo_valor1"
    }
  }
  ```
- **Exemplo de Resposta**:
  ```json
  {
    "_id": "615c1f23bcf86cd799439025",
    "value": {
      "coluna1": "novo_valor1"
    },
    "tableId": "615c1f23bcf86cd799439015",
    "updated_at": "2023-10-09T12:00:00.789Z"
  }
  ```

#### **GET /tables/:tableId/row/:id**
- **Descrição**: Retorna uma linha específica de uma tabela.
- **Parâmetros**:
  - `tableId` (String) — ID da tabela.
  - `id` (String) — ID da linha.
- **Exemplo de Resposta**:
  ```json
  {
    "_id": "615c1f23bcf86cd799439025",
    "value": {
      "coluna1": "valor1",
      "coluna2": "valor2"
    },
    "tableId": "615c1f23bcf86cd799439015"
  }
  ```

#### **DELETE /tables/:tableId/row/:id**
- **Descrição**: Exclui uma linha específica de uma tabela.
- **Parâmetros**:
  - `tableId` (String) — ID da tabela.
  - `id` (String) — ID da linha.
- **Exemplo de Resposta**:
  ```json
  {
    "message": "Linha excluída com sucesso"
  }
  ```

---
