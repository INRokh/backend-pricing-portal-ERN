const AnnotationModel = require("../database/models/annotation_model");
const UserModel = require('../database/models/user_model');
const ImageModel = require('../database/models/image_model');

// show assigned annotations to user
async function index(req, res) {
  const annotations = await AnnotationModel.find({user_id: req.user._id})
    .catch(err => res.status(500).send(err));
  res.json(annotations);
};

// show one annotation, need to use populate

async function create(req, res){
  // only admin can assign annotation
  if (req.user.is_admin !== true){
    return res.status(403)
      .send("need admin privilege");
  }
  const {image_id, user_id} = req.body;
  // check if image and user exists in database
  await ImageModel.findById(image_id)
    .catch(err => res.status(404).send("image not found" + err))
  await UserModel.findById(user_id)
    .catch(err => res.status(404).send("user not found" + err))
  // create annotation 
  const annotation = await AnnotationModel.create({image_id, user_id})
    .catch(err => res.status(500).send(err))
  res.send(annotation);
}

async function rewriteMarks(req, res){
  let annotation = await AnnotationModel.findById(req.params.id)
    .catch(err => res.status(404).send("annotation not found" + err))
  const {marks} = req.body;
  let markObjs = [];
  for (let i in marks) {
    let markObj = {
      tag_id: marks[i].tag_id,
      coordinates: []
    };
    for (let j in marks[i].coordinates) {
      markObj.coordinates.push({
        x: marks[i].coordinates[j].x,
        y: marks[i].coordinates[j].y
      });
    }
    markObjs.push(markObj);
  }

  annotation.marks = markObjs;
  await annotation.save()
    .catch(err => res.status(500).send(err));
  // console.log(annotation)
  res.send(annotation.marks)
}

module.exports = {
  index,
  create,
  rewriteMarks
};

/*
TO_DO:
- show annotation by id
- reject
- approve
- review
*/