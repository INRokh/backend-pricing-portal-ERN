const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_KEY_ID,
  secretAccessKey: process.env.AWS_KEY_SECRET
});

function show(req, res) {
  const stream = s3
    .getObject({ Key: req.params.key, Bucket: process.env.BUCKET_NAME })
    .createReadStream()
    .on("error", err => res.status(500).send(err))
    .pipe(res);
}

module.exports = {
  show
};
