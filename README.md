# CodeArena 🚀

CodeArena is a high-performance, full-stack coding practice platform designed for developers to sharpen their algorithmic skills. Built with the latest Next.js 15 features, it provides a seamless, LeetCode-inspired experience with real-time code execution, progress tracking, and a stunning modern UI.

![CodeArena Hero](https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop)

## ✨ Features

- **💻 Interactive Code Execution**: In-browser coding with real-time feedback, powered by a distributed Judge0 execution engine.
- **📊 Comprehensive Profile System**: Track your progress with detailed statistics, success rates, and solved problem archives.
- **📚 Curated Playlists**: Organize problems into custom collections to focus your study sessions.
- **📜 Submission History**: Review your past attempts with detailed metrics on execution time, memory usage, and status.
- **🛡️ Secure Sandboxing**: Every submission runs in an isolated, resource-limited container for maximum safety.
- **🌓 Dark Mode & Glassmorphism**: A premium, aesthetically pleasing UI with smooth gradients and modern design principles.
- **🔐 Robust Authentication**: Secure user management and onboarding powered by Clerk.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [Prisma ORM](https://www.prisma.io/)
- **Authentication**: [Clerk](https://clerk.com/)
- **Execution Engine**: [Judge0](https://judge0.com/) & [RapidJudge0CE](https://rapidapi.com/judge0-official/api/judge0-ce)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)
- **API Client**: [Axios](https://axios-http.com/)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Clerk API Keys
- Judge0 Instance (Local or Remote)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/codearena.git
   cd codearena
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up Environment Variables**
   Create a `.env` file in the root directory and add the following:

   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/codearena"
   NEXT_PUBLIC_CLERK_PUBLISHED_KEY=your_key
   CLERK_SECRET_KEY=your_key
   NEXT_PUBLIC_JUDGE0_API_URL=your_judge0_url
   ```

4. **Initialize Database**

   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**

   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```text
├── app/                  # Next.js App Router (pages & layouts)
├── components/           # Reusable UI components (Shadcn)
├── lib/                  # Shared utilities (db, utils)
├── modules/              # Feature-based modules
│   ├── auth/             # Authentication logic & actions
│   ├── home/             # Homepage components
│   ├── problems/         # Problem engine, tables, & history
│   └── profile/          # User profile components & actions
├── prisma/               # Database schema
└── public/               # Static assets
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
