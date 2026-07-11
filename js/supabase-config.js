/* ============================================================
   supabase-config.js — Supabase Client configuration
   Replace the placeholders below with your Supabase credentials
   ============================================================ */

const SUPABASE_URL = "YOUR_SUPABASE_URL";
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";

let supabaseClient = null;

if (SUPABASE_URL !== "YOUR_SUPABASE_URL" && SUPABASE_ANON_KEY !== "YOUR_SUPABASE_ANON_KEY") {
  try {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log("Supabase Client initialized successfully.");
  } catch (error) {
    console.error("Error initializing Supabase:", error);
  }
} else {
  console.warn("Supabase credentials not configured yet. Using mock local storage fallback.");
}
