/* eslint-disable camelcase */
const mongoose = require('mongoose');

const { Schema } = mongoose;

const promptSchema = new Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
});

const Q_and_A = mongoose.model('q_and_a', promptSchema);

module.exports = Q_and_A;
