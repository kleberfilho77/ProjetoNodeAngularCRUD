
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/bdproduto',{
   useNewUrlParser: true,
   useFindAndModify: false
});


mongoose.connection.once("open", ()=>
  console.log('Mongoose Conectado com Sucesso')

);

module.exports = mongoose;
