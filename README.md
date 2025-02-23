# Lumaa Spring 2025 SWE Monorepo

This repository contains the frontend and backend code for the Lumaa Spring 2025 SWE project. Follow the instructions below to set up the repository for development.

## Repository Structure

```
lumaa-spring-2025-swe/
├── backend/
│   ├── package.json
│   └── ...
├── frontend/
│   ├── package.json
│   └── ...
└── README.md
```

## Prerequisites

- Node.js, I used V16.20.2
- npm, I used 8.19.4
- Postgres, I used (PostgreSQL) 17.3

## Setup Instructions

### 1. Clone the Repository

```sh
git clone https://github.com/MukhilV/lumaa-spring-2025-swe
cd lumaa-spring-2025-swe
```

### 2. Setup Backend

Create a `.env` file in the `backend` directory and add your environment variables:

```
DB_USER=postgres
DB_HOST=localhost
DB_NAME=taskmanagement
DB_PASS=admin
DB_PORT=5432
DATABASE_URL=postgres://postgres:admin@localhost:5432/taskmanagement
JWT_SECRET=mysecretkey@123 
```

Navigate to the `backend` directory and install the dependencies:

```sh
cd backend
npm install
```

Start the backend server:

```sh
npm start
```

### 3. Setup Frontend

Navigate to the `frontend` directory and install the dependencies:

```sh
cd ../frontend
npm install
```

Start the frontend development server:

```sh
npm start
```

### 4. Setup Database

Ensure Postgres is running on your machine. 
You can download and install postgres from internet.
Run the following command to enter into the shell of postgres. 
Instead of starting the service, you can just enter into the shell script, that will keep the DB alive.

```sh
psql -U postgres
```

Login with your password that you created while installing postgres.

Next, if you don't have a database already created in postgres, then run the below comamnd inside the postgres shell

```sh
CREATE DATABASE taskmanagement;
```

And then, in terminal, inside the folder `backend`, run the following to apply the migrations.

```sh
npm run migrate up
```

Your migrations will be applied to the DB.

## Running the Application

- The backend server will be running at `http://localhost:5000`
- The frontend development server will be running at `http://localhost:3000`


## Demo video of the application
Link: `https://drive.google.com/file/d/15JJjtskuahfsdfdmkBNNpBRGC8If4i6_/view?usp=sharing`


## Salary Expectations
I can work either as a full-time or a part-time intern.
If it is a part time position, I would expect around $1200 to $1500 as stiphend.
If it is a full time position, I would expect around $2400 to $3000 as stiphend.
Thank you. Looking forward to hear from you. 
