import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const PRESERVED_REALISTIC_AI_PHOTOS = new Set([
  'tab-1', 'tab-2', 'tab-25', 'tab-32', 
  'cap-2', 'cap-8', 
  'syp-1', 'syp-11', 
  'inj-5', 
  'crm-1', 
  'eye-2', 
  'oil-1', 
  'drp-1'
]);

// Read products.ts
const productsFile = fs.readFileSync('src/data/products.ts', 'utf8');
const regex = /id:\s*'([^']+)',\s*brandName:\s*'([^']+)',\s*composition:\s*'([^']+)',\s*category:\s*'([^']+)',\s*dosageForm:\s*'([^']+)',\s*packSize:\s*'([^']+)'/g;

const products = [];
let match;
while ((match = regex.exec(productsFile)) !== null) {
  products.push({
    id: match[1],
    brandName: match[2],
    composition: match[3],
    category: match[4],
    dosageForm: match[5],
    packSize: match[6],
  });
}

console.log(`Loaded ${products.length} formulations.`);

const CATEGORY_COLORS = {
  'Tablets': { primary: '#002060', accent: '#2563eb', light: '#eff6ff', border: '#93c5fd' },
  'Capsules & Softgel': { primary: '#065f46', accent: '#059669', light: '#ecfdf5', border: '#6ee7b7' },
  'Syrups': { primary: '#92400e', accent: '#d97706', light: '#fffbeb', border: '#fcd34d' },
  'Drops / Powder / Sachet': { primary: '#0e7490', accent: '#0891b2', light: '#ecfeff', border: '#67e8f9' },
  'Injections': { primary: '#991b1b', accent: '#dc2626', light: '#fef2f2', border: '#fca5a5' },
  'Cream / Lotion / Soap': { primary: '#5b21b6', accent: '#7c3aed', light: '#f5f3ff', border: '#c4b5fd' },
  'Eye & Ear Drops': { primary: '#115e59', accent: '#0d9488', light: '#f0fdfa', border: '#5eead4' },
  'Oil': { primary: '#9a3412', accent: '#ea580c', light: '#fff7ed', border: '#fdba74' },
};

function escapeXml(unsafe) {
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

function truncate(str, max) {
  if (str.length <= max) return str;
  return str.slice(0, max - 1) + '…';
}

function buildSvg(p) {
  const col = CATEGORY_COLORS[p.category] || CATEGORY_COLORS['Tablets'];
  const brandSafe = escapeXml(p.brandName);
  const compSafe = escapeXml(truncate(p.composition, 42));
  const packSafe = escapeXml(p.packSize);
  const formSafe = escapeXml(p.dosageForm);

  // Tablet Blister Item
  const renderTabletBlister = `
    <!-- 3D Blister Strip (Angled beside box) -->
    <g transform="translate(480, 240) rotate(8)">
      <!-- Ground shadow under blister -->
      <ellipse cx="140" cy="380" rx="140" ry="25" fill="rgba(0,0,0,0.12)" />
      
      <!-- Blister foil back -->
      <rect x="0" y="0" width="260" height="380" rx="16" fill="url(#blister-foil)" stroke="#94a3b8" stroke-width="2" filter="url(#drop-shadow)" />
      
      <!-- Blister cavity grid -->
      ${[
        { cx: 55, cy: 55 }, { cx: 130, cy: 55 }, { cx: 205, cy: 55 },
        { cx: 55, cy: 135 }, { cx: 130, cy: 135 }, { cx: 205, cy: 135 },
        { cx: 55, cy: 215 }, { cx: 130, cy: 215 }, { cx: 205, cy: 215 },
        { cx: 90, cy: 300 }, { cx: 170, cy: 300 },
      ].map((pt, i) => `
        <g key="${i}">
          <!-- Cavity socket shadow -->
          <circle cx="${pt.cx + 2}" cy="${pt.cy + 3}" r="26" fill="rgba(0,0,0,0.18)" />
          <!-- Aluminum embossed dome -->
          <circle cx="${pt.cx}" cy="${pt.cy}" r="25" fill="url(#tab-dome)" stroke="#cbd5e1" stroke-width="1.5" />
          <!-- Coated tablet visible outline -->
          <circle cx="${pt.cx - 1}" cy="${pt.cy - 1}" r="20" fill="url(#tablet-pill)" />
          <!-- Tablet score line -->
          <line x1="${pt.cx - 12}" y1="${pt.cy}" x2="${pt.cx + 12}" y2="${pt.cy}" stroke="${col.accent}" stroke-width="1.5" opacity="0.6" />
          <!-- Specular highlight -->
          <path d="M ${pt.cx - 14} ${pt.cy - 12} Q ${pt.cx - 6} ${pt.cy - 16} ${pt.cx + 2} ${pt.cy - 12}" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.9" />
        </g>
      `).join('')}
      
      <!-- Foil perforation line -->
      <line x1="0" y1="185" x2="260" y2="185" stroke="#94a3b8" stroke-dasharray="6 4" stroke-width="1.5" />
      <text x="130" y="365" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" font-weight="700" fill="#64748b" text-anchor="middle" letter-spacing="1">MARS REMEDIES • ALU-ALU</text>
    </g>
  `;

  // Capsule Blister Item
  const renderCapsuleBlister = `
    <!-- 3D Capsule Blister Strip -->
    <g transform="translate(480, 230) rotate(7)">
      <ellipse cx="140" cy="390" rx="140" ry="25" fill="rgba(0,0,0,0.14)" />
      <rect x="0" y="0" width="260" height="390" rx="16" fill="url(#blister-foil)" stroke="#94a3b8" stroke-width="2" filter="url(#drop-shadow)" />
      
      ${[
        { x: 30, y: 35 }, { x: 150, y: 35 },
        { x: 30, y: 125 }, { x: 150, y: 125 },
        { x: 30, y: 215 }, { x: 150, y: 215 },
        { x: 30, y: 305 }, { x: 150, y: 305 },
      ].map((pt, i) => `
        <g key="${i}">
          <rect x="${pt.x + 2}" y="${pt.y + 4}" width="78" height="34" rx="17" fill="rgba(0,0,0,0.2)" />
          <rect x="${pt.x}" y="${pt.y}" width="78" height="34" rx="17" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5" />
          <!-- Dual-color capsule body -->
          <path d="M ${pt.x + 4} ${pt.y + 4} L ${pt.x + 39} ${pt.y + 4} L ${pt.x + 39} ${pt.y + 30} L ${pt.x + 4} ${pt.y + 30} A 13 13 0 0 1 ${pt.x + 4} ${pt.y + 4} Z" fill="${col.accent}" />
          <path d="M ${pt.x + 39} ${pt.y + 4} L ${pt.x + 74} ${pt.y + 4} A 13 13 0 0 1 ${pt.x + 74} ${pt.y + 30} L ${pt.x + 39} ${pt.y + 30} Z" fill="#f8fafc" />
          <line x1="${pt.x + 39}" y1="${pt.y + 4}" x2="${pt.x + 39}" y2="${pt.y + 30}" stroke="rgba(0,0,0,0.2)" stroke-width="1" />
          <!-- Specular glint -->
          <ellipse cx="${pt.x + 20}" cy="${pt.y + 11}" rx="12" ry="3" fill="#ffffff" opacity="0.65" />
        </g>
      `).join('')}
    </g>
  `;

  // Syrup Bottle Item
  const renderSyrupBottle = `
    <!-- 3D Pharmaceutical Syrup Bottle -->
    <g transform="translate(530, 200)">
      <!-- Ground Shadow -->
      <ellipse cx="105" cy="465" rx="95" ry="24" fill="rgba(0,0,0,0.18)" />
      
      <!-- Amber Glass Body -->
      <rect x="25" y="160" width="160" height="280" rx="28" fill="url(#amber-glass)" stroke="#78350f" stroke-width="2" filter="url(#drop-shadow)" />
      
      <!-- Liquid Level & Amber Glow -->
      <rect x="32" y="210" width="146" height="220" rx="20" fill="url(#syrup-liquid)" opacity="0.9" />
      
      <!-- Amber Glass Highlights -->
      <rect x="34" y="170" width="14" height="260" rx="7" fill="#ffffff" opacity="0.25" />
      <rect x="162" y="170" width="8" height="260" rx="4" fill="#fef3c7" opacity="0.2" />
      
      <!-- Shoulder & Neck -->
      <path d="M 45 160 Q 75 125 75 110 L 135 110 Q 135 125 165 160 Z" fill="url(#amber-glass)" stroke="#78350f" stroke-width="1.5" />
      <rect x="75" y="75" width="60" height="38" rx="4" fill="url(#amber-glass)" stroke="#78350f" stroke-width="1.5" />
      
      <!-- White Child-Proof Safety Cap with Vertical Ribs -->
      <rect x="68" y="45" width="74" height="42" rx="6" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.5" />
      ${[74, 82, 90, 98, 106, 114, 122, 130, 136].map(x => `<line key="${x}" x1="${x}" y1="46" x2="${x}" y2="86" stroke="#cbd5e1" stroke-width="1.5" />`).join('')}
      
      <!-- Translucent Calibrated Measuring Cup on Top -->
      <path d="M 62 10 L 148 10 L 142 55 L 68 55 Z" fill="rgba(255,255,255,0.75)" stroke="#94a3b8" stroke-width="1.5" />
      <line x1="75" y1="22" x2="95" y2="22" stroke="#64748b" stroke-width="1.5" />
      <line x1="75" y1="34" x2="105" y2="34" stroke="#64748b" stroke-width="1.5" />
      <line x1="75" y1="46" x2="115" y2="46" stroke="#64748b" stroke-width="1.5" />
      <text x="122" y="48" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="9" font-weight="700" fill="#64748b">10 ml</text>
      
      <!-- Bottle Branded Label -->
      <rect x="35" y="240" width="140" height="150" rx="8" fill="#ffffff" stroke="#e2e8f0" stroke-width="1" />
      <!-- Label Header Banner -->
      <rect x="35" y="240" width="140" height="30" rx="8" fill="${col.accent}" />
      <rect x="35" y="260" width="140" height="10" fill="${col.accent}" />
      <text x="105" y="258" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="12" font-weight="800" fill="#ffffff" text-anchor="middle" letter-spacing="1">MARS REMEDIES</text>
      
      <text x="105" y="295" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="14" font-weight="900" fill="#0f172a" text-anchor="middle">${brandSafe}</text>
      <text x="105" y="315" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="9" font-weight="600" fill="#64748b" text-anchor="middle">${escapeXml(truncate(p.composition, 24))}</text>
      
      <rect x="65" y="340" width="80" height="22" rx="11" fill="${col.light}" stroke="${col.border}" stroke-width="1" />
      <text x="105" y="355" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="10" font-weight="800" fill="${col.primary}" text-anchor="middle">${packSafe}</text>
    </g>
  `;

  // Injection Vial Item
  const renderInjectionVial = `
    <!-- 3D Sterile Injection Vial & Ampoule -->
    <g transform="translate(520, 220)">
      <ellipse cx="90" cy="420" rx="80" ry="20" fill="rgba(0,0,0,0.16)" />
      
      <!-- Sterile Glass Vial -->
      <rect x="25" y="140" width="130" height="260" rx="20" fill="url(#glass-gradient)" stroke="#94a3b8" stroke-width="2" filter="url(#drop-shadow)" />
      
      <!-- White Sterile Powder Cake inside -->
      <rect x="32" y="310" width="116" height="80" rx="12" fill="#ffffff" stroke="#e2e8f0" stroke-width="1" />
      <path d="M 32 310 Q 90 295 148 310 L 148 370 L 32 370 Z" fill="#f8fafc" />
      
      <!-- Vial Neck & Aluminum Crimp Collar -->
      <path d="M 40 140 Q 65 110 65 95 L 115 95 Q 115 110 140 140 Z" fill="url(#glass-gradient)" stroke="#94a3b8" stroke-width="1.5" />
      <rect x="65" y="65" width="50" height="32" fill="url(#metallic-aluminum)" stroke="#64748b" stroke-width="1.5" />
      <!-- Flip-off seal plastic cap -->
      <rect x="58" y="45" width="64" height="24" rx="6" fill="${col.accent}" stroke="#991b1b" stroke-width="1.5" />
      <ellipse cx="90" cy="45" rx="32" ry="7" fill="${col.primary}" />
      
      <!-- Vial Label -->
      <rect x="33" y="190" width="114" height="110" rx="6" fill="#ffffff" stroke="#e2e8f0" stroke-width="1" />
      <rect x="33" y="190" width="114" height="22" rx="6" fill="${col.accent}" />
      <rect x="33" y="206" width="114" height="6" fill="${col.accent}" />
      <text x="90" y="205" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="10" font-weight="800" fill="#ffffff" text-anchor="middle">STERILE VIAP</text>
      <text x="90" y="235" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="12" font-weight="900" fill="#0f172a" text-anchor="middle">${brandSafe}</text>
      <text x="90" y="255" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="8" font-weight="600" fill="#64748b" text-anchor="middle">For I.V. / I.M. Injection</text>
      <text x="90" y="280" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="9" font-weight="800" fill="${col.primary}" text-anchor="middle">${packSafe}</text>
      
      <!-- Clear Glass Water Ampoule beside it -->
      <g transform="translate(160, 40)">
        <ellipse cx="28" cy="380" rx="26" ry="10" fill="rgba(0,0,0,0.12)" />
        <rect x="8" y="120" width="40" height="240" rx="14" fill="url(#glass-gradient)" stroke="#94a3b8" stroke-width="1.5" />
        <path d="M 8 120 Q 20 85 20 65 L 36 65 Q 36 85 48 120 Z" fill="url(#glass-gradient)" stroke="#94a3b8" stroke-width="1.5" />
        <!-- Ampoule constricted neck & break ring -->
        <rect x="22" y="45" width="12" height="22" fill="url(#glass-gradient)" stroke="#94a3b8" stroke-width="1" />
        <line x1="20" y1="56" x2="36" y2="56" stroke="#2563eb" stroke-width="2" />
        <ellipse cx="28" cy="38" rx="8" ry="12" fill="url(#glass-gradient)" stroke="#94a3b8" stroke-width="1.5" />
        <!-- Sterile Water text -->
        <text x="28" y="230" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="8" font-weight="700" fill="#0284c7" transform="rotate(-90 28 230)" text-anchor="middle">STERILE WATER 10ML</text>
      </g>
    </g>
  `;

  // Cream Tube Item
  const renderCreamTube = `
    <!-- 3D Dermatological Cream Tube -->
    <g transform="translate(490, 240) rotate(12)">
      <ellipse cx="120" cy="340" rx="120" ry="24" fill="rgba(0,0,0,0.14)" />
      
      <!-- Metallic Laminated Tube Body -->
      <path d="M 40 40 L 190 40 L 160 300 L 70 300 Z" fill="url(#tube-metallic)" stroke="#94a3b8" stroke-width="1.5" filter="url(#drop-shadow)" />
      <!-- Crimp end at top -->
      <rect x="36" y="24" width="158" height="20" rx="4" fill="#cbd5e1" stroke="#64748b" stroke-width="1.5" />
      <line x1="40" y1="34" x2="190" y2="34" stroke="#64748b" stroke-dasharray="4 2" stroke-width="1.5" />
      
      <!-- Screw Nozzle & White Cap at bottom -->
      <path d="M 70 300 L 80 325 L 150 325 L 160 300 Z" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" />
      <rect x="80" y="325" width="70" height="35" rx="5" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.5" />
      ${[86, 94, 102, 110, 118, 126, 134, 142].map(x => `<line key="${x}" x1="${x}" y1="326" x2="${x}" y2="359" stroke="#cbd5e1" stroke-width="1" />`).join('')}
      
      <!-- Tube Graphic Design -->
      <rect x="52" y="70" width="126" height="180" fill="#ffffff" opacity="0.92" />
      <rect x="52" y="70" width="126" height="34" fill="${col.accent}" />
      <text x="115" y="92" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" font-weight="800" fill="#ffffff" text-anchor="middle">DERMA CARE</text>
      <text x="115" y="135" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="15" font-weight="900" fill="#0f172a" text-anchor="middle">${brandSafe}</text>
      <text x="115" y="160" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="9" font-weight="600" fill="#64748b" text-anchor="middle">${escapeXml(truncate(p.composition, 20))}</text>
      <text x="115" y="225" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" font-weight="800" fill="${col.primary}" text-anchor="middle">${packSafe}</text>
    </g>
  `;

  // Eye Drop Bottle Item
  const renderEyeDropBottle = `
    <!-- 3D Ophthalmic Eye Drop Bottle -->
    <g transform="translate(540, 210)">
      <ellipse cx="90" cy="430" rx="80" ry="22" fill="rgba(0,0,0,0.15)" />
      
      <!-- White Sterile Dropper Bottle -->
      <rect x="35" y="180" width="110" height="230" rx="24" fill="url(#plastic-bottle)" stroke="#cbd5e1" stroke-width="1.5" filter="url(#drop-shadow)" />
      <!-- Bottle neck -->
      <path d="M 45 180 Q 70 145 70 130 L 110 130 Q 110 145 135 180 Z" fill="url(#plastic-bottle)" stroke="#cbd5e1" stroke-width="1.5" />
      
      <!-- Sterile Nozzle & Teal Ribbed Cap -->
      <rect x="65" y="60" width="50" height="75" rx="10" fill="${col.accent}" stroke="${col.primary}" stroke-width="1.5" />
      ${[70, 76, 82, 88, 94, 100, 106].map(x => `<line key="${x}" x1="${x}" y1="80" x2="${x}" y2="134" stroke="rgba(255,255,255,0.4)" stroke-width="1" />`).join('')}
      <!-- Extended Dropper Tip -->
      <path d="M 80 60 L 90 25 L 100 60 Z" fill="${col.accent}" stroke="${col.primary}" stroke-width="1" />
      
      <!-- Bottle Label -->
      <rect x="42" y="220" width="96" height="140" rx="6" fill="#ffffff" stroke="#e2e8f0" stroke-width="1" />
      <rect x="42" y="220" width="96" height="24" rx="6" fill="${col.accent}" />
      <text x="90" y="236" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="9" font-weight="800" fill="#ffffff" text-anchor="middle">STERILE OPHTHALMIC</text>
      <text x="90" y="270" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" font-weight="900" fill="#0f172a" text-anchor="middle">${brandSafe}</text>
      <text x="90" y="295" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="8" font-weight="600" fill="#64748b" text-anchor="middle">Eye / Ear Drops</text>
      <text x="90" y="335" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="10" font-weight="800" fill="${col.primary}" text-anchor="middle">${packSafe}</text>
    </g>
  `;

  // Select primary container based on category
  let primaryContainer = renderTabletBlister;
  if (p.category === 'Capsules & Softgel') {
    primaryContainer = renderCapsuleBlister;
  } else if (p.category === 'Syrups' || p.category === 'Oil') {
    primaryContainer = renderSyrupBottle;
  } else if (p.category === 'Injections') {
    primaryContainer = renderInjectionVial;
  } else if (p.category === 'Cream / Lotion / Soap') {
    primaryContainer = renderCreamTube;
  } else if (p.category === 'Eye & Ear Drops') {
    primaryContainer = renderEyeDropBottle;
  } else if (p.category === 'Drops / Powder / Sachet') {
    primaryContainer = renderEyeDropBottle;
  }

  return `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 900" width="900" height="900">
    <defs>
      <!-- Filter for realistic drop shadows -->
      <filter id="drop-shadow" x="-10%" y="-10%" width="130%" height="130%">
        <feDropShadow dx="0" dy="16" stdDeviation="18" flood-color="rgba(15,23,42,0.18)" />
      </filter>
      
      <!-- Studio Lighting Gradients -->
      <linearGradient id="box-front" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#ffffff" />
        <stop offset="60%" stop-color="#f8fafc" />
        <stop offset="100%" stop-color="#f1f5f9" />
      </linearGradient>
      
      <linearGradient id="box-side" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#e2e8f0" />
        <stop offset="100%" stop-color="#cbd5e1" />
      </linearGradient>
      
      <linearGradient id="box-top" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stop-color="#ffffff" />
        <stop offset="100%" stop-color="#e2e8f0" />
      </linearGradient>
      
      <linearGradient id="blister-foil" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#f8fafc" />
        <stop offset="30%" stop-color="#e2e8f0" />
        <stop offset="70%" stop-color="#cbd5e1" />
        <stop offset="100%" stop-color="#94a3b8" />
      </linearGradient>

      <radialGradient id="tab-dome" cx="40%" cy="40%" r="60%">
        <stop offset="0%" stop-color="#ffffff" />
        <stop offset="60%" stop-color="#cbd5e1" />
        <stop offset="100%" stop-color="#94a3b8" />
      </radialGradient>

      <linearGradient id="tablet-pill" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#ffffff" />
        <stop offset="100%" stop-color="#f1f5f9" />
      </linearGradient>
      
      <linearGradient id="amber-glass" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#78350f" />
        <stop offset="30%" stop-color="#b45309" />
        <stop offset="70%" stop-color="#92400e" />
        <stop offset="100%" stop-color="#451a03" />
      </linearGradient>
      
      <linearGradient id="syrup-liquid" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#b45309" />
        <stop offset="50%" stop-color="#f59e0b" />
        <stop offset="100%" stop-color="#92400e" />
      </linearGradient>

      <linearGradient id="glass-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="rgba(241,245,249,0.9)" />
        <stop offset="30%" stop-color="rgba(255,255,255,0.95)" />
        <stop offset="70%" stop-color="rgba(226,232,240,0.85)" />
        <stop offset="100%" stop-color="rgba(203,213,225,0.9)" />
      </linearGradient>
      
      <linearGradient id="metallic-aluminum" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#cbd5e1" />
        <stop offset="40%" stop-color="#ffffff" />
        <stop offset="80%" stop-color="#94a3b8" />
        <stop offset="100%" stop-color="#64748b" />
      </linearGradient>
      
      <linearGradient id="tube-metallic" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#f8fafc" />
        <stop offset="40%" stop-color="#ffffff" />
        <stop offset="70%" stop-color="#e2e8f0" />
        <stop offset="100%" stop-color="#cbd5e1" />
      </linearGradient>
      
      <linearGradient id="plastic-bottle" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#ffffff" />
        <stop offset="40%" stop-color="#f8fafc" />
        <stop offset="100%" stop-color="#e2e8f0" />
      </linearGradient>
    </defs>

    <!-- Clean Pure White Studio Background -->
    <rect width="900" height="900" fill="#ffffff" />
    
    <!-- Primary Product Pack (Right-hand Side) -->
    ${primaryContainer}

    <!-- 3D Medicine Carton Box (Left-hand Side Foreground) -->
    <g transform="translate(110, 160)">
      <!-- Contact Shadow under Box -->
      <ellipse cx="195" cy="565" rx="190" ry="32" fill="rgba(15,23,42,0.18)" filter="url(#drop-shadow)" />

      <!-- 1. Top Flap (3D Perspective Angled Trapezoid) -->
      <polygon points="75,0 380,0 305,65 0,65" fill="url(#box-top)" stroke="#cbd5e1" stroke-width="1.5" />
      <line x1="75" y1="0" x2="0" y2="65" stroke="#ffffff" stroke-width="2" />
      
      <!-- Top flap brand printing -->
      <text x="180" y="38" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="14" font-weight="900" fill="#64748b" letter-spacing="1" opacity="0.75">${brandSafe}</text>

      <!-- 2. Left Side Panel (3D Angled) -->
      <polygon points="0,65 0,515 75,450 75,0" fill="url(#box-side)" stroke="#94a3b8" stroke-width="1.5" />
      
      <!-- Side panel markings -->
      <g transform="translate(18, 120)">
        <rect x="0" y="0" width="38" height="6" rx="2" fill="${col.accent}" opacity="0.8" />
        <text x="0" y="30" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="8" font-weight="700" fill="#475569">BATCH NO.</text>
        <text x="0" y="42" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="8" font-weight="600" fill="#64748b">MR26B01</text>
        
        <text x="0" y="65" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="8" font-weight="700" fill="#475569">MFG. DATE</text>
        <text x="0" y="77" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="8" font-weight="600" fill="#64748b">08/2026</text>
        
        <text x="0" y="100" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="8" font-weight="700" fill="#475569">EXP. DATE</text>
        <text x="0" y="112" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="8" font-weight="600" fill="#64748b">07/2028</text>
        
        <!-- Barcode graphics on side -->
        <g transform="translate(0, 150)">
          <line x1="2" y1="0" x2="2" y2="35" stroke="#334155" stroke-width="2" />
          <line x1="7" y1="0" x2="7" y2="35" stroke="#334155" stroke-width="1" />
          <line x1="12" y1="0" x2="12" y2="35" stroke="#334155" stroke-width="3" />
          <line x1="18" y1="0" x2="18" y2="35" stroke="#334155" stroke-width="1" />
          <line x1="23" y1="0" x2="23" y2="35" stroke="#334155" stroke-width="2.5" />
          <line x1="29" y1="0" x2="29" y2="35" stroke="#334155" stroke-width="1" />
          <line x1="34" y1="0" x2="34" y2="35" stroke="#334155" stroke-width="2" />
        </g>
      </g>

      <!-- 3. Front Face (Main Facing Panel) -->
      <polygon points="0,65 305,65 305,515 0,515" fill="url(#box-front)" stroke="#cbd5e1" stroke-width="1.5" filter="url(#drop-shadow)" />

      <!-- Top Header Color Stripe -->
      <polygon points="0,65 305,65 305,82 0,82" fill="${col.accent}" />
      
      <!-- Clean Medical Red Cross Mark & Mars Remedies Heading -->
      <g transform="translate(24, 105)">
        <!-- Hospital Red Cross -->
        <rect x="0" y="4" width="16" height="5" rx="1.5" fill="#e11d27" />
        <rect x="5.5" y="-1.5" width="5" height="16" rx="1.5" fill="#e11d27" />
        <text x="24" y="11" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" font-weight="900" fill="#002060" letter-spacing="1.2">MARS REMEDIES</text>
      </g>
      
      <!-- Rx Symbol & WHO-GMP Badge -->
      <text x="24" y="165" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="20" font-weight="900" fill="#dc2626">Rx</text>
      
      <g transform="translate(195, 145)">
        <rect x="0" y="0" width="86" height="22" rx="11" fill="#ecfdf5" stroke="#6ee7b7" stroke-width="1" />
        <circle cx="12" cy="11" r="3.5" fill="#059669" />
        <text x="49" y="14.5" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="9" font-weight="800" fill="#065f46" text-anchor="middle">WHO-GMP</text>
      </g>

      <!-- Large Bold Pharmaceutical Brand Name -->
      <text x="24" y="215" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="28" font-weight="900" fill="#0f172a" letter-spacing="0.5">${brandSafe}</text>

      <!-- Active Formulation & Composition -->
      <text x="24" y="248" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="12" font-weight="600" fill="#475569">${compSafe}</text>

      <!-- Decorative Divider Ribbon -->
      <line x1="24" y1="272" x2="280" y2="272" stroke="#e2e8f0" stroke-width="1.5" />
      <line x1="24" y1="272" x2="80" y2="272" stroke="${col.accent}" stroke-width="2.5" />

      <!-- Pack Format Pills -->
      <g transform="translate(24, 300)">
        <!-- Dosage Form Pill -->
        <rect x="0" y="0" width="110" height="28" rx="8" fill="${col.light}" stroke="${col.border}" stroke-width="1" />
        <text x="55" y="18" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" font-weight="800" fill="${col.primary}" text-anchor="middle">${formSafe}</text>
        
        <!-- Pack Size Pill -->
        <rect x="120" y="0" width="95" height="28" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1" />
        <text x="167" y="18" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" font-weight="700" fill="#334155" text-anchor="middle">${packSafe}</text>
      </g>

      <!-- Manufacturing Quality Statement -->
      <g transform="translate(24, 370)">
        <text x="0" y="0" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="10" font-weight="700" fill="#64748b" letter-spacing="0.5">THERAPEUTIC CLASS</text>
        <text x="0" y="18" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="12" font-weight="800" fill="#002060">${escapeXml(p.category)}</text>
        
        <text x="0" y="45" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="9" font-weight="500" fill="#94a3b8">Manufactured in a certified pharmaceutical plant</text>
        <text x="0" y="58" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="9" font-weight="500" fill="#94a3b8">under stringent cGMP &amp; ISO standards.</text>
      </g>

      <!-- Bottom Solid Color Accent Base -->
      <polygon points="0,495 305,495 305,515 0,515" fill="${col.primary}" />
      <text x="152" y="509" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="9" font-weight="700" fill="#ffffff" text-anchor="middle" letter-spacing="1">COMMITTED TO BETTER HEALTHCARE</text>
    </g>
  </svg>
  `;
}

async function run() {
  let generatedCount = 0;
  let skippedCount = 0;

  for (const p of products) {
    if (PRESERVED_REALISTIC_AI_PHOTOS.has(p.id)) {
      console.log(`Skipping preserved AI photo: ${p.id} (${p.brandName})`);
      skippedCount++;
      continue;
    }

    const svg = buildSvg(p);
    const pngPath = path.join('public', 'products', `${p.id}.png`);
    const jpgPath = path.join('public', 'products', `${p.id}.jpg`);

    const buffer = Buffer.from(svg);
    await sharp(buffer)
      .png({ quality: 95, compressionLevel: 8 })
      .toFile(pngPath);

    await sharp(buffer)
      .jpeg({ quality: 92 })
      .toFile(jpgPath);

    generatedCount++;
    if (generatedCount % 10 === 0 || generatedCount === products.length - skippedCount) {
      console.log(`Generated ${generatedCount} realistic 3D packs so far...`);
    }
  }

  console.log(`\nCOMPLETED: Generated ${generatedCount} realistic 3D product images. Preserved ${skippedCount} AI studio photographs.`);
}

run().catch(err => {
  console.error('Error generating product images:', err);
  process.exit(1);
});
