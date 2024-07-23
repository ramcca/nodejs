const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const movieSchema = new Schema({
  name: { type: String, required: true },
  poster_image: { type: String, required: true },
  release_date: { type: String, required: true },
  duration: { type: String, required: true },
  ratings: { type: String, required: true },
});

module.exports = mongoose.model('Movies', movieSchema);
