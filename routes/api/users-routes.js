const router = require("express").Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/user-controller");

// /api/users
router.route("/").get(getAllUsers).post(createUser);

// /api/users/:id
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

// /api/users/<userId>
router.route("/:userId").post(addFriend);

// /api/users/<friendId>/<commentId>/<replyId>
router.route("/:userId/:friends/:friendId").delete(deleteFriend);

module.exports = router;
