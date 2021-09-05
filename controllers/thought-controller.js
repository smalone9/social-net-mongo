const { User, Thought } = require("../models");

const ThoughtController = {
  getAllThoughts: (req, res) => {
    Thought.find({})
      .populate("thought user Reaction")
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // get one Thought by id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .select("-__v")
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // createThought
  createThought({ body }, res) {
    Thought.create(body)
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.json(err));
  },

  // update Thought by id
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No Thought found with this id!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },

  // delete Thought
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.json(err));
  },

  createReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.id },
      { $addToSet: { reactions: params.id } },
      { new: true }
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

  deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.ThoughtId },
      { $pull: { reactions: params.ThoughtId } },
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
