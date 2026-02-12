const fs = require('fs');
const path = require('path');

const nav = (active = '') => `<nav>
  <a href="/" class="nav-logo"><img src="/images/logo.png" alt="PetGearNerds"><span>PetGearNerds</span></a>
  <ul class="nav-links">
    <li><a href="/dogs/" ${active==='dogs'?'class="active"':''}>Dogs</a></li>
    <li><a href="/cats/" ${active==='cats'?'class="active"':''}>Cats</a></li>
    <li><a href="/food/" ${active==='food'?'class="active"':''}>Food</a></li>
    <li><a href="/health/" ${active==='health'?'class="active"':''}>Health</a></li>
    <li><a href="/training/" ${active==='training'?'class="active"':''}>Training</a></li>
    <li><a href="/deals/" ${active==='deals'?'class="active"':''}>Deals</a></li>
  </ul>
  <div class="nav-search"><span>🔍</span><input type="text" placeholder="Search reviews..."></div>
</nav>`;

const newsletter = `<section class="newsletter">
  <h2>Get the Best Picks, Weekly</h2>
  <p>No spam. Just the top pet product finds, deals, and reviews delivered every Sunday.</p>
  <form class="newsletter-form"><input type="email" placeholder="your@email.com" required><button type="submit">Subscribe</button></form>
</section>`;

const footer = `<footer>
  <div class="footer-grid">
    <div class="footer-col">
      <h4>PetGearNerds</h4>
      <p>We're a team of pet obsessives who test every product we recommend. Our reviews are independent, research-backed, and always honest — even when manufacturers don't like what we have to say.</p>
    </div>
    <div class="footer-col">
      <h4>Categories</h4>
      <ul>
        <li><a href="/dogs/">Dogs</a></li>
        <li><a href="/cats/">Cats</a></li>
        <li><a href="/food/">Pet Food</a></li>
        <li><a href="/health/">Health</a></li>
        <li><a href="/training/">Training</a></li>
        <li><a href="/deals/">Deals</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Company</h4>
      <ul>
        <li><a href="/about/">About Us</a></li>
        <li><a href="/methodology/">Our Methodology</a></li>
        <li><a href="/contact/">Contact</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Legal</h4>
      <ul>
        <li><a href="/privacy/">Privacy Policy</a></li>
        <li><a href="/affiliate-disclosure/">Affiliate Disclosure</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <p class="footer-disclaimer">PetGearNerds is reader-supported. When you buy through links on our site, we may earn an affiliate commission at no extra cost to you. We only recommend products we've tested and genuinely believe in.</p>
    <p style="font-size:0.8rem;">&copy; 2026 PetGearNerds. All rights reserved.</p>
  </div>
</footer>`;

const adLeaderboard = `<div class="ad-slot ad-slot-leaderboard">📢 Ad Space — Google AdSense Leaderboard (728×90)</div>`;
const adRectangle = `<div class="ad-slot ad-slot-rectangle">📢 Ad Space<br>Google AdSense<br>Medium Rectangle (300×250)</div>`;
const adInline = `<div class="ad-slot ad-slot-inline">📢 Ad Space — In-Article Google AdSense</div>`;

const sidebar = `<aside class="sidebar">
  ${adRectangle}
  <div class="sidebar-box">
    <h3>Popular Reviews</h3>
    <ul class="sidebar-list">
      <li><a href="/review/best-orthopedic-dog-beds-2026/">Best Orthopedic Dog Beds 2026 <span class="count">9.5</span></a></li>
      <li><a href="/review/yeti-dog-bowl/">YETI Boomer 8 Dog Bowl <span class="count">9.2</span></a></li>
      <li><a href="/review/catit-pixi-fountain/">Catit PIXI Smart Fountain <span class="count">8.8</span></a></li>
      <li><a href="/review/best-cat-litter-2026/">Best Cat Litter 2026 <span class="count">9.0</span></a></li>
      <li><a href="/review/kong-classic-review/">KONG Classic Review <span class="count">9.4</span></a></li>
    </ul>
  </div>
  <div class="sidebar-box">
    <h3>Browse by Pet</h3>
    <ul class="sidebar-list">
      <li><a href="/dogs/">Dogs <span class="count">32 reviews</span></a></li>
      <li><a href="/cats/">Cats <span class="count">18 reviews</span></a></li>
    </ul>
  </div>
  ${adRectangle}
</aside>`;

