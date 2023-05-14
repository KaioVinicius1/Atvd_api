const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Game = new Schema(
  {
    name: {
      type: String,
    },
    year: {
      type: String,
    },
    area: {
      type: String,
    },
    description: {
      type: String,
    },
    platform: {
      type: String,
    },
    classification: {
      type: String,
    }
  },
  {
    collection: "Game",
  }
);

module.exports = mongoose.model("Game", Game);
