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

  // get one User by id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .select("-__v")
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // createUser
  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.json(err));
  },

  // update User by id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No User found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

  // delete User
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.json(err));
  },

  createFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      { $addToSet: { friends: params.id } },
      { new: true }
    )
      .then((data) => {
        if (!data) {
          res.status(404).json({ message: "No friend matching ID!" });
        }
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  deleteFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.userId } },
      { new: true }
    ).then((data) => {
      if (!data) {
        res.status(404).json({ message: "No friend matching ID!" });
        return;
      }
      User.findOneAndUpdate(
        { _id: params.friendId },
        { $pull: { friends: params.userId } },
        { new: true }
      )
        .then((data) => {
          if (!data) {
            res.status(404).json({ message: "No friend matching ID!" });
          }
          res.json(data);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json;
        });
    });
  },
};

module.exports = userController;
