const mongoose = require("mongoose");

const schema = mongoose.Schema({
    codigo : Number,
    nome : String,
    preco : Number,
    imagem: String
});

const Produto = mongoose.model('produtos', schema);

module.exports=Produto