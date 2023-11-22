
const express = require("express");
const app = express();
app.use(express.static('public'));
const ejs = require("ejs");
const pdf = require("html-pdf");
const path = require("path");
const qr = require("qrcode");
const fs = require("fs");



exports.generatePdf = async (
  info = { filename: 'pdf_file', format: 'A4' },
  result,
  callback
) => {
  // console.log("result: ", result);
  const fileId = info.filename + '-' + result._id + '.pdf';
  // console.log("fileId: ", fileId);
  const targetLocation = `./public/download/${fileId}`;
  const imageLocation = `./public/qrImages/`;

  // if PDF already exist, then delete it and create new PDF
  if (fs.existsSync(targetLocation)) {
    fs.unlinkSync(targetLocation);
  }

  // Create a function to generate QR code and save it to a file
const generateQRCode = async (data, filename) => {
  try {
      await qr.toFile(filename, data);
      console.log("QR code generated successfully");
  } catch (error) {
      console.error("Error generating QR code:", error);
      throw error;
  }
};

// Create a function to generate QR code and return base64 string
const generateQRCodeBase64 = async (data) => {
  try {
      const qrCodeData = await qr.toDataURL(data);
      console.log("QR code string generated successfully");
      // console.log("qrCodeData",qrCodeData);
      return qrCodeData;
  } catch (error) {
      console.error("Error generating QR code string:", error);
      throw error;
  }
};


try {
  const qrCodeFilename = result.invoicedetails.invoiceno + ".png";
  // Get the current directory (invoicePdf folder)
  const currentDirectory = __dirname;

  // Navigate up to public folder from invoicePdf folder
  const publicFolder = path.join(currentDirectory, '..');
  const imagePath = path.join(publicFolder, imageLocation, qrCodeFilename);
  const qrCodeData = JSON.stringify(result.invoicedetails.ewaybillno);


  // Generate QR code image
  await generateQRCode(qrCodeData, imagePath);

  // Generate QR code and get base64 string
  const qrCodeBase64 = await generateQRCodeBase64(result.invoicedetails.invoiceno);

  // render pdf html
  ejs.renderFile('./views/pdf/report-template.ejs', { invoiceData: result, imagePath: qrCodeBase64 }, function(err, result) {
    // render on success
      if (result) {
        html = result;
    }
    else {
      return console.log('An error occurred during render ejs ' + err);
    }
  });

  let options = {
    format: info.format,																					
    orientation: 'portrait',
    border: '12mm', 
  };
  //  pdf.create(html, {
  //     format: info.format,																					
  //     orientation: 'portrait',
  //     border: '12mm',
  //   })
    pdf.create(html, options)
    .toFile(targetLocation, function (error) {
      if (error) return console.log('this pdf create error ' + error);                                                                                       
      if (callback) callback(targetLocation);
    });
  } catch (error) {
    console.log("Error generating QR code");
  }
};