import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Pool } from "pg";
import authRoutes, { authenticateJWT } from './authRoutes';

// dotenv.config({ path: "../.env" });
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: parseInt(process.env.DB_PORT || "5432"),
});

// GET /tasks - Retrieve tasks (optionally filtered by user)
app.get("/tasks", authenticateJWT ,async (req, res) => {
  try {
    const userId = req.query.userId ? parseInt(req.query.userId as string) : null;
    const query = userId ? "SELECT * FROM task WHERE userId = $1" : "SELECT * FROM task";
    const values = userId ? [userId] : [];
    const { rows } = await pool.query(query, values);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// POST /tasks - Create a new task
app.post("/tasks", authenticateJWT,  async (req, res) => {
  try {
    const { title, description, id } = req.body;
    const { rows } = await pool.query(
      "INSERT INTO task (title, description, userId) VALUES ($1, $2, $3) RETURNING *",
      [title, description, id]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// PUT /tasks/:id - Update a task
app.put("/tasks/:id", authenticateJWT,  async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, iscomplete } = req.body;
    const { rows } = await pool.query(
      "UPDATE task SET title = $1, description = $2, iscomplete = $3 WHERE id = $4 RETURNING *",
      [title, description, iscomplete, id]
    );
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// DELETE /tasks/:id - Delete a task
app.delete("/tasks/:id", authenticateJWT,  async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM task WHERE id = $1", [id]);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
