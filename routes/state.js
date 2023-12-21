const express = require('express');
const router = express.Router();
const State = require('../model/state.model');

router.get('/', async (req, res) => {
  try {
    const states = await State.find();
    res.json(states);
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving states' });
  }
});

router.post('/', async (req, res) => {
  const { statename, statecode } = req.body;

  try {
    const newState = new State({ statename, statecode });
    const savedState = await newState.save();
    res.status(201).json(savedState);
  } catch (err) {
    res.status(400).json({ error: 'Error creating state' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { statename, statecode } = req.body;

  try {
    const updatedState = await State.findByIdAndUpdate(
      id,
      { statename, statecode },
      { new: true }
    );

    if (!updatedState) {
      res.status(404).json({ error: 'State not found' });
    } else {
      res.json(updatedState);
    }
  } catch (err) {
    res.status(500).json({ error: 'Error updating state' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedState = await State.findByIdAndDelete(id);

    if (!deletedState) {
      res.status(404).json({ error: 'State not found' });
    } else {
      res.json(deletedState);
    }
  } catch (err) {
    res.status(500).json({ error: 'Error deleting state' });
  }
});

module.exports = router;
