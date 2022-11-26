const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  problems: [
    {
      problemId: mongoose.Schema.Types.ObjectId,
      testResults: [
        {
          testId: mongoose.Schema.Types.ObjectId,
          passed: Boolean,
          runtime: Number,
        },
      ],
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
