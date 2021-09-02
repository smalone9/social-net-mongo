const router = require("express").Router();
const reactionsRoutes = require("./reactions-routes");
const thoughtsRoutes = require("./thoughts-routes");
const usersRoutes = require("./users-routes");

router.use("/reactions", reactionsRoutes);
router.use("/thoughts", thoughtsRoutes);
router.use("/users", usersRoutes);

module.exports = router;
