const User = require('../models/user');
const { response } = require('express');
//encrypt password library:
const bcrypt = require('bcryptjs');

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
        user.password = bcrypt.hashSync(password,salt);
        
        await user.save();

        res.json({
            ok: true,
            user,
            msg: 'post user'
        });

    } catch (error) {
        console.log(error)
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