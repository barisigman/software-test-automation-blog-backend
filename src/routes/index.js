const express = require('express');
const homeRoutes = require('./home.route');
const userRoutes = require('./user.route');

const router = express.Router();

router.use('/', homeRoutes);
router.use('/users', userRoutes);

module.exports = router;
