const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    companydetails: {
        companyid: String, 
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
        sellerid: String,
        sellercompanyname: String,
        sellercompanygstno: String,
        sellercompanyaddress: String,
        sellercompanystatename: String,
        sellercompanystatecode: String,
    },
    buyerdetails: {
        buyerid: String,
        buyercompanyname: String,
        buyercompanygstno: String,
        buyercompanyaddress: String,
        buyercompanystatename: String,
        buyercompanystatecode: String,
    },
    vehicledetails: {
        vehicleid: String,
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
                itemtaxrate: String,
              },
            ],
          },        

    invoicedetails: {
        invoiceno: String,
        ewaybillno: String,
        invoicedate: Date,
        deliverynote: String,
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
        weight: Number,
        transportationcost: Number,
        totalcost: Number,
        dateofloading: Date,
        startingpoint: String,
        endingpoint: String,
    },
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
