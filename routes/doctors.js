// /api/doctors

const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const { getDoctors, createDoctor, updateDoctor, deleteDoctor } = require('../controllers/doctors')

const router = Router();

router.get('/', getDoctors);

router.post('/',
    [
        validateJWT,
        check('name', 'Doctor name required').not().isEmpty(),
        check('hospital', 'Hospital id required').not().isMongoId(),
        //check('user','user identity required').not().isEmpty(),
        validateFields
    ], createDoctor);

router.put('/:id',
    [
        validateJWT,
        validateFields
    ], updateDoctor)

router.delete('/:id',
    validateJWT
    , deleteDoctor)

module.exports = router;