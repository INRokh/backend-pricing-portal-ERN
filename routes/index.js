const router = require("express").Router();

router.use("/tags", require('./tags'));

module.exports = router;