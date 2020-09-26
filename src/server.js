const express = require('express');
const cors = require('cors');

const routes = require('./routes/index');
const verifytoken = require('./midllewares/verifyToken');



const app = express(); // usa todas as configurações do express

app.use(verifytoken); // usa a verificação de token antes de continuar na rota
app.use(cors());

app.use(express.json()); // "ensina" na utilização do json nas requisições


app.use(routes); // busca a rota requisitada e repassa



app.listen(3333); // porta a ser utilizada