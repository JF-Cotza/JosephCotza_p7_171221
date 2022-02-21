/* spécifique*/
const Publication = require('../models/publication');
const Comment = require('../models/comment');

const fileSystem=require('fs');                     //donne accés aux opérations systèmes, par exemple la suppression de fichier

exports.createPublication = (req,res, next) => {
    console.log('createPublication');
    req.body.where+=' / create publication';
    console.log(req.body);
    console.log(req.body.filename);
    //console.log(req.body.file.name)
    //console.log(req.header);

/*  const publicationParsing=JSON.parse(req.body.publication)
    delete publicationParsing._id; // pour supprimer un id présent dans la req
    console.log(publicationParsing);*/
    const publication=new Publication({        
        userId:req.body.maker,       // 
        date:req.body.date,
        title:req.body.title,                               //0: masqué, 1:publié visible, 2:updated, 3:validé par admin
        texte:req.body.texte,
        //file:req.body.publication.file
        //image:{type
        //image:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        
    }
    );
    publication.save()
        .then(()=>{
              res.status(201).json({message:'publication créée'})})
        .catch(error=> {
            res.status(400).json({error})}
            );
};

exports.getAllPublications = (req,res,next) => {
    Publication.find()                  //find permet de chercher dans la DB. sans rien = tous
        .then ((publications)=>{
            res.status(200).json(publications)
            })
        .catch (error => {
            res.status(400).json({error})
        })
};

exports.getAllComments = (req,res,next) => {
    Comment.find()                  //find permet de chercher dans la DB. sans rien = tous
        .then ((comments)=>{
            res.status(200).json(comments)
            })
        .catch (error => {
            res.status(400).json({error})
        })
};

exports.getOnePublications = (req, res, next) => {
    Publication.findOne( { _id : req.query.id })     //on recherche dans la DB, l'objet ayant pour _id, celui passé en paramétre
        .then(publication => {
            //publication.likes=publication.usersLiked.length;
            //publication.dislikes=publication.usersDisliked.length;
            res.status(200).json(publication); 
        })
        .catch((error) => {
            res.status(400).json({ error })
        })
};


exports.modifyPublication = (req,res,next) => {
    let diskImageUrl;
    let key='15';
    console.log('modifyPublication');
    console.log(req.body);
    const publicationObject = req.file ?{
            ...JSON.parse(req.body.publication),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };

    Publication.findOne({ _id: req.body.id })
        .then((publication)=>{
            diskImageUrl=publication.imageUrl;
            if (publicationObject.imageUrl){
                const filename=diskImageUrl.split('/images/')[1]; 
                fileSystem.unlink(`./images/${filename}`, ()=>console.log('fichier supprimé'))
            }
            else{console.log("image non modifiée")};
        })
        .catch(() => diskImageUrl='')


    Publication.updateOne({ _id: req.body._id }, { ...publicationObject, _id : req.body._id })     //on recherche dans la DB, l'objet ayant pour _id, celui passé en paramétre)     //on recherche dans la DB, l'objet ayant pour _id, celui passé en paramétre pour pouvoir le modifier
        .then(() => res.status(200).json({message : 'publication mise à jour'}))
        .catch((error) =>{
             res.status(400).json({ error })
        });
};

exports.addComment=(req,res,next)=>{
    console.log('addComment');
    console.log(req.body);
    //console.log(req.header);
    const comment=new Comment({
            userId:req.body.userId,
            publicationId:req.body.publicationId,
            date:req.body.date,
            status:req.body.status,                               //0: masqué, 1:publié visible, 2:updated, 3:validé par admin
            texte:req.body.texte
        }
    );
    comment.save()
        .then(()=>{
              res.status(201).json({message:'commentaire créé'})})
        .catch(error=> {
            res.status(400).json({error})}
            );
};

exports.onePublicationComments= (req, res, next) => {
    Comment.find( { publicationId : req.query.id })     //on recherche dans la DB, l'objet ayant pour _id, celui passé en paramétre
        .then(comments => {
            console.log('onePubComments');
            //console.log(comments)
            //console.log(publicationId)
            //publication.likes=publication.usersLiked.length;
            //publication.dislikes=publication.usersDisliked.length;
            res.status(200).json(comments); 
        })
        .catch((error) => {
            res.status(400).json({ error })
        })
};



/*
exports.deleteSauce = (req,res,next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce=>{
            const filename=sauce.imageUrl.split('/images/')[1]; // pour récupérer le nom du fichier à supprimer, on récupére l'image URL. l'image url contient le chemin complet répertoire('/image/')+nom. avec le split on obtient un tableau et on ne garde que la partie après le répertoire càd le nom du fichier
            fileSystem.unlink(`./images/${filename}`, ()=>        // on appele la méthode unlink de fs pour supprimer le fichier .unlink('chemin+nom du fichier à supprimer', fonction à éxécuter quand la suppression est effectuée)
                Sauce.deleteOne({ _id: req.params.id })
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