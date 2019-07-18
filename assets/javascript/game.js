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
            {num: 1, hawkins: true, hp: 60, attack: 50, defense: 25, counterAttack: 100, basePower: 100, name: "Eleven", desc: ""},
            {num: 2, hawkins: true, hp: 80, attack: 25, defense: 20, counterAttack: 100, basePower: 100, name: "Jim Hopper", desc: ""},
            {num: 3, hawkins: true, hp: 80, attack: 30, defense: 15, counterAttack: 100, basePower: 100, name: "Jancy", desc: "A.K.A. Jonathan Buyers and Nancy Wheeler"},
            {num: 4, hawkins: false, hp: 100, attack: 40, defense: 15, counterAttack: 100, basePower: 100, name: "The Mind Flayer", desc: ""},
            {num: 5, hawkins: false, hp: 90, attack: 35, defense: 15, counterAttack: 100, basePower: 100, name: "Demogorgon", desc: ""},
            {num: 6, hawkins: false, hp: 60, attack: 35, defense: 10, counterAttack: 100, basePower: 100, name: "Billy", desc: ""}
        ],
        isAlive(player){
            //returns if player is alive.
            return Boolean(player.hp > 0);
        },
        duel(player1, player2){
            // That is, Player 1 attacks Player 2. Then Player 2 attacks Player 1
            // A Player's damage is defined as their "attack" value minus their opponent's "defense" value. 
            // The damage is then subtracted from the defender's health value.
            // While players are alive continue duel.
            // Is alive boolean checks if player is alive

            //Math.max can be used to prevent negative numbers - Math.max(0, possible damage);
            // if(this.isAlive(player1) && this.isAlive(player2))
            if (this.isAlive(player1) && this.isAlive(player2)){
                player1.hp = Math.max(0, player1.hp - Math.max(0, player2.attack - player1.defense));
                player2.hp = Math.max(0, player2.hp - Math.max(0, player1.attack - player2.defense));

                // console.log(player1.name + player1.hp);
                // console.log(player2.name + player2.hp);

                var p1 = player1.num;
                var p2 = player2.num;

                $('#hp'+ p1).text(player1.hp);
                $('#hp'+ p2).text(player2.hp);

                if(this.isAlive(player1) && !this.isAlive(player2)){
                    console.log(player1.name + ' won');
                } else if (this.isAlive(player2) && !this.isAlive(player1)){
                    console.log(player2.name + ' won');
                } else if (!this.isAlive(player1) && !this.isAlive(player2)){
                    console.log('draw');
                }

            } 

         
      
                
                
        },
        appendEl(obj, element){
            if(obj.hawkins){
                $('#hawkins').append(element);
            } else{
                $('#upside-down').append(element);
            }
        },
        characterCard(obj){
            var card = $('<div>').text(obj.name).addClass('player player-game').attr('data-num', obj.num);
            var hp = $('<p>').text(obj.hp).attr('id', 'hp' + obj.num);
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
                                
            } 
            
          console.log(event.target);
    }


    //player select button
    $( '.player-select' ).on('click', playerSelectHandler ).find( "span, button" ).hide();

    //attack button
    $('#container').on('click', '#attack', function(){
        game.duel(game.character, game.currentEnemy);
    });




   
});