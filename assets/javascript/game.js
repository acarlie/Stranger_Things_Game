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

            var enemyNum = this.currentEnemy.num;
            $(`.player[data-num=${enemyNum}]`).attr('data-select', 'true').addClass('player-chosen');
        }
    }

    window.setTimeout(function(){ $('#loader').addClass('hidden'); }, 1000);

    $('.text-stranger').each(function(){
        $(this).attr('data-content', this.textContent);
    });


    $.each(game.players, function(i){

        var character = $('<div>').addClass('player').text(game.players[i].name).attr('data-select', 'false').attr('data-index', i).attr('data-num', game.players[i].num).attr('data-hawkins', game.players[i].hawkins);
        var selectButton = $('<button>').addClass('btn btn-select').text('Select');
        // var closeButton = $('<span>').addClass('btn btn-close fas fa-times');
        character.append(selectButton);
        // character.append(closeButton);

        if(game.players[i].hawkins){
            $('#hawkins').append(character);
        }else{
            $('#upside-down').append(character);
        }
        
    });
            // $('button, span').hide();


    // function handler( event ) {
    //     var target = $( event.target );
    //     if ( target.is( "li" ) ) {
    //       target.children().toggle();
    //     }
    //   }
    //   $( "ul" ).click( handler ).find( "ul" ).hide();

    // $('.player').on('click', function(){
    //     if(!game.characterChosen){
    //         $(this).attr('data-select', 'true').toggleClass('player-chosen'); //use .data() to retrieve later  
    //         $(this).find('.btn').show();
    //         game.characterChosen = true;
    //     }

    //     // $('.btn-select').addClass('btn-hidden');
    //     // $('.player').attr('data-select', 'false').removeClass('player-chosen');
        
      
    // });

    // $('.player').on('click', 'span', function(event){
    //     console.log("clicked: " + event.target.nodeName);
    //     $(this).hide();
    //     $(this).siblings('button').hide();
    //     $(this).parent().attr('data-select', 'false').removeClass('player-chosen');
    //     game.characterChosen = false;

    // });

    // $('.player').on('click', 'button', function(){

    //     var playerIndex = $(this).parent().attr('data-index');

    //     game.gamePlay = true;
    //     game.character = game.players[playerIndex];
    //     game.characterSide = game.players[playerIndex].hawkins;
        

    //     game.players.forEach(function(i){
    //         if(game.characterSide !== i.hawkins){
    //             game.enemies.push(i);
    //             game.enemyCount++;
    //         }
    //     });

    //     $('.players').each(function(i){

    //     });

    //     var random = Math.floor(Math.random()*game.enemies.length);
    //     game.currentEnemy = game.enemies[random];
    //     game.enemies.splice(random, 1);
    //     var enemyNum = game.currentEnemy.num;
    //     console.log($(`.player[data-num=${enemyNum}]`));
    //     $(`.player[data-num=${enemyNum}]`).attr('data-select', 'true').addClass('player-chosen');


    // });



    function handler(event){
        var target = $( event.target );
            if ( target.is( '.player' ) && !game.gamePlay ) {
                $('.player').children().hide();
                $('.player').removeClass('player-chosen');

                target.children().toggle();
                target.toggleClass('player-chosen');

            } else if (target.is( 'button' ) && !game.gamePlay){

                var playerIndex = $(this).attr('data-index');

                game.init(playerIndex);
                
       

            }

          console.log(event.target);
    }

    $( ".player" ).click(handler).find( "span, button" ).hide();


});