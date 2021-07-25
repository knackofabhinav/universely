const { Router } = require("express");
const router = Router();

// MULTER
const multer = require("multer");
// SET STORAGE
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

router.route("/").post(async (req, res) => {
  try {
    const upload = multer({ storage }).single("uploaded-file");
    upload(req, res, function (err) {
      if (err) {
        return res.send(err);
      }
      console.log("file uploaded to server");
      console.log(req.file);

      // SEND FILE TO CLOUDINARY
      const cloudinary = require("cloudinary").v2;
      cloudinary.config({
        cloud_name: "knackofabhinav",
        api_key: "838159966596382",
        api_secret: "TT9zC3Y7bIygWH2kGd8id40Vn88",
      });

      const path = req.file.path;
      const uniqueFilename = new Date().toISOString();

      cloudinary.uploader.upload(
        path,
        { public_id: `blog/${uniqueFilename}`, tags: `blog` }, // directory and tags are optional
        function (err, image) {
          if (err) return res.send(err);
          console.log("file uploaded to Cloudinary");
          // remove file from server
          const fs = require("fs");
          fs.unlinkSync(path);
          // return image details
          res.json(image);
        }
      );
    });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
