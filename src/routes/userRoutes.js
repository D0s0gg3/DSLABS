const express = require('express');
const { supabase } = require('../config/supabase');

const router = express.Router();

module.exports = (supabase) => {
  // Get all users
  router.get('/', async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*');
        
      if (error) throw error;
      
      res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Get user by ID
  router.get('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single();
        
      if (error) throw error;
      
      if (!data) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      res.status(200).json(data);
    } catch (error) {
      console.error(`Error fetching user ${req.params.id}:`, error);
      res.status(500).json({ error: error.message });
    }
  });

  // Create new user
  router.post('/', async (req, res) => {
    try {
      const { name, email, address, phone, dob, gender, occupation, mode } = req.body;
      
      // Validate required fields
      if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
      }
      
      // Check if user already exists
      const { data: existingUser } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();
        
      if (existingUser) {
        return res.status(409).json({ error: 'User with this email already exists' });
      }
      
      // Create new user
      const { data, error } = await supabase
        .from('users')
        .insert([
          { 
            name, 
            email, 
            address, 
            phone, 
            dob, 
            gender, 
            occupation, 
            mode: mode || 'both' 
          }
        ])
        .select();
        
      if (error) throw error;
      
      res.status(201).json(data[0]);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Update user
  router.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email, address, phone, dob, gender, occupation, mode } = req.body;
      
      // Update user
      const { data, error } = await supabase
        .from('users')
        .update({ 
          name, 
          email, 
          address, 
          phone, 
          dob, 
          gender, 
          occupation, 
          mode 
        })
        .eq('id', id)
        .select();
        
      if (error) throw error;
      
      if (data.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      res.status(200).json(data[0]);
    } catch (error) {
      console.error(`Error updating user ${req.params.id}:`, error);
      res.status(500).json({ error: error.message });
    }
  });

  // Delete user
  router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      
      // Delete user
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      res.status(204).send();
    } catch (error) {
      console.error(`Error deleting user ${req.params.id}:`, error);
      res.status(500).json({ error: error.message });
    }
  });

  return router;
};
