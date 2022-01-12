//structure de base bour les futures routes
const express = require('express');
const router = express.Router();
const toUserFunction = require('../controllers/user');
const checker=require('../middleware/auth');



//routes non connectée
router.post('/login', toUserFunction.userLogin);
router.post('/signin', toUserFunction.userSignin);
//routes connectée=>nécessite l'authentification
router.get('/getProfile',checker, toUserFunction.getProfile);
router.put('/profile', checker)//, toUserFunction.userProfile);
router.delete('/delete', checker)//, toUserFunction.userDelete);


module.exports = router;

//ce fichier-ci correspond à /api/auth suite à la création de la route
