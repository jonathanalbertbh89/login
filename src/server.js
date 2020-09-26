const express = require('express');
const cors = require('cors');

const routes = require('./routes/index');
const verifytoken = require('./midllewares/verifyToken');



const app = express();

app.use(verifytoken);
app.use(cors());

app.use(express.json());


app.use(routes);



app.listen(3333);