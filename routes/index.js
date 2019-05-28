const { Router } = require('express');
let Photo = require('../models/Photo')

// cloudinary
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

const fs = require('fs-extra')
const router = Router();

router.get("/", (req, res) => {
    res.send("hello world")
})

router.post("/images/add", async (req, res) => {
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    const newPhoto = new Photo({
        imageURL: result.secure_url,
        public_id: result.public_id
    });
    await newPhoto.save()
        .then(newPhoto => {
            res.status(200).json('newPhoto added successfully')
        })
        .catch(err => {
            res.status(400).json.send('adding new newPhoto failed')
        })
    await fs.unlink(req.file.path);
})


module.exports = router;