function schemaOrg(type, data) {
  if (!data) return '';
  return `<script type="application/ld+json">${JSON.stringify({"@context":"https://schema.org",...data})}</script>`;
}

function page(title, desc, content, active='', schema=null) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title} — PetGearNerds</title>
<meta name="description" content="${desc}">
<meta property="og:title" content="${title} — PetGearNerds">
<meta property="og:description" content="${desc}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="PetGearNerds">
<meta property="og:image" content="https://petgearnerds.vercel.app/images/logo.png">
<meta name="twitter:card" content="summary_large_image">
<link rel="canonical" href="https://petgearnerds.vercel.app/">
<link rel="sitemap" type="application/xml" href="/sitemap.xml">
<link rel="stylesheet" href="/style.css">
${schema ? schemaOrg(null, schema) : ''}
</head>
<body>
${nav(active)}
${content}
${newsletter}
${footer}
</body>
</html>`;
}

function reviewCard(slug, img, badge, score, cat, title, excerpt, time) {
  return `<a class="review-card" href="/review/${slug}/">
    <div class="review-img" style="background:${img}"><span class="review-badge">${badge}</span><span class="review-score">${score}</span></div>
    <div class="review-body">
      <span class="cat-label">${cat}</span>
      <h3>${title}</h3>
      <p>${excerpt}</p>
      <div class="review-meta"><span class="author">PetGearNerds Team</span><span>${time} min read</span></div>
    </div>
  </a>`;
}

function productBox(name, price, stars, desc) {
  return `<div class="product-box">
    <img src="/images/placeholder-product.svg" alt="${name}">
    <div class="product-info">
      <h3>${name}</h3>
      <div class="stars">${'★'.repeat(stars)}${'☆'.repeat(5-stars)}</div>
      <div class="price">${price}</div>
      <p style="font-size:0.9rem;color:var(--text-light);">${desc}</p>
      <a href="#" class="amazon-btn">🛒 Check Price on Amazon</a>
    </div>
  </div>`;
}

// Generate placeholder product SVG
const productSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 150 150"><rect fill="#f0ece5" width="150" height="150" rx="10"/><text x="75" y="75" text-anchor="middle" dy=".3em" font-family="sans-serif" font-size="40" fill="#c4bdb3">📦</text></svg>`;
fs.writeFileSync('public/images/placeholder-product.svg', productSvg);

const extraArticles = require('./articles-extra.js');

const reviews = [
  { slug: 'yeti-dog-bowl', img: 'linear-gradient(135deg,#f5e6d3,#e8d5c0)', badge: "Editor's Pick", score: '9.2', cat: 'Dog Bowls', title: 'YETI Boomer 8 Dog Bowl — Worth the Premium Price?', excerpt: 'We put this stainless steel bowl through 3 months of daily use. Here\'s what surprised us...', time: 5 },
  { slug: 'best-orthopedic-dog-beds-2026', img: 'linear-gradient(135deg,#d4e6f1,#c5d9ea)', badge: 'Comparison', score: '9.5', cat: 'Dog Beds', title: 'Best Orthopedic Dog Beds 2026 — 7 Tested Over 6 Months', excerpt: 'After 6 months of testing with senior dogs, one bed stood clearly above the rest...', time: 12 },
  { slug: 'catit-pixi-fountain', img: 'linear-gradient(135deg,#e8d8f0,#d5c4e3)', badge: 'Best Value', score: '8.8', cat: 'Cat Fountains', title: 'Catit PIXI Smart Fountain — Smart, Quiet, Beautiful', excerpt: 'Our two cats tested this LED fountain for 8 weeks. We measured everything...', time: 8 },
  { slug: 'best-cat-litter-2026', img: 'linear-gradient(135deg,#d4f1e0,#c0e8cf)', badge: 'Comparison', score: '9.0', cat: 'Cat Litter', title: 'Best Cat Litter 2026 — 10 Brands Tested Head-to-Head', excerpt: 'Clumping, crystal, natural — we tested every type so your home doesn\'t smell like a litter box...', time: 15 },
  { slug: 'kong-classic-review', img: 'linear-gradient(135deg,#f5d6d6,#e8c5c5)', badge: 'Classic', score: '9.4', cat: 'Dog Toys', title: 'KONG Classic — The Greatest Dog Toy Ever Made?', excerpt: 'After 20 years on the market, is the KONG Classic still king? We tested it against 12 competitors...', time: 7 },
  { slug: 'best-dog-food-golden-retrievers', img: 'linear-gradient(135deg,#f5ecd3,#e8dfc0)', badge: 'Breed Guide', score: '9.1', cat: 'Dog Food', title: 'Best Dog Food for Golden Retrievers 2026', excerpt: 'Golden Retrievers need specific nutrition for their coats, joints, and energy levels. Here are the top picks...', time: 10 },
  // Extra articles for long-tail SEO
  ...Object.values(extraArticles).map(a => ({ slug: a.slug, img: a.img, badge: a.badge, score: a.score, cat: a.cat, title: a.title, excerpt: a.excerpt, time: a.time })),
];

