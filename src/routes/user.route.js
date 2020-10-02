const express = require('express');
const controller = require('../controllers/user.controller');

const router = express.Router();

router.route('/').get(controller.create);
router.route('/').post(controller.create);

module.exports = router;
