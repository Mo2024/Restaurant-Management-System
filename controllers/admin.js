const Menu = require('../models/menu');
const Item = require('../models/item');
const { cloudinary } = require('../cloudinary')

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
    req.flash('success', `Successfully deleted section`)
    res.redirect('/admin/delete')
}

module.exports.deleteItem = async (req, res) => {
    const { id } = req.body.item
    if (req.body.section.id === "Menu Section" || req.body.item.id === "Item") {
        req.flash('error', `Please select a section & an item`)
        res.redirect('/admin/delete')
        return
    }

    const item = await Item.findById(id);
    if (item.images.length) {
        for (let i = 0; i < item.images.length; i++) {
            await cloudinary.uploader.destroy(item.images[i].filename);

        }
    }

    await Item.findByIdAndDelete(id);
    req.flash('success', `Successfully deleted item`)
    res.redirect('/admin/delete')
}