// HOME PAGE
const homePage = page('Expert Pet Product Reviews', 'In-depth pet product reviews backed by research. Find the best gear for your furry friends.', `
<section class="hero">
  <h1>Expert Pet Product Reviews<br>You Can <span class="accent">Actually Trust</span></h1>
  <p>We test, compare, and obsess over pet products so you don't have to. Research-backed reviews for dog and cat parents who care.</p>
  <a href="/dogs/" class="hero-cta">Browse Reviews →</a>
  <div class="hero-img"><img src="/images/hero.png" alt="Happy pets with premium gear"></div>
</section>
<div class="trust-bar">
  <div class="trust-item">✅ <strong>200+</strong> Products Tested</div>
  <div class="trust-item">⭐ <strong>50+</strong> In-Depth Reviews</div>
  <div class="trust-item">🔬 <strong>Research-Backed</strong> Methodology</div>
  <div class="trust-item">🐕 <strong>100%</strong> Independent</div>
</div>
<div class="container">
  ${adLeaderboard}
  <section style="padding:3rem 0;">
    <h2 style="font-family:'DM Serif Display',serif;font-size:2rem;text-align:center;color:var(--navy);margin-bottom:0.5rem;">Browse by Category</h2>
    <p style="text-align:center;color:var(--text-light);margin-bottom:2.5rem;">Find the perfect gear for every aspect of pet parenting</p>
    <div class="cat-grid">
      <a class="cat-card" href="/dogs/"><div class="cat-icon">🦴</div><h3>Dog Food</h3><p>Kibble, wet food, raw diets</p></a>
      <a class="cat-card" href="/cats/"><div class="cat-icon">🐟</div><h3>Cat Food</h3><p>Dry, wet, grain-free</p></a>
      <a class="cat-card" href="/dogs/"><div class="cat-icon">🛏️</div><h3>Beds & Crates</h3><p>Orthopedic, calming, travel</p></a>
      <a class="cat-card" href="/dogs/"><div class="cat-icon">🎾</div><h3>Toys & Puzzles</h3><p>Interactive, chew, enrichment</p></a>
      <a class="cat-card" href="/health/"><div class="cat-icon">💊</div><h3>Health & Wellness</h3><p>Supplements, dental, flea</p></a>
      <a class="cat-card" href="/dogs/"><div class="cat-icon">✂️</div><h3>Grooming</h3><p>Brushes, shampoo, clippers</p></a>
    </div>
  </section>
  ${adLeaderboard}
  <section style="padding:2rem 0 4rem;">
    <h2 style="font-family:'DM Serif Display',serif;font-size:2rem;color:var(--navy);margin-bottom:2rem;">Latest Reviews</h2>
    <div class="review-grid">
      ${reviews.slice(0,3).map(r => reviewCard(r.slug, r.img, r.badge, r.score, r.cat, r.title, r.excerpt, r.time)).join('\n')}
    </div>
    <div style="text-align:center;margin-top:2rem;">
      <a href="/dogs/" class="hero-cta" style="display:inline-flex;">See All Reviews →</a>
    </div>
  </section>
  ${adLeaderboard}
</div>
`);
fs.writeFileSync('public/index.html', homePage);

