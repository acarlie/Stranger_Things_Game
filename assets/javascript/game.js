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
            var card = $('<div>').text(obj.name).addClass('player');
            var hp = $('<p>').text(obj.hp);
            card.append(hp);

            if(obj === this.character){
                var button = $('<button>').addClass('btn btn-select').text('Attack');
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

        var character = $('<div>').addClass('player').text(game.players[i].name).attr('data-select', 'false').attr('data-index', i).attr('data-num', game.players[i].num).attr('data-hawkins', game.players[i].hawkins);
        var selectButton = $('<button>').addClass('btn btn-select').text('Select');
        character.append(selectButton);

        game.appendEl(game.players[i], character);
        
    });

    //click event handler for player cards
    function playerHandler( event ){
        var target = $( event.target );
            if ( target.is( '.player' ) && !game.gamePlay ) {

                $('.player').children().hide();
                $('.player').removeClass('player-chosen');

                target.children().toggle();
                target.toggleClass('player-chosen');

            } else if ( target.is( 'button' ) && !game.gamePlay ){

                var playerIndex = $(this).attr('data-index');
                game.init(playerIndex);

            }

          console.log(event.target);
    }

    //calls click event
    $( ".player" ).click( playerHandler ).find( "span, button" ).hide();


});