const express = require('express');

const router = express.Router();

module.exports = (supabase, crawlerService) => {
  // Start crawler for a user
  router.post('/start', async (req, res) => {
    try {
      const { user_id } = req.body;
      
      // Validate required fields
      if (!user_id) {
        return res.status(400).json({ error: 'User ID is required' });
      }
      
      // Get user
      const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user_id)
        .single();
        
      if (error) throw error;
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      // Start crawler for user
      crawlerService.processUserSweepstakes(user);
      
      res.status(200).json({ message: 'Crawler started successfully' });
    } catch (error) {
      console.error('Error starting crawler:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Stop crawler for a user
  router.post('/stop', async (req, res) => {
    try {
      const { user_id } = req.body;
      
      // Validate required fields
      if (!user_id) {
        return res.status(400).json({ error: 'User ID is required' });
      }
      
      // Stop crawler for user
      if (crawlerService.activeUsers.has(user_id)) {
        const { page } = crawlerService.activeUsers.get(user_id);
        await page.close();
        crawlerService.activeUsers.delete(user_id);
      }
      
      res.status(200).json({ message: 'Crawler stopped successfully' });
    } catch (error) {
      console.error('Error stopping crawler:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Get crawler status for a user
  router.get('/status/:user_id', async (req, res) => {
    try {
      const { user_id } = req.params;
      
      // Check if crawler is active for user
      const isActive = crawlerService.activeUsers.has(user_id);
      
      res.status(200).json({ 
        active: isActive,
        mode: isActive ? crawlerService.activeUsers.get(user_id).mode : null
      });
    } catch (error) {
      console.error('Error getting crawler status:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Update user mode
  router.put('/mode/:user_id', async (req, res) => {
    try {
      const { user_id } = req.params;
      const { mode } = req.body;
      
      // Validate mode
      if (!mode || !['instant', 'non-instant', 'both'].includes(mode)) {
        return res.status(400).json({ error: 'Invalid mode. Must be "instant", "non-instant", or "both"' });
      }
      
      // Update user mode
      const { data, error } = await supabase
        .from('users')
        .update({ mode })
        .eq('id', user_id)
        .select();
        
      if (error) throw error;
      
      if (data.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      // Update active crawler if running
      if (crawlerService.activeUsers.has(user_id)) {
        crawlerService.activeUsers.get(user_id).mode = mode;
      }
      
      res.status(200).json({ message: 'Mode updated successfully', mode });
    } catch (error) {
      console.error('Error updating mode:', error);
      res.status(500).json({ error: error.message });
    }
  });

  return router;
};
