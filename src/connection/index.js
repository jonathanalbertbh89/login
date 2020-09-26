/*
    Conexão com o banco de dados, sendo feito pelo knex.
    O knex usa uma configuração já pré estabelecida no Knexfile, 
        onde há modulos exportados, assim podendo criar varias conexões de qualquer banco

*/
const knex = require('knex');

//Arquivo knexfile exportado
const config = require('../../knexfile'); 

// Estância de conexão realizada
const connection = knex(config.development);


//constante exportada como padrão
module.exports = connection;