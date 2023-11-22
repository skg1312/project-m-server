const express = require('express');
const router = express.Router();
const Company = require('../model/company.model'); // Import your Company model here

// GET: Retrieve all companies
router.get('/', async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving companies' });
  }
});

// POST: Create a new company
router.post('/', async (req, res) => {
  const {
    companyid,
    companyname,
    companyregistrationtype,
    companypartytype,
    companygstno,
    companycontact,
    companycountry,
    companystate,
    companyofficeaddress,
    companypincode,
  } = req.body;

  try {
    const newCompany = new Company({
      companyid,
      companyname,
      companyregistrationtype,
      companypartytype,
      companygstno,
      companycontact,
      companycountry,
      companystate,
      companyofficeaddress,
      companypincode,
    });
    const savedCompany = await newCompany.save();
    res.status(201).json(savedCompany);
  } catch (err) {
    res.status(400).json({ error: 'Error creating company' });
  }
});

// PUT: Update a company by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {
    companyid,
    companyname,
    companyregistrationtype,
    companypartytype,
    companygstno,
    companycontact,
    companycountry,
    companystate,
    companyofficeaddress,
    companypincode,
  } = req.body;

  try {
    const updatedCompany = await Company.findByIdAndUpdate(
      id,
      {
        companyid,
        companyname,
        companyregistrationtype,
        companypartytype,
        companygstno,
        companycontact,
        companycountry,
        companystate,
        companyofficeaddress,
        companypincode,
      },
      { new: true }
    );

    if (!updatedCompany) {
      res.status(404).json({ error: 'Company not found' });
    } else {
      res.json(updatedCompany);
    }
  } catch (err) {
    res.status(500).json({ error: 'Error updating company' });
  }
});

// DELETE: Delete a company by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCompany = await Company.findByIdAndDelete(id);

    if (!deletedCompany) {
      res.status(404).json({ error: 'Company not found' });
    } else {
      res.json(deletedCompany);
    }
  } catch (err) {
    res.status(500).json({ error: 'Error deleting company' });
  }
});

module.exports = router;
