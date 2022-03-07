const Menu = require('../models/menu');
const Item = require('../models/item');

module.exports.new = (req, res) => {
    res.render("admin/new")
}

module.exports.delete = async (req, res) => {
    res.render("admin/delete")
}

module.exports.newSection = async (req, res) => {
    let { name } = req.body.menu
    name = name.charAt(0).toUpperCase() + name.slice(1);
    const menu = new Menu({ name });
    await menu.save();
    req.flash('success', `Successfully added ${name}`)
    res.redirect('/admin/new')
}


module.exports.newItem = async (req, res) => {
    if (req.body.section.id === "Menu Section") {
        req.flash('error', `You did not choose where the item belongs in the menu`)
        res.redirect('/admin/new')
        return
    }
    const menu = await Menu.findById(req.body.section.id)
    const item = new Item(req.body.item);
    item.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    menu.items.push(item)
    await menu.save();
    await item.save();
    req.flash('success', `Successfully added ${req.body.item.name}`)
    res.redirect('/admin/new')
}

module.exports.deleteMenu = async (req, res) => {
    if (req.body.section.id === "Menu Section") {
        req.flash('error', `Please select a section to delete`)
        res.redirect('/admin/delete')
        return
    }
    await Menu.findByIdAndDelete(req.body.section.id);
    req.flash('success', `Successfully deleted ${req.body.section.id}`)
    res.redirect('/admin/delete')
}
