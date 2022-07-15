// route:  /api/users

const { Router } = require('express');
const { getUsers, postUser } = require('../controllers/users');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields')

const router = Router();

router.get('/', getUsers);
router.post('/',
    [
        check('name', 'the name is required').not().isEmpty(),
        check('password', 'the password is required').not().isEmpty(),
        check('email','the email is required').isEmail(),
        validateFields
    ], postUser);

module.exports = router;