# Task Management Website

This project is a CRUD Task Management application built with a React TypeScript frontend and a NestJs backend that interfaces with a PostgreSQL database.
The project is structured into two main directories: `frontendTS` and `backend`.

## Prerequisites

Make sure you have the following installed on your system:

- Node.js
- pnpm, npm, or yarn (choose one)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/TaskManagement
cd TaskManagement
```

### 2. Install Dependencies

Navigate to the frontendTS and backend directories and install the required dependencies

#### Frontend

```bash
cd frontendTS
pnpm i
# or
npm i
# or
yarn add
```

#### Backend

```bash
cd backend
pnpm i
# or
npm i
# or
yarn add
```

### 3. Setup Environment Variables

Before running the backend, you need to configure the database connection.

#### Option 1: Create a `.env` File

In the `backend` directory, create a `.env` file with the following template:

```env
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_NAME=
```

fill in the values according to your database configuration

#### Option 2: Edit `app.module.ts`

Alternatively, you can directly edit the database configuration in `/backend/src/app.module.ts`:

```app.module.ts
TypeOrmModule.forRoot({
      type: 'postgres',
      host: your-db-host,
      port: 5432,
      username: your-db-username,
      password: your-db-password,
      database: your-db-name,
      autoLoadEntities: true,
      synchronize: true,
    })
```

### 4. Running the Application

After setting up the environment variables or configuring the database in `app.module.ts`, you can start the backend and frontend servers.

#### Backend

```bash
cd backend
pnpm start:dev
# or
npm start:dev
# or
yarn start:dev
```

#### Frontend

```bash
cd frontendTS
pnpm dev
# or
npm dev
# or
yarn dev
```

### 5. Accessing the Application

Once both servers are running, you can access the application in your browser.

- Frontend : `http://localhost:3001`
- Backend Api: `http://localhost:3001/api` or `http://localhost:3000`

Also you can access Swagger Api docs by appending `/docs` in either of backend url
