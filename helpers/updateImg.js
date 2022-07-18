const User = require('../models/user');
const Hospital = require('../models/hospital');
const Doctor = require('../models/doctor');
const fs = require('fs');

const deleteFile = (path) => {

    if (fs.existsSync(path)) {
        //delete oldFile
        fs.unlinkSync(path);
    }
}

const updateImg = async (type, id, fileName) => {

    let oldFile=''

    switch (type) {
        case 'doctors':

            const doctor = await Doctor.findById(id);
            if (!doctor) {
                return false;
            }
            oldFile = `.uploads/doctors/${doctor.img}`
            deleteFile(oldFile);
            doctor.img = fileName;
            await doctor.save();
            return true;
            

        case 'hospitals':

            const hospital = await Hospital.findById(id);
            if (!hospital) {
                return false;
            }
            oldFile = `.uploads/hospital/${hospital.img}`
            deleteFile(oldFile);
            hospital.img = fileName;
            await hospital.save();
            return true;

        case 'users':

            const user = await User.findById(id);
            if (!user) {
                return false;
            }
            oldFile = `.uploads/users/${user.img}`
            deleteFile(oldFile);
            user.img = fileName;
            await user.save();
            return true;

        default:
            break;
    }
}

module.exports = { updateImg }