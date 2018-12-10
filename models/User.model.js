const mongoose = require('mongoose')
const shortid = require('shortid')

// Création d'un nouveau Schema mongoose : ce schéma permettra d'indiquer à mongoose quelle doit être la structure d'un document `category` qui entre dans la base.
// C'est un peut comme définir les champs d'une table avec MySQL et phpMyAdmin
const usersSchema = mongoose.Schema({
    '_id'   : {type : String, required : true, default : shortid.generate },
    'email' : {type : String, required : true},
    'password' : {type: String, required : true}
})

// Et sur la base de ce schéma, on exporte un nouveau modèle Mongoose qui permettra de manipuler et créer des documents de type `category` dans la base Mongo
module.exports = mongoose.model('Users', usersSchema)