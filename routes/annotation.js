const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const AnnotationController = require("../controllers/annotation_controller");

router.get('/', AnnotationController.index);

router.post(
  "/",
  celebrate({
    body: {
      image_id: Joi.string().required(),
      user_id: Joi.string().required()
    }
  }), AnnotationController.create
)

module.exports = router;