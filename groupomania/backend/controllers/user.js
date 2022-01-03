/* spécifique*/
const User = require('../models/user');
const connect=require('./connect');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const token = connect.token;

exports.userLogin=(req,res,next)=>{
    User.findOne({email : req.body.email})
        .then(user=>{
            if(!user){
                return res.status(401).json({error:"l'utilisateur n'existe pas"})
            }
            //console.log('found'); //ok
        
            res.status(200).json({user}) //on récupere les infos de user
        })
    }

        /*
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
                        token:jwt.sign({userId:user._id}, token.value ,{expiresIn:token.end})
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

/*
exports.userSigning=(req,res,next)=>{
    bcrypt.hash(req.body.password, 10)
        .then( hash => {
            const user=new User({
                email:req.body.email,
                password:hash
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

*/