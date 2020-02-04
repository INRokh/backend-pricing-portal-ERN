const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const ImageController = require("../controllers/image_controller");
const passport = require('passport');

// Upload images from React to Express & S3
router.post("/", passport.authenticate('jwt', { session : false }), ImageController.uploadFiles);

// List all apartments/images in JSON format.
router.get("/", passport.authenticate('jwt', { session : false }), ImageController.index);

// Display a single image file (through s3 key)
router.get("/:id/file", ImageController.display);

// Show a single image
router.get("/:id", passport.authenticate('jwt', { session : false }), ImageController.show);

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
  passport.authenticate('jwt', { session : false }),
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
  passport.authenticate('jwt', { session : false }),
  ImageController.inactive
);

module.exports = router;
