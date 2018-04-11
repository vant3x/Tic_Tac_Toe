var  express = require("express");
var socket_io = require("socket.io");

var app = express();
var io = socket_io();

var figure = true;


app.io = io;

io.on("connection", function(socket){
    console.log("Nuevo cliente conectado");

    /* Se envia a todos */ 

    socket.emit("init",{figure:figure});


    figure = !figure;

    /* socket.broadcast.emit */

});

module.exports = app;