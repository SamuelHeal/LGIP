const { Schema, model } = require('mongoose');

const dataSchema = new Schema({
  date: {
    type: String,
    required: true,
    unique: false,
  },
  btcPrice: {
    type: Number,
    required: true,
    unique: false,
  },
  walletBalance: {
    type: Number,
    required: true,
    unique: false,
  },
  longWins: {
    type: Number,
    required: true,
  },
  longLosses: {
    type: Number,
    required: true,
  },
  shortWins: {
    type: Number,
    required: true,
  },
  shortLosses: {
    type: Number,
    required: true,
  },
});

const Data = model('Data', dataSchema);

module.exports = Data;
