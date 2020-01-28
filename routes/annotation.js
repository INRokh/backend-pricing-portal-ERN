const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const AnnotationController = require("../controllers/annotation_controller");

router.get('/', AnnotationController.index);

module.exports = router;