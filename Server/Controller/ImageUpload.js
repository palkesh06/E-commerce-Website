const ImageModel = require("../Models/Files");
exports.postImage = (req, res, err) => {
  const image = new ImageModel({
    name: req.file.originalname,
    image: {
      data: req.file.filename,
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
