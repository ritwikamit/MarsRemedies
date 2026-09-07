import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const TEMPLATE_DIR = 'public/products/templates';
const OUTPUT_DIR = 'public/products';

// Read formulations from src/data/products.ts
const productsFile = fs.readFileSync('src/data/products.ts', 'utf8');
const regex = /id:\s*'([^']+)',\s*brandName:\s*'([^']+)',\s*composition:\s*'([^']+)',\s*category:\s*'([^']+)',\s*dosageForm:\s*'([^']+)',\s*packSize:\s*'([^']+)'/g;

const products = [];
let match;
while ((match = regex.exec(productsFile)) !== null) {
  products.push({
    id: match[1],
    brandName: match[2].trim(),
    composition: match[3].trim(),
    category: match[4].trim(),
    dosageForm: match[5].trim(),
    packSize: match[6].trim(),
  });
}

console.log(`Loaded ${products.length} products to render with 100% photorealistic 3D packaging (ZERO 2D boxes/text overlays).`);

// Clean crop specifications for each realistic 3D template
// Each crop retains full packaging, caps, blisters, bottles, and floor drop shadows with balanced padding
const TEMPLATE_SPECS = {
  // Tablets
  'tab-1.png': { crop: { left: 140, top: 195, width: 800, height: 650 }, outW: 900, outH: 731 },
  'tab-2.png': { crop: { left: 0, top: 180, width: 930, height: 670 }, outW: 900, outH: 648 },
  'tab-25.png': { crop: { left: 90, top: 145, width: 830, height: 760 }, outW: 900, outH: 824 },
  'tab-32.png': { crop: { left: 60, top: 145, width: 910, height: 780 }, outW: 900, outH: 771 },
  
  // Capsules
  'cap-2.png': { crop: { left: 50, top: 230, width: 900, height: 550 }, outW: 900, outH: 550 },
  'cap-8.png': { crop: { left: 70, top: 190, width: 890, height: 630 }, outW: 900, outH: 637 },
  
  // Syrups
  'syp-1.png': { crop: { left: 120, top: 60, width: 780, height: 910 }, outW: 800, outH: 933 },
  'syp-11.png': { crop: { left: 140, top: 80, width: 770, height: 880 }, outW: 800, outH: 914 },
  
  // Injections
  'inj-5.png': { crop: { left: 80, top: 200, width: 860, height: 650 }, outW: 900, outH: 680 },
  
  // Creams
  'crm-1.png': { crop: { left: 70, top: 190, width: 920, height: 600 }, outW: 900, outH: 587 },
  
  // Eye / Ear Drops
  'eye-2.png': { crop: { left: 170, top: 130, width: 700, height: 780 }, outW: 780, outH: 869 },
  
  // Pediatric Drops & Powders
  'drp-1.png': { crop: { left: 50, top: 110, width: 880, height: 840 }, outW: 850, outH: 811 },
  
  // Oils
  'oil-1.png': { crop: { left: 130, top: 80, width: 770, height: 880 }, outW: 800, outH: 914 },
};

// Pre-render cropped buffers for maximum performance and quality
const cachedBuffers = {};
for (const [templateName, spec] of Object.entries(TEMPLATE_SPECS)) {
  const templatePath = path.join(TEMPLATE_DIR, templateName);
  const buf = await sharp(templatePath)
    .extract(spec.crop)
    .resize(spec.outW, spec.outH, { fit: 'cover' })
    .png({ quality: 95, compressionLevel: 8 })
    .toBuffer();
  cachedBuffers[templateName] = buf;
  console.log(`Pre-rendered clean template: ${templateName}`);
}

async function renderProduct(product, index) {
  let selectedTemplate = 'tab-1.png';

  const category = product.category;
  const comp = (product.composition || '').toLowerCase();
  const dosage = (product.dosageForm || '').toLowerCase();
  const brand = (product.brandName || '').toLowerCase();

  if (category === 'Tablets') {
    // Intelligently select among the 4 photorealistic tablet pack photos
    if (comp.includes('panto') || comp.includes('rabe') || comp.includes('ome') || comp.includes('gastro') || comp.includes('enteric')) {
      selectedTemplate = 'tab-32.png'; // PANTOMARS-40 style enteric blister & carton
    } else if (comp.includes('montel') || comp.includes('cetir') || comp.includes('levo') || comp.includes('fexo') || comp.includes('cough') || comp.includes('cold')) {
      selectedTemplate = 'tab-25.png'; // MKAST-L style respiratory & allergy blister & carton
    } else if (comp.includes('aceclo') || comp.includes('para') || comp.includes('serra') || comp.includes('diclo') || comp.includes('spas')) {
      selectedTemplate = 'tab-2.png'; // ACELEED-PS style anti-inflammatory blister & carton
    } else {
      // Rotate for visual variety among authentic tablet packaging
      const tabletTemplates = ['tab-1.png', 'tab-2.png', 'tab-25.png', 'tab-32.png'];
      selectedTemplate = tabletTemplates[index % tabletTemplates.length];
    }
  } else if (category === 'Capsules & Softgel') {
    if (dosage.includes('softgel') || brand.includes('softgel') || comp.includes('lycopene') || comp.includes('calcitriol') || product.id === 'cap-2') {
      selectedTemplate = 'cap-2.png'; // Golden/red softgels with dietary carton
    } else {
      selectedTemplate = 'cap-8.png'; // Dual-color capsule blister pack with pharma carton
    }
  } else if (category === 'Syrups') {
    if (dosage.includes('dry') || comp.includes('dry') || product.packSize.toLowerCase().includes('dry') || product.id === 'syp-11') {
      selectedTemplate = 'syp-11.png'; // Dry syrup bottle with reconstitution mark & carton
    } else {
      selectedTemplate = 'syp-1.png'; // Amber cough & liquid syrup bottle with measuring cup & carton
    }
  } else if (category === 'Injections') {
    selectedTemplate = 'inj-5.png'; // Sterile vial with flip-off seal + glass ampoule + carton
  } else if (category === 'Cream / Lotion / Soap') {
    selectedTemplate = 'crm-1.png'; // Aluminum ointment tube with screw cap + carton
  } else if (category === 'Eye & Ear Drops') {
    selectedTemplate = 'eye-2.png'; // Calibrated ophthalmic dropper bottle + carton
  } else if (category === 'Drops / Powder / Sachet') {
    selectedTemplate = 'drp-1.png'; // Pediatric calibrated dropper bottle + carton
  } else if (category === 'Oil') {
    selectedTemplate = 'oil-1.png'; // Amber herbal massage oil bottle + carton
  }

  const outPath = path.join(OUTPUT_DIR, `${product.id}.png`);
  fs.writeFileSync(outPath, cachedBuffers[selectedTemplate]);
}

console.log('Writing clean photorealistic images (zero 2D boxes) to public/products/...');

for (let i = 0; i < products.length; i++) {
  const p = products[i];
  await renderProduct(p, i);
}

console.log(`Successfully generated all ${products.length} product images with pure 3D realism and zero 2D text boxes!`);
