# Bolt ⚡

> A modern, full-stack AI-powered code generation platform built with Next.js, tRPC, and Prisma.

Bolt is an advanced web application that enables users to generate, execute, and manage code through AI-powered interactions. It provides secure sandboxed environments for code execution, real-time collaboration, and comprehensive project management.

## 🌟 Features

- **AI-Powered Code Generation**: Generate code using OpenAI's GPT models
- **Secure Code Execution**: Run code safely in sandboxed E2B environments
- **Real-time Processing**: Background job processing with Inngest
- **User Authentication**: Secure authentication with Clerk
- **Project Management**: Organize code generations into projects
- **Usage Tracking**: Built-in credit system and rate limiting
- **Modern UI**: Beautiful, responsive interface with Radix UI and Tailwind CSS
- **Type-Safe API**: Full-stack type safety with tRPC

## 🏗️ Architecture Overview

```mermaid
graph TB
    subgraph "Frontend"
        A[Next.js App Router] --> B[React Components]
        B --> C[tRPC Client]
        C --> D[TanStack Query]
    end
    
    subgraph "Backend"
        E[tRPC Server] --> F[Prisma ORM]
        F --> G[PostgreSQL]
        E --> H[Inngest Jobs]
        H --> I[E2B Sandboxes]
        E --> J[OpenAI API]
    end
    
    subgraph "Auth & Services"
        K[Clerk Auth]
        L[Rate Limiting]
        M[Usage Tracking]
    end
    
    C --> E
    A --> K
    F --> L
    F --> M
    
    style A fill:#0ea5e9
    style G fill:#10b981
    style I fill:#f59e0b
    style J fill:#8b5cf6
```

## 🔄 Application Workflow

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant A as API/tRPC
    participant D as Database
    participant I as Inngest
    participant E as E2B Sandbox
    participant O as OpenAI
    
    U->>F: Create new project
    F->>A: projects.create()
    A->>D: Save project & message
    A->>I: Trigger code-agent job
    A-->>F: Return project ID
    
    I->>O: Generate code
    O-->>I: Return generated code
    I->>E: Execute in sandbox
    E-->>I: Return execution results
    I->>D: Save results & fragments
    I-->>F: Update UI via polling/webhook
    
    U->>F: View results
    F->>A: messages.getMany()
    A->>D: Fetch project messages
    A-->>F: Return messages & fragments
```

## 📁 Project Structure

```
bolt/
├── 📁 prisma/                    # Database schema & migrations
│   ├── schema.prisma             # Database schema definition
│   └── migrations/               # Database migration files
├── 📁 public/                    # Static assets
├── 📁 sandbox-templates/         # E2B sandbox configurations
│   └── nextjs/                   # Next.js sandbox template
├── 📁 src/
│   ├── 📁 app/                   # Next.js App Router
│   │   ├── layout.tsx            # Root layout
│   │   ├── page.tsx              # Home page
│   │   ├── globals.css           # Global styles
│   │   ├── 📁 (home)/           # Home route group
│   │   │   ├── layout.tsx        # Home layout
│   │   │   ├── page.tsx          # Landing page
│   │   │   └── 📁 pricing/       # Pricing page
│   │   ├── 📁 api/              # API routes
│   │   │   ├── 📁 inngest/       # Inngest webhook handler
│   │   │   └── 📁 trpc/          # tRPC API endpoint
│   │   ├── 📁 sign-in/          # Authentication pages
│   │   ├── 📁 sign-up/
│   │   └── 📁 projects/         # Project pages
│   │       └── [projectId]/      # Dynamic project page
│   ├── 📁 components/            # Reusable UI components
│   │   ├── 📁 ui/               # Base UI components (Radix)
│   │   ├── file-explorer.tsx     # File tree component
│   │   ├── tree-view.tsx         # Tree view utilities
│   │   └── 📁 code-view/        # Code display components
│   ├── 📁 generated/             # Generated Prisma client
│   ├── 📁 hooks/                # Custom React hooks
│   ├── 📁 inngest/              # Background job definitions
│   │   ├── client.ts            # Inngest client setup
│   │   ├── functions.ts         # Job function definitions
│   │   └── utils.ts             # Utility functions
│   ├── 📁 lib/                  # Utility libraries
│   │   ├── db.ts                # Database client
│   │   ├── usage.ts             # Usage tracking & rate limiting
│   │   └── utils.ts             # General utilities
│   ├── 📁 modules/              # Feature modules
│   │   ├── 📁 home/             # Home page features
│   │   ├── 📁 messages/         # Message management
│   │   ├── 📁 projects/         # Project management
│   │   └── 📁 usage/            # Usage tracking
│   └── 📁 trpc/                 # tRPC configuration
│       ├── client.tsx           # Client-side tRPC setup
│       ├── init.ts              # tRPC initialization
│       ├── server.tsx           # Server-side tRPC setup
│       └── 📁 routers/          # API route definitions
├── 📄 components.json            # Shadcn/ui configuration
├── 📄 next.config.ts            # Next.js configuration
├── 📄 package.json              # Dependencies & scripts
├── 📄 tailwind.config.js        # Tailwind CSS configuration
└── 📄 tsconfig.json             # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v20 or later)
- **PostgreSQL** database
- **Package manager**: npm, yarn, pnpm, or bun

