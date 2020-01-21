const router = require("express").Router();

router.use("/tags", require("./tags"));
router.use("/images", require("./images"));

module.exports = router;
