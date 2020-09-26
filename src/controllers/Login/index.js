const bcrypt = require('bcrypt'); // para verificar a senha criptografada
const express = require('express');

const jtw = require('jsonwebtoken'); // para gerar o token
const md5 = require('../../config/auth.json'); // o md5 (secret) para acesso a api


const db = require('../../connection/index');

// modulo para realização de login

module.exports = class Login{

    // arquivos requisitado no req(requeste) body
    async loginAutenticate(req, res){
        const{
            name,
            password
        } = req.body;

        // consulta a existência do name dentro do banco de dados
        const user = await db.select('*').from('user').where('name', name);

        // caso retorne vazio, será informado que o usuário não existe
        if (await user.length == 0) {
            return(
                res.status(400).send({error: 'User not found'})
            )
        }
        
        // verifica se a senha criptografada está correta, não sendo correto é retornado um erro
        if (!bcrypt.compareSync(password, user[0].password)) {
            return(
                res.status(401).send({message: 'password incorrect'})
            )
        }

        // cria JWT(json web token) para o usuário
        const token = await jtw.sign(user[0].id, md5.secret)


        // as informações são repassadas para a requisição para serem usadas posteriormente 
        return(
            res.send({
                user_id: user[0].id,
                user_name: user[0].name,
                token : token
            })
        )
    }

}