### 1. Clone the Repository

```bash
git clone https://github.com/Pruthvik-P/bolt.git
cd bolt
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/bolt"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# OpenAI
OPENAI_API_KEY=sk-xxxxx

# E2B Code Interpreter
E2B_API_KEY=e2b_xxxxx

# Inngest
INNGEST_EVENT_KEY=xxxxx
INNGEST_SIGNING_KEY=signkey-xxxxx
```

### 4. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# (Optional) View data in Prisma Studio
npx prisma studio
```

### 5. Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Background Jobs (Inngest)

In a separate terminal, run the Inngest dev server:

```bash
npx inngest-cli@latest dev -u http://localhost:3000/api/inngest
```

This launches the Inngest UI at [http://localhost:8288](http://localhost:8288).

## 🛠️ Development Workflow

### Adding New Features

1. **Database Changes**
   ```bash
   # Modify prisma/schema.prisma
   npx prisma db push
   npx prisma generate
   ```

2. **API Routes**
   - Add procedures to `src/modules/*/server/procedures.ts`
   - Export from `src/trpc/routers/_app.ts`

3. **UI Components**
   - Create in `src/components/`
   - Use existing UI components from `src/components/ui/`

4. **Background Jobs**
   - Define in `src/inngest/functions.ts`
   - Test via Inngest dev UI

### Code Generation Flow

```mermaid
flowchart TD
    A[User Input] --> B{User Authenticated?}
    B -->|No| C[Redirect to Sign In]
    B -->|Yes| D[Check Usage Credits]
    D --> E{Credits Available?}
    E -->|No| F[Show Upgrade Message]
    E -->|Yes| G[Create Project/Message]
    G --> H[Trigger Inngest Job]
    H --> I[Generate Code with OpenAI]
    I --> J[Execute in E2B Sandbox]
    J --> K[Save Results to Database]
    K --> L[Update UI]
    L --> M[Show Results to User]
```

## 📊 Database Schema

```mermaid
erDiagram
    Project ||--o{ Message : has
    Message ||--o| Fragment : contains
    User ||--o{ Project : owns
    User ||--o{ Usage : tracks
    
    Project {
        string id PK
        string name
        string userId FK
        datetime createdAt
        datetime updatedAt
    }
    
    Message {
        string id PK
        string content
        enum role
        enum type
        string projectId FK
        datetime createdAt
        datetime updatedAt
    }
    
    Fragment {
        string id PK
        string messageId FK
        string sandboxUrl
        string title
        json files
        datetime createdAt
        datetime updatedAt
    }
    
    Usage {
        string key PK
        int points
        datetime expire
    }
```

## 🔧 Available Scripts

```bash
# Development
npm run dev              # Start development server with Turbopack
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint

# Database
npx prisma studio        # Open Prisma Studio
npx prisma generate      # Generate Prisma client
npx prisma db push       # Push schema changes
npx prisma db pull       # Pull schema from database
npx prisma migrate dev   # Create and apply migration

# Deployment
vercel --prod           # Deploy to Vercel
```

## 🌐 Deployment

### Vercel (Recommended)

1. **Environment Variables**: Set all required environment variables in Vercel dashboard
2. **Database**: Use a managed PostgreSQL service (Vercel Postgres, Supabase, etc.)
3. **Deploy**: 
   ```bash
   vercel --prod
   ```

### Docker

Build and run with Docker:

```bash
# Build image
docker build -t bolt:latest .

# Run container
docker run -p 3000:3000 --env-file .env bolt:latest
```

## 🔐 Security Features

- **Authentication**: Clerk-powered user authentication
- **Rate Limiting**: Credit-based usage tracking with `rate-limiter-flexible`
- **Input Validation**: Zod schema validation on all inputs
- **Sandboxed Execution**: Secure code execution in E2B containers
- **Environment Isolation**: Separate environments for development and production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check this README and inline code comments
- **Issues**: [GitHub Issues](https://github.com/Pruthvik-P/bolt/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Pruthvik-P/bolt/discussions)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [tRPC](https://trpc.io/) - End-to-end typesafe APIs
- [Prisma](https://prisma.io/) - Next-generation ORM
- [Clerk](https://clerk.com/) - Authentication and user management
- [Inngest](https://inngest.com/) - Background job processing
- [E2B](https://e2b.dev/) - Code execution environments
- [OpenAI](https://openai.com/) - AI-powered code generation

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