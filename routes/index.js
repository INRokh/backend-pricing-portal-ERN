const router = require("express").Router();

router.use("/tags", require("./tags"));
router.use("/images", require("./images"));
// router.use("/users", require("./users"));
// router.use("/annotation", require("./annotation"));
module.exports = router;