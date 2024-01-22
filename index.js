const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", (req, res) => {
  const file = req.files.upfile;

  if (!file) {
    return res.json({ error: "No file selected" });
  }

  const fileInfo = {
    name: file.name,
    type: file.mimetype,
    size: file.size,
  };

  res.json(fileInfo);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Your app is listening on port " + port);
});
