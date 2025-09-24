// Smooth scroll navigation
document.querySelectorAll('.nav button').forEach((btn)=>{
  btn.addEventListener('click', ()=>{
    const target = document.querySelector(btn.dataset.target);
    if(target){ target.scrollIntoView({behavior:'smooth', block:'start'}); }
  });
});

// Creative hero mosaic + scrolling strip
async function getImageCandidates(){
  // Prefer specific campus/banner photos from public/images if present
  const preferredNames = [
    'campus-3.jpg','campus-4.jpg','campus-5.jpg',
    'baner co.jpg','admissions.jpg','building-1.jpg','building-2.jpg',
    'sports.jpg','clean-campus.jpg','ict-lab.jpg','special-bed.jpg'
  ];
  const preferred = preferredNames.map(n=>`/images/${encodeURIComponent(n)}`);
  let apiList = [];
  try {
    const res = await fetch('/api/images');
    if(res.ok){ const arr = await res.json(); if(Array.isArray(arr)) apiList = arr; }
  } catch {}
  const fallback = [
    'campus-1.jpg','campus-2.jpg','campus-3.jpg','campus-4.jpg',
    'building-1.jpg','building-2.jpg','library.jpg','sports.jpg','ict-lab.jpg'
  ].map(n=>`/images/${encodeURIComponent(n)}`);
  const merged = [...preferred, ...apiList, ...fallback];
  // simple de-duplication
  const seen = new Set();
  return merged.filter(u=>{ if(seen.has(u)) return false; seen.add(u); return true; });
}

function buildMosaic(urls){
  const mosaic = document.getElementById('hero-mosaic');
  if(!mosaic) return;
  mosaic.innerHTML = '';
  const big = document.createElement('div');
  big.className = 'tile large';
  const imgBig = document.createElement('img');
  imgBig.src = urls[0] || '/images/placeholder.jpg';
  big.appendChild(imgBig);
  mosaic.appendChild(big);
  for(let i=1;i<4;i++){
    const t = document.createElement('div');
    t.className = 'tile';
    const im = document.createElement('img');
    im.src = urls[i] || urls[0] || '/images/placeholder.jpg';
    t.appendChild(im);
    mosaic.appendChild(t);
  }
}

function buildStrip(urls){
  const strip = document.getElementById('scrollstrip');
  if(!strip) return;
  strip.innerHTML = '';
  const doubled = [...urls, ...urls];
  doubled.forEach(u=>{
    const d = document.createElement('div');
    d.className = 'thumb';
    const im = document.createElement('img');
    im.src = u;
    d.appendChild(im);
    strip.appendChild(d);
  });
}

(async function initHero(){
  const candidates = await getImageCandidates();

  // Preload images and keep only those that actually exist
  const exists = async (url) => new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });

  const selected = [];
  for (const url of candidates) {
    if (selected.length >= 3) break; // only three running photos
    // eslint-disable-next-line no-await-in-loop
    if (await exists(url)) selected.push(url);
  }

  const track = document.getElementById('banner-track');
  if (track && selected.length) {
    // Duplicate to enable seamless scrolling but show only the three valid images
    const renderList = [...selected, ...selected];
    track.innerHTML = '';
    renderList.forEach((u) => {
      const im = document.createElement('img');
      im.src = u;
      im.alt = 'Campus Photo';
      track.appendChild(im);
    });
  }
})();

// Helpers
async function fetchJSON(url){
  const res = await fetch(url);
  if(!res.ok) throw new Error('Failed fetching '+url);
  return res.json();
}

// Render News
(async function renderNews(){
  try{
    const data = await fetchJSON('/api/news');
    const list = document.getElementById('news-list');
    if(!Array.isArray(data) || !list) return;
    list.innerHTML = '';
    data.forEach(item=>{
      const div = document.createElement('div');
      div.className = 'item';
      div.innerHTML = `<strong>${item.title}</strong><br><small>${item.date||''}</small><p>${item.details||item.summary||''}</p>`;
      list.appendChild(div);
    });
    const img = document.getElementById('news-image');
    if (img && data[0]?.image) img.src = data[0].image;
  }catch(e){ console.warn(e); }
})();

// Render Courses
(async function renderCourses(){
  try{
    const data = await fetchJSON('/api/courses');
    const list = document.getElementById('courses-list');
    if(!Array.isArray(data) || !list) return;
    list.innerHTML = '';
    data.forEach(c=>{
      const div = document.createElement('div');
      div.className = 'item';
      div.innerHTML = `<strong>${c.name}</strong><p>${c.description||''}</p>`;
      list.appendChild(div);
    });
    const img = document.getElementById('courses-image');
    if (img && data[0]?.image) img.src = data[0].image;
  }catch(e){ console.warn(e); }
})();

// Render Facilities
(async function renderFacilities(){
  try{
    const data = await fetchJSON('/api/facilities');
    const list = document.getElementById('facilities-list');
    if(!Array.isArray(data) || !list) return;
    list.innerHTML = '';
    data.forEach(f=>{
      const div = document.createElement('div');
      div.className = 'item';
      div.innerHTML = `<strong>${f.name}</strong><p>${f.description||''}</p>`;
      list.appendChild(div);
    });
    const img = document.getElementById('facilities-image');
    if (img && data[0]?.image) img.src = data[0].image;
  }catch(e){ console.warn(e); }
})();

// Render Team
(async function renderTeam(){
  try{
    const data = await fetchJSON('/api/team');
    const list = document.getElementById('team-list');
    if(!Array.isArray(data) || !list) return;
    list.innerHTML = '';
    data.forEach(member=>{
      const li = document.createElement('li');
      const img = document.createElement('img');
      img.src = member.image || '/images/team-placeholder.jpg';
      img.alt = member.name;
      const span = document.createElement('span');
      span.innerHTML = `<strong>${member.name}</strong><br>${member.role}`;
      li.appendChild(img);
      li.appendChild(span);
      list.appendChild(li);
    });
    const imgHero = document.getElementById('team-image');
    if (imgHero && data[0]?.image) imgHero.src = data[0].image;
  }catch(e){ console.warn(e); }
})();

// Render Buildings
(async function renderBuildings(){
  try{
    const data = await fetchJSON('/api/buildings');
    const list = document.getElementById('buildings-list');
    if(!Array.isArray(data) || !list) return;
    list.innerHTML = '';
    data.forEach(b=>{
      const li = document.createElement('li');
      const img = document.createElement('img');
      img.src = b.image || '/images/building-placeholder.jpg';
      img.alt = b.name;
      img.style.width = '80px';
      img.style.height = '60px';
      img.style.objectFit = 'cover';
      img.style.borderRadius = '8px';
      const span = document.createElement('span');
      span.innerHTML = `<strong>${b.name}</strong>`;
      li.appendChild(img);
      li.appendChild(span);
      list.appendChild(li);
    });
    const imgHero = document.getElementById('buildings-image');
    if (imgHero && data[0]?.image) imgHero.src = data[0].image;
  }catch(e){ console.warn(e); }
})();

// Contact form removed per request; keeping only contact details


