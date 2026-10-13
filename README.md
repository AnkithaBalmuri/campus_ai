# CampusCare — Intelligent Campus Complaint Portal

A Next.js App Router application for role-separated Student, Worker, and Administrator complaint workflows.

## Features

- Secure username/password registration and login using bcrypt hashes and signed HTTP-only sessions.
- Server-side role authorization for dashboards and mutation routes.
- MongoDB-backed complaints, history, worker assignments, and persistent notifications.
- Student and worker complaint submission with validation, attachments, language selection, and browser voice-to-text fallback.
- Administrator review, worker assignment, status updates, and user listing.
- English, Telugu, Hindi, Tamil, Kannada, and Malayalam navigation dictionary with persisted display language.
- Optional Groq summaries and Cloudinary image uploads; both degrade safely when unset.

## Local setup

1. Copy `.env.example` to `.env.local`.
2. Set the required values:
   - `MONGODB_URI`, `SESSION_SECRET`, `ADMIN_SIGNUP_CODE`
3. Optional: set Cloudinary variables for uploads and Groq variables for AI summaries.
4. Install and run:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Checks

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

## Deployment to Vercel

Import the GitHub repository in Vercel, add every variable from `.env.example` in **Settings → Environment Variables**, and deploy. In MongoDB Atlas, allow the Vercel deployment to connect using an appropriate network rule and least-privileged database user. Do not commit `.env.local`.

## Limitations without configuration

The landing and auth pages render without secrets, but registration/login require MongoDB and `SESSION_SECRET`. Image uploads require Cloudinary. AI summaries require Groq. Browser voice recognition availability depends on the user’s browser and microphone permission.
