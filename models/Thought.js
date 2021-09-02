const { model, Schema } = require("mongoose");
const dateFormat = require("../../../utils/dateFormat");

// create a new schema
const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    length: 1 - 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAtVal) => dateFormat(createdAtVal),
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [{ type: mongoose.Schema.ObjectId, ref: "Thought" }],
});

module.exports = model("Thought", thoughtSchema);
