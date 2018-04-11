function Socket(playing,gano,reinicio){
    var juego = false;
    var socket = io(); 
    var self = this;

    socket.on("connect", function(){
        socket.on("init", function(data){
            console.log(data);
            self.juego = data.figure;
        });

    });
   

}