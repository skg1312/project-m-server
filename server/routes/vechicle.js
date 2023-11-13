const express = require('express');
const router = express.Router();
const Vechicle = require('../model/vechicle.model'); // Import your Vechicle model here

// GET: Retrieve all vechicles
router.get('/', async (req, res) => {
  try {
    const vechicles = await Vechicle.find();
    res.json(vechicles);
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving vechicles' });
  }
});

// POST: Create a new vechicle
router.post('/', async (req, res) => {
  const {
    vechicleid,
    drivername,
    drivernumber,
    driveraddress,
    driveridproof,
    driverlicenseno,
    vechiclenuumber,
    vechiclemodel,
    vechicleofficebranch,
  } = req.body;

  try {
    const newVechicle = new Vechicle({
      vechicleid,
      drivername,
      drivernumber,
      driveraddress,
      driveridproof,
      driverlicenseno,
      vechiclenuumber,
      vechiclemodel,
      vechicleofficebranch,
    });
    const savedVechicle = await newVechicle.save();
    res.status(201).json(savedVechicle);
  } catch (err) {
    res.status(400).json({ error: 'Error creating vechicle' });
  }
});

// PUT: Update a vechicle by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {
    vechicleid,
    drivername,
    drivernumber,
    driveraddress,
    driveridproof,
    driverlicenseno,
    vechiclenuumber,
    vechiclemodel,
    vechicleofficebranch,
  } = req.body;

  try {
    const updatedVechicle = await Vechicle.findByIdAndUpdate(
      id,
      {
        vechicleid,
        drivername,
        drivernumber,
        driveraddress,
        driveridproof,
        driverlicenseno,
        vechiclenuumber,
        vechiclemodel,
        vechicleofficebranch,
      },
      { new: true }
    );

    if (!updatedVechicle) {
      res.status(404).json({ error: 'Vechicle not found' });
    } else {
      res.json(updatedVechicle);
    }
  } catch (err) {
    res.status(500).json({ error: 'Error updating vechicle' });
  }
});

// DELETE: Delete a vechicle by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedVechicle = await Vechicle.findByIdAndDelete(id);

    if (!deletedVechicle) {
      res.status(404).json({ error: 'Vechicle not found' });
    } else {
      res.json(deletedVechicle);
    }
  } catch (err) {
    res.status(500).json({ error: 'Error deleting vechicle' });
  }
});

module.exports = router;
