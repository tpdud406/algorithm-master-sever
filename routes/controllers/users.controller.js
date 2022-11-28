const Problem = require("../../models/Problem");

module.exports = {
  getProblems: async (req, res, next) => {
    try {
      const problems = await Problem.find({});
      res.status(200).json(problems);
    } catch (err) {
      next(err);
    }
  },
};
