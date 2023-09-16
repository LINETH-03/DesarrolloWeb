const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/submit', upload.single('dpiFile'), (req, res) => {
  const { name, email } = req.body;
  const dpiFile = req.file;

  // Almacenar los datos en un archivo JSON
  const contact = {
    name,
    email,
    dpiFile: dpiFile.filename,
  };

  fs.readFile('contacts.json', 'utf8', (err, data) => {
    if (err) {
      fs.writeFileSync('contacts.json', JSON.stringify([contact]));
    } else {
      const contacts = JSON.parse(data);
      contacts.push(contact);
      fs.writeFileSync('contacts.json', JSON.stringify(contacts));
    }
  });

  res.redirect('/list');
});

app.get('/list', (req, res) => {
  fs.readFile('contacts.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error interno del servidor.');
    } else {
      const contacts = JSON.parse(data);
      res.render('list', { contacts });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
