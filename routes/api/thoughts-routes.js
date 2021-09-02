const router = require("express").Router();
const {
  addFriend,
  deleteFriend,
} = require("../../controllers/thought-controller");

// /api/comments/<userId>
router.route("/:userId").post(addFriend);

// /api/comments/<friendId>/<commentId>/<replyId>
router.route("/:userId/:friends/:friendId").delete(deleteFriend);

module.exports = router;
