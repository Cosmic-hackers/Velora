const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const outDir = 'public/images/products/men';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Automatically detect any black / dark border on any side and crop inside it
async function getCleanBoundingBox(imagePath) {
  const { data, info } = await sharp(imagePath).raw().toBuffer({ resolveWithObject: true });
  const w = info.width;
  const h = info.height;
  const c = info.channels;
  
  let minX = 0;
  let maxX = w - 1;
  let minY = 0;
  let maxY = h - 1;
  
  // Left border
  for (let x = 0; x < Math.floor(w * 0.35); x++) {
    let dark = 0;
    for (let y = Math.floor(h * 0.15); y < Math.floor(h * 0.85); y++) {
      const idx = (y * w + x) * c;
      if (data[idx] < 45 && data[idx+1] < 45 && data[idx+2] < 45) dark++;
    }
    if (dark > (h * 0.7) * 0.6) {
      minX = x + 1;
    } else {
      break;
    }
  }

  // Right border
  for (let x = w - 1; x >= Math.floor(w * 0.65); x--) {
    let dark = 0;
    for (let y = Math.floor(h * 0.15); y < Math.floor(h * 0.85); y++) {
      const idx = (y * w + x) * c;
      if (data[idx] < 45 && data[idx+1] < 45 && data[idx+2] < 45) dark++;
    }
    if (dark > (h * 0.7) * 0.6) {
      maxX = x - 1;
    } else {
      break;
    }
  }

  // Top border
  for (let y = 0; y < Math.floor(h * 0.25); y++) {
    let dark = 0;
    for (let x = minX + 20; x < maxX - 20; x++) {
      const idx = (y * w + x) * c;
      if (data[idx] < 45 && data[idx+1] < 45 && data[idx+2] < 45) dark++;
    }
    if (dark > (maxX - minX - 40) * 0.6) {
      minY = y + 1;
    } else {
      break;
    }
  }

  // Bottom border
  for (let y = h - 1; y >= Math.floor(h * 0.75); y--) {
    let dark = 0;
    for (let x = minX + 20; x < maxX - 20; x++) {
      const idx = (y * w + x) * c;
      if (data[idx] < 45 && data[idx+1] < 45 && data[idx+2] < 45) dark++;
    }
    if (dark > (maxX - minX - 40) * 0.6) {
      maxY = y - 1;
    } else {
      break;
    }
  }

  // Add 4px safety buffer inside
  minX = Math.min(minX + 4, w - 10);
  maxX = Math.max(maxX - 4, minX + 10);
  minY = Math.min(minY + 4, h - 10);
  maxY = Math.max(maxY - 4, minY + 10);

  return {
    left: minX,
    top: minY,
    width: maxX - minX + 1,
    height: maxY - minY + 1
  };
}

async function processImg(srcFile, destName, cropOptions = {}) {
  const srcPath = path.join('new images/shop', srcFile);
  const destPath = path.join(outDir, destName);
  
  if (!fs.existsSync(srcPath)) {
    console.error('File not found:', srcPath);
    return;
  }

  const bbox = await getCleanBoundingBox(srcPath);

  await sharp(srcPath)
    .extract(bbox)
    .resize(1200, 1500, {
      fit: 'cover',
      position: cropOptions.position || 'top'
    })
    .jpeg({ quality: 95, mozjpeg: true })
    .toFile(destPath);
  
  console.log('Cleanly processed:', destName, `(extracted: ${bbox.width}x${bbox.height} at +${bbox.left}+${bbox.top})`);
}

