const downloadPdf = require('../invoicepdf/downloadPdf')
const express = require('express');
const router = express.Router();


router.route('/:id').get(function (req, res) {
  const invoiceId = req.params;
  downloadPdf(req, res, invoiceId);
});

module.exports = router;