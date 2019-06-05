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

router.get("/getAllImages", (req, res) => {
    Photo.find(function (err, Photo) {
        if (err) {
            console.log(err);
        } else {
            res.json(Photo);
        }
    })
})

router.post("/images/add", async (req, res) => {
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    const newPhoto = new Photo({
        imageURL: result.secure_url,
        public_id: result.public_id,
        title: req.body.title,
        description: req.body.description

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

router.delete("/image/delete/:id", async (req, res) => {
    const id = req.params.id;
    const photo = await Photo.findByIdAndDelete(id)
    await cloudinary.v2.uploader.destroy(photo.public_id)
        .then(photo => {
            res.json('photo deleted');
        })
        .catch(err => {
            res.status(400).send("delete no possible")
        })
})


module.exports = router;