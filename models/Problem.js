const mongoose = require("mongoose");

const ProblemSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tests: [
    {
      description: { type: String, required: true },
      input: { type: mongoose.Schema.Types.Mixed, required: true },
      output: { type: mongoose.Schema.Types.Mixed, required: true },
    },
  ],
  averageRuntimes: [Number],
});

module.exports = mongoose.model("Problem", ProblemSchema);
