const custom = require('../invoicepdf/pdfController')
const express = require('express');
const router = express.Router();
const Invoice = require('../model/invoice.model'); 

router.get('/:id', async (req, res) => {
  var invoiceId = req.params.id;
  try {
    const result = await Invoice.findById(invoiceId);
  
    // Throw error if no result
    if (!result) {
      throw { name: 'Error' };
    } 

    var companyid = result.companydetails.companyid;
   // Continue process if result is returned
    await custom.generatePdf(
      { filename: companyid, format: 'A4' },
      result,
      async (fileLocation) => {
        return res.download(fileLocation, (error) => {
          if (error)
            res.status(500).json({
              success: false,
              result: null,
              message: "Couldn't find file",
              error: error.message,
            });
        });
      }
    ); 
} catch (error) {
  // If error is thrown from DB
  if (error.name == 'Error') {
    return res.status(400).json({
      success: false,
      result: null,
      error: error.message,
      message: 'Data not available',
    });
  } else if (error.name == 'BSONTypeError') {
 
    return res.status(400).json({
      success: false,
      result: null,
      error: error.message,
      message: 'Invalid ID',
    });
  } else {
    // Server Error
    console.log(error);
    return res.status(500).json({
      success: false,
      result: null,
      error: error.message,
      message: error.message,
    });
  }
}

});

module.exports = router;


