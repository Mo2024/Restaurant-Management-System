const Menu = require('../models/menu');
const Item = require('../models/item')
const { cloudinary } = require('../cloudinary')

module.exports.homepage = (req, res) => {
    res.render("main/home")
}

