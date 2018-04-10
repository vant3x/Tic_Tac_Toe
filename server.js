const  express = require("express");
const http = require("http");

const app = express();

var server = http.createServer(app);

server.listen(8000);