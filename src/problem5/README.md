# Code Challenge: A Crude Server

This project is a backend server built with **Express.js** and **TypeScript**, designed to perform CRUD operations for managing resources. It uses **SQLite** for database storage, managed via **Sequelize ORM**.

---

## Database Configuration

This project uses **SQLite** as the database, and Sequelize is configured to manage database operations.

1. **Automatic Database Creation**:

   - The database file (`database.sqlite`) will be created automatically in the project root directory upon running the application.

2. **No Manual Setup Needed**:
   - Sequelize will handle the database initialization and table creation, so you don’t need to configure anything manually.

---

## Starting the Application

Follow these steps to start the server:

### 1. Clone the Repository

```bash
git clone https://github.com/arcatuka/code-challenge.git
cd code-challenge/src/problem5
```

### 2. Install Dependencies

Install all required dependencies by running:

```bash
npm install
```

### 3. Start the Development Server

Run the following command to start the server in development mode:

```bash
npm run dev
```

### 4. Access the Application

Once the server is running, you can access the application at:

```bash
http://localhost:4000
```
