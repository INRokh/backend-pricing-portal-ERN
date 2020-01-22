const AWS = require("aws-sdk");
const s3 = new AWS.S3();

function show(req, res) {
  //connect to s3
  //res.send(that buffer);

  const stream = s3
    .getObject({ Key: req.params.key, Bucket: process.env.BUCKET_NAME })
    .createReadStream();

  stream.pipe(res);
}

module.exports = {
  show
};
