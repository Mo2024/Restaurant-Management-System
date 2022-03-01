const Menu = require('../models/menu');
const Item = require('../models/item')
const { cloudinary } = require('../cloudinary')

module.exports.homepage = (req, res) => {
    res.render("main/home")
}

module.exports.new = async (req, res) => {
    const menu = await Menu.find({});
    res.render("main/new", { menu })
}

module.exports.newSection = async (req, res) => {
    let { name } = req.body.section
    name = name.charAt(0).toUpperCase() + name.slice(1);
    const menu = new Menu({ name });
    await menu.save();
    req.flash('success', `Successfully added ${name} to menu`)
    res.redirect('/main/new')
}


module.exports.newItem = async (req, res) => {
    const menu = await Menu.findById(req.body.section.id)
    const item = new Item(req.body.item);
    item.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    menu.items.push(item)
    await menu.save();
    await item.save();
    res.redirect('/main/new')
}