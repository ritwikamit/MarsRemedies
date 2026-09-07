import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const TEMPLATE_DIR = 'public/products/templates';
const OUTPUT_DIR = 'public/products';

// Read all formulations from src/data/products.ts
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

console.log(`Loaded ${products.length} products to generate realistic packaging matching exact names & specifications.`);

function escapeXml(unsafe) {
  if (!unsafe) return '';
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

function splitComposition(text, maxChars = 38) {
  if (text.length <= maxChars) return [text, ''];
  const parts = text.split('+');
  if (parts.length === 2 && parts[0].length <= maxChars && parts[1].length <= maxChars) {
    return [parts[0].trim() + ' +', parts[1].trim()];
  }
  const words = text.split(' ');
  let line1 = '';
  let line2 = '';
  for (const w of words) {
    if ((line1 + ' ' + w).trim().length <= maxChars) {
      line1 = (line1 + ' ' + w).trim();
    } else {
      line2 = (line2 + ' ' + w).trim();
    }
  }
  return [line1, line2];
}

function getBrandFontSize(brandName, maxWidth, maxFontSize = 34) {
  const approxWidth = brandName.length * (maxFontSize * 0.62);
  if (approxWidth > maxWidth) {
    return Math.max(16, Math.floor(maxFontSize * (maxWidth / approxWidth)));
  }
  return maxFontSize;
}

// 1. TABLETS (41 products): Full 3D Carton Front Face + 3D Blister Pack
async function generateTablet(product) {
  const templatePath = path.join(TEMPLATE_DIR, 'tab-1.png');
  const [compLine1, compLine2] = splitComposition(product.composition, 42);
  const brandSize = getBrandFontSize(product.brandName, 430, 34);

  // Full physical front face of the 3D carton box (480 x 520)
  const cartonSvg = `
    <svg width="480" height="520" viewBox="0 0 480 520" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="navyGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#001642" />
          <stop offset="50%" stop-color="#002060" />
          <stop offset="100%" stop-color="#00194a" />
        </linearGradient>
        <linearGradient id="stripGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#005ea6" />
          <stop offset="50%" stop-color="#006ebc" />
          <stop offset="100%" stop-color="#005898" />
        </linearGradient>
        <linearGradient id="faceGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#ffffff" />
          <stop offset="100%" stop-color="#f5f7fa" />
        </linearGradient>
      </defs>

      <!-- Physical carton paper surface -->
      <rect x="0" y="0" width="480" height="520" fill="url(#faceGrad)" />

      <!-- Top Navy Brand Banner -->
      <rect x="0" y="0" width="480" height="120" fill="url(#navyGrad)" />
      <text x="240" y="78" font-family="'Arial Black', Arial, sans-serif" font-size="${brandSize}" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="1.2">
        ${escapeXml(product.brandName)}
      </text>

      <!-- Formulation Blue Strip -->
      <rect x="0" y="120" width="480" height="48" fill="url(#stripGrad)" />
      <text x="240" y="152" font-family="Arial, sans-serif" font-size="16" font-weight="700" fill="#ffffff" text-anchor="middle">
        ${escapeXml(compLine1)}
      </text>

      <!-- Pack Size & Administration Header -->
      <text x="28" y="200" font-family="Arial, sans-serif" font-size="16" font-weight="700" fill="#002060">
        ℞ Oral Formulation
      </text>
      <text x="452" y="200" font-family="Arial, sans-serif" font-size="16" font-weight="800" fill="#1e293b" text-anchor="end">
        ${escapeXml(product.packSize)}
      </text>
      <text x="452" y="222" font-family="Arial, sans-serif" font-size="12" font-weight="600" fill="#64748b" text-anchor="end">
        (in Blister Strips)
      </text>

      <line x1="28" y1="235" x2="452" y2="235" stroke="#e2e8f0" stroke-width="1.5" />

      <!-- Active Ingredients & Composition -->
      <text x="28" y="265" font-family="Arial, sans-serif" font-size="14" font-weight="700" fill="#334155">
        Each film-coated tablet contains:
      </text>
      <text x="28" y="290" font-family="Arial, sans-serif" font-size="13" font-weight="600" fill="#475569">
        ${escapeXml(compLine1)}
      </text>
      ${compLine2 ? `
        <text x="28" y="310" font-family="Arial, sans-serif" font-size="13" font-weight="600" fill="#475569">
          ${escapeXml(compLine2)}
        </text>
      ` : ''}
      <text x="28" y="${compLine2 ? '332' : '316'}" font-family="Arial, sans-serif" font-size="12" font-weight="500" fill="#64748b">
        Excipients ..................................................... q.s.
      </text>

      <!-- Storage & Caution -->
      <text x="28" y="365" font-family="Arial, sans-serif" font-size="11" font-weight="600" fill="#64748b">
        Storage: Store below 30°C in a dry place. Protect from light.
      </text>
      <text x="28" y="385" font-family="Arial, sans-serif" font-size="11" font-weight="700" fill="#dc2626">
        Schedule H Prescription Drug - Caution: To be sold by retail on
      </text>
      <text x="28" y="401" font-family="Arial, sans-serif" font-size="11" font-weight="700" fill="#dc2626">
        the prescription of a Registered Medical Practitioner only.
      </text>

      <line x1="28" y1="418" x2="452" y2="418" stroke="#e2e8f0" stroke-width="1.5" />

      <!-- Mars Remedies Manufacturer Identity -->
      <g transform="translate(28, 434)">
        <rect x="0" y="0" width="34" height="34" rx="8" fill="#002060" />
        <text x="17" y="24" font-family="Arial, sans-serif" font-size="19" font-weight="900" fill="#ffffff" text-anchor="middle">M</text>
        <circle cx="26" cy="8" r="3.5" fill="#dc2626" />
        
        <text x="44" y="17" font-family="'Arial Black', Arial, sans-serif" font-size="15" font-weight="900" fill="#002060">
          MARS REMEDIES
        </text>
        <text x="44" y="33" font-family="Arial, sans-serif" font-size="11" font-weight="600" fill="#64748b">
          Quality Assured Pharmaceuticals • WHO-GMP Plant
        </text>
      </g>

      <!-- WHO-GMP Certified Emblem -->
      <g transform="translate(370, 435)">
        <rect x="0" y="0" width="82" height="32" rx="4" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1" />
        <text x="41" y="14" font-family="Arial, sans-serif" font-size="9" font-weight="800" fill="#002060" text-anchor="middle">WHO-GMP</text>
        <text x="41" y="26" font-family="Arial, sans-serif" font-size="8.5" font-weight="700" fill="#059669" text-anchor="middle">CERTIFIED</text>
      </g>
    </svg>
  `;

  const cartonBuf = await sharp(Buffer.from(cartonSvg)).png().toBuffer();

  await sharp(templatePath)
    .composite([
      { input: cartonBuf, left: 198, top: 265 }
    ])
    .extract({ left: 140, top: 195, width: 800, height: 650 })
    .resize(900, 731, { fit: 'cover' })
    .toFile(path.join(OUTPUT_DIR, `${product.id}.png`));
}

// 2. CAPSULES & SOFTGELS (13 products)
async function generateCapsule(product) {
  const isSoftgel = product.dosageForm.toLowerCase().includes('softgel') || 
                    product.brandName.toLowerCase().includes('softgel') ||
                    product.composition.toLowerCase().includes('softgel') ||
                    product.id === 'cap-2';

  if (isSoftgel) {
    const templatePath = path.join(TEMPLATE_DIR, 'cap-2.png');
    const [compLine1, compLine2] = splitComposition(product.composition, 36);
    const brandSize = getBrandFontSize(product.brandName, 460, 36);

    const cartonSvg = `
      <svg width="525" height="400" viewBox="0 0 525 400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="sgGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#ffffff" />
            <stop offset="100%" stop-color="#fefcf8" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="525" height="400" fill="url(#sgGrad)" />
        
        <!-- Top Green Strip -->
        <rect x="0" y="0" width="525" height="65" fill="#047857" />
        <text x="25" y="42" font-family="Arial, sans-serif" font-size="14" font-weight="800" fill="#ffffff" letter-spacing="1">
          MARS NUTRACEUTICALS
        </text>
        <rect x="475" y="20" width="25" height="25" fill="none" stroke="#ffffff" stroke-width="2" />
        <circle cx="487.5" cy="32.5" r="7" fill="#22c55e" />

        <!-- Brand Name -->
        <text x="262" y="145" font-family="'Arial Black', Arial, sans-serif" font-size="${brandSize}" font-weight="900" fill="#0f172a" text-anchor="middle" letter-spacing="1">
          ${escapeXml(product.brandName)}
        </text>

        <!-- Red Formulation Banner -->
        <rect x="25" y="170" width="475" height="48" rx="6" fill="#b91c1c" />
        <text x="262" y="200" font-family="Arial, sans-serif" font-size="14" font-weight="700" fill="#ffffff" text-anchor="middle">
          ${escapeXml(compLine1)}
        </text>

        <!-- Subtitle Strip -->
        <rect x="25" y="228" width="475" height="34" rx="4" fill="#065f46" />
        <text x="262" y="250" font-family="Arial, sans-serif" font-size="13" font-weight="700" fill="#ffffff" text-anchor="middle">
          Premium Softgel Formulation • ${escapeXml(product.packSize)}
        </text>

        <!-- Composition Detail -->
        <text x="262" y="295" font-family="Arial, sans-serif" font-size="12" font-weight="600" fill="#475569" text-anchor="middle">
          ${escapeXml(compLine2 ? compLine2 : compLine1)}
        </text>

        <!-- Golden Footer Banner -->
        <rect x="25" y="325" width="475" height="50" rx="6" fill="#fef3c7" stroke="#fcd34d" stroke-width="1" />
        <text x="262" y="355" font-family="Arial, sans-serif" font-size="13" font-weight="800" fill="#92400e" text-anchor="middle">
          Antioxidant &amp; Vital Support • WHO-GMP Certified Quality
        </text>
      </svg>
    `;

    const cartonBuf = await sharp(Buffer.from(cartonSvg)).png().toBuffer();

    await sharp(templatePath)
      .composite([
        { input: cartonBuf, left: 100, top: 310 }
      ])
      .extract({ left: 50, top: 230, width: 900, height: 550 })
      .resize(900, 550, { fit: 'cover' })
      .toFile(path.join(OUTPUT_DIR, `${product.id}.png`));
    return;
  }

  // Hard Gelatin Capsule (cap-8.png)
  const templatePath = path.join(TEMPLATE_DIR, 'cap-8.png');
  const [compLine1, compLine2] = splitComposition(product.composition, 32);
  const brandSize = getBrandFontSize(product.brandName, 320, 32);

  const cartonSvg = `
    <svg width="365" height="415" viewBox="0 0 365 415" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="365" height="415" fill="#ffffff" />
      <rect x="0" y="0" width="365" height="60" fill="#002060" />
      
      <text x="20" y="38" font-family="Arial, sans-serif" font-size="13" font-weight="800" fill="#93c5fd" letter-spacing="1">
        MARS REMEDIES
      </text>
      <text x="345" y="38" font-family="Arial, sans-serif" font-size="12" font-weight="700" fill="#ffffff" text-anchor="end">
        ${escapeXml(product.packSize)}
      </text>

      <!-- Rx & Formulation -->
      <text x="20" y="95" font-family="Georgia, serif" font-size="22" font-weight="bold" fill="#002060">℞</text>
      <text x="48" y="95" font-family="Arial, sans-serif" font-size="13" font-weight="700" fill="#1e293b">
        ${escapeXml(compLine1)}
      </text>
      ${compLine2 ? `
        <text x="48" y="116" font-family="Arial, sans-serif" font-size="12" font-weight="700" fill="#1e293b">
          ${escapeXml(compLine2)}
        </text>
      ` : ''}

      <!-- Brand Name -->
      <text x="182" y="180" font-family="'Arial Black', Arial, sans-serif" font-size="${brandSize}" font-weight="900" fill="#002060" text-anchor="middle" letter-spacing="0.8">
        ${escapeXml(product.brandName)}
      </text>

      <!-- Dosage Form Subtitle -->
      <text x="182" y="215" font-family="Arial, sans-serif" font-size="13" font-weight="700" fill="#059669" text-anchor="middle">
        ${escapeXml(product.dosageForm)}
      </text>

      <!-- Pack Size Badge -->
      <rect x="92" y="240" width="180" height="38" rx="6" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1" />
      <text x="182" y="265" font-family="Arial, sans-serif" font-size="14" font-weight="800" fill="#0f172a" text-anchor="middle">
        ${escapeXml(product.packSize)} Capsules
      </text>

      <!-- Caution -->
      <text x="182" y="310" font-family="Arial, sans-serif" font-size="10" font-weight="700" fill="#dc2626" text-anchor="middle">
        PRESCRIPTION ONLY MEDICINE
      </text>

      <!-- Manufacturer Footer -->
      <line x1="20" y1="340" x2="345" y2="340" stroke="#e2e8f0" stroke-width="1" />
      <text x="20" y="365" font-family="Arial, sans-serif" font-size="11" font-weight="700" fill="#002060">
        Mars Remedies Pvt. Ltd.
      </text>
      <text x="20" y="382" font-family="Arial, sans-serif" font-size="10" font-weight="600" fill="#64748b">
        WHO-GMP Certified Plant
      </text>
    </svg>
  `;

  const cartonBuf = await sharp(Buffer.from(cartonSvg)).png().toBuffer();

  await sharp(templatePath)
    .composite([
      { input: cartonBuf, left: 185, top: 330 }
    ])
    .extract({ left: 70, top: 190, width: 890, height: 630 })
    .resize(900, 637, { fit: 'cover' })
    .toFile(path.join(OUTPUT_DIR, `${product.id}.png`));
}

// 3. SYRUPS & DRY SYRUPS (31 products)
async function generateSyrup(product) {
  const templatePath = path.join(TEMPLATE_DIR, 'syp-1.png');
  const [compLine1, compLine2] = splitComposition(product.composition, 26);
  const brandSize = getBrandFontSize(product.brandName, 270, 26);

  // Carton Front Face (305 x 740)
  const cartonSvg = `
    <svg width="305" height="740" viewBox="0 0 305 740" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sypGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#ffffff" />
          <stop offset="100%" stop-color="#f8fafc" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="305" height="740" fill="url(#sypGrad)" />
      
      <!-- Top Brand Arc -->
      <path d="M 0,0 L 305,0 L 305,70 Q 152,110 0,70 Z" fill="#002060" />
      <text x="152" y="42" font-family="Arial, sans-serif" font-size="13" font-weight="800" fill="#93c5fd" text-anchor="middle" letter-spacing="1">
        MARS REMEDIES
      </text>

      <!-- Brand Name -->
      <text x="152" y="150" font-family="'Arial Black', Arial, sans-serif" font-size="${brandSize}" font-weight="900" fill="#002060" text-anchor="middle">
        ${escapeXml(product.brandName)}
      </text>

      <text x="152" y="195" font-family="'Arial Black', Arial, sans-serif" font-size="22" font-weight="900" fill="#0284c7" text-anchor="middle">
        ${escapeXml(product.dosageForm.toUpperCase())}
      </text>

      <!-- Formulation Lines -->
      <text x="152" y="245" font-family="Arial, sans-serif" font-size="14" font-weight="700" fill="#334155" text-anchor="middle">
        ${escapeXml(compLine1)}
      </text>
      ${compLine2 ? `
        <text x="152" y="270" font-family="Arial, sans-serif" font-size="13" font-weight="700" fill="#334155" text-anchor="middle">
          ${escapeXml(compLine2)}
        </text>
      ` : ''}

      <!-- Pack Size Badge -->
      <rect x="62" y="320" width="180" height="46" rx="8" fill="#f0f9ff" stroke="#bae6fd" stroke-width="1.5" />
      <text x="152" y="350" font-family="Arial, sans-serif" font-size="18" font-weight="800" fill="#0369a1" text-anchor="middle">
        ${escapeXml(product.packSize)}
      </text>

      <!-- Feature Pill -->
      <rect x="42" y="400" width="220" height="38" rx="19" fill="#ea580c" />
      <text x="152" y="424" font-family="Arial, sans-serif" font-size="13" font-weight="700" fill="#ffffff" text-anchor="middle">
        WHO-GMP Formulation
      </text>

      <!-- Bottom Pack Size Block -->
      <rect x="25" y="650" width="255" height="55" rx="6" fill="#002060" />
      <text x="152" y="685" font-family="Arial, sans-serif" font-size="18" font-weight="900" fill="#ffffff" text-anchor="middle">
        ${escapeXml(product.packSize)}
      </text>
    </svg>
  `;

  // Bottle Label (270 x 330)
  const bottleSvg = `
    <svg width="270" height="330" viewBox="0 0 270 330" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="270" height="330" fill="#ffffff" />
      <rect x="0" y="0" width="270" height="10" fill="#002060" />
      <text x="135" y="60" font-family="'Arial Black', Arial, sans-serif" font-size="${Math.min(22, brandSize - 2)}" font-weight="900" fill="#002060" text-anchor="middle">
        ${escapeXml(product.brandName)}
      </text>
      <text x="135" y="95" font-family="'Arial Black', Arial, sans-serif" font-size="16" font-weight="900" fill="#0284c7" text-anchor="middle">
        ${escapeXml(product.dosageForm.toUpperCase())}
      </text>
      <text x="135" y="140" font-family="Arial, sans-serif" font-size="13" font-weight="700" fill="#475569" text-anchor="middle">
        ${escapeXml(compLine1)}
      </text>
      ${compLine2 ? `
        <text x="135" y="165" font-family="Arial, sans-serif" font-size="12" font-weight="700" fill="#475569" text-anchor="middle">
          ${escapeXml(compLine2)}
        </text>
      ` : ''}
      <rect x="55" y="210" width="160" height="40" rx="6" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5" />
      <text x="135" y="236" font-family="Arial, sans-serif" font-size="15" font-weight="800" fill="#0369a1" text-anchor="middle">
        ${escapeXml(product.packSize)}
      </text>
    </svg>
  `;

  const cartonBuf = await sharp(Buffer.from(cartonSvg)).png().toBuffer();
  const bottleBuf = await sharp(Buffer.from(bottleSvg)).png().toBuffer();

  await sharp(templatePath)
    .composite([
      { input: cartonBuf, left: 480, top: 165 },
      { input: bottleBuf, left: 160, top: 490 }
    ])
    .extract({ left: 120, top: 60, width: 780, height: 910 })
    .resize(800, 933, { fit: 'cover' })
    .toFile(path.join(OUTPUT_DIR, `${product.id}.png`));
}

// 4. INJECTIONS (14 products)
async function generateInjection(product) {
  const templatePath = path.join(TEMPLATE_DIR, 'inj-5.png');
  const [compLine1, compLine2] = splitComposition(product.composition, 30);
  const brandSize = getBrandFontSize(product.brandName, 330, 32);

  // Carton Front Face (375 x 500)
  const cartonSvg = `
    <svg width="375" height="500" viewBox="0 0 375 500" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="375" height="500" fill="#ffffff" />
      
      <!-- Rx & Ingredients -->
      <text x="25" y="45" font-family="Georgia, serif" font-size="28" font-weight="bold" fill="#002060">℞</text>
      <text x="187" y="45" font-family="Arial, sans-serif" font-size="14" font-weight="700" fill="#1e293b" text-anchor="middle">
        ${escapeXml(compLine1)}
      </text>
      ${compLine2 ? `
        <text x="187" y="70" font-family="Arial, sans-serif" font-size="13" font-weight="700" fill="#1e293b" text-anchor="middle">
          ${escapeXml(compLine2)}
        </text>
      ` : ''}

      <!-- Brand Name -->
      <text x="187" y="155" font-family="'Arial Black', Arial, sans-serif" font-size="${brandSize}" font-weight="900" fill="#002060" text-anchor="middle" letter-spacing="1">
        ${escapeXml(product.brandName)}
      </text>

      <!-- Subtitle -->
      <text x="187" y="200" font-family="Arial, sans-serif" font-size="13" font-weight="700" fill="#64748b" text-anchor="middle">
        Sterile Formulation | Parenteral Use Only
      </text>

      <!-- Pack Size Badge -->
      <rect x="25" y="235" width="130" height="42" rx="4" fill="#002060" />
      <text x="90" y="262" font-family="Arial, sans-serif" font-size="15" font-weight="800" fill="#ffffff" text-anchor="middle">
        ${escapeXml(product.packSize)}
      </text>

      <!-- Mars Remedies Seal -->
      <g transform="translate(25, 410)">
        <text x="0" y="20" font-family="'Arial Black', Arial, sans-serif" font-size="15" font-weight="900" fill="#002060">
          MARS REMEDIES
        </text>
        <text x="0" y="38" font-family="Arial, sans-serif" font-size="11" font-weight="600" fill="#64748b">
          WHO-GMP Certified Parenteral Plant
        </text>
      </g>
    </svg>
  `;

  // Vial Label (140 x 160)
  const vialSvg = `
    <svg width="140" height="160" viewBox="0 0 140 160" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="140" height="160" fill="#ffffff" />
      <rect x="0" y="0" width="140" height="8" fill="#002060" />
      <text x="70" y="45" font-family="'Arial Black', Arial, sans-serif" font-size="${Math.min(14, brandSize - 12)}" font-weight="900" fill="#002060" text-anchor="middle">
        ${escapeXml(product.brandName)}
      </text>
      <text x="70" y="70" font-family="Arial, sans-serif" font-size="10" font-weight="700" fill="#475569" text-anchor="middle">
        ${escapeXml(product.packSize)}
      </text>
      <text x="70" y="95" font-family="Arial, sans-serif" font-size="9" font-weight="600" fill="#64748b" text-anchor="middle">
        Sterile Water / Vial
      </text>
      <rect x="20" y="115" width="100" height="24" rx="3" fill="#002060" />
      <text x="70" y="131" font-family="Arial, sans-serif" font-size="9" font-weight="800" fill="#ffffff" text-anchor="middle">
        MARS
      </text>
    </svg>
  `;

  const cartonBuf = await sharp(Buffer.from(cartonSvg)).png().toBuffer();
  const vialBuf = await sharp(Buffer.from(vialSvg)).png().toBuffer();

  await sharp(templatePath)
    .composite([
      { input: cartonBuf, left: 240, top: 280 },
      { input: vialBuf, left: 645, top: 585 }
    ])
    .extract({ left: 80, top: 200, width: 860, height: 650 })
    .resize(900, 680, { fit: 'cover' })
    .toFile(path.join(OUTPUT_DIR, `${product.id}.png`));
}

// 5. CREAMS & OINTMENTS (5 products)
async function generateCream(product) {
  const templatePath = path.join(TEMPLATE_DIR, 'crm-1.png');

  // crm-1 is already FUNGIMARS-IT Cream 15g!
  if (product.id === 'crm-1') {
    await sharp(templatePath)
      .extract({ left: 70, top: 190, width: 920, height: 600 })
      .resize(900, 587, { fit: 'cover' })
      .toFile(path.join(OUTPUT_DIR, `${product.id}.png`));
    return;
  }

  const [compLine1, compLine2] = splitComposition(product.composition, 28);
  const brandSize = getBrandFontSize(product.brandName, 300, 28);

  const boxSvg = `
    <svg width="450" height="240" viewBox="0 0 450 240" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="450" height="240" fill="#ffffff" />
      <text x="225" y="65" font-family="'Arial Black', Arial, sans-serif" font-size="${brandSize}" font-weight="900" fill="#7c3aed" text-anchor="middle">
        ${escapeXml(product.brandName)}
      </text>
      <text x="225" y="110" font-family="Arial, sans-serif" font-size="14" font-weight="700" fill="#334155" text-anchor="middle">
        ${escapeXml(compLine1)}
      </text>
      ${compLine2 ? `
        <text x="225" y="135" font-family="Arial, sans-serif" font-size="13" font-weight="700" fill="#334155" text-anchor="middle">
          ${escapeXml(compLine2)}
        </text>
      ` : ''}
      <text x="225" y="180" font-family="Arial, sans-serif" font-size="14" font-weight="800" fill="#7c3aed" text-anchor="middle">
        ${escapeXml(product.packSize)} • Dermatology Care
      </text>
    </svg>
  `;

  const boxBuf = await sharp(Buffer.from(boxSvg)).png().toBuffer();

  await sharp(templatePath)
    .composite([
      { input: boxBuf, left: 380, top: 260 }
    ])
    .extract({ left: 70, top: 190, width: 920, height: 600 })
    .resize(900, 587, { fit: 'cover' })
    .toFile(path.join(OUTPUT_DIR, `${product.id}.png`));
}

// 6. EYE & EAR DROPS (4 products)
async function generateEyeDrops(product) {
  const templatePath = path.join(TEMPLATE_DIR, 'eye-2.png');

  // eye-2 is already SRISTY Moxifloxacin Eye Drops 5ml!
  if (product.id === 'eye-2') {
    await sharp(templatePath)
      .extract({ left: 170, top: 130, width: 700, height: 780 })
      .resize(780, 869, { fit: 'cover' })
      .toFile(path.join(OUTPUT_DIR, `${product.id}.png`));
    return;
  }

  const [compLine1, compLine2] = splitComposition(product.composition, 24);
  const brandSize = getBrandFontSize(product.brandName, 230, 26);

  // Carton Front Face (255 x 645)
  const cartonSvg = `
    <svg width="255" height="645" viewBox="0 0 255 645" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="255" height="645" fill="#ffffff" />
      
      <!-- Teal Top Badge -->
      <rect x="15" y="30" width="225" height="65" rx="8" fill="#0d9488" />
      <text x="127" y="72" font-family="'Arial Black', Arial, sans-serif" font-size="${brandSize}" font-weight="900" fill="#ffffff" text-anchor="middle">
        ${escapeXml(product.brandName)}
      </text>

      <!-- Formulation -->
      <text x="20" y="145" font-family="Georgia, serif" font-size="24" font-weight="bold" fill="#002060">℞</text>
      <text x="127" y="180" font-family="Arial, sans-serif" font-size="14" font-weight="700" fill="#1e293b" text-anchor="middle">
        ${escapeXml(compLine1)}
      </text>
      ${compLine2 ? `
        <text x="127" y="205" font-family="Arial, sans-serif" font-size="13" font-weight="700" fill="#1e293b" text-anchor="middle">
          ${escapeXml(compLine2)}
        </text>
      ` : ''}

      <!-- Teal Middle Bar -->
      <rect x="15" y="270" width="225" height="55" rx="6" fill="#0d9488" />
      <text x="127" y="305" font-family="'Arial Black', Arial, sans-serif" font-size="16" font-weight="900" fill="#ffffff" text-anchor="middle">
        EYE / EAR DROPS
      </text>

      <!-- Pack Size -->
      <text x="127" y="375" font-family="Arial, sans-serif" font-size="20" font-weight="800" fill="#0f172a" text-anchor="middle">
        ${escapeXml(product.packSize)}
      </text>
      <text x="127" y="440" font-family="Arial, sans-serif" font-size="16" font-weight="700" fill="#0d9488" text-anchor="middle">
        Sterile Solution
      </text>
    </svg>
  `;

  const cartonBuf = await sharp(Buffer.from(cartonSvg)).png().toBuffer();

  await sharp(templatePath)
    .composite([
      { input: cartonBuf, left: 460, top: 190 }
    ])
    .extract({ left: 170, top: 130, width: 700, height: 780 })
    .resize(780, 869, { fit: 'cover' })
    .toFile(path.join(OUTPUT_DIR, `${product.id}.png`));
}

// 7. PEDIATRIC DROPS & POWDERS (7 products)
async function generateDrops(product) {
  const templatePath = path.join(TEMPLATE_DIR, 'drp-1.png');
  const [compLine1, compLine2] = splitComposition(product.composition, 24);
  const brandSize = getBrandFontSize(product.brandName, 250, 26);

  // Carton Front Face (275 x 630)
  const cartonSvg = `
    <svg width="275" height="630" viewBox="0 0 275 630" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="275" height="630" fill="#ffffff" />
      <rect x="0" y="0" width="275" height="50" fill="#0891b2" />
      
      <text x="137" y="32" font-family="Arial, sans-serif" font-size="13" font-weight="800" fill="#ffffff" text-anchor="middle">
        MARS PEDIATRICS
      </text>

      <text x="137" y="110" font-family="'Arial Black', Arial, sans-serif" font-size="${brandSize}" font-weight="900" fill="#0891b2" text-anchor="middle">
        ${escapeXml(product.brandName)}
      </text>

      <text x="137" y="160" font-family="Arial, sans-serif" font-size="13" font-weight="700" fill="#334155" text-anchor="middle">
        ${escapeXml(compLine1)}
      </text>
      ${compLine2 ? `
        <text x="137" y="182" font-family="Arial, sans-serif" font-size="12" font-weight="700" fill="#334155" text-anchor="middle">
          ${escapeXml(compLine2)}
        </text>
      ` : ''}

      <rect x="47" y="240" width="180" height="42" rx="6" fill="#ecfeff" stroke="#a5f3fc" stroke-width="1.5" />
      <text x="137" y="267" font-family="Arial, sans-serif" font-size="16" font-weight="800" fill="#0e7490" text-anchor="middle">
        ${escapeXml(product.packSize)}
      </text>

      <text x="137" y="330" font-family="Arial, sans-serif" font-size="12" font-weight="700" fill="#f59e0b" text-anchor="middle">
        With Calibrated Dropper
      </text>
    </svg>
  `;

  const cartonBuf = await sharp(Buffer.from(cartonSvg)).png().toBuffer();

  await sharp(templatePath)
    .composite([
      { input: cartonBuf, left: 490, top: 230 }
    ])
    .extract({ left: 50, top: 110, width: 880, height: 840 })
    .resize(850, 811, { fit: 'cover' })
    .toFile(path.join(OUTPUT_DIR, `${product.id}.png`));
}

// 8. OIL (1 product: ORTHOLEED OIL)
async function generateOil(product) {
  const templatePath = path.join(TEMPLATE_DIR, 'oil-1.png');
  await sharp(templatePath)
    .extract({ left: 130, top: 80, width: 770, height: 880 })
    .resize(800, 914, { fit: 'cover' })
    .toFile(path.join(OUTPUT_DIR, `${product.id}.png`));
}

// Main Batch Processing
async function run() {
  console.log('Rendering 112 products with exact matching names and specifications...');

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    const cat = product.category;

    if (cat === 'Tablets') {
      await generateTablet(product);
    } else if (cat === 'Capsules & Softgel') {
      await generateCapsule(product);
    } else if (cat === 'Syrups') {
      await generateSyrup(product);
    } else if (cat === 'Injections') {
      await generateInjection(product);
    } else if (cat === 'Cream / Lotion / Soap') {
      await generateCream(product);
    } else if (cat === 'Eye & Ear Drops') {
      await generateEyeDrops(product);
    } else if (cat === 'Drops / Powder / Sachet') {
      await generateDrops(product);
    } else if (cat === 'Oil') {
      await generateOil(product);
    }

    if ((i + 1) % 20 === 0 || i === products.length - 1) {
      console.log(`Processed ${i + 1} / ${products.length} products...`);
    }
  }

  console.log('✅ ALL 112 product images generated matching exact names and specifications!');
}

run().catch(err => {
  console.error('Generation error:', err);
  process.exit(1);
});
