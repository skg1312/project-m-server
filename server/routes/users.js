const express = require('express');
const router = express.Router();
const User = require('../model/user.model'); // Import your User model here

// GET: Retrieve all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving users' });
  }
});

// POST: Create a new user
router.post('/', async (req, res) => {
  const {
    username,
    useremail,
    userpassword,
    userphone,
    useraccess,
    useridproof,
    useraddress,
  } = req.body;

  try {
    const newUser = new User({
      username,
      useremail,
      userpassword,
      userphone,
      useraccess,
      useridproof,
      useraddress,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ error: 'Error creating user' });
  }
});

// PUT: Update a user by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {
    username,
    useremail,
    userpassword,
    userphone,
    useraccess,
    useridproof,
    useraddress,
  } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        username,
        useremail,
        userpassword,
        userphone,
        useraccess,
        useridproof,
        useraddress,
      },
      { new: true }
    );

    if (!updatedUser) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(updatedUser);
    }
  } catch (err) {
    res.status(500).json({ error: 'Error updating user' });
  }
});

// DELETE: Delete a user by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(deletedUser);
    }
  } catch (err) {
    res.status(500).json({ error: 'Error deleting user' });
  }
});

module.exports = router;
