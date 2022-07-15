const { response } = require('express');
const User = require('../models/user');
//encrypt password library:
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');

const login = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        //verify email:
        const user = await User.findOne({ email });
        if(!user){
            return res.status(404).json({
                ok:false,
                msg:'email or password not valid'
            });
        }
        //verify password:
        const validPassword = bcrypt.compareSync(password,user.password);
        if(!validPassword){
            return res.status(400).json({
                ok:false,
                msg:'email or password not valid'
            });
        }

        //generate token:
        const token = await generateJWT(user.id);

        res.json({
            ok: true,
            msg: 'welcome',
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error'
        })
    }
}

module.exports = {
    login
}