# Book collection manager
- Full stack 
- E2E typesafe 
- E2E tested

### Quickstart

```
git clone https://github.com/RAV64/book-manager
cd book-manager
cp .env.example .env
npm install
npx prisma db push
npm run dev
```
`npm run dev` is the only command to repeat when re-running the application after initial setup

### Screenshot

<img width="812" alt="image" src="https://user-images.githubusercontent.com/73443709/221399295-7ab460a4-bf91-4397-a438-46472c5195ad.png">

### General project structure

```
prisma
  └─ schema.prisma               # Database structure & config
tests
  └─ index.spec.ts               # E2E tests for index page functionality
src
  ├─ pages                       # Frontend
  |   ├─ api
  |   |   └─ trpc                # http://localhost:3000/api/trpc/*
  |   |       └─ [trpc].ts       # API handler (Router, Context)
  |   ├─ _app.tsx                # App layout
  |   └─ index.tsx               # Index page (http://localhost:3000/)
  ├─ components                  # Custom components
  |   └─ *
  ├─ server                      # Backend
  |   ├─ db.ts                   # Prisma client
  |   └─ api
  |       ├─ routers
  |       |   └─ book.router.ts  # Database router for Book
  |       ├─ trpc.ts             # Init tRPC
  |       └─ root.ts             # Add routers to AppRouter (Book router is added here)
  ├─ schema
  |   └─ book.schema.ts          # Book's schema
  ├─ utils
  |   └─ api.ts                  # Bridge between frontend & backend with AppRouter
  └─ styles
      └─ globals.css             # Global styles & Tailwind
*config*                         # Config files
.env                             # *Need to be manually created* env vars (e.g. for database)
```

### Database schema

```
model Book {
    id          String @unique @default(uuid())
    title       String
    author      String
    description String
}
```

### Testing

- Tests can be ran with `npx playwright test`
- Test reports from latest test can be viewed with `npx playwright show-report`
- Tests can't be ran while the app is running since Playwright needs to enable it for itself

## Stack consists of
- [Next.js](https://nextjs.org)
- [tRPC](https://trpc.io)
- [Prisma](https://prisma.io)
- [SQLite](https://www.sqlite.org/i)

## Other tech
- [Playwright](https://playwright.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com)
- [Zod](https://zod.dev/)


This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.
