var express = require("express");
var cors = require("cors");
var multer = require("multer");
require("dotenv").config();

var app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Set up multer to handle file uploads
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

// Route to handle file uploads
app.post("/api/fileanalyse", upload.single("upfile"), function (req, res) {
  if (!req.file) {
    return res.json({ error: "No file uploaded" });
  }

  // Extract information about the uploaded file
  const { originalname, mimetype, size } = req.file;

  res.json({
    name: originalname,
    type: mimetype,
    size: size,
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
