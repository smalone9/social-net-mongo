const { model, Schema } = require("mongoose");

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
  },
});

module.exports = model("User", userSchema);
