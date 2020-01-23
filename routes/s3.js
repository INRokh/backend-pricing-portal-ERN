const router = require("express").Router();
const s3Controller = require("../controllers/s3_controller");

router.get("/:key", s3Controller.show);
// router.post("/upload", s3Controller.uploadFile);

module.exports = router;
