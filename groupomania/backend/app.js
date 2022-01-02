const express=require('express');
const app=express()
const path=require('path');


//pour éviter les problèmes de Cross Origin
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


//création des routes
const connectRoutes=require('./routes/connect');
/*
const userRoutes = require('./routes/user');
const publicationsRoutes= require('./routes/publications');
*/


app.use (express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

/*
connectRoutes;
app.use('/api/sauce',publicationsRoutes);
app.use('/api/auth',userRoutes);
*/

module.exports=app;