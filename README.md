# Bolt ⚡

Welcome to Bolt! This project is a Next.js application designed for running tasks, including AI jobs, within secure sandboxed environments using technologies like Inngest and E2B.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or later recommended)
- A package manager: npm, yarn, pnpm, or bun
- Access to a database (e.g., PostgreSQL, MySQL)

## Getting Started

Follow these steps to get your development environment set up and running.

### 1. Clone the Repository

```bash
git clone https://github.com/Pruthvik-P/bolt.git
cd bolt
```

### 2. Install Dependencies

Choose the command that corresponds to your package manager:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

// ...existing code...

### 3. Configure Environment Variables

Create a .env.local file in the project root and add any required variables for your setup (database, API keys, etc.). Example:

```bash
# PowerShell (Windows)
Copy-Item .env.example .env.local
```

Update .env.local with values such as:
- DATABASE_URL=...
- Any keys required by your integrations (e.g., E2B, OpenAI, etc.)

### 4. Run the App Locally

Start the Next.js dev server:

```bash
# Windows (PowerShell or CMD)
npm run dev
# or: yarn dev
# or: pnpm dev
# or: bun dev
```

Open http://localhost:3000 in your browser.

You can start editing the page by modifying app/page.tsx. The page auto-updates as you edit the file.

### 5. Run Inngest locally (CLI)

You can run Inngest’s local dev server alongside the app.

1) Start the app (see step 4).

2) In a separate terminal, run the Inngest CLI pointing to your Inngest handler (Next.js default is /api/inngest):

```bash
# Use npx (recommended to get latest)
npx inngest-cli@latest dev -u http://localhost:3000/api/inngest
```

Notes:
- If your Inngest route differs, replace /api/inngest with the correct URL.
- The CLI launches a local dev UI at http://localhost:8288.

3) Send a test event (optional):

```bash
npx inngest-cli@latest event send -n app/user.created -d "{\"id\":\"123\"}"
```

Troubleshooting:
- If port 8288 is in use, pass -p 8289 (or another port).
- Ensure the Next.js server is running before starting the CLI.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.npx 