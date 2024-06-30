import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://ovtfhhoftywbsafwjvux.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92dGZoaG9mdHl3YnNhZndqdnV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ0ODU4MzEsImV4cCI6MjAyMDA2MTgzMX0.UzP5xjOAXP6T4XeLYfIzZMfoRZcQm6mVBFqcsHTvy0w";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
