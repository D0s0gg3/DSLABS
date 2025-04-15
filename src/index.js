const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { createClient } = require('@supabase/supabase-js');
const { supabaseConfig } = require('./config/config');

// Initialize Supabase client
const supabase = createClient(supabaseConfig.url, supabaseConfig.key);

// Import routes
const userRoutes = require('./routes/userRoutes');
const entriesRoutes = require('./routes/entriesRoutes');
const crawlerRoutes = require('./routes/crawlerRoutes');

// Import crawler service
const CrawlerService = require('./services/crawlerService');

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Initialize crawler service
const crawlerService = new CrawlerService(supabase);
crawlerService.initialize().catch(err => {
  console.error('Failed to initialize crawler service:', err);
});

// Routes
app.use('/api/users', userRoutes(supabase));
app.use('/api/entries', entriesRoutes(supabase));
app.use('/api/crawler', crawlerRoutes(supabase, crawlerService));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