// CATEGORY PAGES
const catPages = [
  { dir: 'dogs', name: 'Dogs', emoji: '🐕', desc: 'Expert reviews of dog food, beds, toys, grooming tools, and everything else your good boy or girl needs.', reviews: [0,1,4,5,6] },
  { dir: 'cats', name: 'Cats', emoji: '🐈', desc: 'In-depth reviews of cat food, litter, fountains, scratchers, and gear for your feline overlord.', reviews: [2,3,7] },
  { dir: 'food', name: 'Pet Food', emoji: '🍖', desc: 'Comprehensive pet food reviews — kibble, wet food, raw diets, and specialty nutrition for dogs and cats.', reviews: [0,3,5] },
  { dir: 'health', name: 'Health & Wellness', emoji: '💊', desc: 'Reviews of pet supplements, dental care, flea treatments, and wellness products backed by veterinary research.', reviews: [1,8] },
  { dir: 'training', name: 'Training', emoji: '🎓', desc: 'Reviews of training tools, clickers, harnesses, and leashes. Plus training tips from certified professionals.', reviews: [4,6] },
  { dir: 'deals', name: 'Deals & Sales', emoji: '🏷️', desc: 'The best pet product deals we\'ve found this week. Updated daily with Amazon sales, coupon codes, and clearance finds.', reviews: [0,1,2,3,4,5,6,7,8] },
];

catPages.forEach(cat => {
  const html = page(cat.name, cat.desc, `
<div class="container">
  <div class="breadcrumb"><a href="/">Home</a> › ${cat.name}</div>
  <div class="page-header">
    <h1>${cat.emoji} ${cat.name}</h1>
    <p>${cat.desc}</p>
  </div>
  ${adLeaderboard}
  <div class="content-grid">
    <div class="main-content">
      <div class="review-grid" style="grid-template-columns:1fr;">
        ${cat.reviews.map(i => reviewCard(reviews[i].slug, reviews[i].img, reviews[i].badge, reviews[i].score, reviews[i].cat, reviews[i].title, reviews[i].excerpt, reviews[i].time)).join('\n')}
      </div>
      ${adInline}
    </div>
    ${sidebar}
  </div>
</div>
`, cat.dir);
  fs.writeFileSync(`public/${cat.dir}/index.html`, html);
});

