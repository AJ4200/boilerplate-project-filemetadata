const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");

app.use(cors());
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/index.html"));
});

app.post("/api/fileanalyse", (req, res) => {
  const { originalname, mimetype, size } = req.body.files.upfile;

  const fileInfo = {
    name: originalname,
    type: mimetype,
    size: size,
  };

  res.json(fileInfo);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Your app is listening on port " + port);
});
