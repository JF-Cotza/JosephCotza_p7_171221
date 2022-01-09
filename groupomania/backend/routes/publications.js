//structure de base bour les futures routes
const express = require('express');
const router = express.Router();
const toPublicationFunction=require('../controllers/publications');
const checker=require('../middleware/auth');
const multer=require('../middleware/multer');

//router.post('/', checker,multer, toPublicationFunction.createPublication); //multer après authentification pour éviter enregitrement images inutiles
//router.post('/:id/like',checker, toPublicationFunction.likes);
//router.get('/', checker, multer, toPublicationFunction.getAllPublications);
//router.get('/:id', checker,multer, toPublicationFunction.getOnePublications);
//router.put('/:id',checker, multer, toPublicationFunction.modifyPublication);
//router.delete('/:id',checker, multer, toPublicationFunction.deletePublication);

module.exports = router;
//ce fichier correpond à /api/sauces suite à la création de la route
