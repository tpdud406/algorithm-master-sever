const express = require("express");
const { getProblems } = require("./controllers/users.controller");
const router = express.Router();

router.get("/:user_id/problems", getProblems);

module.exports = router;
