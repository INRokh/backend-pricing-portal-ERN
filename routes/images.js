const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const ImageController = require("../controllers/image_controller");

// Upload images from React to Express & S3
router.post("/", ImageController.uploadFiles);

// List all apartments/images in JSON format.
router.get("/", ImageController.index);

// Show a single image (through s3 key)
router.get("/:key", ImageController.show);

// [Currently Not In Use] Batch create images.
router.post(
  "/",
  celebrate({
    body: {
      images: Joi.array()
        .items(
          Joi.object({
            s3key: Joi.string().required()
          })
        )
        .min(1)
    }
  }),
  ImageController.create
);

// Delete a single image/apartment by ID.
router.delete(
  "/:id",
  celebrate({
    body: {
      ids: Joi.array()
        .items(Joi.string().required())
        .min(1)
    }
  }),
  ImageController.destroy
);

// Uppdate an Image: If I turn celebrate on, the edit function won't work. I need to learn how to use celebrate :(
router.post(
  "/edit/:id",
  // celebrate({
  //   body: {
  //     images: Joi.array()
  //       .items(
  //         Joi.object({
  //           id: Joi.string().required(),
  //           s3key: Joi.string().required()
  //         })
  //       )
  //       .min(1)
  //   }
  // }),
  ImageController.update
);

module.exports = router;
