const router = require("express").Router();

router.use("/tags", require("./tags"));
router.use("/images", require("./images"));
router.use("/s3", require("./s3"));

module.exports = router;
