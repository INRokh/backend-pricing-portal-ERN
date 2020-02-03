const AnnotationModel = require("../database/models/annotation_model");
const UserModel = require('../database/models/user_model');
const ImageModel = require('../database/models/image_model');

// show assigned annotations to user
async function index(req, res) {
  // If admin, show all annotations,
  // if user apply restriction, showing only assigned annotations.
  let filter = null;
  if (!req.user.is_admin) {
    filter = {user_id: req.user._id};
  }
  AnnotationModel.find(filter)
    .populate('image_id')
    .then(annotations => res.json(annotations))
    .catch(err => res.status(500).send(err));
};

// show annotation by id
function showAnnotation(req, res) {
  AnnotationModel
    .findById(req.params.id)
    .populate(['image_id', 'user_id', 'marks.tag_id'])
    .catch( err => res.status(500).send(err))
    .then( annotation => res.json(annotation));
};

// create annotation 
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
  const annotation = await AnnotationModel.create({image_id, user_id})
    .catch(err => res.status(500).send(err))
  res.send(annotation);
}

// update marks in annotation
async function rewriteMarks(req, res){
  let annotation = await AnnotationModel.findById(req.params.id)
    .catch(err => res.status(404).send("annotation not found" + err))

  // mongodb.github.io/node-mongodb-native/api-bson-generated/objectid.html
  // check user 
  if(!req.user._id.equals(annotation.user_id)){
    return res.status(403).send("acsess denied for current user")
  }
  // check annotation status
  if(annotation.status !== "NEW" && annotation.status !== "IN_PROGRESS"){
    return res.status(403).send("changes can't be made")
  }

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
  if(annotation.status === "NEW"){
    annotation.status = "IN_PROGRESS"
  }
  await annotation.save()
    .catch(err => res.status(500).send(err));
  res.send(annotation.marks)
}

async function approve(req, res) {
  const annotation = await AnnotationModel.findById(req.params.id)
    .catch(err => res.status(500).send(err));
  annotation.status = "COMPLETED"
  await annotation.save()
    .catch(err => res.status(500).send(err));
  res.json(annotation);
};


async function reject(req, res) {
  const annotation = await AnnotationModel.findById(req.params.id)
    .catch(err => res.status(500).send(err));
  annotation.status = "IN_PROGRESS"
  await annotation.save()
    .catch(err => res.status(500).send(err));
  res.json(annotation);
};

async function review(req, res) {
  const annotation = await AnnotationModel.findById(req.params.id)
    .catch(err => res.status(500).send(err));
  annotation.status = "REVIEW"
  await annotation.save()
    .catch(err => res.status(500).send(err));
  res.json(annotation);
};

module.exports = {
  index,
  create,
  rewriteMarks,
  showAnnotation,
  approve,
  reject,
  review
};