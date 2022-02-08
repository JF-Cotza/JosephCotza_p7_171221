module.exports = (req, res,next) =>{
    console.log('publications>modify>post multer');
    console.log(req);
    console.log('data')
    console.log(req.data);
    console.log('body');
    console.log(req.body);
    //console.log(req.publicationId)
    //console.log('params');
    //console.log(req.params)
    //console.log('body file');
    //console.log(req.body.file);
    console.log('query');
    //console.log(req.query);
    //console.log(req.form);
    //console.log(req.form.maker);
    //console.log(req.maker);
    //console.log(req[0]);
    //console.log(req.form);
    console.log(req.publicationInfos)
    //console.log(req.body.original);
    //console.log(req.body.body.image);
    //console.log('file');
    //console.log(req.body.body.file);
    //console.log('headers');
    //console.log(req.headers)
    //console.log(req.-----------------------------26302502320552047352407890713);
    //console.log(req.client);
    console.log(req.Symbol)

    next();
};