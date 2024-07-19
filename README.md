## NextUI Wireup.

1. Execute the following command in your terminal from the root folder:

```js
	> npm install --save-exact @nextui-org/react@2.2.9 framer-motion
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

## Prisma Client WireUp - sqlite provider.

1. Execute the following command in your terminal from the root folder:

```js
	> npm install prisma
```

2. Init client prisma with the following command:

```js
	> npx prisma init --datasource-provider sqlite
```

After running this command, the `./prisma` folder should appear in the root directory of your project. And inside of this folder you can find `schema.prisma` file.

3. Once you define your desired schema, and write some models. You can create a DB by running the following command(when you first going to run this command you are going to be asked to name your migration):

```js
	> npx prisma migrate dev
```

After completing this command you should see inside of your `./prisma` folder - `dev.db` file - your local data base.

4. Next create inside of your `src` folder `db/index.ts` folder and initialize your DB.

```js
import { PrismaClient } from '@prisma/client';

export const db = new PrismaClient();
```

This `db` object we export is going to have a ton of different methods on it, which you can use later to interact with your DB.

## Next-auth / Authjs (authentication) Wireup (I am going to use GitHub provider in this app to Signup/Login).

### There are several steps to setup our Next-auth:

1. Create an OAuth app and generate a `client_id` and `client_secret` by following this url - `github.com/settings/applications/new`.

2. Add `AUTH_SECRET`, `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` to a `.env.local` file.

3. Install these packages:

   - @auth/core@0.18.1
   - @auth/prisma-adapter@1.0.6
   - next-auth@5.0.0-beta.3

4. Make an `auth.js` file in the `src` folder. Setup NextAuth and the PrismaAdapter in there. [See here](https://github.com/SergiiBurgazlieiev/debate-app/blob/main/src/auth.ts)

5. Setup the `app/api/auth/[...nextauth]/routes.ts` file to handle the requests between GitHub's servers and ours. [See here](https://github.com/SergiiBurgazlieiev/debate-app/blob/main/src/app/api/auth/%5B...nextauth%5D/route.ts)

6. Create server actions to signin/signout the user.

## How to setup DEV OAuth App with Github

1. Go to [Register a new OAuth application Page](https://github.com/settings/applications/new);
2. Fill - Homepage URL input with - `http://localhost:3000`
3. Fill - Authorization callback URL - `http://localhost:3000/api/auth/callback/github`
4. Register Application

After you register your OAuth app you will be redirected to the `General` page, where you can see a section with the client_id and client secrets, which you can then generate. Right after this you can create `.env.local` file in your root folder and define three env vars(make sure you spell them in exact way as you see below):

- `GITHUB_CLIENT_ID`
- `GITHUB_CLIENT_SECRET`
- `AUTH_SECRET`

Example of your `.env.local` file:

```js
// GITHUB_CLIENT_ID comes from our GitHub OAuth app
GITHUB_CLIENT_ID = 'Ov23wioysPsQdUdOnrjr';
// GITHUB_CLIENT_SECRET comes from our GitHub OAuth app
GITHUB_CLIENT_SECRET = '72a16w2c40967958eff9y50e263c2d0c5050ce12';
// AUTH_SECRET can be any string with chars and numbers
AUTH_SECRET = '1nlnkn3jnkjvekdmldfvne234nvcnweojr';
```

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
