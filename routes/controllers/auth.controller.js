const User = require("../../models/User");
const createError = require("http-errors");
const ERROR = require("../../constant/error");

exports.login = async (req, res, next) => {
  const { name, email } = req.body;

  try {
    const user = await User.findOne({ email }).lean();

    if (!user) {
      await User.create({ name, email });
      next(createError(401, ERROR.UNAUTHORIZED_USER));
    }

    res.json({ user });
  } catch (err) {
    next(createError(500, ERROR.INTERNAL_SERVER_ERROR));
  }
};
