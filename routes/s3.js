const router = require("express").Router();
const s3Controller = require("../controllers/s3_controller");

// router.post("/upload", s3Controller.uploadFile);
router.get("/:key", s3Controller.show);

module.exports = router;