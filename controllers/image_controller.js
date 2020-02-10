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
    // TIP: could use `Array.prototype.map()` in this case
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

// List all apartments/images (only active ones) in JSON format
async function index(req, res) {
  const images = await ImageModel.find({ is_active: true }).catch(err =>
    res.status(500).send(err)
  );
  res.json(images);
}

// Display a single image (through s3 key)
async function display(req, res) {
  const image = await ImageModel.findById(req.params.id).catch(err =>
    res.status(500).send(err)
  );
  if (!image) {
    return;
  }
  s3.getObject({ Key: image.s3key, Bucket: process.env.BUCKET_NAME })
    .createReadStream()
    .on("error", err => res.status(500).send(err))
    .pipe(res);
}

// Show a single image
async function show(req, res) {
  await ImageModel.findById(req.params.id)
    .then(image => res.json(image))
    .catch(err => res.status(500).send(err));
}

// Delete a single image/apartment by ID (Instead of removing image from database, we make it inactive)
async function inactive(req, res) {
  const image = await ImageModel.findByIdAndUpdate(req.params.id, {
    is_active: req.body.is_active
  }).catch(err => res.status(500).send(err));

  res.json(image);
}

async function update(req, res, next) {
  const image = await ImageModel.findByIdAndUpdate(req.params.id, {
    lot: req.body.lot,
    unitNumber: req.body.unitNumber,
    productDescription: req.body.productDescription
  }).catch(err => res.status(500).send(err));

  res.json(image);
}

module.exports = {
  inactive,
  index,
  display,
  update,
  uploadFiles,
  show
};
