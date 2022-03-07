const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Item = require('./item')
const { cloudinary } = require('../cloudinary')

const MenuSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    items: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Item'
        }
    ]
});

MenuSchema.post('findOneAndDelete', async function (menu) {
    menu = await menu.populate('items')
    if (menu.items.length) {
        for (let i = 0; i < menu.items.length; i++) {
            if (menu.items[i].images.length) {
                for (let j = 0; j < menu.items[i].images.length; j++) {
                    await cloudinary.uploader.destroy(menu.items[i].images[j].filename);
                }
            }
        }
        await Item.deleteMany({ _id: { $in: menu.items } })
    }
})

module.exports = mongoose.model('Menu', MenuSchema);