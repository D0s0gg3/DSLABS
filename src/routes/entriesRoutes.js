const express = require('express');
const { supabase } = require('../config/supabase');

const router = express.Router();

module.exports = (supabase) => {
  // Get all entries
  router.get('/', async (req, res) => {
    try {
      const { user_id } = req.query;
      
      let query = supabase.from('entries').select('*');
      
      if (user_id) {
        query = query.eq('user_id', user_id);
      }
      
      const { data, error } = await query;
        
      if (error) throw error;
      
      res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching entries:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Get entry by ID
  router.get('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { data, error } = await supabase
        .from('entries')
        .select('*')
        .eq('id', id)
        .single();
        
      if (error) throw error;
      
      if (!data) {
        return res.status(404).json({ error: 'Entry not found' });
      }
      
      res.status(200).json(data);
    } catch (error) {
      console.error(`Error fetching entry ${req.params.id}:`, error);
      res.status(500).json({ error: error.message });
    }
  });

  // Create new entry
  router.post('/', async (req, res) => {
    try {
      const { user_id, website, type, progress_current, progress_total } = req.body;
      
      // Validate required fields
      if (!user_id || !website || !type) {
        return res.status(400).json({ error: 'User ID, website, and type are required' });
      }
      
      // Create new entry
      const { data, error } = await supabase
        .from('entries')
        .insert([
          { 
            user_id, 
            website, 
            date: new Date().toISOString(),
            type,
            progress_current: progress_current || 1,
            progress_total: progress_total || 1,
            last_entry_timestamp: new Date().toISOString()
          }
        ])
        .select();
        
      if (error) throw error;
      
      res.status(201).json(data[0]);
    } catch (error) {
      console.error('Error creating entry:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Update entry
  router.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { progress_current, progress_total, last_entry_timestamp } = req.body;
      
      // Update entry
      const { data, error } = await supabase
        .from('entries')
        .update({ 
          progress_current, 
          progress_total,
          last_entry_timestamp: last_entry_timestamp || new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select();
        
      if (error) throw error;
      
      if (data.length === 0) {
        return res.status(404).json({ error: 'Entry not found' });
      }
      
      res.status(200).json(data[0]);
    } catch (error) {
      console.error(`Error updating entry ${req.params.id}:`, error);
      res.status(500).json({ error: error.message });
    }
  });

  // Delete entry
  router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      
      // Delete entry
      const { error } = await supabase
        .from('entries')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      res.status(204).send();
    } catch (error) {
      console.error(`Error deleting entry ${req.params.id}:`, error);
      res.status(500).json({ error: error.message });
    }
  });

  return router;
};
