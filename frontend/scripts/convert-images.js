const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Function to convert images to WebP format
async function convertToWebP(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      .webp({ quality: 80, effort: 6 })
      .toFile(outputPath);
    console.log(`✅ Converted: ${inputPath} -> ${outputPath}`);
  } catch (error) {
    console.error(`❌ Error converting ${inputPath}:`, error.message);
  }
}

// Function to recursively find and convert images
async function processDirectory(dirPath) {
  const items = fs.readdirSync(dirPath);
  
  for (const item of items) {
    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      await processDirectory(fullPath);
    } else if (stat.isFile()) {
      const ext = path.extname(item).toLowerCase();
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        const webpPath = fullPath.replace(/\.(jpe?g|png)$/i, '.webp');
        
        // Only convert if WebP doesn't exist or is older
        if (!fs.existsSync(webpPath) || stat.mtime > fs.statSync(webpPath).mtime) {
          await convertToWebP(fullPath, webpPath);
        } else {
          console.log(`⏭️  Skipped (up to date): ${fullPath}`);
        }
      }
    }
  }
}

// Main execution
async function main() {
  const imagesDir = path.join(__dirname, '..', 'public', 'images');
  
  console.log('🚀 Starting image conversion to WebP format...');
  console.log(`📁 Processing directory: ${imagesDir}`);
  
  if (!fs.existsSync(imagesDir)) {
    console.error('❌ Images directory not found!');
    process.exit(1);
  }
  
  try {
    await processDirectory(imagesDir);
    console.log('✨ Image conversion completed!');
  } catch (error) {
    console.error('❌ Error during conversion:', error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { convertToWebP, processDirectory };