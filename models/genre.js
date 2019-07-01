// We will need our mongoose library
const mongoose = require(`mongoose`);

// Our schema
const GenreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

// Exporting our resource model
module.exports = mongoose.model("Genre", GenreSchema);
