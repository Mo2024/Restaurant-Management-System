const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync');
const main = require('../controllers/main')
const { isLoggedIn, isAdmin } = require('../middleware')

router.get('/', main.homepage);

router.route('/new')
    .get(isLoggedIn, isAdmin, main.new);

router.post('/new/section', isLoggedIn, isAdmin, catchAsync(main.newSection))

module.exports = router;

