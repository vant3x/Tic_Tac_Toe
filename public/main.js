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

    build_cat();

    var socket = new Socket(function(figura,posicion){
        $("#elemento-"+posicion).innerHTML = figura;
    },2,3);

   
})();

