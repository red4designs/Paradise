const fs = require('fs');
const path = require('path');

const dirs = ['Cottages', 'Deluxe Room', 'Dormitory', 'Double room', 'Tents', 'Views', 'Activities'];
const baseDir = path.join(__dirname, '..', 'public', 'images');
const outputJson = path.join(__dirname, '..', 'src', 'data', 'generated-gallery.json');

let gallery = [];
let idCounter = 1;

dirs.forEach(dir => {
    const dirPath = path.join(baseDir, dir);
    if (!fs.existsSync(dirPath)) return;
    
    let files = fs.readdirSync(dirPath);
    let webpSet = new Set();
    
    // First pass: remember all webp files
    files.forEach(f => {
        if(f.toLowerCase().endsWith('.webp')) {
            webpSet.add(f.replace(/\.webp$/i, ''));
        }
    });

    files.forEach(f => {
        const ext = path.extname(f).toLowerCase();
        if(!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
            return;
        }
        
        const baseName = f.replace(new RegExp(`${ext}$`, 'i'), '');
        
        // If it's a jpg/png and a webp exists for it, skip the jpg/png
        if(ext !== '.webp' && webpSet.has(baseName)) {
            return;
        }

        // Clean up title
        let title = `${dir} - ${baseName.replace(/[_-]/g, ' ')}`;
        let category = dir === 'Double room' ? 'Double Room' : dir;
        
        gallery.push({
            id: idCounter++,
            category: category,
            image: `/images/${dir}/${f}`,
            title: title
        });
    });
});

fs.writeFileSync(outputJson, JSON.stringify(gallery, null, 2));
console.log('Successfully generated JSON with ' + gallery.length + ' images at ' + outputJson);
