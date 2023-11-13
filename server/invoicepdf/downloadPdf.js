//@/handlers/downloadHandler/downloadPdf.js


const custom = require('./pdfController');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

module.exports = downloadPdf = async (req, res, id) => {
  const modelName = 'invoice';
  const Model = mongoose.model(modelName);

  try {
    const result = await Model.findById(ObjectId(id)).exec();

    
    if (!result) {
      throw { name: 'Error' };
    }

   
    await custom.generatePdf(
      modelName,
      { filename: modelName, format: 'A4' },
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
        message: 'Required fields are not supplied',
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
};
