const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    companydetails: {
        companyname: String,
        companyregistrationtype: String,
        companypartytype: String,
        companygstno: String,
        companycontact: String, 
        companystate: String,
        companystatecode: String, 
        companyofficeaddress: String,
    },
    sellerdetails: {
        sellercompanyname: String,
        sellercompanygstno: String,
        sellercompanyaddress: String,
        sellercompanystatename: String,
        sellercompanystatecode: String,
    },
    buyerdetails: {
        buyercompanyname: String,
        buyercompanygstno: String,
        buyercompanyaddress: String,
        buyercompanystatename: String,
        buyercompanystatecode: String,
    },
    vehicledetails: {
        drivernumber: Number,
        vechiclenumber: String,
        vechiclemodel: String,
    },
  consignmentdetails: {
            itemdetails: [
              {
                itemname: String,
                itemquantity: Number,
                itemhsn: String,
                itemprice: Number,
                itemtaxrate: Number,
              },
            ],
          },        

    invoicedetails: {
        invoiceno: String,
        invoicedate: Date,
    },
    boardingdetails: {
        lrno: String,
        weight: Number,
        transportationcost: Number,
        dateofloading: Date,
        startingpoint: String,
        endingpoint: String,
        watermark: String,  
    },
    
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
