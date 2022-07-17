const { response } = require('express');
const User = require('../models/user');
const Hospital = require('../models/hospital');
const Doctor = require('../models/doctor');

const find = async (req, res = response) => {

    const searchParam = req.params.by;
    //regular expression 'i' for vague search
    const regex = new RegExp(searchParam, 'i');

    const [users, hospitals, doctors] = await Promise.all([
        User.find({ name: regex }),
        Hospital.find({ name: regex }),
        Doctor.find({ name: regex })
    ])

    res.json({
        ok: true,
        found: 'found',
        searchParam,
        users,
        hospitals,
        doctors
    })
}

const findInCollection = async (req, res = response) => {

    const searchTableParam = req.params.table;

    const searchParam = req.params.by;
    //regular expression 'i' for vague search
    const regex = new RegExp(searchParam, 'i');

    let data = [];

    switch (searchTableParam) {
        case 'doctors':
            data = await Doctor.find({ name: regex })
            .populate('user','name img')
            .populate('hospital','name img')
            break;
        case 'hospitals':
            data = await Hospital.find({ name: regex })
            .populate('user','name img')
            break;
        case 'users':
            data = await User.find({ name: regex })
            break;
        default:
            return res.status(400).json({
                ok: false,
                msg: 'error'
            });
    }

    res.json({
        ok: true,
        results: data
    });

}

module.exports = {
    find,
    findInCollection
}