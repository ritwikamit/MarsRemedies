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

console.log(`Loaded ${products.length} products to render into realistic packaging filling the box.`);

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
  const brandSize = getBrandFontSize(product.brandName, 530, 42);

  const bannerSvg = `
    <svg width="600" height="220" viewBox="0 0 600 220" xmlns="http://www.w3.org/2000/svg">
      <!-- Dark Navy Top Banner -->
      <rect x="0" y="0" width="600" height="135" fill="#002060" />
      <text x="300" y="86" font-family="'Arial Black', Arial, sans-serif" font-size="${brandSize}" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="1.5">
        ${escapeXml(product.brandName)}
      </text>

      <!-- Medium Blue Formulation Strip covering all underlying text -->
      <rect x="0" y="135" width="600" height="85" fill="#0062b1" />
      ${compLine2 ? `
        <text x="300" y="166" font-family="Arial, sans-serif" font-size="16" font-weight="700" fill="#ffffff" text-anchor="middle">
          ${escapeXml(compLine1)}
        </text>
        <text x="300" y="194" font-family="Arial, sans-serif" font-size="15" font-weight="700" fill="#ffffff" text-anchor="middle">
          ${escapeXml(compLine2)}
        </text>
      ` : `
        <text x="300" y="180" font-family="Arial, sans-serif" font-size="18" font-weight="700" fill="#ffffff" text-anchor="middle">
          ${escapeXml(compLine1)}
        </text>
      `}
    </svg>
  `;

  const packSvg = `
    <svg width="330" height="110" viewBox="0 0 330 110" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="330" height="110" fill="#fcfcfc" />
      <text x="165" y="45" font-family="Arial, sans-serif" font-size="24" font-weight="800" fill="#0f172a" text-anchor="middle">
        ${escapeXml(product.packSize)}
      </text>
      <text x="165" y="78" font-family="Arial, sans-serif" font-size="16" font-weight="600" fill="#64748b" text-anchor="middle">
        (in Blister Strips)
      </text>
    </svg>
  `;

  const bannerBuf = await sharp(Buffer.from(bannerSvg)).png().toBuffer();
  const packBuf = await sharp(Buffer.from(packSvg)).png().toBuffer();

  const cropped = await sharp(templatePath)
    .extract({ left: 175, top: 235, width: 745, height: 580 })
    .toBuffer();

  await sharp(cropped)
    .composite([
      { input: bannerBuf, left: 0, top: 25 },
      { input: packBuf, left: 245, top: 235 }
    ])
    .resize(900, 700, { fit: 'cover' })
    .toFile(path.join(OUTPUT_DIR, `${product.id}.png`));
}

