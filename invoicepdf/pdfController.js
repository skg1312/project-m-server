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

const generateQRCode = async (data, filename) => {
  try {
    await qr.toFile(filename, data);
    console.log("QR code generated successfully");
  } catch (error) {
    console.error("Error generating QR code:", error);
    throw error;
  }
};

const generateQRCodeBase64 = async (data) => {
  try {
    const qrCodeData = await qr.toDataURL(data);
    console.log("QR code string generated successfully");
    return qrCodeData;
  } catch (error) {
    console.error("Error generating QR code string:", error);
    throw error;
  }
};

async function generatePdf(info = { filename: 'pdf_file', format: 'A4' }, result, callback) {
  const resultid = result._id;
  const fileId = result._id + '.pdf';
  const targetLocation = `./public/download/${fileId}`;
  const imageLocation = `./public/qrImages/`;
  const logoLocation = `/public/logo/logo.jpg`;
  const publicFolder = path.join(__dirname, '..');
  const logoPath = path.join(publicFolder, logoLocation);

  if (fs.existsSync(targetLocation)) {
    fs.unlinkSync(targetLocation);
  }

  try {
    const qrCodeFilename = result.invoicedetails.invoiceno + ".png";
    const currentDirectory = __dirname;
    const publicFolder = path.join(currentDirectory, '..');
    const imagePath = path.join(publicFolder, imageLocation, qrCodeFilename);
    const qrCodeData = JSON.stringify(result.invoicedetails.ewaybillno);

    await generateQRCode(qrCodeData, imagePath);

    const qrCodeBase64 = await generateQRCodeBase64(`${API}download/${resultid}`);

    console.log('Logo Path:', logoPath);
    ejs.renderFile('./views/pdf/report-template.ejs', {
      invoiceData: result,
      imagePath: qrCodeBase64,
      logoPath: `data:image/jpeg;base64,${fs.readFileSync(logoPath, { encoding: 'base64' })}`,
      moment: moment,
      commaNumber: commaNumber,
      toWords: toWords
    }, function (err, result) {
      if (result) {
        html = result;
      } else {
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
    console.log("Error generating pdf" + error);
  }
}

exports.generatePdf = generatePdf;
