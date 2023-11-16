let pdf = require('html-pdf');
const pug = require('pug');
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
  const html = pug.renderFile('./views/pdf/Invoice.pug', {
    model: result
  });
  // var html = fs.readFileSync('./views/pdf/Invoice.html', 'utf8');

  await pdf
    .create(html, {
      format: info.format,																					
      orientation: 'portrait',
      border: '1mm',
    })
    .toFile(targetLocation, function (error) {
      if (error) return console.log('this pdf create error ' + error);                                                                                       
      if (callback) callback(targetLocation);
    });
};
