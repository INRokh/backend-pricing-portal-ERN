const ImageModel = require("../database/models/image_model");
const uuidv4 = require("uuid/v4");
const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const s3 = new AWS.S3();

// Upload images from React to Express & S3
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

// List all apartments/images in JSON format.
async function index(req, res) {
  const images = await ImageModel.find().catch(err =>
    res.status(500).send(err)
  );
  res.json(images);
}

// Show a single image (through s3 key)
function show(req, res) {
  s3.getObject({ Key: req.params.key, Bucket: process.env.BUCKET_NAME })
    .createReadStream()
    .on("error", err => res.status(500).send(err))
    .pipe(res);
}

// [Currently Not In Use] Batch create images.
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

// Delete a single image/apartment by ID.
async function destroy(req, res) {
  const { id } = req.params;
  let image = await ImageModel.findByIdAndDelete(id).catch(err =>
    res.status(500).send(err)
  );
  res.json(image);
}

async function update(req, res, next) {
  console.log(req.body); //Keep it here to see info on console

  await ImageModel.findByIdAndUpdate(req.params.id, {
    lot: req.body.lot,
    unitNumber: req.body.unitNumber,
    productDescription: req.body.productDescription,
    s3key: req.body.selectedFile // Currently, I do it with a cheeky way. When updating an apartment, the s3key in our database will be updated. But the file is not on AWS S3 hahahahah
  });
}

module.exports = {
  create,
  destroy,
  index,
  show,
  update,
  uploadFiles
};
