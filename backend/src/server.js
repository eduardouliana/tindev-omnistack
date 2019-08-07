const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const server = express();

//URL do mongodb atlas usuario:senha
mongoose.connect('mongodb+srv://eduardo:eduardo@cluster0-mds3s.mongodb.net/dbeduardo?retryWrites=true&w=majority',{useNewUrlParser: true});

server.use(express.json())
server.use(routes);

server.listen(3333); 