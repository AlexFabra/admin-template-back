const { response } = require('express');
const Doctor = require('../models/doctor');

const getDoctors = async (req, res = response) => {
    const doctors = await Doctor.find().populate('user', 'name img')
        .populate('hospital', 'name img')
    res.json({
        ok: true,
        doctors
    })
}
const updateDoctor = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'createDoctor'
    })
}
const createDoctor = async (req, res = response) => {
    //token validation process adds the uid to request
    const uid = req.uid;

    const doctor = new Doctor({ user: uid, ...req.body })

    try {
        const doctorDb = await doctor.save();
        res.json({
            ok: true,
            doctor: doctorDb
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'error'
        })
    }
}
const deleteDoctor = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'deleteDoctor'
    })
}
module.exports = {
    getDoctors,
    updateDoctor,
    createDoctor,
    deleteDoctor
}