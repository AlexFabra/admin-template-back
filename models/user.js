const {Schema, model} = require('mongoose');

const UserSchema = Schema({
    name: {
        type:String,
        required:true
    }, 
    email: {

        type:String,
        required:true,
        unique:true
    },
    password: {
        type:String,
        required:true
    },
    img: {
        type:String
    },
    role: {
        type:String,
        required:true,
        default:'USER_ROLE'
    },
    google: {
        type:Boolean,
        default:false
    }
});

//no canvia la bdd; és per mostrar les responses sense v ni id:

// UserSchema.method('toJSON', function(){
//     const {__v,_id,...object}=this.toObject();
//     return object;
// })



module.exports = model('User',UserSchema);