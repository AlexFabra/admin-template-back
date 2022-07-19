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

const updateDoctor = async (req, res = response) => {

    const id = req.params.id;
    const uid = req.uid

    try {
        const doctor = await Doctor.findById(id);

        if (!doctor) {
            return res.status(404).json({
                ok: true,
                msg: 'non-existent ooctor id'
            });
        }

        const doctorChanges = {
            ...req.body,
            user: uid
        }

        const updatedDoctor = await Doctor.findByIdAndUpdate(id, doctorChanges, { new: true })

        doctor.name = req.body.name;

        res.json({
            ok: true,
            doctor: updatedDoctor
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'error'
        })
    }

}

const deleteDoctor = async (req, res = response) => {
   
    const id = req.params.id;

    try {
        const doctor = await Doctor.findById(id);

        if (!doctor) {
            return res.status(404).json({
                ok: true,
                msg: 'non-existent doctor id'
            });
        }

        await Doctor.findByIdAndDelete(id)

        doctor.name = req.body.name;

        res.json({
            ok: true,
            msg: 'Doctor deleted'
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'error'
        })
    }
}
module.exports = {
    getDoctors,
    updateDoctor,
    createDoctor,
    deleteDoctor
}