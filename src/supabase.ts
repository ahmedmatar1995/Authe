import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qcxzeqzivbyggzmnwcxm.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjeHplcXppdmJ5Z2d6bW53Y3htIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgxMDg1ODYsImV4cCI6MjAyMzY4NDU4Nn0.cgU0ccsIuK_JxGygEzOVLCR2wlWyXUg0kZ2BhyHl6Ws";

export const supabase = createClient(supabaseUrl, supabaseKey);
