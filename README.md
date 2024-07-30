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

## The Theory Behind OAuth - Step-by-Step Explanation of OAuth Workflow (Our app <=> GitHub)

1. **User Initiates Sign-Up:**

   - The user clicks the "Sign in with GitHub" button in our application.
   - The user's browser sends a request to our backend server.

2. **Redirect to GitHub:**

   - Our server recognizes the user's intent to sign up and redirects the user's browser to GitHub's authorization page.
   - The redirect URL includes our GitHub OAuth app's client ID.

3. **GitHub Authorization Page:**

   - GitHub presents a page asking the user if they authorize our application to access their profile information.
   - The user consents by clicking "Authorize".

4. **Redirection Back to Your App:**

   - After authorization, GitHub redirects the user's browser back to our application.
   - This redirection includes an authorization code in the query string.

5. **Handle Authorization Code:**

   - Our application receives the authorization code via a route handler.
   - This route handler extracts the code from the query string.

6. **Exchange Code for Access Token:**

   - Our server makes a request to GitHub, including the authorization code, client ID, and client secret.
   - GitHub validates these and responds with an access token.

7. **Access User Information:**

   - Our server uses the access token to make an authenticated request to GitHub's API to fetch the user's profile information (name, email, profile image, etc.).

8. **Create User Record:**

   - The user's profile information is stored in our application's database (in our case by using a Prisma adapter).
   - A new user record is created if one doesn't exist (automatically).

9. **Send Cookie to Browser:**

   - Our server sends a cookie to the user's browser.
   - This cookie contains encrypted information identifying the user.

10. **Subsequent Requests:**

    - When the user's browser makes subsequent requests to our server, the cookie is automatically included.
    - Our server reads the cookie to identify the user and handle the request accordingly.

## Why should we work on our initial design?

Working on the initial design of our app is crucial for several reasons. We've successfully set up our authentication system and ensured that we can handle user sign-ins and sign-outs effectively. Now, it's time to move forward with the rest of our application by focusing on `upfront` design. This phase involves more initial design work than you might typically do for other apps, but it's essential.

**Here's why this step is important:**

1. **Preventing Deployment Issues:** In our previous work, we encountered strange behavior when running our application in production mode, mainly due to the full root cache mechanism. We had to backtrack and identify all the locations where data changes occurred and then call the revalidatePath function to ensure our server re-renders the specific pages with updated data. Addressing this caching mechanism at the beginning rather than at the end of the project makes it significantly easier and prevents the need for extensive code modifications later.

2. **Easier Caching Management:** Dealing with caching systems upfront simplifies the process. Handling these considerations early on makes it more manageable and reduces complexity when deploying the application.

3. **Route Identification and Data Display:** By examining our mockups and identifying all the different routes our application needs, we can plan the data to be displayed on each screen. This step ensures that we understand the data flow and structure from the outset, making the rest of the development process smoother.

4. **Overall Project Efficiency:** Going through this initial design process can make the entire project more straightforward and efficient. Although it may seem like extra work initially, it ultimately saves time and effort by preventing future issues and streamlining development.

**Here is recommended initial design:**

1. Identify all the different routes you want your app to have and the data that each shows.
2. Make `path helper` functions.
3. Create your routing folders and `page.tsx` files based on step #1
4. Identify the places where data changes in your app.
5. Make empty server actions for each of those.
6. Add in comments on what paths you will need to revalidate for each server action.

## Form validations with Zod lib

To add validation to our form fields, we're going to use a third-party package called `Zod`. Zod is a powerful library for schema-based validation, and we'll be referencing it using the variable `z`, once we import it.

First, we will create a schema object using Zod, which will define a set of validation rules for our data. Zod allows us to validate various data types such as arrays, objects, strings, numbers, and booleans.

**Example Create Topic Form:**

For our specific use case, we'll define a schema for an object with two properties: `name` and `description`.

`Name`: Must be a string with at least three characters, consisting only of lowercase letters and optional dashes. Any other characters, such as numbers, capital letters, or symbols, will cause the validation to fail.
`Description`: Must be a string with a minimum length of ten characters.
After defining the schema, we'll get a validator object that we can use to validate user input or any other data in our application.

To get started, we'll install `Zod` by running

```js
> npm install zod
```

Then, we'll create our schema, and integrate the validation into our project.

## Recursive component

Let's look at `<CommentList/>` and `<CommentShow/>`.

**`<CommentList/>` Component:** Acts as a wrapper that manages and displays the overall list of comments.

**`<CommentShow/>` Component:** Responsible for rendering each individual comment. The complexity arises from the fact that comments can be nested infinitely, allowing replies to comments, which in turn can have their own replies.

**Recursive Nature of `<CommentShow/>` component**

