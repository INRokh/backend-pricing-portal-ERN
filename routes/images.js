const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const ImageController = require("../controllers/image_controller");

// Upload images from React to Express & S3
router.post("/", ImageController.uploadFiles);

// List all apartments/images in JSON format.
router.get("/", ImageController.index);

// Display a single image file (through s3 key)
router.get("/:id/file", ImageController.display);

// Show a single image
router.get("/:id", ImageController.show);

// Edit a single image/apartment by ID.
router.patch(
  "/:id",
  celebrate({
    body: {
      lot: Joi.number().required(),
      unitNumber: Joi.string().required(),
      productDescription: Joi.string().required()
    }
  }),
  ImageController.update
);

// Delete a single image/apartment by ID (Instead of deleting in DB, we make it inactive).
router.patch(
  "/:id/inactive",
  celebrate({
    body: {
      is_active: Joi.boolean().required()
    }
  }),
  ImageController.inactive
);

module.exports = router;
