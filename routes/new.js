const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync');
const main = require('../controllers/main')
const { isLoggedIn, isAdmin, validateMenu, validateItem } = require('../middleware')
const multer = require('multer')
const { storage } = require('../cloudinary/index');
const upload = multer({ storage })

router.route('/new')
    .get(isLoggedIn, isAdmin, main.new);

router.post('/new/section', isLoggedIn, isAdmin, validateMenu, catchAsync(main.newSection))

// router.post('/new/item', upload.array('image'), catchAsync(main.newItem))
router.post('/new/item', isLoggedIn, isAdmin, upload.array('image'), validateItem, catchAsync(main.newItem))

module.exports = router;