// 2. CAPSULE & SOFTGEL
async function generateCapsule(product) {
  const isSoftgel = product.dosageForm.toLowerCase().includes('softgel');
  const templatePath = path.join(TEMPLATE_DIR, isSoftgel ? 'cap-2.png' : 'cap-8.png');

  if (isSoftgel) {
    await sharp(templatePath)
      .extract({ left: 120, top: 160, width: 780, height: 680 })
      .resize(900, 780, { fit: 'cover' })
      .toFile(path.join(OUTPUT_DIR, `${product.id}.png`));
    return;
  }

  const [compLine1, compLine2] = splitComposition(product.composition, 34);
  const brandSize = getBrandFontSize(product.brandName, 450, 38);

  const labelSvg = `
    <svg width="490" height="340" viewBox="0 0 490 340" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="490" height="340" fill="#ffffff" />
      <rect x="0" y="0" width="490" height="7" fill="#002060" />

      <!-- Active Composition -->
      <text x="245" y="52" font-family="Arial, sans-serif" font-size="18" font-weight="700" fill="#1e293b" text-anchor="middle">
        ${escapeXml(compLine1)}
      </text>
      ${compLine2 ? `
        <text x="245" y="80" font-family="Arial, sans-serif" font-size="16" font-weight="700" fill="#1e293b" text-anchor="middle">
          ${escapeXml(compLine2)}
        </text>
      ` : ''}

      <!-- Brand Name -->
      <text x="245" y="164" font-family="'Arial Black', Arial, sans-serif" font-size="${brandSize}" font-weight="900" fill="#002060" text-anchor="middle" letter-spacing="1">
        ${escapeXml(product.brandName)}
      </text>

      <!-- Dosage Form & Standard -->
      <text x="245" y="214" font-family="Arial, sans-serif" font-size="15" font-weight="700" fill="#059669" text-anchor="middle">
        ${escapeXml(product.dosageForm)} • Bioequivalence Standard
      </text>

      <!-- Pack Size Badge -->
      <rect x="165" y="244" width="160" height="42" rx="6" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1.5" />
      <text x="245" y="272" font-family="Arial, sans-serif" font-size="17" font-weight="800" fill="#0f172a" text-anchor="middle">
        ${escapeXml(product.packSize)}
      </text>

      <text x="245" y="314" font-family="Arial, sans-serif" font-size="12" font-weight="600" fill="#94a3b8" text-anchor="middle" letter-spacing="1">
        PRESCRIPTION ONLY MEDICINE
      </text>
    </svg>
  `;

  const labelBuf = await sharp(Buffer.from(labelSvg)).png().toBuffer();

  const cropped = await sharp(templatePath)
    .extract({ left: 95, top: 250, width: 825, height: 520 })
    .toBuffer();

  await sharp(cropped)
    .composite([
      { input: labelBuf, left: 65, top: 78 }
    ])
    .resize(900, 570, { fit: 'cover' })
    .toFile(path.join(OUTPUT_DIR, `${product.id}.png`));
}

// 3. SYRUP
async function generateSyrup(product) {
  const templatePath = path.join(TEMPLATE_DIR, 'syp-1.png');
  const [compLine1, compLine2] = splitComposition(product.composition, 30);
  const brandSize = getBrandFontSize(product.brandName, 370, 36);

  // Covers carton face completely from left 270 to 690 (width: 420, height: 490)
  const cartonSvg = `
    <svg width="420" height="490" viewBox="0 0 420 490" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="420" height="490" fill="#ffffff" />
      
      <!-- Brand Name -->
      <text x="210" y="85" font-family="'Arial Black', Arial, sans-serif" font-size="${brandSize}" font-weight="900" fill="#002060" text-anchor="middle">
        ${escapeXml(product.brandName)}
      </text>
      <text x="210" y="140" font-family="'Arial Black', Arial, sans-serif" font-size="34" font-weight="900" fill="#002060" text-anchor="middle">
        SYRUP
      </text>

      <!-- Composition -->
      <text x="210" y="210" font-family="Arial, sans-serif" font-size="17" font-weight="700" fill="#334155" text-anchor="middle">
        ${escapeXml(compLine1)}
      </text>
      ${compLine2 ? `
        <text x="210" y="242" font-family="Arial, sans-serif" font-size="16" font-weight="700" fill="#334155" text-anchor="middle">
          ${escapeXml(compLine2)}
        </text>
      ` : ''}

      <!-- Pack size badge -->
      <rect x="130" y="310" width="160" height="48" rx="8" fill="#f0f9ff" stroke="#bae6fd" stroke-width="1.5" />
      <text x="210" y="342" font-family="Arial, sans-serif" font-size="20" font-weight="800" fill="#0284c7" text-anchor="middle">
        ${escapeXml(product.packSize)}
      </text>

      <text x="210" y="415" font-family="Arial, sans-serif" font-size="15" font-weight="700" fill="#d97706" text-anchor="middle">
        Sugar-Free Formulation
      </text>
    </svg>
  `;

  // Bottle label patch (width: 290, height: 380)
  const bottleSvg = `
    <svg width="290" height="380" viewBox="0 0 290 380" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="290" height="380" fill="#ffffff" />
      <text x="145" y="80" font-family="'Arial Black', Arial, sans-serif" font-size="${Math.min(22, brandSize - 4)}" font-weight="900" fill="#002060" text-anchor="middle">
        ${escapeXml(product.brandName)}
      </text>
      <text x="145" y="125" font-family="'Arial Black', Arial, sans-serif" font-size="20" font-weight="900" fill="#002060" text-anchor="middle">
        SYRUP
      </text>
      <text x="145" y="185" font-family="Arial, sans-serif" font-size="16" font-weight="700" fill="#475569" text-anchor="middle">
        ${escapeXml(compLine1)}
      </text>
      ${compLine2 ? `
        <text x="145" y="215" font-family="Arial, sans-serif" font-size="15" font-weight="700" fill="#475569" text-anchor="middle">
          ${escapeXml(compLine2)}
        </text>
      ` : ''}
      <rect x="70" y="260" width="150" height="44" rx="6" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5" />
      <text x="145" y="289" font-family="Arial, sans-serif" font-size="18" font-weight="800" fill="#0284c7" text-anchor="middle">
        ${escapeXml(product.packSize)}
      </text>
    </svg>
  `;

  const cartonBuf = await sharp(Buffer.from(cartonSvg)).png().toBuffer();
  const bottleBuf = await sharp(Buffer.from(bottleSvg)).png().toBuffer();

  const cropped = await sharp(templatePath)
    .extract({ left: 140, top: 95, width: 730, height: 810 })
    .toBuffer();

  await sharp(cropped)
    .composite([
      { input: cartonBuf, left: 270, top: 95 },
      { input: bottleBuf, left: 0, top: 360 }
    ])
    .resize(800, 890, { fit: 'cover' })
    .toFile(path.join(OUTPUT_DIR, `${product.id}.png`));
}

