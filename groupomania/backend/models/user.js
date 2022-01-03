const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');   //on a besoin du module mongoose-unique-validator

const userSchema = mongoose.Schema({                            //on crée le modèle
    email: { type: String, required: true, unique: true },      //unique => empêche en théorie le multi enregistrement avec le même mail
    name:{type:String},
    firstname:{type:String},
    service:{type:String},
    rank:{type:String},
    description:{type:String},
    avatar:{type:String},
    password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);                             //uniqueValidator renforce la sécurité et évite des bugs

module.exports = mongoose.model('User', userSchema);            //on l'exporte

