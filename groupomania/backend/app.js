const express=require('express');
const path=require('path');

//création de app, "l'application du backend"
const app=express();

//création des routes/
const userRoutes = require('./routes/user');
const connectRoutes = require('./routes/connect');
const publicationsRoutes= require('./routes/publications');
connectRoutes;

app.use (express.json());
//pour éviter les problèmes de Cross Origin
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});



app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));  //le répertoire est fixe => on utilise static pour pouvoir l'utiliser le répertoire dont le dirname est stipulé

app.use('/api/publications', publicationsRoutes);
app.use('/api/auth', userRoutes)

module.exports=app;

