$( document ).ready(function() {
    var game = {
        defend: false,
        players: [
            {name: "Eleven", desc: "", hawkins: true, hp: 100, attack: 100, counterAttack: 100, basePower: 100},
            {name: "Jim Hopper", desc: "", hawkins: true, hp: 100, attack: 100, counterAttack: 100, basePower: 100},
            {name: "Jancy", desc: "", hawkins: true, hp: 100, attack: 100, counterAttack: 100, basePower: 100},
            {name: "The Mind Flayer", desc: "", hawkins: false, hp: 100, attack: 100, counterAttack: 100, basePower: 100},
            {name: "Demogorgon", desc: "", hawkins: false, hp: 100, attack: 100, counterAttack: 100, basePower: 100},
            {name: "Billy", desc: "", hawkins: false, hp: 100, attack: 100, counterAttack: 100, basePower: 100}
        ],
    }

    window.setTimeout(function(){ $('#loader').addClass('hidden'); }, 1000);

    $('.text-stranger').each(function(){
        $(this).attr('data-content', this.textContent);
    });


    $.each(game.players, function(i){

        var character = $('<div>').addClass('player').text(game.players[i].name).attr('data-select', 'false').attr('data-char', i).attr('data-hawkins', game.players[i].hawkins);
        var selectButton = $('<button>').addClass('btn btn-select btn-hidden').text('Select');
        character.append(selectButton);

        if(game.players[i].hawkins){
            $('#hawkins').append(character);
        }else{
            $('#upside-down').append(character);
        }
        
    });

    $('.player').on('click', function(){
        $('.btn-select').addClass('btn-hidden');
        $('.player').attr('data-select', 'false').removeClass('player-chosen');
        $(this).attr('data-select', 'true').addClass('player-chosen'); //use .data() to retrieve later  
        $(this).find('button').removeClass('btn-hidden');
    });

    $('.player').on('click', 'button', function(){
        console.log('clicked');
    });



    


});