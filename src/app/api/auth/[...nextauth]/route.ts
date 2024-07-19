/**
 * These functions implement API request handlers within our Next.js app.
 * Typically, we don't need to create these when working solely within our
 * Next.js application, as we usually use server actions to interact with
 * our server for data changes or retrieval. Route handlers like these are
 * generally unnecessary for personal use and are only needed when an external
 * server needs to access our app programmatically. For instance, GitHub will
 * reach out to our app to handle authentication at specific points in time.
 */

export { GET, POST } from '@/auth';
