$( document ).ready(function() {
    var game = {
        gamePlay: false,
        character: "",
        characterSide: "",
        enemies: [],
        enemyCount: 0,
        defeatedEnemies: 0,
        currentEnemy: "",
        players: [
            {name: "Eleven", num: 1, desc: "", hawkins: true, hp: 100, attack: 100, counterAttack: 100, basePower: 100},
            {name: "Jim Hopper", num: 2, desc: "", hawkins: true, hp: 100, attack: 100, counterAttack: 100, basePower: 100},
            {name: "Jancy", num: 3, desc: "", hawkins: true, hp: 100, attack: 100, counterAttack: 100, basePower: 100},
            {name: "The Mind Flayer", num: 4, desc: "", hawkins: false, hp: 100, attack: 100, counterAttack: 100, basePower: 100},
            {name: "Demogorgon", num: 5, desc: "", hawkins: false, hp: 100, attack: 100, counterAttack: 100, basePower: 100},
            {name: "Billy", num: 6, desc: "", hawkins: false, hp: 100, attack: 100, counterAttack: 100, basePower: 100}
        ],
        appendEl(obj, element){
            if(obj.hawkins){
                $('#hawkins').append(element);
            } else{
                $('#upside-down').append(element);
            }
        },
        characterCard(obj){
            var card = $('<div>').text(obj.name).addClass('player-game');
            var hp = $('<p>').text(obj.hp);
            card.append(hp);

            if(obj === this.character){
                var button = $('<button>').addClass('btn btn-attack').attr('id', 'attack').text('Attack');
                card.append(button);
            }
            
            return card;
        },
        init(index){
            this.gamePlay = true;
            this.character = this.players[index];
            this.characterSide = this.players[index].hawkins;

            this.players.forEach(function(i){
                if(game.characterSide !== i.hawkins){
                    game.enemies.push(i);
                    game.enemyCount++;
                }
            });

            var random = Math.floor(Math.random()*this.enemies.length);

            this.currentEnemy = this.enemies[random];
            this.enemies.splice(random, 1);

            $('#upside-down, #hawkins').empty();

            var attacker = this.characterCard(this.character);
            var enemy = this.characterCard(this.currentEnemy);

            this.appendEl(this.currentEnemy, enemy);
            this.appendEl(this.character, attacker);
    
        },
    }

    //load screen
    window.setTimeout(function(){ $('#loader').addClass('hidden'); }, 1000);

    //stranger things text
    $('.text-stranger').each(function(){
        $(this).attr('data-content', this.textContent);
    });

    //generator for player cards
    $.each(game.players, function(i){

        var character = $('<div>').addClass('player player-select').text(game.players[i].name).attr('data-index', i);
        var selectButton = $('<button>').addClass('btn btn-select').text('Select');
        character.append(selectButton);

        game.appendEl(game.players[i], character);
        
    });

    //click event handler for player select cards
    function playerSelectHandler( event ){
        var target = $( event.target );
            if ( target.is( '.player-select' ) && !game.gamePlay ) {

                $('.player-select').children().hide();
                $('.player-select').removeClass('player-chosen');

                target.children().toggle();
                target.toggleClass('player-chosen');

            } else if ( target.is( '.btn-select' ) && !game.gamePlay ){

                var playerIndex = $(this).attr('data-index');
                game.init(playerIndex);
                
                // $( '.player-select' ).off('click');
                
            } 
            
          console.log(event.target);
    }

    // function playerAttackHandler( event ){
    //     var target = $( event.target );
    //     if ( target.is( '#attack' ) && game.gamePlay ) {
    //         console.log('Attack!');
    //     }

    //     console.log( event.target );
    // }

    //player select button
    $( '.player-select' ).on('click', playerSelectHandler ).find( "span, button" ).hide();

    // //attack button
    // $( '.btn-attack' ).on('click', function(){
    
    // });


    // $( '.player-game' ).click( playerAttackHandler );
    $('#hawkins, #upside-down').on('click', '#attack', function(){
        
        console.log('attack');
    });


   
});