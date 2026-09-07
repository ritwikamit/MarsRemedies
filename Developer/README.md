# AC Custom Labs - Logo Background Removal & Optical Alignment Guide

This document contains the exact prompts, image processing pipeline, and optical alignment techniques used to integrate the **AC Custom Labs** developer logo cleanly into the website footer.

---

## 1. AI Image Editing / Background Removal Prompt

If using an AI image editor (such as Midjourney, Photoshop Generative Fill, or DALL-E) to isolate or regenerate the logo with a transparent background:

```text
Professional vector-style developer studio logo for "AC Custom Labs". 
Modern sans-serif typography with white letters "AC" and "Labs", bold vibrant red letters "Custom", and a slender dynamic red arc sweeping underneath the text. 
Completely isolated on an alpha transparent background (PNG format). 
Zero black background, zero dark fringe, zero drop shadow, razor-sharp anti-aliased edges.
```

---

## 2. Programmatic Background Removal (Node.js & Sharp)

When starting from a raster logo on a solid black background (`#000000`), simply keying out black can leave harsh jagged edges or dark halos. The following script preserves edge anti-aliasing by scaling alpha based on luminance and color-boosting edge pixels:

```javascript
import sharp from 'sharp';
import fs from 'fs';

async function removeBackground(inputPath, outputPath) {
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;

  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const brightness = Math.max(r, g, b);

    if (brightness <= 18) {
      // 1. Pure black background -> 100% Transparent
      data[i + 3] = 0;
    } else if (brightness < 60) {
      // 2. Smooth anti-aliased edge transition
      const alphaFactor = (brightness - 18) / (60 - 18);
      data[i + 3] = Math.round(255 * alphaFactor);
      
      // Boost color intensity to eliminate dark/black fringe
      const boost = 1 / Math.max(0.2, alphaFactor);
      data[i] = Math.min(255, Math.round(r * boost));
      data[i + 1] = Math.min(255, Math.round(g * boost));
      data[i + 2] = Math.min(255, Math.round(b * boost));
    } else {
      // 3. Opaque logo text & artwork
      data[i + 3] = 255;
    }
  }

  // Trim extraneous transparent space around edges
  const trimmedBuffer = await sharp(data, {
    raw: { width, height, channels: 4 }
  })
    .trim({ threshold: 5 })
    .png({ quality: 100, compressionLevel: 9 })
    .toBuffer();

  fs.writeFileSync(outputPath, trimmedBuffer);
}
```

---

## 3. Optical Alignment: Solving the "Floating Text" Problem

### The Challenge
The AC Custom Labs logo features letters with a red curve underneath.
- Bounding box height: `229px`
- Letter boundaries: `y = 0px` to `y = 166px` (Center of letters: `y = 83px`)
- Underline arc boundaries: `y = 167px` to `y = 228px`

When placed beside text with CSS `items-center`, the browser centers the entire `229px` box at `y = 114.5px`. Because the bottom arc pulls the physical center down, the letters **"AC Custom Labs" appear shifted 31px upwards** relative to the adjacent text ("Designed and Developed by").

### The Mathematical Solution (Optical Canvas Balancing)
To make the letters align on the exact same centerline as the text:
1. Distance from letter center (`y = 83px`) to bottom of canvas (`229px`) is `146px`.
2. To balance the canvas, distance from letter center to top must also be `146px`.
3. Add transparent padding to top: `146px - 83px = 63px`.
4. New total canvas height: `292px`, with letter center at exact canvas midpoint (`146px`).

```javascript
// Add 63px transparent padding to top to optically center the lettering
const balancedBuffer = await sharp(trimmedBuffer)
  .extend({
    top: 63,
    bottom: 0,
    left: 0,
    right: 0,
    background: { r: 0, g: 0, b: 0, alpha: 0 }
  })
  .png()
  .toBuffer();
```

---

## 4. Production Tailwind CSS / React Implementation

Place the optically centered logo directly after the attribution text:

```tsx
<div className="inline-flex items-center gap-1.5 leading-none">
  <span className="text-slate-400">Designed and Developed by</span>
  <img
    src="/developer/ACCustomLabs.png"
    alt="AC Custom Labs"
    className="h-4 sm:h-4.5 w-auto object-contain inline-block transition-opacity hover:opacity-85"
    loading="lazy"
  />
</div>
```

### Key Styling Details
- **`inline-flex items-center`**: Centers the logo canvas with the text baseline.
- **`leading-none`**: Prevents extraneous line-height gaps from offsetting the text box.
- **`h-4 sm:h-4.5`** (16px–18px): Scales the logo lettering to ~10px–11px, matching the standard x-height of `text-xs` (12px font).
