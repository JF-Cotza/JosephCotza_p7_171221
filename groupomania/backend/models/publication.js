const mongoose = require('mongoose');

const publicationSchema = mongoose.Schema({                            //on crée le modèle
    userId: { type: String, required: true},       // 
    date:{type:Date, required:true},
    status:{type:String, default:1},               //0: masqué, 1:publié visible, 2:updated, 3:validé par admin
    title:{type:String, default:''},
    texte:{type:String, default:''},
    //file:{type:String, default:''},
    //like: { type: Object, default:{} }            //{like:'0',memberId:[],like:'1',memberId:[]}
});

module.exports = mongoose.model('Publication', publicationSchema);            //on l'exporte

