import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import routes from './routes/index.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Static files
const __dirnameResolved = path.resolve();
app.use(express.static(path.join(__dirnameResolved, 'public')));
// Serve user photos located under data/images (so the site can read your provided images)
app.use('/images-data', express.static(path.join(process.cwd(), 'data', 'images')));

// API routes
app.use('/api', routes);

// Fallback to index.html for root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirnameResolved, 'public', 'index.html'));
});

// 404 for API - catch unmatched /api routes
// Use '/api' (not '/api/*') so path-to-regexp doesn't treat '*' as a named param.
app.use('/api', (req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

// Error handler (basic)
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ message: err.message || 'Server Error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`MVM College site running on http://localhost:${PORT}`);
});


