const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Photo = new Schema({
    title: String,
    description: String,
    imageURL: String,
    public_id: String
});


module.exports = mongoose.model("Photo", Photo);