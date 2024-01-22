const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", (req, res) => {
  if (!req.body || !req.body.upfile) {
    return res.json({ error: "No file selected" });
  }

  const file = req.body.upfile;
  const fileInfo = {
    name: file.originalname,
    type: file.mimetype,
    size: file.size,
  };

  res.json(fileInfo);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Your app is listening on port " + port);
});
