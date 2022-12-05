const express = require("express");
const router = express.Router();
const {
  getSubmitResult,
  getProblems,
  createProblem,
  getProblem,
  playTest,
} = require("./controllers/users.controller");

router.get("/:user_id", getSubmitResult);

router.route("/:user_id/problems").get(getProblems).post(createProblem);

router.route("/:user_id/problems/:problem_id").get(getProblem).post(playTest);

module.exports = router;
