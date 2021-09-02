const router = require("express").Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
} = require("../../controllers/thoughts-controller");

// /api/Thoughts
router.route("/").get(getAllThoughts).post(createThought);

// /api/Thoughts/:id
router
  .route("/:id")
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

module.exports = router;
