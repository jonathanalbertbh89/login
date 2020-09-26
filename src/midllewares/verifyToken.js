const express = require('express');

const jwt = require('jsonwebtoken'); // aqui usado para verificação do token
const md5 = require('../config/auth.json');// para ser usado para comparação do token

// midlleware para veificação de token antes de continuar na rota

module.exports = (req, res, next) => {

   const auth = req.headers['x-access-token'];

   // verifica se foi informado um token na requisição
   if (!auth) {
       return(
           res.status(401).send({error: 'Token not informed'})
       )
   }
   
  /* const tokensplit = auth.split(' ');

   if (!tokensplit === 2) {
        return(
            res.status(401).send({error: 'poorly formatted'})
        )
   }

   const [ scheme, token ] = tokensplit;

   if (!/^Bearer$^/i.test(scheme) ) {
        return(
            res.status(401).send({error: 'incorreto'})
        )
   }
   */

   //realiza a verificação do token, se algo estiver errado, retorna um status de não autorizado 
   jwt.verify(auth, md5.secret, function(err, decoded){
       if (err) {
            return(
                res.status(401).send({error: 'Not authorized'})
            )
       };

       if (decoded) {
           return next()
       }
   })


}