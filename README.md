## NextUI Wireup

1. Execute the following command in your terminal from the root folder.

```js
npm install --save-exact @nextui-org/react@2.2.9 framer-motion
```

We won't be using the `framer-motion` library directly, but the NextUI library utilizes it.

2. Once, installed nextUi package go to the `tailwind.config.ts` file inside of our root project directory. Import `nextui`:

```js
import { nextui } from '@nextui-org/react';
```

Next, we'll add an entry to our content array that instructs Tailwind to search the NextUI directory for all `{js, ts, jsx, tsx}` files, read them, and extract the class names. Additionally, we'll add `darkMode: "class"` above the plugins section. Finally, we'll call the `nextui` method within our plugins array.

```js
const config: Config = {
	content: [
		...
		// nextui wireup -  this is IMPORTANT
		'./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
	],
  ...
  darkMode:"class",
  plugins:[nextui()]
}
```

3. Next go to app folder and create a new file - `./src/app/providers.tsx`

```js
'use client';

import { NextUIProvider } from '@nextui-org/react';

interface ProvidersProps {
	children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
	return <NextUIProvider>{children}</NextUIProvider>;
}
```

4. Next we should import this component to our `layout.tsx` file and wrap its children with `<Providers>{children}</Providers>` component.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
