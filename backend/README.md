## Backend Authentication Service

This backend provides a simple, production-ready authentication API using Node.js, Express, MongoDB (Mongoose), JWT, and BcryptJS, following an MVC-style structure.

### Folder structure

- `config/` – database and configuration modules  
- `models/` – Mongoose models  
- `controllers/` – route controllers and business logic  
- `routes/` – Express route definitions  
- `middlewares/` – shared middleware (e.g., auth)

### Environment variables

Create a `.env` file in the `backend` directory with:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=your_jwt_secret_here
```

### Scripts

- `pnpm dev` – run with nodemon (auto-restart on changes)  
- `pnpm start` – run with node

### API endpoints (v1)

Base path: `/api/v1/auth`

- `POST /register` – register a new user  
- `POST /login` – login user and receive JWT  
- `GET /me` – get the authenticated user's data (requires `Authorization: Bearer <token>`)

