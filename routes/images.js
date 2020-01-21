const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const ImageController = require('../controllers/image_controller')
const ImageModel = require("../database/models/image_model")
const multer = require("multer"); 
//https://codeburst.io/image-uploading-using-react-and-node-to-get-the-images-up-c46ec11a7129



// List all images.
router.get('/', ImageController.index);

// Batch create images.
router.post(
    '/',
    celebrate({
        body: {
            images: Joi.array().items(Joi.object({
                title: Joi.string().required(),
                url: Joi.string().required()
            })).min(1)
        }
    }),
    ImageController.create
)

// Batch delete images by IDs.
router.delete(
    '/',
    celebrate({
        body: { 
            ids: Joi.array().items(Joi.string().required()).min(1)
        }
    }),
    ImageController.destroy
);

// Batch edit images.
router.patch(
    '/',
    celebrate({
        body: { 
            images: Joi.array().items(Joi.object({
                id: Joi.string().required(),
                title: Joi.string().required(),
                url: Joi.string().required()
            })).min(1)
        }
    }),
    ImageController.update
);

//the disk storage gives you full control on storing files to disk. 
const storage = multer.diskStorage({
//The destination function determine where the files are stores.
//
    destination: function (req, file, cb) {
        cb(null, "./uploads/"); 
    },
//the filename function is how we store the name of our file in storage. 
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});
//this allows us to control what type of image files we can use for storage. 
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.minetype === "image/png") {
        cb(null, true); 
    } else {
        cb(null, false);
    }
}
//this is the controls on the images we can upload. 
const upload = multer({
    storage: storage,
    limts: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
}); 
//we create a route. In this case, 
ImageRouter.route("/uploadmulter") 
    .post(upload.single("imageData"), (req, res, next) => {
        console.log(req.body);
        const newImage = new Image ({
            imageName: req.body.imageName, 
            imageData: req.file.path
        });

    newImage.save()
    .then((result) => {
        console.log(result);
        res.status(200).json({
            sucess: true, 
            document: result
        });
    })
    .catch((err) => next (err)); 
    })




module.exports = router;