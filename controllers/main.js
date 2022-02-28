const Menu = require('../models/menu');

module.exports.homepage = (req, res) => {
    res.render("main/home")
}

module.exports.new = (req, res) => {
    res.render("main/new")
}

module.exports.newSection = async (req, res) => {
    let { name } = req.body.section
    name = name.charAt(0).toUpperCase() + name.slice(1);
    const menu = new Menu({ name });
    await menu.save();
    req.flash('success', `Successfully added ${name} to menu`)
    res.redirect('/main/new')
}