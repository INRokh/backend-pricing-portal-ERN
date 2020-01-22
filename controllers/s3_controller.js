const AWS = require("aws-sdk");
const s3 = new AWS.S3();
// const fs = require("fs");

function show(req, res) {
  //connect to s3
  //res.send(that buffer);
  const stream = s3
    .getObject({ Key: req.params.key, Bucket: process.env.BUCKET_NAME })
    .createReadStream();

  stream.pipe(res);
}

//upload file from Express to s3
// function uploadFile(req, res) {
//   const fileName = "sample.csv";

//   fs.readFile(fileName, (err, data) => {
//     if (err) throw err;
//     const params = {
//       Bucket: process.env.BUCKET_NAME, // bucket to save the file
//       Key: req.params.key, // file name saved on s3
//       Body: stream
//     };

//     s3.upload(params, function(s3Err, data) {
//       if (s3Err) throw s3Err;
//       console.log(`File uploaded successfully at ${data.Location}`);
//     });
//   });
// }

module.exports = {
  show
  // uploadFile
};
