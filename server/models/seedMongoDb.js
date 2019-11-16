const mongoConnections = require('../models/mongoConnection');

const seedDb = async () => {
  const { qAndAModel } = await mongoConnections();
  const obj = {
    question: 'Some people say clean code has...',
    answer: 'nocomments',
  };

  await qAndAModel.create(obj, (err, added) => {
    if (err) {
      return console.log(err);
    }
    return console.log(added);
  });
};

seedDb();
