var  express = require("express");
var socket_io = require("socket.io");
var evaluator = require("./public/evaluator");

var app = express();
var io = socket_io();

var posiciones_ocupadas = {};

var figure = true;


app.io = io;

io.on("connection", function(socket){
    console.log("Nuevo cliente conectado");
    console.log(evaluator([2,1,0]));
    /* Se envia a todos */ 

    socket.emit("init",{figure:figure});
    socket.figure = figure;

    figure = !figure;

    socket.on("nuevo_movimiento", function(data){
        // console.log(data);
        if(!posiciones_ocupadas[data.posicion]){
            posiciones_ocupadas[data.posicion] = true;
            io.emit("alguien_tiro",{posicion: data.posicion,figura: socket.figure});
        }else{
            console.log("Alguien tiró en una posición ocupada");
        }
        
    });

    /* socket.broadcast.emit */

});

module.exports = app;