// 4. INJECTION
async function generateInjection(product) {
  const templatePath = path.join(TEMPLATE_DIR, 'inj-5.png');
  const [compLine1, compLine2] = splitComposition(product.composition, 32);
  const brandSize = getBrandFontSize(product.brandName, 430, 38);

  const boxSvg = `
    <svg width="490" height="350" viewBox="0 0 490 350" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="490" height="350" fill="#ffffff" />
      
      <!-- Rx Symbol & Active Ingredients -->
      <text x="25" y="38" font-family="Georgia, serif" font-size="28" font-weight="bold" fill="#002060">℞</text>
      <text x="245" y="76" font-family="Arial, sans-serif" font-size="19" font-weight="700" fill="#1e293b" text-anchor="middle">
        ${escapeXml(compLine1)}
      </text>
      ${compLine2 ? `
        <text x="245" y="106" font-family="Arial, sans-serif" font-size="18" font-weight="700" fill="#1e293b" text-anchor="middle">
          ${escapeXml(compLine2)}
        </text>
      ` : ''}

      <!-- Brand Name -->
      <text x="245" y="195" font-family="'Arial Black', Arial, sans-serif" font-size="${brandSize}" font-weight="900" fill="#002060" text-anchor="middle" letter-spacing="1">
        ${escapeXml(product.brandName)}
      </text>

      <!-- Parenteral Subtitle -->
      <text x="245" y="245" font-family="Arial, sans-serif" font-size="15" font-weight="700" fill="#64748b" text-anchor="middle">
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
    <svg width="210" height="75" viewBox="0 0 210 75" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="210" height="75" fill="#ffffff" />
      <text x="105" y="38" font-family="'Arial Black', Arial, sans-serif" font-size="14" font-weight="900" fill="#002060" text-anchor="middle">
        ${escapeXml(product.brandName)}
      </text>
      <text x="105" y="58" font-family="Arial, sans-serif" font-size="12" font-weight="700" fill="#64748b" text-anchor="middle">
        ${escapeXml(product.packSize)}
      </text>
    </svg>
  `;

  const boxBuf = await sharp(Buffer.from(boxSvg)).png().toBuffer();
  const vialBuf = await sharp(Buffer.from(vialSvg)).png().toBuffer();

  const cropped = await sharp(templatePath)
    .extract({ left: 105, top: 245, width: 800, height: 550 })
    .toBuffer();

  await sharp(cropped)
    .composite([
      { input: boxBuf, left: 95, top: 95 },
      { input: vialBuf, left: 520, top: 455 }
    ])
    .resize(900, 620, { fit: 'cover' })
    .toFile(path.join(OUTPUT_DIR, `${product.id}.png`));
}

