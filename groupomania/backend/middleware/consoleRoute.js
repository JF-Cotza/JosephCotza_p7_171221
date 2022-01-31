module.exports = (req, res,next) =>{
    console.log('publications>modify>pre multer');
    //console.log(req);
    console.log('data')
    console.log(req.data);
    console.log('body');
    //console.log(req[0]);
    //console.log(req.body);
    //console.log(req.publication)
    //console.log(req.body.original);
    //console.log(req.body.body.image);
    //console.log('file');
    //console.log(req.body.body.file);
    //console.log('headers');
    //console.log(req.headers)
    next();
};