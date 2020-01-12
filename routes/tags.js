
const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");

// List all tags.
router.get('/', (req, res) => {
    res.json({});
});

// Batch create tags.
router.post(
    '/',
    celebrate({
        body: { 
            tags: Joi.array().items(Joi.string().required()).min(1)
        }
    }),
    (req, res) => {res.json({})}
);

// PUT is not supported, we don't need to re-write all tags.

// Batch edit tags.
router.patch(
    '/',
    celebrate({
        body: { 
            tags: Joi.array().items(Joi.object({
                id: Joi.string().required(),
                tag: Joi.string().required()
            })).min(1)
        }
    }),
    (req, res) => {res.json({})}
);

// Batch delete tags by IDs.
router.delete(
    '/',
    celebrate({
        body: { 
            ids: Joi.array().items(Joi.string().required()).min(1)
        }
    }),
    (req, res) => {res.json({})}
);

module.exports = router;