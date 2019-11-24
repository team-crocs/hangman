/* eslint-disable camelcase */

const mongoController = {};
const mongoConnections = require('../models/mongoConnection');

// const { qAndAModel } = mongoConnections();

// get one random document from the q_and_as collection
mongoController.getNewQandA = async (req, res, next) => {
  // connect to the database and destructure out the qAndA model
  const { qAndAModel } = await mongoConnections();

  // count the number of documents/entries in the mongoDB
  qAndAModel.countDocuments((err, count) => {
    if (err) {
      // send to global error handler with the message and a status describing "failed dependency"
      return next({ message: err.message, status: 424 });
    }

    // generate a "random" number and skip that many documents
    const randSkip = Math.floor(Math.random() * count);

    qAndAModel.findOne().skip(randSkip).exec((err2, prompt) => {
      if (err2) {
        // send error to global error handler with the message and a status describing a timeout
        return next({ message: err2.message, status: 408 });
      }
      // console.log('prompt', prompt);
      res.locals.newQuestion = prompt;
      return next();
    });
  });
};

module.exports = mongoController;
