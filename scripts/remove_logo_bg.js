import sharp from 'sharp';
import fs from 'fs';

async function removeBackground() {
  const inputPath = 'Developer/ACCustomLabs.png';
  const outPath = 'public/developer/ACCustomLabs.png';
  const outPath2 = 'public/ACCustomLabs.png';

  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;
  const channels = info.channels; // 4: R, G, B, A

  // Process raw pixel buffer
  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // Compute brightness
    const brightness = Math.max(r, g, b);

    if (brightness <= 18) {
      // Pure black background -> transparent
      data[i + 3] = 0;
    } else if (brightness < 60) {
      // Edge anti-aliasing transition
      const alphaFactor = (brightness - 18) / (60 - 18);
      data[i + 3] = Math.round(255 * alphaFactor);
      // Boost color intensity on anti-aliased edge to prevent black fringe
      const boost = 1 / Math.max(0.2, alphaFactor);
      data[i] = Math.min(255, Math.round(r * boost));
      data[i + 1] = Math.min(255, Math.round(g * boost));
      data[i + 2] = Math.min(255, Math.round(b * boost));
    } else {
      // Fully opaque
      data[i + 3] = 255;
    }
  }

  // Also trim excess transparent borders around the logo so it aligns tightly and neatly with text
  const transparentBuffer = await sharp(data, {
    raw: { width, height, channels: 4 }
  })
    .trim({ threshold: 5 })
    .png({ quality: 100, compressionLevel: 9 })
    .toBuffer();

  fs.writeFileSync(outPath, transparentBuffer);
  fs.writeFileSync(outPath2, transparentBuffer);
  console.log('Successfully generated transparent trimmed logo at', outPath, 'and', outPath2);
}

removeBackground().catch(console.error);
