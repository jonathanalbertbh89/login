const { request } = require('express');
const bcrypt = require('bcrypt')
const express = require('express');

const db = require('../../connection/index');


module.exports = class login{

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
        
        await bcrypt.compare(password, user[0].password, function(err, res){
            if (err) {
                res.send({message: 'erro password'})
            }
            
        })

        return(
            res.send(user)
        )
    }


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