import fs from 'fs/promises';
import path from 'path';

const dataPath = (file) => path.join(process.cwd(), 'data', file);

export const getNews = async (req, res, next) => {
  try {
    const json = await fs.readFile(dataPath('news.json'), 'utf-8');
    res.json(JSON.parse(json));
  } catch (err) {
    next(err);
  }
};

export const getCourses = async (req, res, next) => {
  try {
    const json = await fs.readFile(dataPath('courses.json'), 'utf-8');
    res.json(JSON.parse(json));
  } catch (err) {
    next(err);
  }
};

export const getFacilities = async (req, res, next) => {
  try {
    const json = await fs.readFile(dataPath('facilities.json'), 'utf-8');
    res.json(JSON.parse(json));
  } catch (err) {
    next(err);
  }
};

export const getTeam = async (req, res, next) => {
  try {
    const json = await fs.readFile(dataPath('team.json'), 'utf-8');
    res.json(JSON.parse(json));
  } catch (err) {
    next(err);
  }
};

export const getBuildings = async (req, res, next) => {
  try {
    const json = await fs.readFile(dataPath('buildings.json'), 'utf-8');
    res.json(JSON.parse(json));
  } catch (err) {
    next(err);
  }
};

export const submitContact = async (req, res, next) => {
  try {
    const { name, email, message } = req.body || {};
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'name, email, and message are required' });
    }
    // For demo: append to a local file. In production, use email/DB.
    const line = `${new Date().toISOString()}\t${name}\t${email}\t${message.replace(/\n/g, ' ')}\n`;
    await fs.appendFile(path.join(process.cwd(), 'data', 'contacts.log'), line, 'utf-8');
    res.json({ message: 'Contact submitted successfully' });
  } catch (err) {
    next(err);
  }
};


