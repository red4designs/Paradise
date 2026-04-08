const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

// Remove hardcoded canonical, description, and title
html = html.replace(/<link rel="canonical" href="[^"]+" \/>/g, '');
html = html.replace(/<meta name="description"[\s\S]*?\/>/, '');
html = html.replace(/<title>.*?<\/title>/, '<title>Paradise Resort</title>');

// Remove all <style> blocks
html = html.replace(/<style>[\s\S]*?<\/style>/g, '');

fs.writeFileSync('public/index.html', html);
console.log('Cleaned up public/index.html');
