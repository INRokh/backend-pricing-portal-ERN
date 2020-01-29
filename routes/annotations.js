const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const AnnotationController = require("../controllers/annotation_controller");

router.get('/', AnnotationController.index);

router.get('/:id', AnnotationController.showAnnotation);

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


/*
TO_DO:

router.get(
  "/:id"
)
router.post(
  "/review"
);

router.post(
  "/reject",
);

router.post(
  "/approve",
})
);
*/

module.exports = router;