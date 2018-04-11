var  express = require("express");
var socket_io = require("socket.io");

var app = express();
var io = socket_io();

app.io = io;

io.on("connection", function(socket){
    console.log("Nuevo cliente conectado");

    /* Se envia a todos */ 

    // io.emit()

    /* socket.emit */
    socket.emit("init",{mensaje: "Hola, bienvenido"});

    /* socket.broadcast.emit */

});

module.exports = app;