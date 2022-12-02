const express = require("express");
const router = express.Router();
const {
  getSubmitResult,
  getProblems,
  getProblem,
  playTest,
} = require("./controllers/users.controller");

router.get("/:user_id", getSubmitResult);

router.get("/:user_id/problems", getProblems);

router.route("/:user_id/problems/:problem_id").get(getProblem).post(playTest);

module.exports = router;
