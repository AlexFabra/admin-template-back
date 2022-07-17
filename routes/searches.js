const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const { find } = require('../controllers/searches');

const router = Router();

router.get(
    '/:by',
    [validateJWT],
    find
);

module.exports = router;