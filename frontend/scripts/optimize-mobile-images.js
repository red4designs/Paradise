const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const optimizeForMobile = async () => {
  const inputDir = path.join(__dirname, '../public/images/Views');
  const imagesToOptimize = [
    'IMG_1701_optimized.webp'
  ];

  for (const imageName of imagesToOptimize) {
    const inputPath = path.join(inputDir, imageName);
    const outputPath = path.join(inputDir, imageName.replace('_optimized', '_mobile'));
    
    if (!fs.existsSync(inputPath)) {
      console.log(`❌ Image not found: ${inputPath}`);
      continue;
    }

    try {
      // Get original image info
      const originalStats = fs.statSync(inputPath);
      const originalMetadata = await sharp(inputPath).metadata();
      
      console.log(`📱 Optimizing ${imageName} for mobile...`);
      console.log(`   Original: ${originalMetadata.width}x${originalMetadata.height} (${(originalStats.size / 1024).toFixed(1)}KB)`);
      
      // Create mobile-optimized version (smaller dimensions and higher compression)
      await sharp(inputPath)
        .resize(800, null, { // Max width 800px for mobile
          withoutEnlargement: true,
          fit: 'inside'
        })
        .webp({ 
          quality: 60, // Lower quality for mobile
          effort: 6
        })
        .toFile(outputPath);
      
      // Get optimized image info
      const optimizedStats = fs.statSync(outputPath);
      const optimizedMetadata = await sharp(outputPath).metadata();
      
      console.log(`   Mobile: ${optimizedMetadata.width}x${optimizedMetadata.height} (${(optimizedStats.size / 1024).toFixed(1)}KB)`);
      console.log(`   💾 Saved: ${((originalStats.size - optimizedStats.size) / 1024).toFixed(1)}KB`);
      console.log(`   📉 Reduction: ${(((originalStats.size - optimizedStats.size) / originalStats.size) * 100).toFixed(1)}%`);
      
    } catch (error) {
      console.error(`❌ Error optimizing ${imageName}:`, error.message);
    }
  }
  
  console.log('\n✅ Mobile optimization complete!');
};

optimizeForMobile().catch(console.error);