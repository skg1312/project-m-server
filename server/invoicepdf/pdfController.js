let pdf = require('html-pdf');
const ejs = require('ejs');
const fs = require('fs');


exports.generatePdf = async (
  info = { filename: 'pdf_file', format: 'A4' },
  result,
  callback
) => {
  const fileId = info.filename + '-' + result._id + '.pdf';
  const targetLocation = `./public/download/${fileId}`;

  // if PDF already exist, then delete it and create new PDF
  if (fs.existsSync(targetLocation)) {
    fs.unlinkSync(targetLocation);
  }

  // render pdf html
  ejs.renderFile('./views/pdf/report-template.ejs', {invoiceData: result}, function(err, result) {
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
};