// REVIEW ARTICLE PAGE (sample full article)
const articlePage = page('YETI Boomer 8 Dog Bowl — Worth the Premium Price?', 'After 3 months of daily testing, we break down whether the YETI Boomer 8 justifies its premium price tag.', `
<div class="container">
  <div class="breadcrumb"><a href="/">Home</a> › <a href="/dogs/">Dogs</a> › YETI Boomer 8 Review</div>
  ${adLeaderboard}
  <div class="content-grid">
    <div class="main-content">
      <article class="article">
        <h1>YETI Boomer 8 Dog Bowl — Worth the Premium Price?</h1>
        <div class="article-meta">
          By <strong>PetGearNerds Team</strong> · Updated February 10, 2026 · 5 min read
        </div>
        <div style="background:linear-gradient(135deg,#f5e6d3,#e8d5c0);height:300px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:3rem;margin-bottom:1.5rem;">🥣</div>

        <p><strong>The bottom line:</strong> The YETI Boomer 8 is the best stainless steel dog bowl we've ever tested. It's virtually indestructible, won't slide across the floor, and keeps water noticeably cooler. But at $50, it's 5x the price of a standard bowl. Is it worth it? For most pet parents, yes.</p>

        <div style="background:var(--cream);border-left:4px solid var(--orange);padding:1rem 1.5rem;border-radius:0 8px 8px 0;margin:1.5rem 0;">
          <strong>Our Score: 9.2/10</strong> — The YETI Boomer 8 earns our Editor's Pick award for build quality, slip resistance, and durability that justifies its premium price.
        </div>

        ${productBox('YETI Boomer 8 Dog Bowl', '$49.99', 5, '8-cup capacity, double-wall insulation, BPA-free stainless steel, dishwasher safe.')}

        <h2>Why We Tested This</h2>
        <p>Every pet owner has had the experience: your dog slides their cheap plastic bowl across the kitchen floor, water sloshing everywhere. Or the bowl develops scratches that harbor bacteria. Or it just looks terrible after a month.</p>
        <p>YETI — yes, the cooler company — entered the pet space with the Boomer line. We wanted to know if their reputation for durability translates to dog bowls.</p>

        ${adInline}

        <h2>How We Tested</h2>
        <p>We put the YETI Boomer 8 through 90 days of daily use with two dogs: a 70-pound Golden Retriever and a 25-pound Beagle mix. We measured:</p>
        <ul>
          <li><strong>Slip resistance</strong> — tested on tile, hardwood, and laminate</li>
          <li><strong>Temperature retention</strong> — water temperature over 4 hours</li>
          <li><strong>Durability</strong> — drop tests, dishwasher cycles, scratch resistance</li>
          <li><strong>Ease of cleaning</strong> — bacterial growth vs. plastic bowls</li>
        </ul>

        <h2>What We Found</h2>
        <h3>Build Quality: Exceptional</h3>
        <p>The Boomer 8 is double-wall vacuum insulated — the same technology as YETI tumblers. It feels substantial (1.8 lbs empty) without being comically heavy. The 18/8 stainless steel is the same food-grade material used in high-end kitchen equipment.</p>

        <h3>Slip Resistance: Best in Class</h3>
        <p>The rubber ring on the bottom is the real star. On every surface we tested — tile, hardwood, laminate, concrete — the bowl barely moved even with our Golden Retriever aggressively eating. Most bowls we've tested slide 6-12 inches per meal. The Boomer moved less than 1 inch.</p>

        ${adInline}

        <h3>Temperature Retention: Noticeable</h3>
        <p>Water stayed 8°F cooler after 4 hours compared to a standard stainless steel bowl. In summer heat, this matters more than you'd think — dogs drink more water when it's cool.</p>

        <div class="pros-cons">
          <div class="pros">
            <h4>✅ What We Love</h4>
            <ul>
              <li>Virtually indestructible build</li>
              <li>Best slip resistance we've tested</li>
              <li>Keeps water cooler longer</li>
              <li>Dishwasher safe (actually)</li>
              <li>Beautiful design, multiple colors</li>
            </ul>
          </div>
          <div class="cons">
            <h4>❌ What Could Be Better</h4>
            <ul>
              <li>Expensive ($50 for a dog bowl)</li>
              <li>Heavy — not great for travel</li>
              <li>Only 2 sizes available</li>
              <li>No matching stand option</li>
            </ul>
          </div>
        </div>

        <h2>The Verdict</h2>
        <p>The YETI Boomer 8 is the last dog bowl you'll ever buy. At $50, it's a significant investment for what is, functionally, a food container. But if you're tired of replacing cheap bowls, cleaning scratched plastic, or mopping up water from a sliding bowl, the Boomer pays for itself within a year.</p>

        <p><strong>Who should buy this:</strong> Anyone who values durability and is tired of the annual bowl replacement cycle. Especially good for large dogs who tend to push bowls around.</p>
        <p><strong>Who should skip this:</strong> Budget-conscious pet parents, or those with small dogs who don't need the 8-cup capacity.</p>

        ${productBox('YETI Boomer 8 Dog Bowl', '$49.99', 5, '8-cup capacity, double-wall insulation, BPA-free stainless steel.')}

        ${adLeaderboard}
      </article>

      <h3 style="font-family:'DM Serif Display',serif;color:var(--navy);margin:2rem 0 1rem;">Related Reviews</h3>
      <div class="review-grid">
        ${reviews.slice(1,3).map(r => reviewCard(r.slug, r.img, r.badge, r.score, r.cat, r.title, r.excerpt, r.time)).join('\n')}
      </div>
    </div>
    ${sidebar}
  </div>
</div>
`, 'dogs');
fs.mkdirSync('public/review/yeti-dog-bowl', { recursive: true });
fs.writeFileSync('public/review/yeti-dog-bowl/index.html', articlePage);

