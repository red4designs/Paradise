const fs = require('fs');
const path = require('path');

const pages = [
    { route: 'arrival-guide', title: 'Arrival Guide — Paradise Resort Vattavada' },
    { route: 'gallery', title: 'Gallery — Paradise Resort Vattavada' },
    { route: 'faq', title: 'FAQ — Paradise Resort Vattavada' },
    { route: 'contact', title: 'Contact Us — Paradise Resort Vattavada' },
    { route: 'search', title: 'Search — Paradise Resort Vattavada' }
];

const publicDir = path.join(__dirname, '../public');

if (!fs.existsSync(publicDir)) {
    console.error(`Public directory not found at: ${publicDir}`);
    process.exit(1);
}

pages.forEach(page => {
    const dir = path.join(publicDir, page.route);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log('Created dir:', dir);
    } else {
        console.log('Dir exists:', dir);
    }

    const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${page.title}</title>
  <meta name="robots" content="index,follow">
  <link rel="canonical" href="https://www.paradisevattavada.com/${page.route}">
  <meta http-equiv="refresh" content="0; url=/?redirect=/${page.route}">
  <noscript>
    <meta http-equiv="refresh" content="0; url=/">
    <p><a href="/?redirect=/${page.route}">Continue to ${page.title}</a></p>
  </noscript>
</head>
<body></body>
</html>`;

    fs.writeFileSync(path.join(dir, 'index.html'), html);
    console.log('Created index.html for:', page.route);
});