async function run() {
  const tasks = [
    // 1. Camel Overcoat
    ['Camel Wool Overcoat on Ivory-1.png', 'camel-overcoat-1.jpg', { position: 'top' }],
    ['Camel Wool Overcoat on Cream Background-4.png', 'camel-overcoat-2.jpg', { position: 'top' }],

    // 2. Taupe Overcoat
    ['Taupe Double-Breasted Wool Overcoat-2.png', 'taupe-overcoat-1.jpg', { position: 'top' }],

    // 3. Minimalist Beige Suit
    ['Minimalist Beige Suit Editorial Portrait-3.png', 'minimalist-suit-1.jpg', { position: 'top' }],
    ['Relaxed Neutral-Tone Tailoring-1.png', 'minimalist-suit-2.jpg', { position: 'top' }],

    // 4. Stone Beige Blazer
    ['Stone Beige Menswear Editorial-2.png', 'stone-blazer-1.jpg', { position: 'top' }],
    ['Velora Menswear in Warm Stone Light-2.png', 'stone-blazer-2.jpg', { position: 'top' }],
    ['Velora Menswear in Warm Stone Light-4.png', 'stone-blazer-3.jpg', { position: 'top' }],

    // 5. Artisanal Linen Jacket
    ['Velora Menswear_ Tailored Elegance-1.png', 'artisanal-linen-jacket-1.jpg', { position: 'top' }],
    ['Velora Menswear_ Timeless Linen Style-1.png', 'artisanal-linen-jacket-2.jpg', { position: 'top' }],
    ['Velora Linen Menswear Editorial-3.png', 'artisanal-linen-jacket-3.jpg', { position: 'top' }],

    // 6. Noir Jacket
    ['Velora Menswear Editorial Portrait-1.png', 'noir-jacket-1.jpg', { position: 'top' }],
    ['Velora Menswear Editorial Portrait-5.png', 'noir-jacket-2.jpg', { position: 'top' }],

    // 7. Studio Shacket
    ['Relaxed Brown and Cream Studio Style.png', 'studio-shacket-1.jpg', { position: 'top' }],

    // 8. Black Satin Shirt
    ['Black Satin Shirt in Soft Window Light-4.png', 'black-satin-shirt-1.jpg', { position: 'top' }],

    // 9. Brown Linen Shirt
    ['Brown Linen Shirt on Ivory Background-3.png', 'brown-linen-shirt-1.jpg', { position: 'top' }],

    // 10. Brown Twill Overshirt
    ['Brown Twill Overshirt on Beige-6.png', 'twill-overshirt-1.jpg', { position: 'top' }],

    // 11. Ivory Poplin Shirt
    ['Ivory Shirt on a Warm Beige Background-2.png', 'ivory-poplin-shirt-1.jpg', { position: 'top' }],
    ['Ivory Shirt on Wooden Hanger-1.png', 'ivory-poplin-shirt-2.jpg', { position: 'top' }],

    // 12. Striped Shirt
    ["Gentlemen's Striped Shirt.jpg", 'striped-poplin-shirt-1.jpg', { position: 'top' }],

    // 13. Sand Oxford Shirt
    ['Sand Button-Down Oxford Shirt-5.png', 'sand-oxford-shirt-1.jpg', { position: 'top' }],

    // 14. Taupe Knit Polo
    ['Taupe Ribbed Knit Polo Shirt-1.png', 'taupe-knit-polo-1.jpg', { position: 'top' }],

    // 15. Charcoal Trousers
    ['Velora Charcoal Tailored Trousers-3.png', 'charcoal-trousers-1.jpg', { position: 'top' }],

    // 16. Chocolate Brown Trousers
    ['Velora Chocolate Brown Wide-Leg Trousers-6.png', 'chocolate-trousers-1.jpg', { position: 'top' }],
    ['Minimalist Brown Trousers Fashion Portrait-3.png', 'chocolate-trousers-2.jpg', { position: 'top' }],

    // 17. Ivory Wide-Leg Trousers
    ['Velora Ivory Wide-Leg Trousers-2.png', 'ivory-wide-trousers-1.jpg', { position: 'top' }],

    // 18. Linen Trousers
    ['Velora Linen Trousers Editorial-6.png', 'linen-trousers-1.jpg', { position: 'top' }],

    // 19. Tailored Creased Trousers
    ['Velora Tailored Trousers Editorial-2.png', 'tailored-trousers-1.jpg', { position: 'top' }],
    ['Velora Tailored Trousers Editorial-4.png', 'tailored-trousers-2.jpg', { position: 'top' }],
    ['Velora Tailored Trousers Editorial.png', 'tailored-trousers-3.jpg', { position: 'top' }],

    // 20. Oatmeal Wide-Leg Trousers
    ['Velora Wide-Leg Trousers Studio Edit-7.png', 'oatmeal-wide-trousers-1.jpg', { position: 'top' }],
    ['Wide-Leg Trousers in Warm Neutrals-5.png', 'oatmeal-wide-trousers-2.jpg', { position: 'top' }],
    ['Sophisticated Wide-Leg Trousers in Studio Light-4.png', 'oatmeal-wide-trousers-3.jpg', { position: 'top' }],

    // 21. Classic Leather Belt
    ['Velora Classic Leather Belt-1.png', 'classic-leather-belt-1.jpg', { position: 'center' }],
    ['Velora Classic Leather Belt-2.png', 'classic-leather-belt-2.jpg', { position: 'center' }],
    ['Velora Classic Leather Belt Ad-4.png', 'classic-leather-belt-3.jpg', { position: 'center' }],
    ['Velora Classic Leather Belt Ad-5.png', 'classic-leather-belt-4.jpg', { position: 'center' }],
    ['Velora Leather Belt on Warm Stone-3.png', 'classic-leather-belt-5.jpg', { position: 'center' }],

    // 22. Minimalist Watch
    ['Velora Classic Watch on Beige Stone.png', 'minimalist-watch-1.jpg', { position: 'center' }],
    ['Velora Timeless Elegance Watch.png', 'minimalist-watch-2.jpg', { position: 'center' }],

    // 23. Sunglasses
    ['Velora Clubmaster Sunglasses Ad.png', 'clubmaster-sunglasses-1.jpg', { position: 'center' }],

    // 24. Ribbed Socks
    ['Minimalist Beige Ribbed Ankle Socks-2.png', 'ribbed-socks-1.jpg', { position: 'center' }],
    ['Velora Premium Ribbed Socks-1.png', 'ribbed-socks-2.jpg', { position: 'center' }],
    ['Velora Ribbed Socks in Warm Sunlight.png', 'ribbed-socks-3.jpg', { position: 'center' }],

    // 25. Leather Portfolio & Accessories Still Life
    ['Timeless Leather Accessories Still Life-3.png', 'leather-portfolio-1.jpg', { position: 'center' }],
    ['Luxurious Winter Accessories Still Life-4.png', 'leather-portfolio-2.jpg', { position: 'center' }],
    ['Velora Accessories_ A Minimalist Lookbook.png', 'leather-portfolio-3.jpg', { position: 'center' }],
  ];

  for (const [src, dest, opt] of tasks) {
    await processImg(src, dest, opt);
  }
  console.log('All images auto-cropped and processed without borders!');
}

run().catch(console.error);
