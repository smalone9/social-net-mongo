const { User, Thought } = require("../models");

const userController = {
  getAllUsers: (req, res) => {
    User.find({})
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((data) => res.json(data))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // get one User by id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("-__v")
      .then((data) => {
        console.log(data);
        if (!data) {
          res.status(404).json({ message: "No user matching ID!" });
        }
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // createUser
  createUser({ body }, res) {
    User.create(body)
      .then((data) => res.json(data))
      .catch((err) => res.status(400).json(err));
  },

  // update User by id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((data) => {
        if (!data) {
          res.status(404).json({ message: "No User found with this id!" });
          return;
        }
        res.json(data);
      })
      .catch((err) => res.status(400).json(err));
  },

  // delete User
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  },

  createFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $addToSet: { friends: params.id } },
      { new: true }
    ).then((data) => {
      if (!data) {
        res.status(404).json({ message: "No friend matching ID!" });
        return;
      }
      User.findOneAndUpdate(
        { _id: params.friendId },
        { $addToSet: { friends: params.userId } },
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
