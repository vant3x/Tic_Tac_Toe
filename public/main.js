/*
    true => x
    false => 0
*/
(function(){
    var juego = false;

    function $(selector){
    return document.querySelector(selector);
    }

    function jugar(seleccionado){
        if(juego){
            seleccionado.innerHTML = "x";
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
                jugar(this);
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

    build_cat();

    var socket = io(); 

    socket.on("connect", function(){
        socket.on("init", function(data){
            console.log(data);
            juego = data.figure;
        });

    });
   
})();

