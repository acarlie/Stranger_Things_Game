$( document ).ready(function() {
    var game = {
        players: [
            {name: "Eleven", desc: "", hawkins: true, hp: 100, attack: 100, counterAttack: 100, basePower: 100},
            {name: "Jim Hopper", desc: "", hawkins: true, hp: 100, attack: 100, counterAttack: 100, basePower: 100},
            {name: "Jancy", desc: "", hawkins: true, hp: 100, attack: 100, counterAttack: 100, basePower: 100},
            {name: "The Mind Flayer", desc: "", hawkins: false, hp: 100, attack: 100, counterAttack: 100, basePower: 100},
            {name: "Demogorgon", desc: "", hawkins: false, hp: 100, attack: 100, counterAttack: 100, basePower: 100},
            {name: "Billy", desc: "", hawkins: false, hp: 100, attack: 100, counterAttack: 100, basePower: 100}
        ],
    }




    $('.text-stranger').each(function(){
        $(this).attr('data-content', this.textContent);
    });


    $.each(game.players, function(i){

        var character = $('<div>').addClass('player').text(game.players[i].name).attr('data-select', 'false');

        if(game.players[i].hawkins){
            $('#hawkins').append(character);
        }else{
            $('#upside-down').append(character);
        }
        
    });

    $('.player').on("click", function(){
        $('.player').attr('data-select', 'false');
        $(this).attr('data-select', 'true'); //use .data() to retrieve later
        console.log('clicked' + this);
    });

    window.setTimeout(function(){ $('#loader').addClass('hidden'); }, 1000);
    


});