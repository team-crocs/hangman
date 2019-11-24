const mongoConnections = require('../models/mongoConnection');

// script used to seed the mongo database
const seedDb = async () => {
  const { qAndAModel } = await mongoConnections();
  const arr = [{
    question: 'The name \'Manhattan\' is derived from the Native American \'Man-a-hat-ta\'. But which tribe lived in the area and gave the land this name?.',
    answer: 'Algonquin',
  }, {
    question: 'What President was born in New York City?',
    answer: 'TheodoreRoosevelt',
  }, {
    question: 'What sled dog is always ready by a NYC bridge?',
    answer: 'Balto',
  }];

  await qAndAModel.create(...arr, (err, ...added) => {
    if (err) {
      return console.log(err);
    }
    return console.log(...added);
  });
};

seedDb();
