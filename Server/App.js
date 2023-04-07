const express = require("express");
const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors"); 

const imageUpload = require("../Server/Controller/ImageUpload");

const app = express();
app.use ( cors()); 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'Uploads'); // Uploads will be saved in the 'uploads/' directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name as the filename
  },
});

const upload = multer({ storage: storage });


app.get('/upload-image', imageUpload.getImage);
app.post("/upload-image", upload.single("file"), imageUpload.postImage);

mongoose
  .connect(
    "mongodb+srv://pj:xh4EMwiJ5CYXCBLb@cluster0.zkevizy.mongodb.net/shop?retryWrites=true&w=majority"
  )
  .then((result) => {
    console.log("DB UP");
    app.listen(8000, () => {
      console.log("Server Started!!");
    });
  })
  .catch((err) => console.log(err));
