/* spécifique*/
const User = require('../models/user');
const connect=require('./connect');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const token = connect.token;
const fileSystem=require('fs');                     //donne accés aux opérations systèmes, par exemple la suppression de fichier


/*exports.userLogin=(req,res,next)=>{
    User.findOne({email : req.body.email})
        .then(user=>{
            if(!user){
                return res.status(401).json({error:"l'utilisateur n'existe pas"})
            }
            //console.log('found'); //ok
        
            res.status(200).json({user}) //on récupere les infos de user
        })
    }
*/
        
exports.userLogin=(req,res,next)=>{
    User.findOne({email : req.body.email})
        .then(user=>{
            if(!user){
                return res.status(401).json({error:"l'utilisateur n'existe pas"})
            }
              
            bcrypt.compare(req.body.password, user.password)   
                .then(valid=>{              
                    if(!valid){
                        return res.status(401).json({ error: "connexion non autorisée" })
                    }
                    res.status(200).json({ 
                        userId:user._id,
                        userRank:user.rank,
                        token:jwt.sign({userId:user._id},token.value ,{expiresIn:token.end})
                    })
                })
            .catch(error=> {
                console.log('erreur1 login user ' + error.message);
                res.status(500).json({error})
                })
        })
        .catch(error => {
            console.log('erreur2 login user ' + error.message);
            res.status(500).json({error})
        })
};


exports.userSignin=(req,res,next)=>{
    bcrypt.hash(req.body.password, 10)
        .then( hash => {
            const user=new User({
                email:req.body.email,
                password:hash,
                name:req.body.name,
                firstname:req.body.firstname
            });

            user.save()
.then(() =>res.status(201).json({ 
                        message: 'utilisateur créé' 
                    }))
                .catch(error =>{
                        console.log('erreur création user '+error.message);
                        res.status(400).json({ error })
                        });
            })
        .catch(error => res.status(500).json({error}));
};


exports.getProfile = (req, res, next) => {
    //console.log('getProfile');
    const id=req.headers.authorization.split(' ')[0]; 
    User.findOne({ _id: id })
    //User.findOne({ _id: req.body.userId })
        .then((user)=>{
            if(!user){
                return res.status(401).json({error:"l'utilisateur n'existe pas"})
            }
            //console.log('found'); //ok
        
            res.status(200).json({user}) //on récupere les infos de user
            })
}

exports.udateProfile = (req,res,next) => {
    let diskImageUrl;
    let key='15';

    const userObject = req.file ?
        {
            ...JSON.parse(req.body.user),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };

    User.findOne({ _id: req.params.id })
        .then((user)=>{
            diskImageUrl=user.imageUrl;
            if (userObject.imageUrl){
                const filename=diskImageUrl.split('/images/')[1]; 
                fileSystem.unlink(`./images/${filename}`, ()=>console.log('fichier supprimé'))
            }
            else{console.log("image non modifiée")};
        })
        .catch(() => diskImageUrl='')


    User.updateOne({ _id: req.params.id }, { ...userObject, _id : req.params.id })     //on recherche dans la DB, l'objet ayant pour _id, celui passé en paramétre)     //on recherche dans la DB, l'objet ayant pour _id, celui passé en paramétre pour pouvoir le modifier
        .then(() => res.status(200).json({message : 'user mise à jour'}))
        .catch((error) =>{
             res.status(400).json({ error })
        });
};

exports.userDelete = (req,res,next) => {
    User.findOne({ _id: req.params.id })
        .then(user=>{
            const filename=user.imageUrl.split('/images/')[1]; // pour récupérer le nom du fichier à supprimer, on récupére l'image URL. l'image url contient le chemin complet répertoire('/image/')+nom. avec le split on obtient un tableau et on ne garde que la partie après le répertoire càd le nom du fichier
            fileSystem.unlink(`./images/${filename}`, ()=>        // on appele la méthode unlink de fs pour supprimer le fichier .unlink('chemin+nom du fichier à supprimer', fonction à éxécuter quand la suppression est effectuée)
                User.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'sauce supprimée' }))
                    .catch(error => {
                        res.status(400).json({ error })
                    })
                    )
                })
        .catch((error) => {
            res.status(500).json({ error })
        });
};





/*
const Sauce = require('../models/sauce');

exports.getAllSauce = (req,res,next) => {
    Sauce.find()                  //find permet de chercher dans la DB. sans rien = tous
        .then ((sauces)=>{
            res.status(200).json(sauces)
            })
        .catch (error => {
            res.status(400).json({error})
        })
};

exports.likes =(req,res,next)=>{
    let query = { _id: req.params.id };
    let like=req.body.like;
    let id=req.body.userId;
    
    Sauce.findOne(query)
    .then((sauce)=>{
        if(like==1){
            Sauce.updateOne(sauce,{$push:{usersLiked:id}}) 
                .then(()=>res.status(201).json({message:'Mise à jour effectuée'}))
                .catch(error=>res.status(500).json({error}))
            }
        else if (like == -1) {
            Sauce.updateOne(sauce, { $push: { usersDisliked: id } })
                .then(() => res.status(201).json({ message: 'Mise à jour effectuée' }))
                .catch(error => res.status(500).json({ error }))
        }
        else if (like==0){
            {
                Sauce.updateOne(sauce, { $pull: { usersLiked: id, usersDisliked:id } })
                    .then(() => res.status(201).json({ message: 'Mise à jour effectuée' }))
                    .catch(error => res.status(500).json({ error }))
            }
        }
    })
    .catch(error=>res.status(400).json({error}))
}
*/
