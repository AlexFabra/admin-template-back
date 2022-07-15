const User = require('../models/user');
const { response } = require('express');

const getUsers = async (req, res) => {

    const users = await User.find();

    res.json({
        ok: true,
        users
    });
};

const postUser = async (req, res = response) => {

    const { name, email, password } = req.body;
    
    try {

        const emailRepeated = User.findOne({ email });
        if (emailRepeated) {
            return res.status(400).json({
                ok: false,
                msg: 'the email is already registered'
            })
        }

        const user = new User(req.body);
        await user.save();

        res.json({
            ok: true,
            user,
            msg: 'post user'
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'error'
        })
    }

};




module.exports = {
    getUsers,
    postUser
}