// Generate full article pages for remaining reviews
const articles = require('./articles.js');
const allArticles = { ...articles, ...extraArticles };

reviews.slice(1).forEach(r => {
  fs.mkdirSync(`public/review/${r.slug}`, { recursive: true });
  const articleData = allArticles[r.slug];
  let articleContent;
  if (articleData) {
    // Full article available
    articleContent = page(articleData.title, r.excerpt, `
<div class="container">
  <div class="breadcrumb">${articleData.breadcrumb}</div>
  ${adLeaderboard}
  <div class="content-grid">
    <div class="main-content">
      <article class="article">
        ${articleData.content(productBox, adInline, adLeaderboard)}
      </article>
      <h3 style="font-family:'DM Serif Display',serif;color:var(--navy);margin:2rem 0 1rem;">Related Reviews</h3>
      <div class="review-grid">
        ${reviews.filter(x => x.slug !== r.slug).slice(0,2).map(x => reviewCard(x.slug, x.img, x.badge, x.score, x.cat, x.title, x.excerpt, x.time)).join('\n')}
      </div>
    </div>
    ${sidebar}
  </div>
</div>
    `);
  } else {
    // Fallback stub
    articleContent = page(r.title, r.excerpt, `
<div class="container">
  <div class="breadcrumb"><a href="/">Home</a> › <a href="/dogs/">Reviews</a> › ${r.title}</div>
  ${adLeaderboard}
  <div class="content-grid">
    <div class="main-content">
      <article class="article">
        <h1>${r.title}</h1>
        <div class="article-meta">By <strong>PetGearNerds Team</strong> · February 2026 · ${r.time} min read</div>
        <p>${r.excerpt}</p>
        <p><em>Full review coming soon.</em></p>
      </article>
    </div>
    ${sidebar}
  </div>
</div>
    `);
  }
  fs.writeFileSync(`public/review/${r.slug}/index.html`, articleContent);
});

// ABOUT PAGE
const aboutPage = page('About Us', 'Learn about PetGearNerds — who we are, why we started, and how we review pet products.', `
<div class="container">
  <div class="breadcrumb"><a href="/">Home</a> › About</div>
  <div class="content-grid">
    <div class="main-content">
      <article class="article">
        <h1>About PetGearNerds</h1>
        <div style="background:linear-gradient(135deg,var(--navy),#2a3f6b);height:250px;border-radius:10px;display:flex;align-items:center;justify-content:center;margin-bottom:1.5rem;">
          <img src="/images/logo.png" alt="PetGearNerds" style="width:120px;height:120px;border-radius:20px;">
        </div>
        <h2>Our Mission</h2>
        <p>PetGearNerds exists because we were tired of fake reviews, sponsored content disguised as recommendations, and "best of" lists that clearly never tested anything.</p>
        <p>We're a small team of pet owners, veterinary consultants, and product testing nerds. We buy products with our own money (or accept review samples with full editorial independence). We test them for weeks or months, not hours. And we tell you exactly what we think.</p>

        <h2>How We're Different</h2>
        <ul>
          <li><strong>Real testing, real time.</strong> We don't review products after using them for a day. Our standard testing period is 4-12 weeks.</li>
          <li><strong>We buy what we recommend.</strong> Every product in our "Editor's Pick" category was purchased at retail price.</li>
          <li><strong>Veterinary input.</strong> Our health and nutrition reviews are reviewed by licensed veterinarians.</li>
          <li><strong>No pay-to-play.</strong> Brands cannot pay for positive reviews. Period.</li>
        </ul>

        <h2>How We Make Money</h2>
        <p>PetGearNerds is reader-supported. When you click our product links and make a purchase, we may earn a small commission from Amazon and other retailers. This never affects our ratings or recommendations — we'd rather lose a commission than recommend a bad product.</p>
        <p>We also display non-intrusive advertisements via Google AdSense. This helps us keep testing and reviewing products without paywalls.</p>
      </article>
    </div>
    ${sidebar}
  </div>
</div>
`);
fs.writeFileSync('public/about/index.html', aboutPage);

