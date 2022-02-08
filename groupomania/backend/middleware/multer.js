const multer = require('multer');
const MIMES_TYPES ={                
    'image/jpg' : 'jpg',           
    'image/jpeg': 'jpg',
    'image/png' : 'png'         
};

const list=(req,res,next)=>{
    console.log(req.body.file.filename)
    next();
}

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null,'images')            
    },
    filename: (req, body,callback) =>{        
        console.log(body)
        /*
        const name=req.body.file.name.split(' ').join('_');
        */
       let name='toto'
        const extension=MIMES_TYPES[file.mimetype];

        console.log('multer');
        console.log(req.body);
        //console.log('name: '+name);
        console.log('extension: '+extension);
        
        if(!extension){console.log('format non reconnu')};
        if(!extension){
            console.log('multer if'+req);
            callback(new Error('something bad happened'));
        }
        else{
            console.log('multer else'+req);
         callback(null, name + Date.now() + '.' + extension);
        }    
    }
})

module.exports=multer({storage:storage}).single('body.file');