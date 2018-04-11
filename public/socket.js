function Socket(movimiento,gano,reinicio){
    var juego = false;
    var socket = io(); 
    var self = this;

    self.play  = function(posicion){
        socket.emit("nuevo_movimiento",{posicion:posicion});
        movimiento(self.figura(),posicion);
    }

    self.figura = function(bandera){
        if(self.juego){
            return "X";
        }
        return "O";
    }

    socket.on("connect", function(){
        socket.on("init", function(data){
            console.log(data);
            self.juego = data.figure;
        });

    });
   

}