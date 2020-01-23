const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const ImageController = require("../controllers/image_controller");

//Upload image from React to Express
router.post("/upload", ImageController.uploadfromReact);

// List all images.
router.get("/", ImageController.index);

// Batch create images.
router.post(
  "/",
  celebrate({
    body: {
      images: Joi.array()
        .items(
          Joi.object({
            title: Joi.string().required(),
            url: Joi.string().required()
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
            title: Joi.string().required(),
            url: Joi.string().required()
          })
        )
        .min(1)
    }
  }),
  ImageController.update
);

module.exports = router;
