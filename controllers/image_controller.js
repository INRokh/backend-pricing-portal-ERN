const ImageModel = require("../database/models/image_model");

//Upload image from React to Express
const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_KEY_ID,
  secretAccessKey: process.env.AWS_KEY_SECRET
});

function uploadfromReact(req, res) {
  const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: process.env.BUCKET_NAME,
      metadata: function(req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function(req, file, cb) {
        const ext = file.mimetype.split("/")[1];
        cb(null, file.originalname + "_" + Date.now() + "." + ext);
      }
    })
  }).array("file");

  upload(req, res, function(err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }

    //file all good saved to s3
    //now need to save key into database
    // return res.status(200).send(req.file);
    console.log(req.files[0].key);

    const newImageUploaded = {
      s3Key: req.files[0].key
    };

    const document = new ImageModel(newImageUploaded);
    document.save(function(error, newFile) {
      if (error) {
        throw error;
      }
    });
  });
}

async function index(req, res) {
  const images = await ImageModel.find({ is_active: true }).catch(err =>
    res.status(500).send(err)
  );
  res.json(images);
}

async function create(req, res) {
  let imageObjs = [];
  for (let image of req.body.images) {
    imageObjs.push({ title: image.title, url: image.url });
  }
  const images = await ImageModel.insertMany(imageObjs).catch(err =>
    res.status(500).send(err)
  );
  res.json(images);
}

async function destroy(req, res) {
  console.log(req.body);
  let deletedImages = [];
  for (let id of req.body.ids) {
    deletedImages.push(
      await ImageModel.findByIdAndUpdate(id, { is_active: false }).catch(err =>
        res.status(500).send(err)
      )
    );
  }
  res.json(deletedImages);
}

async function update(req, res) {
  console.log(req.body);
  let updatedImage = [];
  for (let image of req.body.images) {
    updatedImage.push(
      await ImageModel.findByIdAndUpdate(image.id, {
        title: image.title,
        url: image.url
      }).catch(err => res.status(500).send(err))
    );
  }
  res.json(updatedImage);
}

module.exports = {
  index,
  create,
  destroy,
  update,
  uploadfromReact
};
