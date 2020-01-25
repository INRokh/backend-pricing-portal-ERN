const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const ImageController = require("../controllers/image_controller");

//Upload image from React to Express
router.post("/upload", ImageController.uploadFiles);

// List all images.
router.get("/", ImageController.index);

router.get("/:key", ImageController.show);

// Batch create images.
router.post(
  "/",
  celebrate({
    body: {
      images: Joi.array()
        .items(
          Joi.object({
            s3key: Joi.string().required(),
          })
        )
        .min(1)
    }
  }),
  ImageController.create
);

// Batch delete images by IDs.
router.delete(
  "/",
  celebrate({
    body: {
      ids: Joi.array()
        .items(Joi.string().required())
        .min(1)
    }
  }),
  ImageController.destroy
);

// Batch edit images.
router.patch(
  "/",
  celebrate({
    body: {
      images: Joi.array()
        .items(
          Joi.object({
            id: Joi.string().required(),
            s3key: Joi.string().required()
          })
        )
        .min(1)
    }
  }),
  ImageController.update
);

module.exports = router;
