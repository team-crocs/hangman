const mongoose = require('mongoose');

// require in models
const qAndAModel = require('./mongoModel');

// export an async function that awaits the connection to the database,
// and returns all defined models
module.exports = async () => {
  // internal pool handling set to 5 connections?
  await mongoose.connect(
    'mongodb+srv://chao:hackMeIfYouDare@cluster0-rhj6j.mongodb.net/test?retryWrites=true&w=majority',
    {
      // these options are just to get rid of some deprecation warnings from mongo...
      useNewUrlParser: true,
      useUnifiedTopology: true,
      poolSize: 5,
      socketTimeoutMS: 1000,
    },
  )
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('ERROR ON FIRST CONNECTION ATTEMPT TO MONGO:', err));
  // return an object with all the models on it
  return { qAndAModel };
};
