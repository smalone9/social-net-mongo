const router = require("express").Router();
const {
  addReaction,
  deleteReaction,
} = require("../../controllers/thoughts-controller");

// /api/thoughts/<ReactionId>
router.route("/:ReactionId").post(addReaction);

// /api/thoughts/<thoughtId>/<commentId>/<replyId>
router.route("/:ReactionId/:thoughts/:thoughtId").delete(deleteReaction);

module.exports = router;
