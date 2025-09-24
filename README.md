# Maa Vankal Malani College, Choutan – Website

Modern responsive website with Node.js (Express) backend and HTML/CSS/JS frontend.

## Run locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start dev server (http://localhost:3000):
   ```bash
   npm run dev
   ```
   Or start without hot reload:
   ```bash
   npm start
   ```

## Project structure

- `public/` static frontend (index.html, styles.css, app.js, images, docs)
- `data/` JSON data for news, courses, facilities, team, buildings
- `routes/` API route definitions
- `controllers/` API controllers
- `server.js` Express app

## APIs

- GET `/api/news`
- GET `/api/courses`
- GET `/api/facilities`
- GET `/api/team`
- GET `/api/buildings`
- POST `/api/contact` { name, email, message } → logs to `data/contacts.log`

## Upload your images

Place files in `public/images/` with these names (or update JSON to match your filenames):

- Campus gallery: `campus-1.jpg`, `campus-2.jpg`, `campus-3.jpg`, `campus-4.jpg`
- News hero: `admissions.jpg`
- Courses: `special-bed.jpg`, `special-ded.jpg`
- Facilities: `clean-campus.jpg`, `sports.jpg`, `library.jpg`, `ict-lab.jpg`
- Team: `team-jagdish.jpg`, `team-chetan.jpg`
- Buildings: `building-1.jpg`, `building-2.jpg`
- Contact: `contact.jpg`

Alternatively, edit files under `data/*.json` and `public/index.html` to point to your own filenames.

## Customization

- Update content in `data/*.json`
- Tweak layout/colors in `public/styles.css`
- Extend UI logic in `public/app.js`

## Deployment

Any Node-compatible host will work. Serve with `npm start`. Ensure `public/` is accessible and `PORT` is set via environment variable if needed.


