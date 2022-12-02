const { VM } = require("vm2");
const { hrtime } = require("node:process");
const Problem = require("../../models/Problem");
const User = require("../../models/User");

const vm = new VM({
  timeout: 1000,
  allowAsync: false,
  sandbox: {},
});

module.exports = {
  getSubmitResult: async (req, res, next) => {
    const { user_id } = req.params;
    const resolvedProblems = [];

    try {
      const user = await User.findById(user_id).lean();

      for (const problem of user.problems) {
        const { title, averageRuntimes } = await Problem.findById(
          problem.problemId
        ).lean();

        resolvedProblems.push({ title, averageRuntimes });
      }

      res.status(200).json({ user, resolvedProblems });
    } catch (err) {
      console.log(err);
      next(err);
    }
  },
  getProblems: async (req, res, next) => {
    try {
      const problems = await Problem.find({}).lean();
      res.status(200).json(problems);
    } catch (err) {
      next(err);
    }
  },
  getProblem: async (req, res, next) => {
    const { problem_id } = req.params;

    try {
      const problem = await Problem.findById(problem_id).lean();
      res.status(200).json(problem);
    } catch (err) {
      next(err);
    }
  },
  playTest: async (req, res, next) => {
    const { user_id, problem_id } = req.params;
    const { solutionCode } = req.body;
    const solutionResults = [];
    let runtimeSum = 0;

    if (!solutionCode) {
      return res
        .status(200)
        .json({ message: "Please write a solution function." });
    }
    try {
      const problem = await Problem.findById(problem_id).lean();
      const { tests } = problem;

      for (const test of tests) {
        const start = hrtime.bigint();
        const solutionResult = vm.run(solutionCode + test.input);
        const end = hrtime.bigint();
        const runtime = Number(end - start) / 1000000;
        runtimeSum += runtime;

        solutionResults.push({
          testId: test._id,
          passed: solutionResult === test.output,
          runtime,
        });
      }

      await Problem.findOneAndUpdate(
        {
          _id: problem_id,
        },
        { $push: { averageRuntimes: runtimeSum / solutionResults.length } }
      );

      await User.findOneAndUpdate(
        { _id: user_id },
        {
          $push: {
            problems: { problemId: problem_id, testResults: solutionResults },
          },
        }
      );

      res.status(200).json(solutionResults);
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
};
