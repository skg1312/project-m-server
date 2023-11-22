const express = require('express');
const router = express.Router();
const Staff = require('../model/staff.model'); // Import your Staff model here

// GET: Retrieve all staff members
router.get('/', async (req, res) => {
  try {
    const staffMembers = await Staff.find();
    res.json(staffMembers);
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving staff members' });
  }
});

// POST: Create a new staff member
router.post('/', async (req, res) => {
  const {
    staffname,
    staffemail,
    staffpassword,
    staffphone,
    staffaccess,
    staffidproof,
    staffofficebranch,
  } = req.body;

  try {
    const newStaffMember = new Staff({
      staffname,
      staffemail,
      staffpassword,
      staffphone,
      staffaccess,
      staffidproof,
      staffofficebranch,
    });
    const savedStaffMember = await newStaffMember.save();
    res.status(201).json(savedStaffMember);
  } catch (err) {
    res.status(400).json({ error: 'Error creating staff member' });
  }
});

// PUT: Update a staff member by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {
    staffname,
    staffemail,
    staffpassword,
    staffphone,
    staffaccess,
    staffidproof,
    staffofficebranch,
  } = req.body;

  try {
    const updatedStaffMember = await Staff.findByIdAndUpdate(
      id,
      {
        staffname,
        staffemail,
        staffpassword,
        staffphone,
        staffaccess,
        staffidproof,
        staffofficebranch,
      },
      { new: true }
    );

    if (!updatedStaffMember) {
      res.status(404).json({ error: 'Staff member not found' });
    } else {
      res.json(updatedStaffMember);
    }
  } catch (err) {
    res.status(500).json({ error: 'Error updating staff member' });
  }
});

// DELETE: Delete a staff member by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedStaffMember = await Staff.findByIdAndDelete(id);

    if (!deletedStaffMember) {
      res.status(404).json({ error: 'Staff member not found' });
    } else {
      res.json(deletedStaffMember);
    }
  } catch (err) {
    res.status(500).json({ error: 'Error deleting staff member' });
  }
});

module.exports = router;
