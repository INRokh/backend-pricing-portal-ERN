const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const TagController = require('../controllers/tag_controller')

// List all tags.
router.get('/', TagController.index);

// Batch create tags.
router.post(
    '/',
    celebrate({
        body: { 
            tags: Joi.array().items(Joi.string().required()).min(1)
        }
    }),
    TagController.create
);

// PUT is not supported, we don't need to re-write all tags.

// Batch edit tags.
router.patch(
    '/',
    celebrate({
        body: { 
            tags: Joi.array().items(Joi.object({
                id: Joi.string().required(),
                title: Joi.string().required()
            })).min(1)
        }
    }),
    TagController.update
);

// Batch delete tags by IDs.
router.delete(
    '/',
    celebrate({
        body: { 
            ids: Joi.array().items(Joi.string().required()).min(1)
        }
    }),
    TagController.destroy
);

module.exports = router;