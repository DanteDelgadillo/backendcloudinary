const { Router } = require('express');
const multer = require('multer');

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
    const newPhoto = new FormData({
        imageUrl: result.url,
        public_id: result.public_id
    });
    console.log(newPhoto)
    // await newPhoto.save()
    await fs.unlink(req.file.path);
    res.send(console.log("ok"))

})


module.exports = router;