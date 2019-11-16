/* eslint-disable camelcase */

const mongoController = {};
const mongoConnections = require('../models/mongoConnection');

// const { qAndAModel } = mongoConnections();

// get one random document from the q_and_as collection
mongoController.getNewQandA = async (req, res, next) => {
  const { qAndAModel } = await mongoConnections();
  qAndAModel.countDocuments((err, count) => {
    if (err) {
      console.log('early error in getNewQAndA');
      res.status(500).send('random number generating not working');
    }
    console.log('count', count);
    const randSkip = Math.floor(Math.random() * count);

    qAndAModel.findOne().skip(randSkip).exec((err2, prompt) => {
      if (err2) {
        console.log('late error in getNewQAndA');
        res.status(500).send('unable to get question from database');
      } else {
        console.log('prompt', prompt);
        res.locals.newQuestion = prompt;
        return next();
      }
    });
  });
};

module.exports = mongoController;