// 5. EYE & EAR DROPS
async function generateEyeDrops(product) {
  const templatePath = path.join(TEMPLATE_DIR, 'eye-2.png');
  const [compLine1, compLine2] = splitComposition(product.composition, 26);
  const brandSize = getBrandFontSize(product.brandName, 310, 30);

  // Covers carton front face completely from left 230 to 620 (width: 390, height: 540)
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

  // Bottle label patch covering lower bottle text
  const bottleSvg = `
    <svg width="230" height="160" viewBox="0 0 230 160" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="230" height="160" fill="#ffffff" />
      <text x="115" y="45" font-family="'Arial Black', Arial, sans-serif" font-size="19" font-weight="900" fill="#0d9488" text-anchor="middle">
        ${escapeXml(product.brandName)}
      </text>
      <text x="115" y="80" font-family="Arial, sans-serif" font-size="14" font-weight="700" fill="#1e293b" text-anchor="middle">
        EYE DROPS
      </text>
      <text x="115" y="115" font-family="Arial, sans-serif" font-size="16" font-weight="800" fill="#0f766e" text-anchor="middle">
        ${escapeXml(product.packSize)}
      </text>
      <text x="115" y="142" font-family="Arial, sans-serif" font-size="12" font-weight="600" fill="#64748b" text-anchor="middle">
        Sterile Solution
      </text>
    </svg>
  `;

  const boxBuf = await sharp(Buffer.from(boxSvg)).png().toBuffer();
  const bottleBuf = await sharp(Buffer.from(bottleSvg)).png().toBuffer();

  const cropped = await sharp(templatePath)
    .extract({ left: 195, top: 175, width: 625, height: 670 })
    .toBuffer();

  await sharp(cropped)
    .composite([
      { input: boxBuf, left: 230, top: 25 },
      { input: bottleBuf, left: 10, top: 580 }
    ])
    .resize(750, 800, { fit: 'cover' })
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
    .extract({ left: 100, top: 240, width: 800, height: 490 })
    .toBuffer();

  await sharp(cropped)
    .composite([
      { input: boxBuf, left: 320, top: 10 }
    ])
    .resize(900, 550, { fit: 'cover' })
    .toFile(path.join(OUTPUT_DIR, `${product.id}.png`));
}

// 7. DROPS / DRY SYRUP / PEDIATRIC
async function generateDrySyrup(product) {
  const templatePath = path.join(TEMPLATE_DIR, 'drp-1.png');
  const [compLine1, compLine2] = splitComposition(product.composition, 30);
  const brandSize = getBrandFontSize(product.brandName, 370, 36);

  // Covers carton face completely from left 105 to 550 (width: 445, height: 340)
  const boxSvg = `
    <svg width="445" height="340" viewBox="0 0 445 340" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="445" height="340" fill="#ffffff" />
      
      <!-- Brand Name -->
      <text x="222" y="65" font-family="'Arial Black', Arial, sans-serif" font-size="${brandSize}" font-weight="900" fill="#0891b2" text-anchor="middle">
        ${escapeXml(product.brandName)}
      </text>
      <text x="222" y="112" font-family="'Arial Black', Arial, sans-serif" font-size="22" font-weight="800" fill="#0e7490" text-anchor="middle">
        ${escapeXml(product.dosageForm.toUpperCase())}
      </text>

      <!-- Composition -->
      <text x="222" y="175" font-family="Arial, sans-serif" font-size="17" font-weight="700" fill="#1e293b" text-anchor="middle">
        ${escapeXml(compLine1)}
      </text>
      ${compLine2 ? `
        <text x="222" y="206" font-family="Arial, sans-serif" font-size="16" font-weight="700" fill="#1e293b" text-anchor="middle">
          ${escapeXml(compLine2)}
        </text>
      ` : ''}

      <!-- Pack Size -->
      <rect x="135" y="250" width="175" height="48" rx="6" fill="#ecfeff" stroke="#a5f3fc" stroke-width="1.5" />
      <text x="222" y="281" font-family="Arial, sans-serif" font-size="18" font-weight="800" fill="#0891b2" text-anchor="middle">
        ${escapeXml(product.packSize)}
      </text>
    </svg>
  `;

  // Dropper bottle label patch
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
    .extract({ left: 95, top: 155, width: 820, height: 750 })
    .toBuffer();

  await sharp(cropped)
    .composite([
      { input: boxBuf, left: 105, top: 130 },
      { input: bottleBuf, left: 555, top: 610 }
    ])
    .resize(880, 800, { fit: 'cover' })
    .toFile(path.join(OUTPUT_DIR, `${product.id}.png`));
}

