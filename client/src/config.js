const PRODUCTION_API_URL = "https://find-it-server-ivory.vercel.app";
const DEVELOPMENT_API_URL = "http://localhost:3000";

export const API_BASE_URL = (
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? DEVELOPMENT_API_URL : PRODUCTION_API_URL)
).replace(/\/$/, "");
