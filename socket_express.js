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
    // console.log(evaluator([2,1,0]));
    /* Se envia a todos */ 

    socket.emit("init",{figure:figure});
    socket.figure = figure;
    socket.user_board = [];

    figure = !figure;

    socket.on("nuevo_movimiento", function(data){
        // console.log(data);
        if(!posiciones_ocupadas[data.posicion]){

            // Agregamos el movimiento al tablero del usuario
            socket.user_board.push(parseInt(data.posicion));

            // Marcamos la posición como ocupada y enviamos el movimiento

            posiciones_ocupadas[data.posicion] = true;
            io.emit("alguien_tiro",{posicion: data.posicion,figura: socket.figure});

            // Evaluamos si el usuario  ganó
            var evaluacion_del_tablero = evaluator(socket.user_board);
            console.log(`Resultado ${evaluacion_del_tablero} tablero: ${socket.user_board}`)
            if(evaluacion_del_tablero){
                console.log("Alguien ganó");
                io.emit("won",{figure: socket.figure})
            }

        }else{
            console.log("Alguien tiró en una posición ocupada");
        }
        
    });

    /* socket.broadcast.emit */

});

module.exports = app;