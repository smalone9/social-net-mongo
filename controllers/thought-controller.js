const { User, Thought } = require("../models");

const thoughtController = {
  getAllThoughts: (req, res) => {
    Thought.find({})
      .select("-__v")
      .sort({ _id: -1 })
      .then((data) => res.json(data))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // get one Thought by id
  getThoughtById(req, res) {
    Thought.findOne({ _id: params.id })
      .populate({
        path: "thought",
        select: "-__v",
      })
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .select("-__v")
      .then((data) => {
        console.log(data);
        if (!data) {
          res.status(404).json({ message: "No thought found with this ID!" });
        }
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // createThought
  createThought(req, res) {
    Thought.create(req.body)
      .then(({ __id }) => {
        return User.findOneAndUpdate(
          { _id: req.params.userId },
          { $push: { thoughts: __id } },
          { new: true }
        );
      })
      .then((data) => {
        if (!data) {
          return res.status(404).json({ message: "No user matching this ID!" });
        }
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json();
      });
  },

  // update Thought by id
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((data) => {
        if (!data) {
          res.status(404).json({ message: "No Thought found with this id!" });
          return;
        }
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  // delete Thought
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then((data) => {
        if (!data) {
          return res
            .status(404)
            .json({ message: "No thought found with this id!" });
        }
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $pull: { thoughts: params.thoughtId } },
          { new: true }
        );
      })
      .then((data) => {
        if (!data) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(true);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  createReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $addToSet: { reactions: body } },
      { new: true, runValidation: true }
    )
      .then((data) => {
        if (!data) {
          res.status(404).json({ message: "No User matching ID!" });
        }
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  deleteReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: params.thoughtId } },
      { new: true }
    )
      .then((data) => res.json(data))
      .catch((err) => {
        console.log(err);
        res.status(404).json(err);
      });
  },
};

module.exports = thoughtController;
