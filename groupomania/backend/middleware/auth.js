const jwt = require('jsonwebtoken');
const link = require('../controllers/connect');
const linkedKey=link.token.value;

module.exports = (req, res,next) =>{
    //console.log('auth.js>body');
    //console.log(req);
    try{
        const token = req.headers.authorization.split(' ')[1]; 
        /*
        console.log('auth.js');
        console.log(req.headers.authorization);
        console.log('token '+ token);
        console.log('req body : ');
        console.log(req.body.userId);
        */
        const checkToken=jwt.verify(token,linkedKey);
        const userId=checkToken.userId;
        /*
        console.log('userId token: ')
        console.log(userId);
        */
        if(req.body.userId && req.body.userId !== userId){
            console.log('ok');
            throw 'user ID invalide'
        }
        else{
            console.log('false');
            next();
        }
    }
    catch(error){
            res.status(401).json({error:error | "échec de l'identification"});         }
};