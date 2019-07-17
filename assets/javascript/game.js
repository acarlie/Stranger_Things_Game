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
    }

    window.setTimeout(function(){ $('#loader').addClass('hidden'); }, 1000);

    $('.text-stranger').each(function(){
        $(this).attr('data-content', this.textContent);
    });


    $.each(game.players, function(i){

        var character = $('<div>').addClass('player').text(game.players[i].name).attr('data-select', 'false').attr('data-index', i).attr('data-num', game.players[i].num).attr('data-hawkins', game.players[i].hawkins);
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

        var playerIndex = $(this).parent().attr('data-index');

        game.gamePlay = true;
        game.character = game.players[playerIndex];
        game.characterSide = game.players[playerIndex].hawkins;
        

        game.players.forEach(function(i){
            if(game.characterSide !== i.hawkins){
                game.enemies.push(i);
                game.enemyCount++;
            }     
        });

        var random = Math.floor(Math.random()*game.enemies.length);
        game.currentEnemy = game.enemies[random];
        game.enemies.splice(random, 1);
        var enemyNum = game.currentEnemy.num;
        console.log($(`.player[data-num=${enemyNum}]`));
        $(`.player[data-num=${enemyNum}]`).addClass('Hello');
    


       



    });



    


});