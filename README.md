This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Site navigation

Primary menu order (desktop and mobile):

1. Home — `/`
2. Team — `/team`
3. Portfolio — `/portfolio` (Ipswich, Spain, Italy deep-dives)
4. Thesis — `/thesis`
5. Approach — `/approach`

Utility controls in the top bar (after nav links): theme toggle, **LP Access**.

## Archived pages & tools

These are **not shown in the main menu** but remain in the codebase for internal review or future restore:

| Item | Access | Notes |
|------|--------|--------|
| Track Record | [/track-record](http://localhost:3000/track-record) | TIA Ventures portfolio grid + Clara Vista Fund I cards |
| Fonts picker | — | `src/components/FontCompare.tsx` — re-add `<FontCompare />` in `Topbar.tsx` |
| Colors picker | — | `src/components/ColorCompare.tsx` — re-add `<ColorCompare />` in `Topbar.tsx` |

To restore a page or tool to the top bar, add it back in `src/components/Topbar.tsx`.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
