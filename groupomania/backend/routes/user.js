//structure de base bour les futures routes
const express = require('express');
const router = express.Router();
const toUserFunction = require('../controllers/user');
const auth=require('../middleware/auth');



//routes non connectée
router.post('/login', toUserFunction.userLogin);
router.post('/signin', toUserFunction.userSignin);
//routes connectée=>nécessite l'authentification
router.get('/getProfile',auth,toUserFunction.getProfile);
router.put('/profile', auth, toUserFunction.userProfile);
router.put('/delete', auth, toUserFunction.userDelete);


module.exports = router;

//ce fichier-ci correspond à /api/auth suite à la création de la route
