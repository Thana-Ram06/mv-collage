document.addEventListener('DOMContentLoaded', () => {
	// Smooth navigation
	document.querySelectorAll('.nav a').forEach(a => {
		a.addEventListener('click', e => {
			const href = a.getAttribute('href');
			if (href && href.startsWith('#')) {
				e.preventDefault();
				document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
			}
		});
	});

	// Dynamic year
	const yearEl = document.getElementById('year');
	if (yearEl) yearEl.textContent = new Date().getFullYear();

	// Carousel seamless scroll (duplicate items)
	const track = document.getElementById('carousel-track');
	if (track) {
		const items = Array.from(track.children).map(el => el.cloneNode(true));
		items.forEach(clone => track.appendChild(clone));
	}
});
