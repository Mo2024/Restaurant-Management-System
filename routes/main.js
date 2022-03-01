const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync');
const main = require('../controllers/main')
const { isLoggedIn, isAdmin, validateMenu } = require('../middleware')
const multer = require('multer')
const { storage } = require('../cloudinary/index');
const upload = multer({ storage })
router.get('/', main.homepage);

router.route('/new')
    .get(isLoggedIn, isAdmin, catchAsync(main.new));

router.post('/new/section', isLoggedIn, isAdmin, validateMenu, catchAsync(main.newSection))

router.post('/new/item', upload.array('image'), catchAsync(main.newItem))
// router.post('/new/item', isLoggedIn, isAdmin, upload.array('image'), validate, catchAsync(main.newItem))

module.exports = router;

