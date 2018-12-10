const express = require('express');
const Article = require('./models/Article.model');


let blogRouter = express.Router();

blogRouter.get('/', (req, res) => {
    Article.find().populate('author category').exec().then(articles => {
        console.log(articles)
        res.render('public/index', { articles })
    }).catch(error => res.send(error.message))
})

blogRouter.get('/article/:id', (req, res) => {
    Article.findById( req.params.id ).populate('author category').exec().then(article => {
        if (!article) return Promise.reject(new Error('Article inexistant.'))

        res.render('public/article', { article })
    }).catch(error => res.send(error.message))
})

blogRouter.get('/inscription', (req, res) => {
    res.render('public/inscription')
});

blogRouter.post('/inscription', (req, res) => {
        Users.createUsers(req.body.email, req.body.contenu, req.body.categorie, req.body.auteur).then(() => {
            res.redirect('/')
        }).catch(error => res.send(error.message))
});


module.exports = blogRouter;