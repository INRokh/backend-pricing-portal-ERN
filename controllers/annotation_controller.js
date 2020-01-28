const AnnotationModel = require("../database/models/annotation_model");
const UserModel = require('../database/models/user_model');
const ImageModel = require('../database/models/image_model');

// show annotations for particular user
// async function index(req, res) {
//     //console.log(req.user)
//     const annotations = await AnnotationModel.find({user: req.user})
//         .catch(err => res.status(500).send(err));
//     res.json(annotations);
// }

async function index(req, res) {
    //console.log(req.user)
    const annotations = await AnnotationModel.find({user_id: req.user})
        .catch(err => res.status(500).send(err));
    res.json(annotations);
}

module.exports = {
    index
  };




// async function create(req, res) {
//   // Check that both user ID and image ID are valid by finding correspondin
//   // objects in database.
//   const image = await ImageModel.findById(req.image_id)
//     .catch(err => res.status(500).send(err));
//   const user = await UserModel.findById(req.user_id)
//     .catch(err => res.status(500).send(err));
//   // https://mongoosejs.com/docs/populate.html#saving-refs
//   let annotationObj = {
//       image: image._id,
//       user: user._id
//   };
//   const annotation = await AnnotationModel.create(annotationObj)
//     .catch(err => res.status(500).send(err));
//   res.send(annotation);
// }
