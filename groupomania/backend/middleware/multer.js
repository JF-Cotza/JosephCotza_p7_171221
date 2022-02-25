const multer = require('multer');
const MIMES_TYPES ={                
    'image/jpg' : 'jpg',           
    'image/jpeg': 'jpg',
    'image/png' : 'png'         
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null,'images')            
    },
    filename: (req, file, callback) =>{      
        /* structure des données de publicationInfos
        Object { maker: "61d4b6959dbdc12a96638ccb", date: Date Wed Feb 23 2022 16:34:52 GMT+0100 (heure normale d’Europe centrale), title: "tri", texte: "tri", where: "newEdition.vue", file: File }
        date: Date Wed Feb 23 2022 16:34:52 GMT+0100 (heure normale d’Europe centrale)
        file: File { name: "Mip-06.png", lastModified: 1640988258655, size: 1274676, … }
​        maker: "61d4b6959dbdc12a96638ccb"
​        texte: "tri"
​        title: "tri"
​        where: "newEdition.vue"
*/
        // ce qui est envoyé par axios : form.append('filename',publicationInfos.file);
        // comment c'est déclaré dans axios : data:form,

        const testName=data.form.filename.publicationInfos.file.name;
        /* ne fonctionnent pas
        data.form.filename.publicationInfos.file.name
        data.form.filename.publicationInfos.file
        data.form.filename.name
        data.form.filename
        data.form
        form.filename.publicationInfos.file.name
        form.filename.publicationInfos.file
        form.filename.name
        form.filename
        form
        */
        if(!file){
            console.log('multer pas de fichier');
        }
        else{
            console.log('multer fichier');
        }
        
        const name=testName.split(' ').join('_');       
        const extension=MIMES_TYPES[testName.mimetype];

        console.log('name: '+name);
        console.log('extension: '+extension);
        if(!extension){console.log('format non reconnu')};
        if(!extension){
            console.log('multer if'+req);
            callback(new Error('something bad happened'))        
        }
        else{
            console.log('multer else'+req);
            callback(null, name + Date.now() + '.' + extension);
        } 
        
    }
})

module.exports=multer({storage:storage}).single('/images');