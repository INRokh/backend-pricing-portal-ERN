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

router.put(
  "/marks",
  celebrate({
    body: {
      marks: Joi.array().items(Joi.object({
        tag_id: Joi.string().required(),
        coordinates: Joi.object({
          x: Joi.number().required(),
          y: Joi.number().required()
        })
      }))
    }
  })
)

// router.put('/marks',
//   celebrate({
//     body: {
//         marks: Joi.array().items(Joi.object({
//           tag_id: Joi.string().required(),
//           coordinates: Joi.array().items(Joi.object({
//             x: Joi.number().required(),
//             y: Joi.number().required()
//           }))
//       }))
//   }}), AnnotationController.update
//   )


module.exports = router;