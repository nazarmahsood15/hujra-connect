# Hujra Connect — Starter

Next.js 15 (App Router) + TypeScript + Tailwind CSS starter scaffold, built to match the
design system from the demo (vouch-chain trust visual, teal/marigold/brass palette).

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## What's already wired up

- `src/app/page.tsx` — landing page
- `src/app/marketplace/page.tsx` — client-side search & filter, calling `/api/workers`
- `src/app/workers/[id]/page.tsx` — worker profile with the VouchChain component
- `src/app/dashboard/{customer,worker,admin}/page.tsx` — three dashboard shells
- `src/app/api/workers/*` — route handlers currently backed by `src/lib/mock-data.ts`
- `prisma/schema.prisma` — the real data model (User, WorkerProfile, Vouch, Booking)

## Next steps to make this real

1. **Database** — provision Postgres (Supabase/Neon/RDS), set `DATABASE_URL`, run
   `npm run prisma:migrate`. Replace the functions in `src/lib/mock-data.ts` with
   `prisma.workerProfile.findMany(...)` calls — the API routes don't need to change shape.
2. **Auth** — add phone OTP (Twilio) + Google/Facebook via NextAuth or Firebase Auth;
   gate `/dashboard/*` routes with a session check in `middleware.ts`.
3. **Realtime** — add a Socket.IO (or Pusher) server for chat and live worker tracking;
   the `booking` status field in the schema already models the states the UI expects.
4. **Payments** — integrate JazzCash/Easypaisa server-side, Stripe for diaspora payments;
   model escrow as a `Payment` table with milestone rows referencing `Booking`.
5. **File storage** — Cloudinary or S3 for portfolio images/videos and proof-of-work photos.
6. **Split services** — as it grows, move booking/payment logic into a separate NestJS
   service and have Next.js call it, rather than growing the route handlers indefinitely.
