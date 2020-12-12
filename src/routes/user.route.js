const express = require('express');
const { checkSchema } = require('express-validator');
const controller = require('../controllers/user.controller');
const {
  userCreateValidatorSchema,
  userUpdateValidatorSchema,
} = require('../validators/user.validator');

const router = express.Router();

router.route('/').get(controller.index);
router.route('/thrash').get(controller.thrash);
router.route('/create').get(controller.create);
router.route('/').post(checkSchema(userCreateValidatorSchema), controller.store);
router.route('/:uuid').get(controller.show);
router.route('/edit/:uuid').get(controller.edit);
router.route('/update/:uuid').patch(checkSchema(userUpdateValidatorSchema), controller.update);
router.route('/delete/:uuid/').get(controller.destroy);
router.route('/force-delete/:uuid/').get(controller.forceDelete);
router.route('/restore/:uuid/').get(controller.restore);

module.exports = router;
