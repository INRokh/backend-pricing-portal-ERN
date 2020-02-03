const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const AnnotationController = require("../controllers/annotation_controller");

router.get("/", AnnotationController.index);

router.get("/:id", AnnotationController.showAnnotation);

// create annotation
router.post(
  "/",
  celebrate({
    body: {
      image_id: Joi.string().required(),
      user_id: Joi.string().required()
    }
  }), AnnotationController.create
);

// update marks in annotation
router.put(
  "/:id/marks",
  celebrate({
    body: {
      marks: Joi.array().items(
        Joi.object({
          tag_id: Joi.string().required(),
          coordinates: Joi.array().items(
            Joi.object({
              x: Joi.number().required(),
              y: Joi.number().required()
            })
          )
        })
      )
    }
  }), AnnotationController.rewriteMarks
);

router.patch(
  "/:id/reject/", AnnotationController.reject
)

router.patch(
  "/:id/approve/", AnnotationController.approve
)

router.patch(
  "/:id/review/", AnnotationController.review
)

module.exports = router;