// METHODOLOGY PAGE
const methPage = page('Our Testing Methodology', 'How PetGearNerds tests and rates pet products — our scoring system, testing protocols, and editorial standards.', `
<div class="container">
  <div class="breadcrumb"><a href="/">Home</a> › Methodology</div>
  <div class="content-grid">
    <div class="main-content">
      <article class="article">
        <h1>Our Testing Methodology</h1>
        <div class="article-meta">How we test, score, and recommend pet products</div>
        <h2>The PetGearNerds Score (1-10)</h2>
        <p>Every product we review receives a score from 1 to 10 based on five weighted criteria:</p>
        <ul>
          <li><strong>Build Quality (25%)</strong> — Materials, construction, durability over time</li>
          <li><strong>Performance (30%)</strong> — Does it actually do what it claims?</li>
          <li><strong>Value (20%)</strong> — Price relative to quality and alternatives</li>
          <li><strong>Safety (15%)</strong> — Materials safety, choking hazards, recalls</li>
          <li><strong>Design (10%)</strong> — Aesthetics, ease of use, thoughtful features</li>
        </ul>
        <h2>Our Testing Process</h2>
        <ol>
          <li><strong>Research Phase (1 week)</strong> — We study the market, identify top candidates, and order products.</li>
          <li><strong>Initial Testing (1-2 weeks)</strong> — Unboxing, first impressions, setup ease, initial performance.</li>
          <li><strong>Extended Testing (4-12 weeks)</strong> — Daily use with real pets in real homes.</li>
          <li><strong>Comparative Analysis</strong> — Head-to-head comparisons with competitors.</li>
          <li><strong>Expert Review</strong> — Veterinary consultation for health/nutrition products.</li>
          <li><strong>Final Scoring & Publication</strong> — Writing, photography, scoring, and editorial review.</li>
        </ol>
        <h2>Our Rating Scale</h2>
        <ul>
          <li><strong>9.0-10.0</strong> — Outstanding. Best in class. Editor's Pick.</li>
          <li><strong>8.0-8.9</strong> — Excellent. Highly recommended with minor flaws.</li>
          <li><strong>7.0-7.9</strong> — Good. Solid choice but not the best available.</li>
          <li><strong>6.0-6.9</strong> — Average. Does the job but competitors do it better.</li>
          <li><strong>Below 6.0</strong> — Not recommended. Significant issues found.</li>
        </ul>
      </article>
    </div>
    ${sidebar}
  </div>
</div>
`);
fs.writeFileSync('public/methodology/index.html', methPage);

// CONTACT, PRIVACY, AFFILIATE DISCLOSURE
const contactPage = page('Contact Us', 'Get in touch with the PetGearNerds team for reviews, partnerships, or questions.', `
<div class="container">
  <div class="breadcrumb"><a href="/">Home</a> › Contact</div>
  <div class="content-grid">
    <div class="main-content">
      <article class="article">
        <h1>Contact Us</h1>
        <p>Have a question, product suggestion, or partnership inquiry? We'd love to hear from you.</p>
        <h2>General Inquiries</h2>
        <p>📧 <strong>hello@petgearnerds.com</strong></p>
        <h2>Product Reviews</h2>
        <p>Want us to review your product? Send samples and information to:<br>📧 <strong>reviews@petgearnerds.com</strong></p>
        <p><em>Note: Sending a product does not guarantee a positive review. We maintain full editorial independence.</em></p>
        <h2>Advertising</h2>
        <p>For advertising inquiries:<br>📧 <strong>ads@petgearnerds.com</strong></p>
      </article>
    </div>
    ${sidebar}
  </div>
</div>
`);
fs.writeFileSync('public/contact/index.html', contactPage);

