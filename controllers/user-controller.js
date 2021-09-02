const { User, Thought } = require("../models");

const userController = {
  getAllUsers: (req, res) => {
    User.find({})
      .populate("thought friend")
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },
};

module.exports = userController;
