const bcrypt = require('bcrypt'); // para encriptar a senha
const express = require('express');

const db = require('../../connection/index'); // para ter acesso ao banco de dados e realizar as requisições

// modulo para cadastro de um novo usuário
module.exports = class Register{

    async register(req,res){

        // requisições necessárias para o cadastro do novo usuário
        const{
            name,
            password
        }= req.body;

        //encriptando a senha antes de jogar no banco de dados
        const encrypded = bcrypt.hashSync(password, 10)

        // conexão ao banco para inserção dos dados
        const insert = await db('user').insert({name: name, password: encrypded})

        //caso tudo tenha ocorrido bem, será retornado uma mensagem de sucesso 

        return(
            res.status(201).send({message: 'Create user sucessfully'})
        )

    }

}