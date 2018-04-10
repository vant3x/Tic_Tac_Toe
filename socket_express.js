const  express = require("express");

const socket_io = require("socket.io");

const app = express();


var io = socket_io();

app.io = io;

module.exports = app;