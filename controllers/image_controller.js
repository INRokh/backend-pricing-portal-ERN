const ImageModel = require("../database/models/image_model");

//Upload image from React to Express
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploadFromReact");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage: storage }).single("file");
function uploadfromReact(req, res) {
  upload(req, res, function(err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).send(req.file);
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
