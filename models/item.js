const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const opts = { toJSON: { virtuals: true } };


const ImageSchema = new Schema({
    url: String,
    filename: String

})
ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200')
})

const ItemSchema = new Schema({
    name: String,
    price: Number,
    images: [ImageSchema],
    description: String,
    // rating: Number,
    // author: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User'
    // }

}, opts);

module.exports = mongoose.model("Item", ItemSchema);