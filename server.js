console.log(`Website Loading`);

const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

console.log(`Main loaded`);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

console.log(`All uploads section loaded`);

const upload = multer({ storage: storage });

app.use(express.static('public'));

console.log(`Storage loaded`);

app.post('/upload', upload.single('file'), (req, res) => {
  res.redirect('/');
});

app.get('/files', (req, res) => {
  fs.readdir(path.join(__dirname, 'uploads'), (err, files) => {
    if (err) return res.status(500).send('Unable to scan files! Reload me to try again');
    res.json(files);
  });
});

app.get('/files/:filename', (req, res) => {
  const file = path.join(__dirname, 'uploads', req.params.filename);
  res.download(file);
});

console.log(`Sub-links loaded`);

app.listen(port, () => {
  console.log(`_____________________________________________________`);
  console.log(`Website now running at http://localhost:${port}/ :3`);
  console.log(`Ur version is v1.0 release - Build 6`);
  console.log(`_____________________________________________________`);
  console.log(`Updates at [website is currently down sorry]`);
  console.log(`My socials:`);
  console.log(`YT: https://youtube.com/@SonicPika._.`);
  console.log(`GitHub: https://github.com/sonicpikalidny`);
  console.log(`_____________________________________________________`);
});
