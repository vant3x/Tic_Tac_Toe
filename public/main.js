/*
    true => x
    false => 0
*/
(function(){

    function $(selector){
    return document.querySelector(selector);
    }

    function jugar(seleccionado){
        if(true){
            seleccionado.innerHTML = "X";
        }
        else{
            seleccionado.innerHTML = "O";
        }
    
    }


    function definirEventos(){
        var elements = document.querySelectorAll(".cat-element");

        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];

            element.addEventListener("click", function(){
                var posicion = this.id.split("-")[1];
               // console.log(posicion);
                socket.play(posicion);
            });
        }
    }

    function build_cat(){
        for(var i = 0;i < 9; i++){
            var item = build_item(i);

            $("#cat").innerHTML += item;
                

        }

        definirEventos();
    }

    function build_item(i){
        return "<div class='cat-element col-xs-4' id='elemento-"+i+"'></div>"
    }

    function convertir_aFigura(bandera){
        if(bandera){
            return "X";
        }
        return "O";
    }

    function reset(){

        var elements = document.querySelectorAll(".cat-element");

        for (var i = 0; i < elements.length; i++) {
            elements[i].innerHTML = ""
        
        }
    }

    build_cat();


    var socket = new Socket(function(figura){
        // $("#elemento-"+posicion).innerHTML = figura;
        var figura_string = convertir_aFigura(figura);
        swal(`${figura_string} ganó la partida!`);
    },function(posicion,figura){

        $("#message").innerHTML = "Es el turno de las "+convertir_aFigura(!figura);
        $("#elemento-"+posicion).innerHTML = convertir_aFigura(figura);
   
    },function(){
        swal("Alguien ingresó","Reiniciaremos la partida");
        reset();
    }, function(){
        swal("No es tu turno aún", "Espera a que el otro jugador tire");
    }, function(figura){
        $("#message").innerHTML = `Juegas con la ${figura}`;
        if (figura == "X"){
            $("#message").innerHTML += "<br> Es tu turno";
        }
        else{
            $("#message").innerHTML += "<br>No es tu turno";
        }
    });

   
})();

