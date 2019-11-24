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
      // console.log('early error in getNewQAndA');
      res.status(500).send('random number generating not working');
    }

    // generate a "random" number and skip that many documents
    const randSkip = Math.floor(Math.random() * count);

    qAndAModel.findOne().skip(randSkip).exec((err2, prompt) => {
      if (err2) {
        // console.log('late error in getNewQAndA');
        res.status(500).send('unable to get question from database');
      }
      // console.log('prompt', prompt);
      res.locals.newQuestion = prompt;
      return next();
    });
  });
};

module.exports = mongoController;
