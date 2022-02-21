module.exports = (req, res, next) =>{
    console.log('testing: body where');
    console.log(req.body);
    console.log(req.body.where);
    
    req.body.where+=' / testing';
    next();
};