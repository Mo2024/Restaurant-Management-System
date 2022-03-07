const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync');
const admin = require('../controllers/admin')
const { isLoggedIn, isAdmin, validateMenu, validateItem, limitHandler } = require('../middleware')
const multer = require('multer')
const { storage } = require('../cloudinary/index');
const { sizeLimit } = require('../utils/limitSize')
const upload = multer({ limits: { fileSize: sizeLimit }, storage })

router.route('/new')
    .get(isLoggedIn, isAdmin, admin.new);

router.route('/menu')
    .post(isLoggedIn, isAdmin, validateMenu, catchAsync(admin.newSection))

router.post('/item', isLoggedIn, isAdmin, upload.array('image'), limitHandler, validateItem, catchAsync(admin.newItem))

module.exports = router;

