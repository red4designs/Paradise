const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function optimizeImage(inputPath, outputPath, maxWidth = 1200, quality = 80) {
  try {
    const info = await sharp(inputPath).metadata();
    console.log(`Original: ${info.width}x${info.height}, ${Math.round(info.size / 1024)}KB`);
    
    await sharp(inputPath)
      .resize(maxWidth, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
      .webp({ quality })
      .toFile(outputPath);
    
    const newInfo = await sharp(outputPath).metadata();
    const newSize = fs.statSync(outputPath).size;
    console.log(`Optimized: ${newInfo.width}x${newInfo.height}, ${Math.round(newSize / 1024)}KB`);
    console.log(`Savings: ${Math.round((info.size - newSize) / 1024)}KB\n`);
  } catch (error) {
    console.error(`Error optimizing ${inputPath}:`, error.message);
  }
}

async function main() {
  const imagesDir = path.join(__dirname, '../public/images/Views');
  
  // Optimize the large images identified in the audit
  const imagesToOptimize = [
    {
      input: path.join(imagesDir, 'IMG_1701.JPEG'),
      output: path.join(imagesDir, 'IMG_1701_optimized.webp'),
      maxWidth: 1200,
      quality: 75
    },
    {
      input: path.join(imagesDir, 'IMG_20241109_174229.webp'),
      output: path.join(imagesDir, 'IMG_20241109_174229_optimized.webp'),
      maxWidth: 1200,
      quality: 75
    }
  ];
  
  console.log('Starting image optimization...');
  
  for (const img of imagesToOptimize) {
    if (fs.existsSync(img.input)) {
      console.log(`Optimizing: ${path.basename(img.input)}`);
      await optimizeImage(img.input, img.output, img.maxWidth, img.quality);
    } else {
      console.log(`File not found: ${img.input}`);
    }
  }
  
  console.log('Image optimization complete!');
}

main().catch(console.error);