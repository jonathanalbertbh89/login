const express = require('express');

const jwt = require('jsonwebtoken');
const md5 = require('../config/auth.json');


module.exports = (req, res, next) => {

   const auth = req.headers['x-access-token'];

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