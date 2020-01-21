const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(require("./routes"));

// Importing AWSPresigner
const { generateGetUrl, generatePutUrl } = require("./aws/AWSPresigner");

// GET URL
app.get("/generate-get-url", (req, res) => {
  // Both Key and ContentType are defined in the client side.
  // Key refers to the remote name of the file.
  const { Key } = req.query;
  generateGetUrl(Key)
    .then(getURL => {
      res.send(getURL);
    })
    .catch(err => {
      res.send(err);
    });
});

// PUT URL
app.get("/generate-put-url", (req, res) => {
  // Both Key and ContentType are defined in the client side.
  // Key refers to the remote name of the file.
  // ContentType refers to the MIME content type, in this case image/jpeg
  const { Key, ContentType } = req.query;
  generatePutUrl(Key, ContentType)
    .then(putURL => {
      res.send({ putURL });
    })
    .catch(err => {
      res.send(err);
    });
});

module.exports = app;
