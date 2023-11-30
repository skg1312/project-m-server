const express = require("express");
const app = express();
const ejs = require("ejs");
const pdf = require("html-pdf");
const path = require("path");
const qr = require("qrcode");
const fs = require("fs");
const moment = require('moment');
const commaNumber = require('comma-number');
const { ToWords } = require('to-words');

app.use(express.static('public'));

var API = process.env.DOWNLOAD_BASE_URL || `https://squid-app-og92j.ondigitalocean.app/`;

const toWords = new ToWords({
  localeCode: 'en-IN',
  converterOptions: {
    currency: true,
    ignoreDecimal: false,
    ignoreZeroCurrency: false,
    doNotAddOnly: false,
    currencyOptions: {
      name: 'Rupee',
      plural: 'Rupees',
      symbol: '₹',
      fractionalUnit: {
        name: 'Paisa',
        plural: 'Paise',
        symbol: '',
      },
    }
  }
});

exports.generatePdf = async (
  info = { filename: 'pdf_file', format: 'A4' },
  result,
  callback
) => {
  // console.log("result: ", result);
  const resultid = result._id;
  const fileId = result._id + '.pdf';
  // console.log("fileId: ", fileId);
  const targetLocation = `./public/download/${fileId}`;
  const imageLocation = `./public/qrImages/`;
  const logoLocation = `./public/logo/logo.jpg`;
  const publicFolder = path.join(__dirname, '..');
  const logoPath = path.join(publicFolder, logoLocation);

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
  const qrCodeBase64 = await generateQRCodeBase64(`${API}download/${resultid}`);
  console.log(qrCodeBase64);

  console.log('Logo Path:', logoPath);
  // render pdf html
  ejs.renderFile('./views/pdf/report-template.ejs', {
     invoiceData: result,
     imagePath: qrCodeBase64,
     logoPath: `data:image/jpeg;base64,${fs.readFileSync(logoPath, { encoding: 'base64' })}`,
     moment: moment,
     commaNumber: commaNumber,
     toWords: toWords}, function(err, result) {
    // render on success
      if (result) {
        html = result;
    }
    else {
      return console.log('An error occurred during render ejs ' + err);
    }
  });

  let options = {
    "height": "14.25in",
    "width": "11.25in",
    "header": {
        "height": "0mm"
    },
    "footer": {
        "height": "0mm",
    },
    childProcessOptions: {
      env: {
        OPENSSL_CONF: '/dev/null',
      },
    }
  };
      pdf.create(html, options)
      .toFile(targetLocation, function (error) {
        if (error) return console.log('this pdf create error ' + error);                                                                                      
        if (callback) callback(targetLocation);
      });
    } catch (error) {
      console.log("Error generating QR code" + error);
    }
  };