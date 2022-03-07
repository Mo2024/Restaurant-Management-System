const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync');
const admin = require('../controllers/admin')
const { isLoggedIn, isAdmin, validateMenu, validateItem, limitHandler } = require('../middleware')
const multer = require('multer')
const { storage } = require('../cloudinary/index');
const { sizeLimit } = require('../utils/limitSize')
const upload = multer({ limits: { fileSize: sizeLimit }, storage })

router.get('/new', isLoggedIn, isAdmin, admin.new);

router.get('/delete', isLoggedIn, isAdmin, admin.delete);

router.route('/menu')
    .post(isLoggedIn, isAdmin, validateMenu, catchAsync(admin.newSection))
    .delete(isLoggedIn, isAdmin, catchAsync(admin.deleteMenu))

router.route('/item')
    .post(isLoggedIn, isAdmin, upload.array('image'), limitHandler, validateItem, catchAsync(admin.newItem))
    .delete(isLoggedIn, isAdmin, catchAsync(admin.deleteItem))

module.exports = router;

