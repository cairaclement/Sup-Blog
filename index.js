require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

const adminRouter = require('./admin.router.js');
const blogRouter = require('./blog.router.js');

app.set('view engine', 'pug');
app.set('views', './views');app.set('view cache', process.env.NODE_ENV === 'production');


const PORT = process.env.PORT || 9000;
const HOST = 'localhost';

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', blogRouter);
app.use('/admin', adminRouter);



const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;
const startApp = app => {
    return new Promise( (resolve, reject) => {
        const server = app.listen(PORT, resolve);
        server.on('error', reject)
    } );
};

mongoose
    .connect(`mongodb://${encodeURIComponent(DB_USER)}:${encodeURIComponent(DB_PASSWORD)}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, {useNewUrlParser:true})
    .then(() => console.log('MongoDB : Connexion établie'))
    .then(() => startApp(app))
    .then(() => console.log(`Express : Le serveur écoute sur http://${HOST}:${PORT}`))
    .catch(err => console.error(err.message));