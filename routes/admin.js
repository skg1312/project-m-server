const express = require('express');
const router = express.Router();
const Admin = require('../model/admin.model'); 

// GET: Retrieve all admins
router.get('/', async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving admins' });
  }
});

// POST: Create a new admin
router.post('/', async (req, res) => {
  const { adminname, adminemail, adminpassword } = req.body;

  try {
    const newAdmin = new Admin({ adminname, adminemail, adminpassword });
    const savedAdmin = await newAdmin.save();
    res.status(201).json(savedAdmin);
  } catch (err) {
    res.status(400).json({ error: 'Error creating admin' });
  }
});

// PUT: Update an admin by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { adminname, adminemail, adminpassword } = req.body;

  try {
    const updatedAdmin = await Admin.findByIdAndUpdate(
      id,
      { adminname, adminemail, adminpassword },
      { new: true }
    );

    if (!updatedAdmin) {
      res.status(404).json({ error: 'Admin not found' });
    } else {
      res.json(updatedAdmin);
    }
  } catch (err) {
    res.status(500).json({ error: 'Error updating admin' });
  }
});

// DELETE: Delete an admin by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedAdmin = await Admin.findByIdAndDelete(id);

    if (!deletedAdmin) {
      res.status(404).json({ error: 'Admin not found' });
    } else {
      res.json(deletedAdmin);
    }
  } catch (err) {
    res.status(500).json({ error: 'Error deleting admin' });
  }
});

module.exports = router;
