const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync');
const admin = require('../controllers/admin')
const { isLoggedIn, isAdmin, validateMenu, validateItem } = require('../middleware')
const multer = require('multer')
const { storage } = require('../cloudinary/index');
const sizeLimit = 1000000 //4mb
const upload =
    multer({
        limits: {
            fileSize: sizeLimit
        },
        // storage

    })

const limitHandler = (err, req, res, next) => {
    if (err) {

        req.flash('error', `The maximum file size is ${sizeLimit}`)
        res.redirect('/admin/new')
    } else {
        // upload =
        //     multer({
        //         storage
        //     })
        next()
    }
}


router.route('/new')
    .get(isLoggedIn, isAdmin, admin.new);

router.route('/menu')
    .post(isLoggedIn, isAdmin, validateMenu, catchAsync(admin.newSection))

router.post('/item', isLoggedIn, isAdmin, upload.array('image'), limitHandler, validateItem, catchAsync(admin.newItem))

module.exports = router;

