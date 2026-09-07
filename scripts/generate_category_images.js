import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const TEMPLATE_DIR = 'public/products/templates';
const CATEGORY_OUT_DIR = 'public/categories';

if (!fs.existsSync(CATEGORY_OUT_DIR)) {
  fs.mkdirSync(CATEGORY_OUT_DIR, { recursive: true });
}

const CATEGORY_SPECS = [
  {
    category: 'Tablets',
    fileName: 'tablets.png',
    template: 'tab-1.png',
    crop: { left: 140, top: 195, width: 800, height: 650 },
    outW: 900,
    outH: 731
  },
  {
    category: 'Capsules & Softgel',
    fileName: 'capsules.png',
    template: 'cap-8.png',
    crop: { left: 70, top: 190, width: 890, height: 630 },
    outW: 900,
    outH: 637
  },
  {
    category: 'Syrups',
    fileName: 'syrups.png',
    template: 'syp-1.png',
    crop: { left: 120, top: 60, width: 780, height: 910 },
    outW: 800,
    outH: 933
  },
  {
    category: 'Injections',
    fileName: 'injections.png',
    template: 'inj-5.png',
    crop: { left: 80, top: 200, width: 860, height: 650 },
    outW: 900,
    outH: 680
  },
  {
    category: 'Drops / Powder / Sachet',
    fileName: 'drops.png',
    template: 'drp-1.png',
    crop: { left: 50, top: 110, width: 880, height: 840 },
    outW: 850,
    outH: 811
  },
  {
    category: 'Cream / Lotion / Soap',
    fileName: 'creams.png',
    template: 'crm-1.png',
    crop: { left: 70, top: 190, width: 920, height: 600 },
    outW: 900,
    outH: 587
  },
  {
    category: 'Eye & Ear Drops',
    fileName: 'eye-drops.png',
    template: 'eye-2.png',
    crop: { left: 170, top: 130, width: 700, height: 780 },
    outW: 780,
    outH: 869
  },
  {
    category: 'Oil',
    fileName: 'oil.png',
    template: 'oil-1.png',
    crop: { left: 130, top: 80, width: 770, height: 880 },
    outW: 800,
    outH: 914
  }
];

async function run() {
  console.log('Generating 8 realistic category images one by one...');

  for (const item of CATEGORY_SPECS) {
    const srcPath = path.join(TEMPLATE_DIR, item.template);
    const destPath = path.join(CATEGORY_OUT_DIR, item.fileName);

    await sharp(srcPath)
      .extract(item.crop)
      .resize(item.outW, item.outH, { fit: 'cover' })
      .png({ quality: 95, compressionLevel: 8 })
      .toFile(destPath);

    console.log(`✅ Generated ${item.category} -> ${item.fileName}`);
  }

  console.log('All 8 realistic category images generated successfully in public/categories/!');
}

run().catch(err => {
  console.error('Error generating category images:', err);
  process.exit(1);
});
