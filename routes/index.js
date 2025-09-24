import { Router } from 'express';
import fs from 'fs/promises';
import path from 'path';
import {
  getNews,
  getCourses,
  getFacilities,
  getTeam,
  getBuildings,
  submitContact,
} from '../controllers/contentController.js';

const router = Router();

router.get('/news', getNews);
router.get('/courses', getCourses);
router.get('/facilities', getFacilities);
router.get('/team', getTeam);
router.get('/buildings', getBuildings);
router.post('/contact', submitContact);

// List images found under data/images for banner/gallery
router.get('/images', async (req, res, next) => {
  try {
    const dir = path.join(process.cwd(), 'data', 'images');
    let entries = [];
    try { entries = await fs.readdir(dir); } catch { entries = []; }
    const exts = new Set(['.jpg','.jpeg','.png','.webp','.gif']);
    const files = entries.filter(f=> exts.has(path.extname(f).toLowerCase()));
    const urls = files.map(f=> `/images-data/${encodeURIComponent(f)}`);
    res.json(urls);
  } catch (err) { next(err); }
});

export default router;


