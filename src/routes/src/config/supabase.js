// Supabase configuration
const supabaseConfig = {
  url: "https://nbqgkbgojoebdqbqmxkt.supabase.co",
  key: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5icWdrYmdvam9lYmRxYnFteGt0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2NTYxOTYsImV4cCI6MjA2MDIzMjE5Nn0._xGGchBRn_b4ed7xDVZolgaz-csyDYO-GODuG4Ti62o"
};

// Create Supabase client
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(supabaseConfig.url, supabaseConfig.key);

module.exports = {
  supabase,
  supabaseConfig
};
