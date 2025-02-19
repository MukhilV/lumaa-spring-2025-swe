import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Ensure DATABASE_URL is set in .env
});

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Register User
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username',
      [username, hashedPassword]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error registering user', error: err });
  }
});

// Login User
// router.post('/userLogin', async (req: express.Request, res: express.Response) => {

const loginHandler = async (request: express.Request, response: express.Response): Promise<void> => {
  const { username, password } = request.body;
  try {
    const userResult = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (userResult.rows.length === 0) {
        response.status(400).json({ message: 'Invalid username or password' });
        return;
    }

    const user = userResult.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        response.status(400).json({ message: 'Invalid username or password' });
        return;
    }
    
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
    response.json({ token });
  } catch (err) {
    response.status(500).json({ message: 'Error logging in', error: err });
  }
}
router.post('/login', loginHandler);

// Middleware to protect routes
interface AuthenticatedRequest extends express.Request {
    user?: { id: string };
}

export const authenticateJWT = (req: AuthenticatedRequest, res: express.Response, next: express.NextFunction): void => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: 'Access denied' });
        return;
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

export default router;