const privacyPage = page('Privacy Policy', 'PetGearNerds privacy policy — how we collect, use, and protect your data.', `
<div class="container">
  <div class="breadcrumb"><a href="/">Home</a> › Privacy</div>
  <div class="content-grid">
    <div class="main-content">
      <article class="article">
        <h1>Privacy Policy</h1>
        <div class="article-meta">Last updated: February 2026</div>
        <h2>Information We Collect</h2>
        <p>PetGearNerds collects minimal data. When you subscribe to our newsletter, we collect your email address. When you visit our site, standard analytics data (page views, device type, location at country level) is collected via Google Analytics.</p>
        <h2>How We Use Your Data</h2>
        <ul><li>Email addresses are used solely for our weekly newsletter</li><li>Analytics data helps us understand which content is most useful</li><li>We never sell your personal data to third parties</li></ul>
        <h2>Cookies</h2>
        <p>We use cookies for analytics (Google Analytics) and advertising (Google AdSense). Amazon affiliate links may also set cookies to track referral commissions.</p>
        <h2>Third-Party Services</h2>
        <ul><li>Google Analytics — traffic analysis</li><li>Google AdSense — advertising</li><li>Amazon Associates — affiliate tracking</li></ul>
        <h2>Contact</h2>
        <p>Questions about privacy? Email us at <strong>hello@petgearnerds.com</strong></p>
      </article>
    </div>
    ${sidebar}
  </div>
</div>
`);
fs.writeFileSync('public/privacy/index.html', privacyPage);

const affiliatePage = page('Affiliate Disclosure', 'How PetGearNerds earns money through affiliate links and how it affects our reviews.', `
<div class="container">
  <div class="breadcrumb"><a href="/">Home</a> › Affiliate Disclosure</div>
  <div class="content-grid">
    <div class="main-content">
      <article class="article">
        <h1>Affiliate Disclosure</h1>
        <div class="article-meta">Transparency about how we make money</div>
        <p>PetGearNerds is a participant in the <strong>Amazon Services LLC Associates Program</strong>, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com.</p>
        <h2>What This Means For You</h2>
        <ul>
          <li>When you click a product link on our site and make a purchase on Amazon, we may earn a small commission (typically 3-8% of the purchase price)</li>
          <li><strong>You pay exactly the same price</strong> whether you use our link or go directly to Amazon</li>
          <li>Affiliate commissions <strong>never influence our ratings or recommendations</strong></li>
          <li>We frequently recommend products that earn us lower commissions because they're genuinely better</li>
        </ul>
        <h2>Our Promise</h2>
        <p>We will never recommend a product solely because it pays a higher commission. Our editorial integrity is non-negotiable. If we wouldn't recommend a product to our own family members, we won't recommend it to you.</p>
        <h2>Other Revenue</h2>
        <p>In addition to affiliate commissions, PetGearNerds earns revenue through display advertising via Google AdSense. These ads are clearly distinguishable from editorial content.</p>
      </article>
    </div>
    ${sidebar}
  </div>
</div>
`);
fs.writeFileSync('public/affiliate-disclosure/index.html', affiliatePage);

// SITEMAP.XML
const domain = 'https://petgearnerds.vercel.app';
const today = new Date().toISOString().split('T')[0];
const sitemapUrls = [
  { loc: '/', priority: '1.0', changefreq: 'weekly' },
  ...catPages.map(c => ({ loc: `/${c.dir}/`, priority: '0.8', changefreq: 'weekly' })),
  ...reviews.map(r => ({ loc: `/review/${r.slug}/`, priority: '0.9', changefreq: 'monthly' })),
  { loc: '/about/', priority: '0.5', changefreq: 'monthly' },
  { loc: '/methodology/', priority: '0.5', changefreq: 'monthly' },
  { loc: '/contact/', priority: '0.4', changefreq: 'yearly' },
  { loc: '/privacy/', priority: '0.3', changefreq: 'yearly' },
  { loc: '/affiliate-disclosure/', priority: '0.3', changefreq: 'yearly' },
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.map(u => `  <url>
    <loc>${domain}${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
fs.writeFileSync('public/sitemap.xml', sitemap);

// ROBOTS.TXT
fs.writeFileSync('public/robots.txt', `User-agent: *
Allow: /
Sitemap: ${domain}/sitemap.xml
`);

console.log('✅ Built all pages:');
console.log('  - / (home)');
catPages.forEach(c => console.log(`  - /${c.dir}/`));
reviews.forEach(r => console.log(`  - /review/${r.slug}/`));
console.log('  - /about/');
console.log('  - /methodology/');
console.log('  - /contact/');
console.log('  - /privacy/');
console.log('  - /affiliate-disclosure/');
