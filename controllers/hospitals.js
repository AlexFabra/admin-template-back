const { response } = require('express');
const Hospital = require('../models/hospital');

const getHospitals = async (req, res = response) => {
    const hospitals = await Hospital.find().populate('user','name img')
    res.json({
        ok: true,
        hospitals
    })
}
const createHospital = async (req, res = response) => {

    //token validation process adds the uid to request
    const uid = req.uid;

    const hospital = new Hospital({ user: uid, ...req.body });

    try {
        const hospitalDb = await hospital.save();
        res.json({
            ok: true,
            hospital: hospitalDb
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'error'
        })
    }

}



const updateHospital = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'updateHospital'
    })
}
const deleteHospital = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'deleteHospital'
    })
}
module.exports = {
    getHospitals,
    updateHospital,
    createHospital,
    deleteHospital
}