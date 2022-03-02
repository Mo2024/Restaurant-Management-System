const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync');
const admin = require('../controllers/admin')
const { isLoggedIn, isAdmin, validateMenu, validateItem } = require('../middleware')
const multer = require('multer')
const { storage } = require('../cloudinary/index');
const upload = multer({ storage })

router.route('/new')
    .get(isLoggedIn, isAdmin, admin.new);

router.route('/menu')
    .post(isLoggedIn, isAdmin, validateMenu, catchAsync(admin.newSection))

router.post('/item', isLoggedIn, isAdmin, upload.array('image'), validateItem, catchAsync(admin.newItem))

module.exports = router;

