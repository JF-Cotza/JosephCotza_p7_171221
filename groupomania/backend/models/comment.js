const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({                            //on crée le modèle
    userId: { type: String, required: true},       //
    publicationId: { type: String, required: true},
    date:{type:Date, required:true},
    status:{type:String, default:1},               //0: masqué, 1:publié visible, 2:updated, 3:validé par admin
    texte:{type:String, default:''},
    //like: { type: Object, default:{} }            //{like:'0',memberId:[],like:'1',memberId:[]}
});

module.exports = mongoose.model('Comment', commentSchema);            //on l'exporte

