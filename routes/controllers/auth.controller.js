const User = require("../../models/User");

exports.login = async (req, res, next) => {
  const { name, email } = req.body;

  try {
    const user = await User.findOne({ email }).lean();

    if (!user) {
      await User.create({ name, email });
    }

    res.send("success");
  } catch (err) {
    next(err);
  }
};
