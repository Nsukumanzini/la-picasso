import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabasePublishableKey) {
  throw new Error("Missing public Supabase configuration.");
}

// This client deliberately uses the browser-safe publishable key. Privileged
// service-role credentials must never be included in the website.
export const supabase = createClient(supabaseUrl, supabasePublishableKey);
