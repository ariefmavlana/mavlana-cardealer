# 🏎️ Mavlana Car Dealer (Premium Edition)

![Mavlana Dark Luxury](https://img.shields.io/badge/Style-Dark%20Luxury-050505?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Cloudflare R2](https://img.shields.io/badge/Cloudflare-R2-orange?style=for-the-badge&logo=cloudflare)

**Mavlana Car Dealer** is a state-of-the-art automotive marketplace platform built with the **"Zero Cost Stack"** philosophy. It features a stunning **"Dark Luxury"** UI designed to captivate high-end clientele, powered by modern web technologies for blazing fast performance.

---

## ✨ Key Features

### 🎨 Visual Excellence ("Dark Luxury")
*   **Immersive Hero Section**: Cinematic video backgrounds and high-res static imagery with gradient overlays.
*   **Glassmorphism UI**: Frosted glass effects on navigation, filters, and cards (`backdrop-blur-xl`).
*   **Premium Typography**: Curated pairing of *Cinzel* (Headers) and *Outfit* (Body) for an elegant reading experience.
*   **Gold Accents**: Sophisticated `Mavlana Gold` (#D4AF37) highlights for a true luxury feel.

### 🛠️ The "Zero Cost" Tech Stack
Built to run completely free on hobby tiers without sacrificing power:
*   **Framework**: [Next.js 15 (App Router)](https://nextjs.org/) - Server Components & Actions.
*   **Database**: [Neon (Serverless Postgres)](https://neon.tech/) + [Prisma ORM](https://www.prisma.io/).
*   **Storage**: [Cloudflare R2](https://www.cloudflare.com/developer-platform/r2/) - S3-compatible object storage (Zero Egress Fees).
*   **CDN/Proxy**: [Cloudflare Workers](https://workers.cloudflare.com/) - Custom proxy for SSL and caching on `*.workers.dev`.
*   **AI**: [Google Gemini 1.5 Flash](https://deepmind.google/technologies/gemini/) - Intelligent vehicle descriptions and chat.
*   **Auth**: [NextAuth.js (v5)](https://authjs.dev/) - Secure authentication.
*   **Email**: [Nodemailer](https://nodemailer.com/) - SMTP email delivery (via Gmail/Zoho free tier).

---

## 🚀 Getting Started

### Prerequisites
*   Node.js 20+ or Bun 1.1+
*   Cloudflare Account (for R2 & Workers)
*   Neon Database URL
*   Google AI Studio Key

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/ariefmavlana/mavlana-cardealer.git
    cd mavlana-cardealer
    ```

2.  **Install Dependencies**
    ```bash
    bun install
    ```

3.  **Environment Setup**
    Copy `.env.example` to `.env` and fill in your secrets:
    ```env
    # Database
    DATABASE_URL="postgres://..."

    # Cloudflare R2 & Worker
    S3_ENDPOINT="https://<account_id>.r2.cloudflarestorage.com"
    S3_BUCKET_NAME="mavlana-cardealer"
    NEXT_PUBLIC_IMGIX_URL="https://cdn.your-worker.workers.dev"

    # AI
    GOOGLE_GENERATIVE_AI_API_KEY="AIza..."
    ```

4.  **Database Migration & Seed**
    ```bash
    bunx prisma db push
    bunx prisma db seed
    ```

5.  **Run Development Server**
    ```bash
    bun dev
    ```

    Open [http://localhost:3000](http://localhost:3000) to see the magic. ✨

---

## 📂 Project Structure

*   `src/app`: Next.js App Router pages.
*   `src/components`:
    *   `homepage`: Hero, Features, Latest Arrivals (Frontend).
    *   `inventory`: Classified Cards, Filters.
    *   `layouts`: Header (Glass), Footer (Minimal).
    *   `ui`: Reusable UI components (Buttons, Inputs).
*   `src/lib`: Utilities for S3, Prisma, AI, etc.
*   `prisma`: Database schema and seed scripts.

---

## 🎨 Design Philosophy

> *"The Art of Motion"*

We moved away from generic white dashboards to a bold, cinematic experience.
*   **Primary**: Rich Black (`#050505`)
*   **Surface**: Glass Charcoal (`#1A1A1A` with 80% opacity)
*   **Text**: Off-White (`#F5F5F5`) & Muted Gray (`#A3A3A3`)
*   **Accent**: Mavlana Gold (`#D4AF37`)

---

## 🤝 Contribution

Feel free to fork and submit PRs. Let's build the most beautiful car dealer template together.

---

**by Arief Mavlana**
