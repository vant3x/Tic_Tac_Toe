function Socket(gano,nueva_jugada,reinicio){
    var juego = false;
    var socket = io(); 
    var self = this;

    self.play  = function(posicion){
        socket.emit("nuevo_movimiento",{posicion:posicion});
    }

    self.figura = function(){
        if(self.juego){
            return "X";
        }
        return "O";
    }

    socket.on("connect", function(){
        socket.on("init", function(data){
            // console.log(data);
            self.juego = data.figure;
        });
        
        socket.on("reset", function(){
            reinicio();
        });

        socket.on("won", function(data){
            var figura = data.figure;
            gano(figura);
        });

        socket.on("alguien_tiro",function(data){
            nueva_jugada(data.posicion, data.figura);
        });

    });
   

}