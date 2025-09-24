const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const multer = require('multer');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Static files
const publicDir = path.join(__dirname, '..', 'public');
const uploadsDir = path.join(__dirname, '..', 'uploads');
app.use(express.static(publicDir));
app.use('/uploads', express.static(uploadsDir));

// File upload config
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, uploadsDir);
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
		const ext = path.extname(file.originalname);
		cb(null, file.fieldname + '-' + uniqueSuffix + ext);
	},
});
const upload = multer({ storage });

// Sample data (can be moved to a database later)
const siteData = {
	collegeName: 'Maa Vankal Malani College, Choutan',
	welcome: {
		title: 'Welcome',
		description:
			"Discover MVM Special College, a leading institution committed to academic excellence and personal growth. Immerse yourself in a dynamic learning environment, participate in cutting-edge research, and build lifelong connections.",
	},
	news: [
		{
			id: 1,
			title: 'Admissions Open',
			image: '/assets/images/admission.jpg',
			content:
				'Applications are open for the upcoming academic session. Apply now to secure your spot in our Special B.Ed and Special D.Ed programs.',
			date: new Date().toISOString(),
		},
	],
	courses: [
		{
			id: 1,
			name: 'Special B.Ed',
			image: '/assets/images/bed.jpg',
			description:
				'Our Special B.Ed program equips future educators with inclusive education strategies, practical training, and research-driven pedagogy.',
		},
		{
			id: 2,
			name: 'Special D.Ed',
			image: '/assets/images/ded.jpg',
			description:
				'The Special D.Ed program focuses on foundational teaching skills, classroom management, and individualized learning plans.',
		},
	],
	facilities: [
		{
			id: 1,
			name: 'Clean Environment',
			image: '/assets/images/clean.jpg',
			description:
				'Our campus prioritizes hygiene, greenery, and a serene atmosphere to support focused learning.',
		},
		{
			id: 2,
			name: 'Sports',
			image: '/assets/images/sports.jpg',
			description:
				'Facilities and programs for indoor and outdoor sports encourage a healthy and active lifestyle.',
		},
		{
			id: 3,
			name: 'Library',
			image: '/assets/images/library.jpg',
			description:
				'A well-stocked library with print and digital resources supports research and coursework.',
		},
		{
			id: 4,
			name: 'ICT Lab',
			image: '/assets/images/ict.jpg',
			description:
				'Modern ICT labs with high-speed internet and up-to-date software for hands-on learning.',
		},
	],
	team: [
		{
			id: 1,
			name: 'Dr. Jagdish Vishnoi',
			role: 'Director',
			image: '/assets/images/team-director.jpg',
		},
		{
			id: 2,
			name: 'Mr. Chetan Ram Choudhary',
			role: 'Counselor',
			image: '/assets/images/team-counselor.jpg',
		},
	],
	gallery: [
		'/assets/images/campus1.jpg',
		'/assets/images/campus2.jpg',
		'/assets/images/campus3.jpg',
		'/assets/images/campus4.jpg',
	],
	buildings: [
		{ id: 1, name: 'Building No. 1', image: '/assets/images/building1.jpg' },
		{ id: 2, name: 'Building No. 2', image: '/assets/images/building2.jpg' },
	],
	contact: {
		email: 'drjdvishnoi@gmail.com',
		phones: ['9351557687', '9929028336', '9983101249'],
	},
};

// APIs
app.get('/api/site', (req, res) => {
	res.json(siteData);
});

app.get('/api/news', (req, res) => {
	res.json(siteData.news);
});

app.get('/api/courses', (req, res) => {
	res.json(siteData.courses);
});

app.get('/api/facilities', (req, res) => {
	res.json(siteData.facilities);
});

app.get('/api/team', (req, res) => {
	res.json(siteData.team);
});

app.get('/api/gallery', (req, res) => {
	res.json(siteData.gallery);
});

app.get('/api/buildings', (req, res) => {
	res.json(siteData.buildings);
});

app.get('/api/contact', (req, res) => {
	res.json(siteData.contact);
});

app.post('/api/upload', upload.single('image'), (req, res) => {
	if (!req.file) {
		return res.status(400).json({ error: 'No file uploaded' });
	}
	const fileUrl = `/uploads/${req.file.filename}`;
	return res.status(201).json({ url: fileUrl, filename: req.file.filename });
});

// Fallback to index.html for root
app.get('/', (req, res) => {
	res.sendFile(path.join(publicDir, 'index.html'));
});

app.listen(PORT, () => {
	console.log(`Server listening on http://localhost:${PORT}`);
});
