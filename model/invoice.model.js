const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    companydetails: {
        companyname: String,
        companyregistrationtype: String,
        companypartytype: String,
        companygstno: String,
        companycontact: String, 
        companycountry: String,
        companystate: String,
        companyofficeaddress: String,
        companypincode: String, 
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
        drivername: String,
        drivernumber: String,
        driveraddress: String,
        driveridproof: String,
        driverlicenseno: String,
        vehiclenumber: String,
        vehiclemodel: String,
        vehicleofficebranch: String,
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
        ewaybillno: String,
        invoicedate: Date,
        deliverynote: String,
        termsofpayment: String,
        supplierref: String,
        otherref: String,
        buyersorder: String,
        ordereddate: Date,
        dispatchdocumentno: String,
        deliverynotedate: Date,
        dispatchthrough: String,
        destination: String,
        termsandcondition: String,
    },
    boardingdetails: {
        lrno: String,
        weight: Number,
        transportationcost: Number,
        totalcost: Number,
        dateofloading: Date,
        startingpoint: String,
        endingpoint: String,
        watermark: String,  
    }
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
