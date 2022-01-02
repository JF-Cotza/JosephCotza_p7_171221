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
        const name=file.originalname.split(' ').join('_');
        const extension=MIMES_TYPES[file.mimetype];
        if(!extension){console.log('format non reconnu')};
        if(!extension){
            callback(new Error('something bad happened'));
        }
        else{
         callback(null, name + Date.now() + '.' + extension);
        }                  
    }
})

 module.exports=multer({storage:storage}).single('image');