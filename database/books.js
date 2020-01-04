const { Schema, model } = require('mongoose')

const schemaBook = new Schema({
    titulo: {type:String},
    descripcion: {type: String},
    isbn: {type: String},
    autor: {type: String}
})

module.exports = model('Book', schemaBook)