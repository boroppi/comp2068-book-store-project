// We will need our mongoose library
const mongoose = require(`mongoose`);

// Our schema
const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: false
    },
    publisher: {
      type: String,
      required: false
    },
    genre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Genre",
      required: true
    }
  },
  {
    timestamps: true
  }
);

// Exporting our resource model
module.exports = mongoose.model("Storebook", BookSchema);
