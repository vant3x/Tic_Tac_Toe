const  express = require("express");
const http = require("http");

const app = express();

app.use("/static",express.static("public"));

app.get("/", function(req,res){
   res.sendFile("index.html",{"root": __dirname}) 
});

var server = http.createServer(app);

server.listen(8000);