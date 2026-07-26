<p align="center">
  <img src="https://img.icons8.com/fluency/96/potted-plant.png" alt="VerdantNest Logo" width="80" />
</p>

<h1 align="center">🌿 VerdantNest</h1>

<p align="center">
  <strong>Premium Botanical E-Commerce & Plant Care Platform</strong>
</p>

<p align="center">
  <em>Architect your living space with expertly curated indoor plants, rare species, and AI-powered botanical care.</em>
</p>

<p align="center">
  <a href="#features"><img src="https://img.shields.io/badge/Plants-55%2B%20Species-2ecc71?style=for-the-badge&logo=pagespeedinsights&logoColor=white" alt="Plants" /></a>
  <a href="#tech-stack"><img src="https://img.shields.io/badge/Next.js-15.5-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" /></a>
  <a href="#tech-stack"><img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" /></a>
  <a href="#ai-features"><img src="https://img.shields.io/badge/AI-Gemini%202.5-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Gemini AI" /></a>
  <a href="#tech-stack"><img src="https://img.shields.io/badge/Firebase-Firestore-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase" /></a>
  <a href="#license"><img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License" /></a>
</p>

<br />

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [AI Features](#-ai-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Scripts](#-scripts)
- [Pages & Routes](#-pages--routes)
- [Design System](#-design-system)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌱 Overview

**VerdantNest** is a modern, full-stack botanical e-commerce platform built with Next.js 15 and powered by Google's Gemini AI. It offers a premium shopping experience for plant enthusiasts — featuring a curated catalog of 55+ species, an AI Plant Doctor for diagnostics, interactive care guides, and a sleek admin dashboard with AI-powered SEO tools.

> _"Cultivating Serenity Since 2020"_

---

## ✨ Features

### 🛒 E-Commerce
- **55+ Curated Plant Species** across 8 categories (Indoor, Outdoor, Succulents, Bonsai, Herbs, and more)
- **Advanced Filtering** — Filter by category, care difficulty, and sunlight requirements
- **Shopping Cart & Wishlist** — Persistent across sessions via `localStorage`
- **Full Checkout Flow** — Shipping address, payment input, and real-time order sync to Firestore
- **Lightning Deals & Promo Codes** — Seasonal discounts with promo banner

### 📖 Content & Guides
- **Botanical Blog** — Journal-style articles with category tags, read times, and newsletter signup
- **Interactive Care Guides** — Watering, Lighting, Pest Control, Repotting, and Climate tips
- **Sustainability Page** — Carbon neutral commitment, peat-free soil, circular packaging

### 🏢 Admin Dashboard
- **Dark-themed Admin HQ** — Revenue analytics with Recharts area & bar charts
- **Product Manager** — Full specimen auditor with AI SEO meta tag auto-generation
- **Order Tracker** — Real-time order monitoring synced with Firestore
- **AI Content Studio** — Auto-generate keyword-rich blog posts and care articles

---

## 🤖 AI Features

Powered by **Google Genkit** + **Gemini 2.5 Flash** with Zod schema validation and intelligent fallback heuristics:

| Feature | Description |
|---------|-------------|
| 🩺 **AI Plant Doctor** | Upload a photo + describe symptoms → get severity assessment, 3-5 recovery steps, prognosis, and prevention tips |
| 🏷️ **SEO Meta Generator** | Auto-creates optimized meta titles, descriptions, and alt text for product listings |
| ✍️ **Blog Content Generator** | Generates full botanical articles based on topic, tone, length, and target keywords |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | [Next.js 15.5](https://nextjs.org/) (App Router, Turbopack, Server Actions) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **UI Library** | [React 19](https://react.dev/) |
| **Styling** | [Tailwind CSS 3.4](https://tailwindcss.com/) + Custom HSL Design Tokens |
| **UI Components** | [Radix UI](https://www.radix-ui.com/) Primitives (35+ components) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **AI Engine** | [Google Genkit](https://firebase.google.com/docs/genkit) + Gemini 2.5 Flash |
| **Backend** | [Firebase](https://firebase.google.com/) (Firestore, Auth) |
| **Charts** | [Recharts](https://recharts.org/) |
| **Forms** | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) |
| **Carousel** | [Embla Carousel](https://www.embla-carousel.com/) |

---

## 📁 Project Structure

```
verdantnest/
├── public/                  # Static assets
├── src/
│   ├── ai/                  # Genkit AI flows
│   │   ├── flows/
│   │   │   ├── diagnose-plant.ts          # AI Plant Doctor
│   │   │   ├── automate-product-seo-meta-tags.ts
│   │   │   └── generate-seo-blog-content.ts
│   │   ├── genkit.ts        # Genkit configuration
│   │   └── dev.ts           # Genkit dev server
│   ├── app/
│   │   ├── page.tsx         # Homepage
│   │   ├── layout.tsx       # Root layout + metadata
│   │   ├── globals.css      # Design tokens & custom styles
│   │   ├── shop/            # Product catalog with filters
│   │   ├── products/[slug]/ # Dynamic product pages (SSR + JSON-LD)
│   │   ├── ai-doctor/       # AI Plant Diagnostic tool
│   │   ├── care-guides/     # Interactive care guides
│   │   ├── blog/            # Botanical journal
│   │   ├── cart/            # Shopping cart
│   │   ├── checkout/        # Checkout flow
│   │   ├── wishlist/        # Saved favorites
│   │   ├── admin/           # Admin HQ dashboard
│   │   ├── about/           # Brand story
│   │   ├── contact/         # Contact form (Firestore)
│   │   ├── sustainability/  # Eco commitments
│   │   ├── privacy/         # Privacy policy
│   │   ├── terms/           # Terms of service
│   │   ├── lib/             # Data & utilities
│   │   └── types/           # TypeScript types
│   ├── components/
│   │   ├── Navbar.tsx       # Glassmorphism floating nav
│   │   ├── Logo.tsx         # Custom SVG brand logo
│   │   ├── ProductCard.tsx  # Reusable product card
│   │   └── ui/              # 35+ Radix UI primitives
│   ├── firebase/            # Firebase config & providers
│   ├── hooks/               # Custom React hooks
│   └── lib/                 # Shared utilities
├── .env                     # Environment variables (DO NOT COMMIT)
├── tailwind.config.ts       # Tailwind + design tokens
├── next.config.ts           # Next.js configuration
├── package.json
└── tsconfig.json
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) **18+**
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A [Google AI Studio](https://aistudio.google.com/) API key (for AI features)

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/verdantnest.git
cd verdantnest

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Then add your API keys to .env (see below)

# Start the development server
npm run dev
```

The app will be available at **http://localhost:9002**

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
# Google Gemini AI (Required for AI features)
GEMINI_API_KEY=your_gemini_api_key_here

# Firebase (Optional — for order sync & contact forms)
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

> ⚠️ **Never commit your `.env` file.** It's already in `.gitignore`.

---

## 📜 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with Turbopack (port 9002) |
| `npm run build` | Create production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript type checking |
| `npm run genkit:dev` | Start Genkit AI dev server |
| `npm run genkit:watch` | Start Genkit with hot reload |

---

## 🗺️ Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage — Hero, Best Sellers, Deals, Categories |
| `/shop` | Full catalog with multi-faceted filtering |
| `/products/[slug]` | Product detail with Schema.org structured data |
| `/ai-doctor` | AI Plant Doctor — photo upload + symptom analysis |
| `/care-guides` | Interactive botanical care guides |
| `/blog` | Botanical journal with articles |
| `/cart` | Shopping cart |
| `/checkout` | Checkout with Firestore order sync |
| `/wishlist` | Saved favorites |
| `/admin` | Admin HQ — Dashboard, Products, Orders, SEO Tools |
| `/contact` | Contact form (synced to Firestore) |
| `/about` | Brand story & philosophy |
| `/sustainability` | Environmental commitments |

---

## 🎨 Design System

VerdantNest uses a custom HSL-based design token system:

| Token | Value | Usage |
|-------|-------|-------|
| **Background** | `hsl(30 20% 98%)` | Warm creamy white base |
| **Primary** | `hsl(158 35% 10%)` | Deep forest green |
| **Secondary** | `hsl(142 60% 45%)` | Vibrant botanical green |
| **Accent** | `hsl(142 45% 95%)` | Soft mint tint |

**Typography**: Plus Jakarta Sans (headlines) · Inter (body)  
**Geometry**: Soft rounded corners (2rem–5rem), glassmorphism cards, pill buttons

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 🚀 DevOps & Deployment Architecture

This project implements a full GitOps-based CI/CD pipeline:

```
┌─────────────┐    ┌──────────┐    ┌─────────────┐    ┌──────────┐    ┌───────────┐
│  Developer  │───▶│  GitHub  │───▶│  Jenkins CI │───▶│   ECR    │    │    EKS    │
│  git push   │    │   Repo   │    │ Build/Test  │    │  Docker  │    │  Cluster  │
└─────────────┘    └────┬─────┘    │ Push to ECR │    │  Images  │    └─────┬─────┘
                        │          └──────┬──────┘    └──────────┘          │
                        │                 │                                 │
                        │          ┌──────▼──────┐                          │
                        └─────────▶│   ArgoCD    │─────────────────────────▶│
                                   │  GitOps CD  │   Sync K8s manifests    │
                                   └─────────────┘                   ┌─────▼─────┐
                                                                     │Prometheus │
                                                                     │ + Grafana │
                                                                     └───────────┘
```

### Pipeline Flow

| Stage | Tool | Action |
|-------|------|--------|
| **Local Test** | Minikube | Validate K8s manifests locally (zero cost) |
| **Containerize** | Docker | Multi-stage build → standalone Next.js image |
| **Infra** | Terraform | Provision VPC, ECR, EKS, Jenkins EC2, ArgoCD, Monitoring |
| **CI** | Jenkins | Build → Test → Push image to ECR → Update manifest |
| **CD** | ArgoCD | Watch Git repo → Auto-sync deployments to EKS |
| **Monitor** | Prometheus/Grafana | Pod metrics, request rates, dashboards |
| **Teardown** | Terraform | `terraform destroy` — stops all billing |

### Quick Start

```bash
# Sequence 2 — Docker
docker build -t verdantnest .
docker run -p 3000:3000 --env-file .env verdantnest

# Sequence 3 — Minikube
minikube start
minikube image load verdantnest
kubectl apply -f k8s/
minikube service verdantnest-service

# Sequence 4 — AWS Infrastructure
cd infra && terraform init && terraform apply

# Sequence 10 — Destroy (stops billing)
cd infra && terraform destroy
```

### Cost Safety

- 🕐 `terraform apply` only when actively demoing
- 💰 EKS node: `t3.small` | Jenkins: `t2.micro` (Free Tier)
- 🚨 Set AWS Budget alert at $10-15
- 🧹 Always tear down via `terraform destroy`

---

<p align="center">
  Made with 💚 by the VerdantNest Botanical Team
</p>
