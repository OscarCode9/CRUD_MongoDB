var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var blogObj = {
    titulo: String,
    autor: String,
    body: String,
    comentarios: [
        {cuerpo: String, data: Date}
    ],
    date: { type: Date, default: Date.now()},
    ocultar: Boolean,
    metadatos:{
        imagen: String,
        liked: Boolean,
        likes: Number
    }
};

var blogSchema = new Schema(blogObj);

module.exports = mongoose.model('Blog', blogSchema)

