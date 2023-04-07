const fs = require('fs');
const ImageModel = require("../Models/Files");
exports.postImage = (req, res, err) => {
  const image = new ImageModel({
    name: req.file.originalname,
    image: {
      data: fs.readFileSync('Uploads/'+ req.file.filename),
      contentType: req.file.mimetype,
    },
  });
  image
    .save()
    .then(() => {
      res.setHeader("Access-Control-Allow-Origin", "*").sendStatus(200);
    })
    .catch(() => {
      res.setHeader("Access-Control-Allow-Origin", "*").sendStatus(400);
    });
};

exports.getImage = async (req, res, next) => {
  const images = await ImageModel.find();
  res.send(images); 
};
