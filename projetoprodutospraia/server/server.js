
const express = require("express");
require("./DB");
const bodyParser=require("body-parser");
const cors= require('cors');
const app= express();
const Produto =require('./Produto');

const acl = require('express-acl');

app.use(cors());
app.use(bodyParser.json());


    acl.config({
    filename: 'nacl.json',
    baseUrl: '/'
    });


   //routes(app, express);

const handleError=(res,msg)=>{
    return err=>{
         console.log(err);
         res.status(500).json({"error":msg});
    };
};


app.get('/produto', (req,res)=>{
  Produto.find()
                 .then(dados =>{
        res.json(dados);
         })
               .catch(handleError(res,'Erro ao Listar Produto'));
});


app.post('/produto', (req,res)=>{
  let produto = req.body;

     Produto.create(produto)
         .then(dados=>{
              res.json({"msg":"Dados Gravados"});
           })
           .catch(handleError(res,'Error na Gravacao  Produto'));
});

//alterar
app.put('/produto/:codigo', (req,res)=>{
    let  vid= req.params.codigo;
    let produto = req.body;
    console.log(vid);
    console.log(produto);
       Produto.findOneAndUpdate({codigo:vid},produto,
        {upsert:true}, function(err, result){
         if (err){
             handleError(res, {"msg":"Erro de Alteracao"});
         }
         if(result){
             res.send([{"msg":"dados Atualizados"},{"gravacao":result}]);
         }
        }
       )
  });

//buscar
app.get('/produto/:codigo', (req,res)=>{
    let vcodigo = req.params.codigo;

       Produto.findOne({codigo:vcodigo})
              .then(dados=>{
                res.json(dados);
             })
             .catch(handleError(res,'Codigo Nao Encontrado'));
  });
  
  
  //excluir

  app.delete('/produto/:codigo', (req,res)=>{
    let vid = req.params.codigo;
    console.log(vid);
       Produto.findOneAndDelete({codigo: vid}, function(err, result){
        if (err){
            handleError(res, {"msg":"Erro de exclusao"});
        }
        if(result){
            res.send({"msg":"excluido"});
        }
       
    })
});


  let configObject = {
    filename: 'nacl.json',
    //path: 'config'
  };
   
  let responseObject = {
    status: 'Acesso Negado',
    message: 'Você não esta autorizado a visualizar esse conteudo'
  };
   
  acl.config(configObject, responseObject);
  
  app.use(acl.authorize);
               

  app.listen(3331,()=>{
       console.log('Rodou na Porta 3331');
  });



