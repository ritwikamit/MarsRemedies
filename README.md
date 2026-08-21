# Mars Remedies - Pharmaceutical Website

A modern, responsive website for **Mars Remedies** - a WHO-GMP & ISO 9001:2015 certified pharmaceutical company based in Patna (A.O.) & Baddi (H.O.).

## Features

- **Responsive Design** - Works seamlessly on mobile, tablet, and desktop
- **Dark/Light Mode** - User preference with system detection
- **Product Catalog** - Browse therapeutic categories and formulations
- **Trade Enquiry System** - Integrated inquiry forms with email integration
- **Company Information** - About, Quality Assurance, Certifications
- **SEO Optimized** - Meta tags, structured data, sitemap
- **Accessibility** - WCAG 2.1 compliant, keyboard navigation

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS 4
- **Animations**: Motion (Framer Motion)
- **Icons**: Lucide React
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/ritwikamit/MarsRemedies.git
cd MarsRemedies

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

Output will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
MarsRemedies/
├── public/                 # Static assets
│   ├── logo.svg           # Company logo (SVG)
│   └── logo.png           # Company logo (PNG - add your logo here)
├── src/
│   ├── components/        # React components
│   │   ├── Logo.tsx       # Logo component (uses your logo image)
│   │   ├── Navbar.tsx     # Navigation header
│   │   ├── Hero.tsx       # Hero section
│   │   ├── ProductGrid.tsx
│   │   ├── ProductCard.tsx
│   │   ├── CategoryCards.tsx
│   │   ├── AboutSection.tsx
│   │   ├── TrustStrip.tsx
│   │   ├── CTASection.tsx
│   │   ├── ContactSection.tsx
│   │   ├── FeaturedProducts.tsx
│   │   ├── WhyChooseUs.tsx
│   │   ├── ProductModal.tsx
│   │   ├── ProductFilters.tsx
│   │   ├── ProductVisual.tsx
│   │   └── SectionHeading.tsx
│   ├── pages/             # Page components
│   │   ├── Home.tsx
│   │   ├── Products.tsx
│   │   ├── ProductDetail.tsx
│   │   ├── Categories.tsx
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── PrivacyPolicy.tsx
│   │   ├── TermsOfService.tsx
│   │   └── NotFound.tsx
│   ├── context/
│   │   └── ThemeContext.tsx  # Dark/Light theme management
│   ├── data/
│   │   ├── products.ts    # Product catalog data
│   │   └── company.ts     # Company configuration
│   ├── types/
│   │   └── index.ts       # TypeScript interfaces
│   ├── App.tsx            # Main app component
│   ├── main.tsx           # Entry point
│   └── index.css          # Global styles
├── index.html             # HTML template
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript configuration
├── package.json           # Dependencies
└── .gitignore
```

## Adding Your Logo

Place your logo file in the `public` folder:

- **Recommended**: `public/logo.svg` (vector, scales perfectly)
- **Alternative**: `public/logo.png` (high-res PNG, min 500px width)

The `Logo.tsx` component automatically detects and uses your logo file.

## Environment Variables

Create a `.env.local` file for local development:

```env
# Optional: Email service configuration
VITE_EMAIL_SERVICE=your_service
VITE_EMAIL_TEMPLATE=your_template
VITE_EMAIL_PUBLIC_KEY=your_key

# Optional: Analytics
VITE_GA_ID=G-XXXXXXXXXX
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub (this repo: `ritwikamit/MarsRemedies`)
2. Import project in [Vercel Dashboard](https://vercel.com/dashboard)
3. Vercel auto-detects Vite + React
4. Deploy!

**Build Command**: `npm run build`  
**Output Directory**: `dist`  
**Install Command**: `npm install`

### Other Platforms

- **Netlify**: Connect repo, build command `npm run build`, publish `dist`
- **GitHub Pages**: Use `gh-pages` package or GitHub Actions
- **Docker**: Use Node.js base image, run `npm run build` and serve with nginx

## Company Information

- **Company**: Mars Remedies
- **Certifications**: WHO-GMP, ISO 9001:2015
- **Locations**: Patna (Administrative Office), Baddi (Head Office)
- **Email**: info@marsremedies.com

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server on port 3000 |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | TypeScript type checking |
| `npm run clean` | Remove build artifacts |

## License

Proprietary - All rights reserved by Mars Remedies.

## Contact

For trade enquiries: info@marsremedies.com