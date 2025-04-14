// Firebase configuration for push notifications
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Supabase configuration
const supabaseConfig = {
  url: "https://nbqgkbgojoebdqbqmxkt.supabase.co",
  key: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5icWdrYmdvam9lYmRxYnFteGt0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NDY1NjE5NiwiZXhwIjoyMDYwMjMyMTk2fQ.-pWcP9DdtOmGSeBBLEQnkC572Yll6BA2icU8bTMSBAw",
  // Using service role key for backend operations
  // Database schema is defined in supabase.sql
};

module.exports = {
  firebaseConfig,
  supabaseConfig
};
