const ImageModel = require("../database/models/image_model");
const uuidv4 = require("uuid/v4");
const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const s3 = new AWS.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.BUCKET_NAME,
    key: function(req, file, cb) {
      const ext = file.mimetype.split("/")[1];
      cb(null, uuidv4() + "." + ext);
    }
  })
}).array("file");

function uploadFiles(req, res) {
  upload(req, res, async function(err) {
    if (err) {
      return res.status(500).send(err);
    }
    let newImagesUploaded = [];
    for (let f of req.files) {
      newImagesUploaded.push({
        s3key: f.key,
        lot: req.body.lot,
        unitNumber: req.body.unitNumber,
        productDescription: req.body.productDescription
      });
    }

    const images = await ImageModel.insertMany(newImagesUploaded).catch(err =>
      res.status(500).send(err)
    );
    res.json(images);
  });
}

async function index(req, res) {
  const images = await ImageModel.find().catch(err =>
    res.status(500).send(err)
  );
  res.json(images);
}

function show(req, res) {
  s3.getObject({ Key: req.params.key, Bucket: process.env.BUCKET_NAME })
    .createReadStream()
    .on("error", err => res.status(500).send(err))
    .pipe(res);
}

async function create(req, res) {
  let imageObjs = [];
  for (let image of req.body.images) {
    imageObjs.push({ s3key: image.s3key });
  }
  const images = await ImageModel.insertMany(imageObjs).catch(err =>
    res.status(500).send(err)
  );
  res.json(images);
}

async function destroy(req, res) {
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
  let updatedImage = [];
  for (let image of req.body.images) {
    updatedImage.push(
      await ImageModel.findByIdAndUpdate(image.id, {
        s3key: image.s3key
      }).catch(err => res.status(500).send(err))
    );
  }
  res.json(updatedImage);
}

module.exports = {
  create,
  destroy,
  index,
  show,
  update,
  uploadFiles
};
