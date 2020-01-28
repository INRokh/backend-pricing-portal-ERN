const AnnotationModel = require("../database/models/annotation_model");
const UserModel = require('../database/models/user_model');
const ImageModel = require('../database/models/image_model');

async function index(req, res) {
  // find({user_id: ....})....show for current user
  const annotations = await AnnotationModel.find()
    .catch(err => res.status(500).send(err));
  res.json(annotations);
};

async function create(req, res){
  const {image_id, user_id} = req.body;
  // check if image and user exists in database
  const image = await ImageModel.findById(image_id)
    .catch(err => res.status(500).send(err))
  const user = await UserModel.findById(user_id)
    .catch(err => res.status(500).send(err))
  // create annotation 
  // Saving refs to other documents works the same way you normally save properties, just assign the _id value
  const annotation = await AnnotationModel.create({image_id, user_id})
    .catch(err => re.status(500).send(err))
  res.send(annotation)
}

module.exports = {
    index,
    create
  };