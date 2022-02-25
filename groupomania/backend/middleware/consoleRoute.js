
module.exports = (req, res,next) =>{
    console.log('list')
    req.body.where+=' / list';

    console.log('body');
    console.log(req.body);
    
    console.log('.where')
    console.log(req.body.where);

    next();
};