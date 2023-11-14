const custom = require('../invoicepdf/pdfController')
const express = require('express');
const router = express.Router();
const Invoice = require('../model/invoice.model'); 


router.get('/:id', async (req, res) => {
  const { invoiceId } = req.params;
  try {
    // const result = await Invoice.findById(invoiceId);
    const result = {
      "companydetails": {
          "companyid": "C001",
          "companyname": "ABC Company",
          "companyregistrationtype": "Private Limited",
          "companypartytype": "Manufacturer",
          "companygstno": "GST123456",
          "companycontact": "John Doe",
          "companycountry": "CountryName",
          "companystate": "StateName",
          "companyofficeaddress": "Office Address, City",
          "companypincode": "12345"
      },
      "sellerdetails": {
          "sellerid": "S001",
          "sellercompanyname": "Seller Company",
          "sellercompanygstno": "GST987654",
          "sellercompanyaddress": "Seller Address, City",
          "sellercompanystatename": "Seller State",
          "sellercompanystatecode": "SSC123"
      },
      "buyerdetails": {
          "buyerid": "B001",
          "buyercompanyname": "Buyer Company",
          "buyercompanygstno": "GST567890",
          "buyercompanyaddress": "Buyer Address, City",
          "buyercompanystatename": "Buyer State",
          "buyercompanystatecode": "BSC456"
      },
      "vehicledetails": {
          "vehicleid": "V001",
          "drivername": "Driver Name",
          "drivernumber": "Driver Phone",
          "driveraddress": "Driver Address, City",
          "driveridproof": "Driver ID Proof",
          "driverlicenseno": "Driver License No",
          "vehiclenumber": "Vehicle Number",
          "vehiclemodel": "Vehicle Model",
          "vehicleofficebranch": "Office Branch"
      },
      "consignmentdetails": {
          "itemdetails": [
              {
                  "itemname": "Item 1",
                  "itemquantity": 10,
                  "itemhsn": "HSN123",
                  "itemprice": 100,
                  "itemtaxrate": "18%",
                  "_id": "654d381daa376f4d39efd1e0"
              },
              {
                  "itemname": "Item 2",
                  "itemquantity": 5,
                  "itemhsn": "HSN456",
                  "itemprice": 50,
                  "itemtaxrate": "12%",
                  "_id": "654d381daa376f4d39efd1e1"
              }
          ]
      },
      "invoicedetails": {
          "invoiceno": "INV123",
          "ewaybillno": "EBN456",
          "invoicedate": "2023-11-10T00:00:00.000Z",
          "deliverynote": "DN789",
          "supplierref": "Supplier Ref",
          "otherref": "Other Ref",
          "buyersorder": "BO987",
          "ordereddate": "2023-11-05T00:00:00.000Z",
          "dispatchdocumentno": "DDN654",
          "deliverynotedate": "2023-11-12T00:00:00.000Z",
          "dispatchthrough": "Courier",
          "destination": "Destination Address",
          "termsandcondition": "Terms and Conditions"
      },
      "boardingdetails": {
          "weight": 500,
          "transportationcost": 1000,
          "totalcost": 1500,
          "dateofloading": "2023-11-15T00:00:00.000Z",
          "startingpoint": "Start Location",
          "endingpoint": "End Location"
      },
      "_id": "654d381daa376f4d39efd1df",
      "__v": 0
  };

    
    if (!result) {
      // res.status(404).json({ error: 'Invoice not found' });
      throw { name: 'Error' };
    } 

   
    await custom.generatePdf(
      { filename: 'pdf_file', format: 'A4' },
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
  // If error is thrown from db
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


