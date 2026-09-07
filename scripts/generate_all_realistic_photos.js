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

console.log(`Loaded ${products.length} products to render with aesthetic framing.`);

function escapeXml(unsafe) {
  if (!unsafe) return '';
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
}

function splitComposition(text, maxChars = 34) {
  if (text.length <= maxChars) return [text, ''];
  const parts = text.split('+');
  if (parts.length === 2) {
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

function getBrandFontSize(brandName, maxWidth, maxFontSize = 38) {
  const approxWidth = brandName.length * (maxFontSize * 0.65);
  if (approxWidth > maxWidth) {
    return Math.max(18, Math.floor(maxFontSize * (maxWidth / approxWidth)));
  }
  return maxFontSize;
}

// 1. TABLET (Blister Pack + Carton)
async function generateTablet(product) {
  const templatePath = path.join(TEMPLATE_DIR, 'tab-1.png');
  const [compLine1, compLine2] = splitComposition(product.composition, 40);
  const brandSize = getBrandFontSize(product.brandName, 520, 42);

  const bannerSvg = `
    <svg width="585" height="215" viewBox="0 0 585 215" xmlns="http://www.w3.org/2000/svg">
      <!-- Dark Navy Top Banner -->
      <rect x="0" y="0" width="585" height="135" fill="#002060" />
      <text x="292" y="86" font-family="'Arial Black', Arial, sans-serif" font-size="${brandSize}" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="1.5">
        ${escapeXml(product.brandName)}
      </text>

      <!-- Medium Blue Formulation Strip -->
      <rect x="0" y="135" width="585" height="80" fill="#0062b1" />
      ${compLine2 ? `
        <text x="292" y="165" font-family="Arial, sans-serif" font-size="16" font-weight="700" fill="#ffffff" text-anchor="middle">
          ${escapeXml(compLine1)}
        </text>
        <text x="292" y="192" font-family="Arial, sans-serif" font-size="15" font-weight="700" fill="#ffffff" text-anchor="middle">
          ${escapeXml(compLine2)}
        </text>
      ` : `
        <text x="292" y="178" font-family="Arial, sans-serif" font-size="18" font-weight="700" fill="#ffffff" text-anchor="middle">
          ${escapeXml(compLine1)}
        </text>
      `}
    </svg>
  `;

  const packSvg = `
    <svg width="320" height="105" viewBox="0 0 320 105" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="320" height="105" fill="#fcfcfc" />
      <text x="160" y="42" font-family="Arial, sans-serif" font-size="24" font-weight="800" fill="#0f172a" text-anchor="middle">
        ${escapeXml(product.packSize)}
      </text>
      <text x="160" y="74" font-family="Arial, sans-serif" font-size="16" font-weight="600" fill="#64748b" text-anchor="middle">
        (in Blister Strips)
      </text>
    </svg>
  `;

  const bannerBuf = await sharp(Buffer.from(bannerSvg)).png().toBuffer();
  const packBuf = await sharp(Buffer.from(packSvg)).png().toBuffer();

  // Balanced aesthetic crop giving 30px breathing room around packaging
  const cropped = await sharp(templatePath)
    .extract({ left: 155, top: 215, width: 800, height: 630 })
    .toBuffer();

  await sharp(cropped)
    .composite([
      { input: bannerBuf, left: 35, top: 48 },
      { input: packBuf, left: 280, top: 255 }
    ])
    .resize(900, 708, { fit: 'cover' })
    .toFile(path.join(OUTPUT_DIR, `${product.id}.png`));
}

// 2. CAPSULE & SOFTGEL
async function generateCapsule(product) {
  const isSoftgel = product.dosageForm.toLowerCase().includes('softgel');
  const templatePath = path.join(TEMPLATE_DIR, isSoftgel ? 'cap-2.png' : 'cap-8.png');

  if (isSoftgel) {
    await sharp(templatePath)
      .extract({ left: 100, top: 140, width: 820, height: 710 })
      .resize(900, 780, { fit: 'cover' })
      .toFile(path.join(OUTPUT_DIR, `${product.id}.png`));
    return;
  }

  const [compLine1, compLine2] = splitComposition(product.composition, 34);
  const brandSize = getBrandFontSize(product.brandName, 440, 38);

  const labelSvg = `
    <svg width="480" height="340" viewBox="0 0 480 340" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="480" height="340" fill="#ffffff" />
      <rect x="0" y="0" width="480" height="7" fill="#002060" />

      <!-- Active Composition -->
      <text x="240" y="52" font-family="Arial, sans-serif" font-size="18" font-weight="700" fill="#1e293b" text-anchor="middle">
        ${escapeXml(compLine1)}
      </text>
      ${compLine2 ? `
        <text x="240" y="80" font-family="Arial, sans-serif" font-size="16" font-weight="700" fill="#1e293b" text-anchor="middle">
          ${escapeXml(compLine2)}
        </text>
      ` : ''}

      <!-- Brand Name -->
      <text x="240" y="164" font-family="'Arial Black', Arial, sans-serif" font-size="${brandSize}" font-weight="900" fill="#002060" text-anchor="middle" letter-spacing="1">
        ${escapeXml(product.brandName)}
      </text>

      <!-- Dosage Form & Standard -->
      <text x="240" y="214" font-family="Arial, sans-serif" font-size="15" font-weight="700" fill="#059669" text-anchor="middle">
        ${escapeXml(product.dosageForm)} • Bioequivalence Standard
      </text>

      <!-- Pack Size Badge -->
      <rect x="160" y="244" width="160" height="42" rx="6" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1.5" />
      <text x="240" y="272" font-family="Arial, sans-serif" font-size="17" font-weight="800" fill="#0f172a" text-anchor="middle">
        ${escapeXml(product.packSize)}
      </text>

      <text x="240" y="314" font-family="Arial, sans-serif" font-size="12" font-weight="600" fill="#94a3b8" text-anchor="middle" letter-spacing="1">
        PRESCRIPTION ONLY MEDICINE
      </text>
    </svg>
  `;

  const labelBuf = await sharp(Buffer.from(labelSvg)).png().toBuffer();

  const cropped = await sharp(templatePath)
    .extract({ left: 75, top: 235, width: 885, height: 560 })
    .toBuffer();

  await sharp(cropped)
    .composite([
      { input: labelBuf, left: 85, top: 90 }
    ])
    .resize(900, 570, { fit: 'cover' })
    .toFile(path.join(OUTPUT_DIR, `${product.id}.png`));
}

// 3. SYRUP
async function generateSyrup(product) {
  const templatePath = path.join(TEMPLATE_DIR, 'syp-1.png');
  const [compLine1, compLine2] = splitComposition(product.composition, 30);
  const brandSize = getBrandFontSize(product.brandName, 360, 36);

  const cartonSvg = `
    <svg width="410" height="480" viewBox="0 0 410 480" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="410" height="480" fill="#ffffff" />
      
      <!-- Brand Name -->
      <text x="205" y="80" font-family="'Arial Black', Arial, sans-serif" font-size="${brandSize}" font-weight="900" fill="#002060" text-anchor="middle">
        ${escapeXml(product.brandName)}
      </text>
      <text x="205" y="135" font-family="'Arial Black', Arial, sans-serif" font-size="34" font-weight="900" fill="#002060" text-anchor="middle">
        SYRUP
      </text>

      <!-- Composition -->
      <text x="205" y="200" font-family="Arial, sans-serif" font-size="17" font-weight="700" fill="#334155" text-anchor="middle">
        ${escapeXml(compLine1)}
      </text>
      ${compLine2 ? `
        <text x="205" y="232" font-family="Arial, sans-serif" font-size="16" font-weight="700" fill="#334155" text-anchor="middle">
          ${escapeXml(compLine2)}
        </text>
      ` : ''}

      <!-- Pack size badge -->
      <rect x="125" y="300" width="160" height="48" rx="8" fill="#f0f9ff" stroke="#bae6fd" stroke-width="1.5" />
      <text x="205" y="332" font-family="Arial, sans-serif" font-size="20" font-weight="800" fill="#0284c7" text-anchor="middle">
        ${escapeXml(product.packSize)}
      </text>

      <text x="205" y="405" font-family="Arial, sans-serif" font-size="15" font-weight="700" fill="#d97706" text-anchor="middle">
        Sugar-Free Formulation
      </text>
    </svg>
  `;

  const bottleSvg = `
    <svg width="280" height="370" viewBox="0 0 280 370" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="280" height="370" fill="#ffffff" />
      <text x="140" y="75" font-family="'Arial Black', Arial, sans-serif" font-size="${Math.min(22, brandSize - 4)}" font-weight="900" fill="#002060" text-anchor="middle">
        ${escapeXml(product.brandName)}
      </text>
      <text x="140" y="120" font-family="'Arial Black', Arial, sans-serif" font-size="20" font-weight="900" fill="#002060" text-anchor="middle">
        SYRUP
      </text>
      <text x="140" y="175" font-family="Arial, sans-serif" font-size="16" font-weight="700" fill="#475569" text-anchor="middle">
        ${escapeXml(compLine1)}
      </text>
      ${compLine2 ? `
        <text x="140" y="205" font-family="Arial, sans-serif" font-size="15" font-weight="700" fill="#475569" text-anchor="middle">
          ${escapeXml(compLine2)}
        </text>
      ` : ''}
      <rect x="65" y="250" width="150" height="44" rx="6" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5" />
      <text x="140" y="279" font-family="Arial, sans-serif" font-size="18" font-weight="800" fill="#0284c7" text-anchor="middle">
        ${escapeXml(product.packSize)}
      </text>
    </svg>
  `;

  const cartonBuf = await sharp(Buffer.from(cartonSvg)).png().toBuffer();
  const bottleBuf = await sharp(Buffer.from(bottleSvg)).png().toBuffer();

  const cropped = await sharp(templatePath)
    .extract({ left: 130, top: 80, width: 760, height: 880 })
    .toBuffer();

  await sharp(cropped)
    .composite([
      { input: cartonBuf, left: 280, top: 125 },
      { input: bottleBuf, left: 10, top: 380 }
    ])
    .resize(800, 926, { fit: 'cover' })
    .toFile(path.join(OUTPUT_DIR, `${product.id}.png`));
}

// 4. INJECTION
async function generateInjection(product) {
  const templatePath = path.join(TEMPLATE_DIR, 'inj-5.png');
  const [compLine1, compLine2] = splitComposition(product.composition, 32);
  const brandSize = getBrandFontSize(product.brandName, 430, 38);

  const boxSvg = `
    <svg width="485" height="350" viewBox="0 0 485 350" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="485" height="350" fill="#ffffff" />
      
      <!-- Rx Symbol & Active Ingredients -->
      <text x="25" y="38" font-family="Georgia, serif" font-size="28" font-weight="bold" fill="#002060">℞</text>
      <text x="242" y="76" font-family="Arial, sans-serif" font-size="19" font-weight="700" fill="#1e293b" text-anchor="middle">
        ${escapeXml(compLine1)}
      </text>
      ${compLine2 ? `
        <text x="242" y="106" font-family="Arial, sans-serif" font-size="18" font-weight="700" fill="#1e293b" text-anchor="middle">
          ${escapeXml(compLine2)}
        </text>
      ` : ''}

      <!-- Brand Name -->
      <text x="242" y="195" font-family="'Arial Black', Arial, sans-serif" font-size="${brandSize}" font-weight="900" fill="#002060" text-anchor="middle" letter-spacing="1">
        ${escapeXml(product.brandName)}
      </text>

      <!-- Parenteral Subtitle -->
      <text x="242" y="245" font-family="Arial, sans-serif" font-size="15" font-weight="700" fill="#64748b" text-anchor="middle">
        Sterile Dry Powder | Parenteral Use Only
      </text>

      <!-- Pack Size Badge -->
      <rect x="25" y="280" width="115" height="46" rx="4" fill="#002060" />
      <text x="82" y="311" font-family="Arial, sans-serif" font-size="17" font-weight="800" fill="#ffffff" text-anchor="middle">
        ${escapeXml(product.packSize)}
      </text>
    </svg>
  `;

  const vialSvg = `
    <svg width="200" height="75" viewBox="0 0 200 75" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="200" height="75" fill="#ffffff" />
      <text x="100" y="38" font-family="'Arial Black', Arial, sans-serif" font-size="14" font-weight="900" fill="#002060" text-anchor="middle">
        ${escapeXml(product.brandName)}
      </text>
      <text x="100" y="58" font-family="Arial, sans-serif" font-size="12" font-weight="700" fill="#64748b" text-anchor="middle">
        ${escapeXml(product.packSize)}
      </text>
    </svg>
  `;

  const boxBuf = await sharp(Buffer.from(boxSvg)).png().toBuffer();
  const vialBuf = await sharp(Buffer.from(vialSvg)).png().toBuffer();

  const cropped = await sharp(templatePath)
    .extract({ left: 80, top: 230, width: 860, height: 610 })
    .toBuffer();

  await sharp(cropped)
    .composite([
      { input: boxBuf, left: 115, top: 105 },
      { input: vialBuf, left: 545, top: 465 }
    ])
    .resize(900, 638, { fit: 'cover' })
    .toFile(path.join(OUTPUT_DIR, `${product.id}.png`));
}

// 5. EYE & EAR DROPS
async function generateEyeDrops(product) {
  const templatePath = path.join(TEMPLATE_DIR, 'eye-2.png');
  const [compLine1, compLine2] = splitComposition(product.composition, 26);
  const brandSize = getBrandFontSize(product.brandName, 310, 30);

  const boxSvg = `
    <svg width="390" height="540" viewBox="0 0 390 540" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="390" height="540" fill="#ffffff" />
      
      <!-- Top Teal Banner -->
      <rect x="20" y="20" width="350" height="85" rx="6" fill="#0d9488" />
      <text x="195" y="72" font-family="'Arial Black', Arial, sans-serif" font-size="${brandSize}" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="1">
        ${escapeXml(product.brandName)}
      </text>

      <!-- Composition -->
      <text x="25" y="145" font-family="Georgia, serif" font-size="24" font-weight="bold" fill="#0f766e">℞</text>
      <text x="195" y="180" font-family="Arial, sans-serif" font-size="18" font-weight="800" fill="#1e293b" text-anchor="middle">
        ${escapeXml(compLine1)}
      </text>
      ${compLine2 ? `
        <text x="195" y="212" font-family="Arial, sans-serif" font-size="17" font-weight="800" fill="#1e293b" text-anchor="middle">
          ${escapeXml(compLine2)}
        </text>
      ` : ''}

      <!-- Lower Teal Banner -->
      <rect x="20" y="285" width="350" height="75" rx="6" fill="#0d9488" />
      <text x="195" y="333" font-family="'Arial Black', Arial, sans-serif" font-size="26" font-weight="900" fill="#ffffff" text-anchor="middle">
        EYE DROPS
      </text>

      <!-- Pack Size -->
      <text x="195" y="420" font-family="Arial, sans-serif" font-size="26" font-weight="800" fill="#0f766e" text-anchor="middle">
        ${escapeXml(product.packSize)}
      </text>
      <text x="195" y="475" font-family="Arial, sans-serif" font-size="16" font-weight="700" fill="#64748b" text-anchor="middle">
        Sterile Ophthalmic Solution
      </text>
    </svg>
  `;

  const bottleSvg = `
    <svg width="220" height="150" viewBox="0 0 220 150" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="220" height="150" fill="#ffffff" />
      <text x="110" y="42" font-family="'Arial Black', Arial, sans-serif" font-size="18" font-weight="900" fill="#0d9488" text-anchor="middle">
        ${escapeXml(product.brandName)}
      </text>
      <text x="110" y="75" font-family="Arial, sans-serif" font-size="14" font-weight="700" fill="#1e293b" text-anchor="middle">
        EYE DROPS
      </text>
      <text x="110" y="108" font-family="Arial, sans-serif" font-size="16" font-weight="800" fill="#0f766e" text-anchor="middle">
        ${escapeXml(product.packSize)}
      </text>
    </svg>
  `;

  const boxBuf = await sharp(Buffer.from(boxSvg)).png().toBuffer();
  const bottleBuf = await sharp(Buffer.from(bottleSvg)).png().toBuffer();

  const cropped = await sharp(templatePath)
    .extract({ left: 190, top: 150, width: 670, height: 740 })
    .toBuffer();

  await sharp(cropped)
    .composite([
      { input: boxBuf, left: 235, top: 40 },
      { input: bottleBuf, left: 15, top: 575 }
    ])
    .resize(750, 828, { fit: 'cover' })
    .toFile(path.join(OUTPUT_DIR, `${product.id}.png`));
}

// 6. CREAM / LOTION / SOAP
async function generateCream(product) {
  const templatePath = path.join(TEMPLATE_DIR, 'crm-1.png');
  const [compLine1, compLine2] = splitComposition(product.composition, 32);
  const brandSize = getBrandFontSize(product.brandName, 420, 34);

  const boxSvg = `
    <svg width="460" height="210" viewBox="0 0 460 210" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="460" height="210" fill="#ffffff" rx="4" />
      
      <!-- Brand Name -->
      <text x="230" y="60" font-family="'Arial Black', Arial, sans-serif" font-size="${brandSize}" font-weight="900" fill="#6d28d9" text-anchor="middle" letter-spacing="1">
        ${escapeXml(product.brandName)}
      </text>

      <!-- Composition -->
      <text x="230" y="108" font-family="Arial, sans-serif" font-size="17" font-weight="700" fill="#1e293b" text-anchor="middle">
        ${escapeXml(compLine1)}
      </text>
      ${compLine2 ? `
        <text x="230" y="136" font-family="Arial, sans-serif" font-size="16" font-weight="700" fill="#1e293b" text-anchor="middle">
          ${escapeXml(compLine2)}
        </text>
      ` : ''}

      <!-- Pack Size -->
      <text x="230" y="180" font-family="Arial, sans-serif" font-size="18" font-weight="800" fill="#6d28d9" text-anchor="middle">
        ${escapeXml(product.packSize)} • Dermatology Care
      </text>
    </svg>
  `;

  const boxBuf = await sharp(Buffer.from(boxSvg)).png().toBuffer();

  const cropped = await sharp(templatePath)
    .extract({ left: 80, top: 220, width: 880, height: 550 })
    .toBuffer();

  await sharp(cropped)
    .composite([
      { input: boxBuf, left: 340, top: 25 }
    ])
    .resize(900, 562, { fit: 'cover' })
    .toFile(path.join(OUTPUT_DIR, `${product.id}.png`));
}

// 7. DROPS / DRY SYRUP / PEDIATRIC
async function generateDrySyrup(product) {
  const templatePath = path.join(TEMPLATE_DIR, 'drp-1.png');
  const [compLine1, compLine2] = splitComposition(product.composition, 30);
  const brandSize = getBrandFontSize(product.brandName, 370, 36);

  const boxSvg = `
    <svg width="440" height="335" viewBox="0 0 440 335" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="440" height="335" fill="#ffffff" />
      
      <!-- Brand Name -->
      <text x="220" y="65" font-family="'Arial Black', Arial, sans-serif" font-size="${brandSize}" font-weight="900" fill="#0891b2" text-anchor="middle">
        ${escapeXml(product.brandName)}
      </text>
      <text x="220" y="112" font-family="'Arial Black', Arial, sans-serif" font-size="22" font-weight="800" fill="#0e7490" text-anchor="middle">
        ${escapeXml(product.dosageForm.toUpperCase())}
      </text>

      <!-- Composition -->
      <text x="220" y="175" font-family="Arial, sans-serif" font-size="17" font-weight="700" fill="#1e293b" text-anchor="middle">
        ${escapeXml(compLine1)}
      </text>
      ${compLine2 ? `
        <text x="220" y="206" font-family="Arial, sans-serif" font-size="16" font-weight="700" fill="#1e293b" text-anchor="middle">
          ${escapeXml(compLine2)}
        </text>
      ` : ''}

      <!-- Pack Size -->
      <rect x="135" y="250" width="170" height="46" rx="6" fill="#ecfeff" stroke="#a5f3fc" stroke-width="1.5" />
      <text x="220" y="280" font-family="Arial, sans-serif" font-size="18" font-weight="800" fill="#0891b2" text-anchor="middle">
        ${escapeXml(product.packSize)}
      </text>
    </svg>
  `;

  const bottleSvg = `
    <svg width="190" height="85" viewBox="0 0 190 85" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="190" height="85" fill="#ffffff" />
      <text x="95" y="38" font-family="'Arial Black', Arial, sans-serif" font-size="17" font-weight="900" fill="#0891b2" text-anchor="middle">
        ${escapeXml(product.brandName)}
      </text>
      <text x="95" y="65" font-family="Arial, sans-serif" font-size="13" font-weight="800" fill="#0e7490" text-anchor="middle">
        ${escapeXml(product.packSize)}
      </text>
    </svg>
  `;

  const boxBuf = await sharp(Buffer.from(boxSvg)).png().toBuffer();
  const bottleBuf = await sharp(Buffer.from(bottleSvg)).png().toBuffer();

  const cropped = await sharp(templatePath)
    .extract({ left: 70, top: 130, width: 860, height: 820 })
    .toBuffer();

  await sharp(cropped)
    .composite([
      { input: boxBuf, left: 130, top: 155 },
      { input: bottleBuf, left: 580, top: 635 }
    ])
    .resize(850, 810, { fit: 'cover' })
    .toFile(path.join(OUTPUT_DIR, `${product.id}.png`));
}

// 8. OIL
async function generateOil(product) {
  const templatePath = path.join(TEMPLATE_DIR, 'oil-1.png');
  await sharp(templatePath)
    .extract({ left: 140, top: 100, width: 750, height: 860 })
    .resize(800, 917, { fit: 'cover' })
    .toFile(path.join(OUTPUT_DIR, `${product.id}.png`));
}

// Crop Preserved Originals to Balanced Aesthetic Framing
async function cropPreservedPhoto(id) {
  const file = `${id}.png`;
  const templatePath = path.join(TEMPLATE_DIR, file);
  if (!fs.existsSync(templatePath)) return;
  const targetPath = path.join(OUTPUT_DIR, file);

  if (id === 'tab-1' || id === 'tab-2' || id === 'tab-25' || id === 'tab-32') {
    await sharp(templatePath)
      .extract({ left: 155, top: 215, width: 800, height: 630 })
      .resize(900, 708, { fit: 'cover' })
      .toFile(targetPath);
  } else if (id === 'cap-2' || id === 'cap-8') {
    await sharp(templatePath)
      .extract({ left: 75, top: 235, width: 885, height: 560 })
      .resize(900, 570, { fit: 'cover' })
      .toFile(targetPath);
  } else if (id === 'syp-1' || id === 'syp-11') {
    await sharp(templatePath)
      .extract({ left: 130, top: 80, width: 760, height: 880 })
      .resize(800, 926, { fit: 'cover' })
      .toFile(targetPath);
  } else if (id === 'inj-5') {
    await sharp(templatePath)
      .extract({ left: 80, top: 230, width: 860, height: 610 })
      .resize(900, 638, { fit: 'cover' })
      .toFile(targetPath);
  } else if (id === 'crm-1') {
    await sharp(templatePath)
      .extract({ left: 80, top: 220, width: 880, height: 550 })
      .resize(900, 562, { fit: 'cover' })
      .toFile(targetPath);
  } else if (id === 'eye-2') {
    await sharp(templatePath)
      .extract({ left: 190, top: 150, width: 670, height: 740 })
      .resize(750, 828, { fit: 'cover' })
      .toFile(targetPath);
  } else if (id === 'oil-1') {
    await sharp(templatePath)
      .extract({ left: 140, top: 100, width: 750, height: 860 })
      .resize(800, 917, { fit: 'cover' })
      .toFile(targetPath);
  } else if (id === 'drp-1') {
    await sharp(templatePath)
      .extract({ left: 70, top: 130, width: 860, height: 820 })
      .resize(850, 810, { fit: 'cover' })
      .toFile(targetPath);
  }
}

const PRESERVED_IDS = new Set([
  'tab-1', 'tab-2', 'tab-25', 'tab-32',
  'cap-2', 'cap-8',
  'syp-1', 'syp-11',
  'inj-5',
  'crm-1',
  'eye-2',
  'oil-1',
  'drp-1'
]);

async function run() {
  console.log('--- STARTING BALANCED AESTHETIC RE-GENERATION FOR ALL 112 PRODUCTS ---');
  let count = 0;

  for (const p of products) {
    try {
      if (PRESERVED_IDS.has(p.id)) {
        await cropPreservedPhoto(p.id);
        console.log(`[${++count}/${products.length}] Preserved with aesthetic framing: ${p.id} (${p.brandName})`);
        continue;
      }

      switch (p.category) {
        case 'Tablets':
          await generateTablet(p);
          break;
        case 'Capsules & Softgel':
          await generateCapsule(p);
          break;
        case 'Syrups':
          await generateSyrup(p);
          break;
        case 'Injections':
          await generateInjection(p);
          break;
        case 'Cream / Lotion / Soap':
          await generateCream(p);
          break;
        case 'Eye & Ear Drops':
          await generateEyeDrops(p);
          break;
        case 'Drops / Powder / Sachet':
          await generateDrySyrup(p);
          break;
        case 'Oil':
          await generateOil(p);
          break;
        default:
          await generateTablet(p);
          break;
      }

      console.log(`[${++count}/${products.length}] Generated with aesthetic framing: ${p.id} (${p.brandName})`);
    } catch (err) {
      console.error(`Error processing ${p.id}:`, err);
    }
  }

  console.log('--- COMPLETED AESTHETIC GENERATION FOR ALL 112 PRODUCTS! ---');
}

run().catch(console.error);
