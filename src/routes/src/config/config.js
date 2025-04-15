// Firebase configuration for push notifications
const firebaseConfig = {
  apiKey: "AIzaSyAq0c73dOWGIoPFmdH-yZs_Y5REWbVI9Xk",
  authDomain: "aisweeper-c2b70.firebaseapp.com",
  projectId: "aisweeper-c2b70",
  storageBucket: "aisweeper-c2b70.firebasestorage.app",
  messagingSenderId: "888360501628",
  appId: "1:888360501628:web:d2195c357c4a7f13cbe4f9"
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
