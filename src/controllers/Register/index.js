const bcrypt = require('bcrypt')
const express = require('express');

const db = require('../../connection/index');


module.exports = class Register{

    async register(req,res){

        const{
            name,
            password
        }= req.body;

        const encrypded = bcrypt.hashSync(password, 10)

        const insert = await db('user').insert({name: name, password: encrypded})


        return(
            res.status(201).send({message: 'Create user sucessfully'})
        )

    }

}