Recursive Component: `<CommentShow/>` is a recursive component, meaning it calls itself to handle nested comments.

**Parent-Child Relationship:** Comments are structured in a tree-like format using parent IDs. Each comment can have child comments, indicated by their parent ID.

**Rendering Process:**

`<CommentList/>` identifies top-level comments (those with a parent ID of null). It renders `<CommentShow/>` for each top-level comment. `<CommentShow/>` then finds and renders its child comments by calling itself with the child comment IDs. This recursive rendering continues until there are no more child comments to display.

**Example:** Four comments are shown, with the first comment having replies (children) with IDs 2 and 3, and a separate comment with ID 4.

```js
const comments = [
	{ id: 1 },
	{ id: 2, parentId: 1 },
	{ id: 3, parentId: 1 },
	{ id: 4 },
];
```

**Database Representation:** Comments are represented in the database with parent-child relationships, facilitating the recursive display.

**Implementation Strategy**

Two Strategies:

- **Using Props:** A classic method of passing data down through props.
- **Next.js Feature:** An alternative, less smooth method showcasing an interesting feature in Next.js.

## Fetching and Sharing Comments in a Recursive Component

**Implementation Steps:**

1. **Fetch Comments by Post ID:** Create a commentQuery file with a new type and a query function `fetchCommentsByPostId`. The query function retrieves comments and their authors from the database, including the author's name and profile image.

```js
export type CommentWithAuthor = Comment & {
	user: {
		name: string | null,
		image: string | null,
	},
};

export const fetchCommentsByPostId = (
	postId: string
): Promise<CommentWithAuthor[]> => {
	return db.comment.findMany({
		where: { postId },
		include: { user: { select: { name: true, image: true } } },
	});
};
```

2. **Pass Data Using Props:** Import the query function into the `<PostShowPage/>` component and pass it down to the `<CommentList/>` component as a `fetchData` prop.
   `<CommentList/>` calls the `fetchData` function to get the list of comments and passes this list down to the `<CommentShow/>` components using props.

3. **Define Types and Props:** Define the `CommentWithAuthor` type, which includes both the comment and the author's information.
   Ensure the `<CommentList/>` and `<CommentShow/>` components are set up to receive and handle the comments as props.

4. **Display Comments and Replies:** `<CommentList/>` identifies top-level comments and renders `<CommentShow/>` for each, passing the respective comment ID.
   `<CommentShow/>` **recursively** renders nested comments by calling itself with child comment IDs, forming an infinitely nested list.

Although the initial implementation using props is functional and effective, but we can also use interesting Next.js feature to optimize the setup further.

In the second approach, the focus is on optimizing the fetching of comments by ensuring that multiple identical requests are consolidated into a single execution. This is achieved using `request memoization` with React's `cache` function.

**Steps:**

1. Import Cache: Import the cache function from React at the top of the file.
2. Wrap Fetch Function: Wrap the `fetchCommentsByPostId` function with cache to enable memoization.

```js
import { cache } from 'react';
import type { Comment } from '@prisma/client';
import { db } from '@/db';

export type CommentWithAuthor = Comment & {
	user: {
		name: string | null,
		image: string | null,
	},
};

export const fetchCommentsByPostId = cache(
	(postId: string): Promise<CommentWithAuthor[]> => {
		return db.comment.findMany({
			where: { postId },
			include: { user: { select: { name: true, image: true } } },
		});
	}
);
```

This ensures that even if fetchCommentsByPostId is called multiple times with the same arguments, it will only execute once. Subsequent calls will return the cached result.

**Benefits:**

- Efficiency: Reduces redundant database queries, saving resources and improving performance.
- Consistency: Ensures that all components receive the same data when making identical requests.
- This approach leverages React's built-in caching mechanism to optimize data fetching, ensuring efficient and consistent responses across multiple component calls.

# Summary

The best practices learned throughout the development of this application are - efficient project planning, static site generation, performance optimization, and reusable data-fetching patterns.

**Key Takeaways**

1. Preplanning Server Actions: Designing and stubbing server actions ahead of time significantly reduces development time and effort. Initial focus on understanding form state hooks and validation helped streamline the process.

2. Building Application Regularly: Regularly building the application in the terminal provides insights into the structure and behavior of routes. Ensures that the application remains static and avoids unintended dynamic rendering.

3. Using Suspense for Component Streaming: Wrapping slow-loading components with Suspense enables component streaming. This results in a better user experience by reducing load times for data-heavy components.

4. Query Function Data Fetching Pattern: Implementing query functions in a dedicated database folder centralizes data loading responsibilities. This approach facilitates reusable components, making the codebase cleaner and more maintainable. Using the query function pattern avoids multiple components for different data-fetching implementations and reduces complexity.

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
