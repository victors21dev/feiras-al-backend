# Feiras-AL Backend

Backend do projeto **Feiras-AL**, desenvolvido com **Node.js**, **Express** e **MongoDB**.  
Fornece uma API REST para gerenciamento de eventos, com autenticação via **Clerk/Express** e suporte a CORS para integração com o frontend.

---

## 🚀 Tecnologias utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Clerk](https://clerk.com/) - Autenticação
- [CORS](https://www.npmjs.com/package/cors)
- [Mongoose](https://mongoosejs.com/) (se estiver usando ODM)

---

## ⚙️ Funcionalidades

- CRUD completo para gerenciamento de eventos
- Middleware de autenticação com Clerk
- CORS configurado para integração segura com o frontend
- Estrutura organizada com rotas e controllers
- API escalável e fácil de integrar

---

## 💻 Como rodar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/victors21dev/feiras-al-backend.git
cd feiras-al-backend
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

PORT=''
MONGODB_URI=''
VITE_CLERK_PUBLISHABLE_KEY=''
CLERK_FRONTEND_API=''
CLERK_PUBLISHABLE_KEY=''
URL_SERVER_FRONT=''

### 4. Inicie o servidor

```bash
npm run dev
```

O backend estará disponível em:
http://localhost:5000

## 🗺 Roadmap de melhorias

- Adicionar testes unitários
- Documentação da API com Swagger
- Paginação e filtros em listagens
- Logs e monitoramento

📝 Licença
Este projeto é open-source, licenciado sob os termos da MIT License.
