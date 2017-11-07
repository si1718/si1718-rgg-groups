/*
Se importa el módulo express y permite crear un servidor web, en el que todo
lo que esté en el directorio lo va a servir, por ejemplo un index.html. Todo
esto en el puerto que esté configurado en la variable de entorno PORT.
*/

var express = require("express");

var app = express();

app.use(express.static('./'));

app.listen(process.env.PORT);