import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import routes from './routes/index.js';

dotenv.config();

const app = express();

 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

 
const __dirnameResolved = path.resolve();
app.use(express.static(path.join(__dirnameResolved, 'public')));
 
app.use('/images-data', express.static(path.join(process.cwd(), 'data', 'images')));

 
app.use('/api', routes);

 
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirnameResolved, 'public', 'index.html'));
});

 
app.use('/api', (req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

 
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ message: err.message || 'Server Error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  
  console.log(`MVM College site running on http://localhost:${PORT}`);
});


