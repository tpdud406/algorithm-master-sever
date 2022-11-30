const express = require("express");
const router = express.Router();
const {
  getProblems,
  getProblem,
  playTest,
} = require("./controllers/users.controller");

router.get("/:user_id/problems", getProblems);

router.route("/:user_id/problems/:problem_id").get(getProblem).post(playTest);

module.exports = router;
