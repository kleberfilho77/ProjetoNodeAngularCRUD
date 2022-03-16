

===================================
use bdproduto;
db.produto.drop();

db.produtos.insertMany([
{    
"codigo":10,
"nome":"Quilha FCS II Sally Fitzgibbon",
"preco":1000,
"imagem": "https://i0.wp.com/pranchanova.com/wp-content/uploads/2018/10/Quilha-FCS-II-Sally-Fitzgibbons-3-quilhas-prancha-nova.jpg"
},
{    
"codigo":11,
"nome":"Quilha FCS II Accelerator Neo Glass",
"preco":639,
"imagem": "https://i2.wp.com/pranchanova.com/wp-content/uploads/2018/10/Quilha-FCS-II-Accelerator-Neo-Glass-prancha-nova.jpg"
}
]    
);

db.produto.find().pretty();

db;
show collections;