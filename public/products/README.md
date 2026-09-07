# Product Photos

Place a realistic pack photo for each formulation in this folder.
The site auto-detects files by product ID and shows them instead of
the illustrated fallback art.

## Naming convention
File name must equal the product id from src/data/products.ts:

- tab-1  ->  tab-1.webp  (or .png / .jpg / .jpeg)
- cap-3  ->  cap-3.png
- syp-12 ->  syp-12.webp
- inj-7  ->  inj-7.webp
- ... 112 products: tab-1..tab-39, cap-1..etc (see src/data/products.ts -> id field)

The lookup tries in order: .webp -> .png -> .jpg -> .jpeg, and falls back
to the illustrated pack art when no file exists.

## Requirements
- 900x900 or 1024x1024, white background recommended
- Show the primary pack (blister, bottle, vial, tube) clearly
- Brand name must be legible on the photo itself; the site also overlays
  a branded nameplate (randName) on the image wrapper.
- Optimize to < 250 KB per image (use https://squoosh.app/ or sharp).

## Bulk workflow (DALL-E / Midjourney / Bing Image Creator)
1. Generate with a prompt like:
   ''photorealistic pharmaceutical medicine packaging, {CATEGORY} {DOSAGE_FORM}, white studio background, soft shadow, pack label clearly showing "{BRAND_NAME}" and "{COMPOSITION}", FOP label clean, WHO-GMP compliant look''
2. Save as {id}.webp into this folder.
3. Push: git add public/products; git commit -m ''Add product photos''; git push

Until you add a file, the illustrated SVG pack art remains visible.

