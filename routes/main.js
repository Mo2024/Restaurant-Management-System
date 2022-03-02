const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync');
const main = require('../controllers/main')
const { isLoggedIn, isAdmin } = require('../middleware')

router.get('/', main.homepage);

module.exports = router;

