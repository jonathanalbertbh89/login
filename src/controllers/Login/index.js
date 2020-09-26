const bcrypt = require('bcrypt')
const express = require('express');

const jtw = require('jsonwebtoken');
const md5 = require('../../config/auth.json');


const db = require('../../connection/index');

module.exports = class Login{

    async loginAutenticate(req, res){
        const{
            name,
            password
        } = req.body;

        const user = await db.select('*').from('user').where('name', name);

        if (await user.length == 0) {
            return(
                res.status(400).send({error: 'User not found'})
            )
        }
        
        if (!bcrypt.compareSync(password, user[0].password)) {
            return(
                res.status(401).send({message: 'password incorrect'})
            )
        }

        const token = await jtw.sign(user[0].id, md5.secret)



        return(
            res.send({
                user_id: user[0].id,
                user_name: user[0].name,
                token : token
            })
        )
    }

}