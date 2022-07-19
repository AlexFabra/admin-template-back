// /api/hospitals

const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const { getHospitals, updateHospital, createHospital, deleteHospital } = require('../controllers/hospitals')

const router = Router();

router.get('/',
    [],
    getHospitals
);

router.post('/',
    [
        validateJWT,
        check('name', 'hospital name required').not().isEmpty(),
        validateFields
    ], createHospital
);

router.put('/:id',
    [
        validateJWT,
        check('name', 'hospital name required').not().isEmpty(),
        validateFields
    ], updateHospital
);

router.delete('/:id',
    validateJWT
    , deleteHospital
);

module.exports = router;