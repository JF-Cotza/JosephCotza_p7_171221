
module.exports = (req, res,next) =>{
    req.body.where+=' / list';
    /*console.log('publications>modify>post multer');
    console.log(req);
    */
    /*console.log('data')
    console.log(req.data);
    */
    console.log('body');
    console.log(req.body);
    /*
    console.log(req.publicationInfos)
    console.log('query');
    console.log(req.query);
    console.log(req.tutu);
    */
    console.log('form');
    //console.log(form);
    //console.log(req.formData);
    console.log(req.form);
    //console.log(req.data.form);
    console.log('filename');
    console.log(req.body.filename)
    //console.log(req.data.file)
    console.log('publication data');
    console.log(req.publication);//.publication);
    next();
};