const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const sizes = [16, 32, 48, 64, 128, 192, 512];
const publicDir = path.join(__dirname, '..', 'public');
const svgPath = path.join(publicDir, 'favicon.svg');

async function generateFavicons() {
  try {
    // Read the SVG file
    const svgBuffer = await fs.readFile(svgPath);

    // Generate PNGs
    for (const size of sizes) {
      await sharp(svgBuffer)
        .resize(size, size)
        .png()
        .toFile(path.join(publicDir, `icon-${size}.png`));
      
      console.log(`Generated ${size}x${size} PNG`);
    }

    // Generate favicon.ico (16x16, 32x32, 48x48)
    const icoSizes = [16, 32, 48];
    const icoBuffers = await Promise.all(
      icoSizes.map(size =>
        sharp(svgBuffer)
          .resize(size, size)
          .png()
          .toBuffer()
      )
    );

    // Combine into ICO file
    const ico = Buffer.concat([
      // ICO header
      Buffer.from([0, 0, 1, 0, icoSizes.length, 0]),
      // ICO directory
      ...icoSizes.map((size, i) => {
        const buffer = icoBuffers[i];
        return Buffer.from([
          size, size, 0, 0, 1, 0, 32, 0,
          buffer.length & 255,
          (buffer.length >> 8) & 255,
          (buffer.length >> 16) & 255,
          (buffer.length >> 24) & 255,
          22 + (16 * icoSizes.length) + (i > 0 ? icoBuffers[i - 1].length : 0),
          0, 0, 0
        ]);
      }),
      // ICO data
      ...icoBuffers
    ]);

    await fs.writeFile(path.join(publicDir, 'favicon.ico'), ico);
    console.log('Generated favicon.ico');

    console.log('All favicons generated successfully!');
  } catch (error) {
    console.error('Error generating favicons:', error);
  }
}

generateFavicons();
