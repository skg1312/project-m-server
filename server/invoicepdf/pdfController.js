let pdf = require('html-pdf');
const fs = require('fs');
const ejs = require('ejs');
let path = require("path");


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
  // const html = ejs.renderFile('./views/pdf/report-template.ejs', {
  //   invoiceData: result
  // });
  ejs.renderFile(path.join(__dirname, './views/', "report-template.ejs"), {invoiceData: result}, (err, data) => {
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
        pdf.create(data, options).toFile(targetLocation, function (error) {
            if (error) return console.log('this pdf create error ' + error); 
            if (callback) callback(targetLocation);
        });
    // }
});


  // await pdf
  //   .create(html, {
  //     format: info.format,																					
  //     orientation: 'portrait',
  //     border: '12mm',
  //   })
  //   // await pdf
  //   // .create(html, options)    
  //   .toFile(targetLocation, function (error) {
  //     if (error) return console.log('this pdf create error ' + error);                                                                                       
  //     if (callback) callback(targetLocation);
  //   });
};
