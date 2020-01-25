const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const AnnotationController = require("../controllers/annotation_controller");


router.post(
  "/",
  celebrate({
    body: {
      image: Joi.string().required()
    }
}), AnnotationController.create
);

module.exports = router;

// {
//     "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Sample_Floorplan.jpg/800px-Sample_Floorplan.jpg",
//     "marks": {
//       "newtestqwerty": [
//         {
//           "x": 0.29285714285714287,
//           "y": 0.4866666666666667
//         },
//         {
//           "x": 0.7028571428571428,
//           "y": 0.40166666666666667
//         },
//         {
//           "x": 0.6714285714285714,
//           "y": 0.73
//         }
//       ]
//     }
//   }




