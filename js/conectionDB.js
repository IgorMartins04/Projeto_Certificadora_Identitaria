import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = "https://nwgcsdldnmihfullqlbs.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53Z2NzZGxkbm1paGZ1bGxxbGJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5NDcxNDksImV4cCI6MjA3OTUyMzE0OX0.2WFWvatgMks_CB-Ws_yG7GOohgQm2s6-o4KaCPD25aw";
const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };