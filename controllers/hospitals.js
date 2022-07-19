const { response } = require('express');
const Hospital = require('../models/hospital');

const getHospitals = async (req, res = response) => {
    const hospitals = await Hospital.find().populate('user', 'name img')
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

const updateHospital = async (req, res = response) => {

    const id = req.params.id;
    const uid = req.uid

    try {
        const hospital = await Hospital.findById(id);

        if (!hospital) {
            return res.status(404).json({
                ok: true,
                msg: 'non-existent hospital id'
            });
        }

        const hospitalChanges = {
            ...req.body,
            user: uid
        }

        const updatedHospital = await Hospital.findByIdAndUpdate(id, hospitalChanges, { new: true })

        hospital.name = req.body.name;

        res.json({
            ok: true,
            hospital: updatedHospital
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'error'
        })
    }
}

const deleteHospital = async (req, res = response) => {

    const id = req.params.id;

    try {
        const hospital = await Hospital.findById(id);

        if (!hospital) {
            return res.status(404).json({
                ok: true,
                msg: 'non-existent hospital id'
            });
        }

        await Hospital.findByIdAndDelete(id)

        hospital.name = req.body.name;

        res.json({
            ok: true,
            msg: 'Hospital deleted'
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'error'
        })
    }
}
module.exports = {
    getHospitals,
    updateHospital,
    createHospital,
    deleteHospital
}