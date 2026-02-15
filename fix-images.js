const fs = require('fs');
const path = require('path');

// Category → Unsplash photo IDs (3 per category for rotation)
const categoryPhotos = {
  'dog-bed': [
    'photo-1601758174114-e711c0cbaa69',
    'photo-1583337130417-13571dec17a7', 
    'photo-1560807707-8cc77767d783'
  ],
  'cat-tree': [
    'photo-1545249390-6bdfa286032f',
    'photo-1526336024174-e58f5cdd8e13',
    'photo-1518791841217-8f162f1e1131'
  ],
  'dog-food': [
    'photo-1589924691995-400dc9ecc119',
    'photo-1568640347023-a616a30bc3bd',
    'photo-1601758228041-f3b2795255f1'
  ],
  'cat-food': [
    'photo-1574158622682-e40e69881006',
    'photo-1573865526739-10659fec78a5',
    'photo-1495360010541-f48722b34f7d'
  ],
  'dog-toy': [
    'photo-1535930749574-1399327ce78f',
    'photo-1587300003388-59208cc962cb',
    'photo-1548199973-03cce0bbc87b'
  ],
  'dog-harness': [
    'photo-1587300003388-59208cc962cb',
    'photo-1552053831-71594a27632d',
    'photo-1477884213360-7e9d7dcc8f9b'
  ],
  'cat-litter': [
    'photo-1533743983669-94fa5c4338ec',
    'photo-1526336024174-e58f5cdd8e13',
    'photo-1495360010541-f48722b34f7d'
  ],
  'dog-crate': [
    'photo-1560807707-8cc77767d783',
    'photo-1601758174114-e711c0cbaa69',
    'photo-1583337130417-13571dec17a7'
  ],
  'dog-groom': [
    'photo-1516734212186-a967f81ad0d7',
    'photo-1587300003388-59208cc962cb',
    'photo-1548199973-03cce0bbc87b'
  ],
  'cat-fountain': [
    'photo-1573865526739-10659fec78a5',
    'photo-1574158622682-e40e69881006',
    'photo-1526336024174-e58f5cdd8e13'
  ],
  'dog-clothing': [
    'photo-1552053831-71594a27632d',
    'photo-1587300003388-59208cc962cb',
    'photo-1477884213360-7e9d7dcc8f9b'
  ],
  'pet-tech': [
    'photo-1585110396000-c9ffd4e4b308',
    'photo-1574158622682-e40e69881006',
    'photo-1495360010541-f48722b34f7d'
  ],
  'pet-health': [
    'photo-1628009368231-7bb7cf0a97b9',
    'photo-1548199973-03cce0bbc87b',
    'photo-1587300003388-59208cc962cb'
  ],
  'dog-bowl': [
    'photo-1601758174114-e711c0cbaa69',
    'photo-1589924691995-400dc9ecc119',
    'photo-1568640347023-a616a30bc3bd'
  ],
  'flea-tick': [
    'photo-1587300003388-59208cc962cb',
    'photo-1548199973-03cce0bbc87b',
    'photo-1552053831-71594a27632d'
  ],
  'cat-carrier': [
    'photo-1526336024174-e58f5cdd8e13',
    'photo-1574158622682-e40e69881006',
    'photo-1495360010541-f48722b34f7d'
  ],
  'cat-toy': [
    'photo-1526336024174-e58f5cdd8e13',
    'photo-1518791841217-8f162f1e1131',
    'photo-1574158622682-e40e69881006'
  ],
  'cat-perch': [
    'photo-1545249390-6bdfa286032f',
    'photo-1518791841217-8f162f1e1131',
    'photo-1526336024174-e58f5cdd8e13'
  ],
};

// Article slug → category mapping
const articleCategory = {
  'best-calming-dog-bed': 'dog-bed',
  'best-orthopedic-dog-beds': 'dog-bed',
  'best-cat-tree': 'cat-tree',
  'best-cat-scratching-post': 'cat-tree',
  'best-dog-food-golden-retrievers': 'dog-food',
  'best-puppy-food': 'dog-food',
  'best-cat-food-sensitive-stomach': 'cat-food',
  'best-dog-toys-indestructible': 'dog-toy',
  'best-interactive-cat-toys': 'cat-toy',
  'best-dog-harness-no-pull': 'dog-harness',
  'best-cat-litter': 'cat-litter',
  'best-dog-crate': 'dog-crate',
  'best-dog-brush-shedding': 'dog-groom',
  'best-dog-shampoo': 'dog-groom',
  'best-cat-grooming-brush': 'dog-groom',
  'best-cat-water-fountain': 'cat-fountain',
  'catit-pixi-fountain': 'cat-fountain',
  'best-dog-winter-boots': 'dog-clothing',
  'best-dog-raincoat': 'dog-clothing',
  'best-dog-anxiety-vest': 'dog-clothing',
  'best-dog-life-jacket': 'dog-clothing',
  'best-pet-camera': 'pet-tech',
  'best-gps-dog-tracker': 'pet-tech',
  'best-pet-insurance': 'pet-health',
  'best-flea-tick-prevention-dogs': 'flea-tick',
  'best-dog-dental-chews': 'pet-health',
  'best-pet-stain-remover': 'pet-health',
  'best-elevated-dog-bowl': 'dog-bowl',
  'best-slow-feeder-dog-bowl': 'dog-bowl',
  'yeti-dog-bowl': 'dog-bowl',
  'kong-classic-review': 'dog-toy',
  'best-automatic-cat-feeder': 'cat-food',
  'best-cat-carrier': 'cat-carrier',
  'best-cat-window-perch': 'cat-perch',
  'best-dog-car-seat-cover': 'dog-harness',
};

const reviewDir = path.join(__dirname, 'public', 'review');
let totalReplaced = 0;

const dirs = fs.readdirSync(reviewDir);
for (const dir of dirs) {
  const htmlPath = path.join(reviewDir, dir, 'index.html');
  if (!fs.existsSync(htmlPath)) continue;
  
  let html = fs.readFileSync(htmlPath, 'utf8');
  if (!html.includes('placeholder-product.svg')) continue;
  
  // Find category
  const slug = dir.replace(/-2026$/, '');
  const cat = articleCategory[slug];
  if (!cat) {
    console.log(`⚠️  No category for: ${dir} (slug: ${slug})`);
    continue;
  }
  
  const photos = categoryPhotos[cat];
  if (!photos) {
    console.log(`⚠️  No photos for category: ${cat}`);
    continue;
  }
  
  // Replace each placeholder with rotating photos
  let photoIdx = 0;
  html = html.replace(/src="\/images\/placeholder-product\.svg"/g, () => {
    const photo = photos[photoIdx % photos.length];
    photoIdx++;
    const url = `https://images.unsplash.com/${photo}?w=400&h=300&fit=crop&q=80`;
    return `src="${url}"`;
  });
  
  fs.writeFileSync(htmlPath, html);
  console.log(`✅ ${dir}: replaced ${photoIdx} images (cat: ${cat})`);
  totalReplaced += photoIdx;
}

console.log(`\n📊 Total: ${totalReplaced} placeholder images replaced`);
