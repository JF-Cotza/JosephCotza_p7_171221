//structure de base bour les futures routes
const express = require('express');
const router = express.Router();
const toPublicationFunction=require('../controllers/publications');
const checker=require('../middleware/auth');
const multer=require('../middleware/multer');

const list=require('../middleware/consoleRoute')
//const testing=require('../middleware/testing')

router.post('/create', checker, multer, list, toPublicationFunction.createPublication); //multer après authentification pour éviter enregitrement images inutiles
//router.post('/:id/like',checker, toPublicationFunction.likes);
router.get('/all', checker, multer, toPublicationFunction.getAllPublications);
router.get('/getOne', checker, multer, toPublicationFunction.getOnePublications);
router.put('/update', checker, multer, toPublicationFunction.modifyPublication);
//commenter
router.post('/comment', checker, toPublicationFunction.addComment);
router.get('/allComments', checker, toPublicationFunction.getAllComments);
router.get('/listComments',list, checker, toPublicationFunction.onePublicationComments);
//router.delete('/:id',checker, multer, toPublicationFunction.deletePublication);

module.exports = router;
//ce fichier correpond à /api/sauces suite à la création de la route
