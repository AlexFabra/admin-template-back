const User = require('../models/user');
const { response } = require('express');
//encrypt password library:
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');

const getUsers = async (req, res) => {

    const users = await User.find();

    res.json({
        ok: true,
        users
    });
};

const postUser = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const emailRepeated = await User.findOne({ email });

        if (emailRepeated) {
            return res.status(400).json({
                ok: false,
                msg: 'the email is already registered'
            })
        }

        const user = new User(req.body);

        //encrypt pwd (1 way hash):
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        //generate token:
        const token = await generateJWT(user.id)

        res.json({
            ok: true,
            user,
            msg: 'post user',
            token
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'error'
        })
    }

};

const updateUser = async (req, res = response) => {
    const uid = req.params.id;
    try {
        const userDB = await User.findById(uid);
        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'inexistent id',
                uid
            })
        }
        //update user
        const { password, google, email, ...fields } = req.body;

        if (userDB.email !== email) {
            //in case that the new email already exists on bdd:
            const existentEmail = await User.findOne({ email });
            if (existentEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'this new email already exists'
                })
            }
        }
        fields.email = email;

        const updatedUser = await User.findByIdAndUpdate(uid, fields, { new: true });

        res.json({
            ok: true,
            user: updatedUser
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'error'
        })
    }
}

const deleteUser = async (req, res = response) => {
    const uid = req.params.id;

    try {

        const userDB = await User.findById(uid);
        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'inexistent id'
            })
        }

        await User.findByIdAndDelete(uid);

        res.json({
            ok: true,
            uid
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'error'
        })
    }
}




module.exports = {
    getUsers,
    postUser,
    updateUser,
    deleteUser
}