// 8. OIL
async function generateOil(product) {
  const templatePath = path.join(TEMPLATE_DIR, 'oil-1.png');
  await sharp(templatePath)
    .extract({ left: 155, top: 125, width: 715, height: 790 })
    .resize(800, 880, { fit: 'cover' })
    .toFile(path.join(OUTPUT_DIR, `${product.id}.png`));
}

// Crop Preserved Originals to Fill the Box
async function cropPreservedPhoto(id) {
  const file = `${id}.png`;
  const templatePath = path.join(TEMPLATE_DIR, file);
  if (!fs.existsSync(templatePath)) return;
  const targetPath = path.join(OUTPUT_DIR, file);

  if (id === 'tab-1' || id === 'tab-2' || id === 'tab-25' || id === 'tab-32') {
    await sharp(templatePath)
      .extract({ left: 175, top: 235, width: 745, height: 580 })
      .resize(900, 700, { fit: 'cover' })
      .toFile(targetPath);
  } else if (id === 'cap-2' || id === 'cap-8') {
    await sharp(templatePath)
      .extract({ left: 95, top: 250, width: 825, height: 520 })
      .resize(900, 570, { fit: 'cover' })
      .toFile(targetPath);
  } else if (id === 'syp-1' || id === 'syp-11') {
    await sharp(templatePath)
      .extract({ left: 140, top: 95, width: 730, height: 810 })
      .resize(800, 890, { fit: 'cover' })
      .toFile(targetPath);
  } else if (id === 'inj-5') {
    await sharp(templatePath)
      .extract({ left: 105, top: 245, width: 800, height: 550 })
      .resize(900, 620, { fit: 'cover' })
      .toFile(targetPath);
  } else if (id === 'crm-1') {
    await sharp(templatePath)
      .extract({ left: 100, top: 240, width: 800, height: 490 })
      .resize(900, 550, { fit: 'cover' })
      .toFile(targetPath);
  } else if (id === 'eye-2') {
    await sharp(templatePath)
      .extract({ left: 195, top: 175, width: 625, height: 670 })
      .resize(750, 800, { fit: 'cover' })
      .toFile(targetPath);
  } else if (id === 'oil-1') {
    await sharp(templatePath)
      .extract({ left: 155, top: 125, width: 715, height: 790 })
      .resize(800, 880, { fit: 'cover' })
      .toFile(targetPath);
  } else if (id === 'drp-1') {
    await sharp(templatePath)
      .extract({ left: 95, top: 155, width: 820, height: 750 })
      .resize(880, 800, { fit: 'cover' })
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
  console.log('--- STARTING HIGH-PRECISION PHOTOREALISTIC BATCH GENERATION ---');
  let count = 0;

  for (const p of products) {
    try {
      if (PRESERVED_IDS.has(p.id)) {
        await cropPreservedPhoto(p.id);
        console.log(`[${++count}/${products.length}] Preserved & cropped photo for ${p.id} (${p.brandName})`);
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

      console.log(`[${++count}/${products.length}] Generated realistic photo for ${p.id} (${p.brandName})`);
    } catch (err) {
      console.error(`Error processing ${p.id}:`, err);
    }
  }

  console.log('--- COMPLETED ALL 112 PRODUCTS! ---');
}

run().catch(console.error);
