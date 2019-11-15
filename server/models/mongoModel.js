const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Michael:check@cluster0-liyfw.mongodb.net/hang_man?retryWrites=true&w=majority');
mongoose.connection.once('open', () => {
  console.log('Connected to mongo database');
});

const { Schema } = mongoose;

const promptSchema = new Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
});

const Q_and_A = mongoose.model('q_and_a', promptSchema);

module.exports = Q_and_A;
