const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const multer = require('multer');
const path = require('path');
const PORT = process.env.PORT || 4000;

const app = express();

// middleware
app.use(cors());
app.use(bodyParser.json());

const storage = multer.diskStorage({
    destination: path.join(__dirname, "public/uploads"),
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
})
app.use(multer({ storage }).single("file"));

mongoose.connect(process.env.MONGODB_CONNECTION, { useUnifiedTopology: true, useNewUrlParser: true })
const connection = mongoose.connection;

connection.once("open", function () {
    console.log('mongodb connection is working')
})

// routes
app.use(require('./routes/index'))


app.listen(PORT, function () {
    console.log(`port running on ${PORT}`)
})
