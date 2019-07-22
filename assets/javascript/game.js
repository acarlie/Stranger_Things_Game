$( document ).ready(function() {
    var game = {
        gamePlay: false,
        character: "",
        characterSide: "",
        enemySelect: false,
        enemies: [],
        defeatedEnemiesArr: [],
        enemyCount: 0,
        defeatedEnemies: 0,
        currentEnemy: "",
        enemyNum: "",
        players: [
            {num: 0, hawkins: true, hp: 80, attack: 50, defense: 25, counterAttack: 40, basePower: 10, name: "Eleven", img: "eleven", desc: ""},
            {num: 1, hawkins: true, hp: 120, attack: 25, defense: 20, counterAttack: 30, basePower: 5, name: "Jim Hopper", img: "hopper", desc: ""},
            {num: 2, hawkins: true, hp: 120, attack: 30, defense: 15, counterAttack: 30, basePower: 6, name: "Jancy", img: "jancy", desc: "A.K.A. Jonathan Byers and Nancy Wheeler"},
            {num: 3, hawkins: false, hp: 150, attack: 40, defense: 15, counterAttack: 40, basePower: 9, name: "The Mind Flayer", img: "mindflayer", desc: ""},
            {num: 4, hawkins: false, hp: 110, attack: 35, defense: 15, counterAttack: 35, basePower: 7, name: "Demogorgon", img: "demogorgon", desc: ""},
            {num: 5, hawkins: false, hp: 100, attack: 35, defense: 10, counterAttack: 35, basePower: 5, name: "Billy", img: "billy", desc: ""}
        ],
        isAlive(player){
            //returns if player is alive.
            return Boolean(player.hp > 0);
        },
        attack(p1, p2){
            p2.hp = Math.max(0, p2.hp - Math.max(0, p1.attack - p2.defense));
            p1.attack += p1.basePower;
        },
        counterAttack(p1, p2){
            p1.hp = Math.max(0, p1.hp - Math.max(0, p2.counterAttack - p1.defense));
        },
        enemyDefeated(enemyNum){
            $('#' + enemyNum).addClass('defeated');
            $('#hp' + enemyNum).text('defeated');
            $('#attack' + enemyNum).remove();
            this.enemySelect = false;
        },
        duel(player1, player2){
      
            if (this.isAlive(player1) && this.isAlive(player2)){

                this.attack(player1, player2);
                this.counterAttack(player1, player2);

                var p1 = player1.num;
                var p2 = player2.num;

                $('#hp'+ p1).text(player1.hp);
                $('#hp'+ p2).text(player2.hp);

                if(this.isAlive(player1) && !this.isAlive(player2)){
                    console.log(player1.name + ' won');
                    //empty change defeated enemy
                    this.enemyDefeated(p2);
                    
                } else if (this.isAlive(player2) && !this.isAlive(player1)){
                    console.log(player2.name + ' won');
                    //Game over - restart
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
        polaroid(i){
            var polaroid = $('<div>').addClass('player player-select player-polaroid').attr('data-index', i);
            
            var front = $('<div>').addClass('polaroid-front');
            var imgWrap = $('<div>').addClass('img-polaroid-wrap');
            var img = $('<img>').addClass('img-fluid img-polaroid').attr('src', 'assets/images/' + game.players[i].img + '.jpg');

            var back = $('<div>').addClass('polaroid-back');
            var stats = $('<ul>').html('<li>' + game.players[i].name + '</li><li>' + game.players[i].desc + '</li><li>' + game.players[i].hp + '</li>');
            var selectButton = $('<button>').addClass('btn btn-select').text('Select');

        

            polaroid.append(front);
            polaroid.append(back);

            imgWrap.append(img);
            front.append(imgWrap);

            back.append(stats);
            back.append(selectButton);

            $('#container').append(polaroid);
        },
        characterCard(obj){
            var card = $('<div>').text(obj.name).addClass('player player-game').attr('id', obj.num);
            var hp = $('<p>').text(obj.hp).attr('id', 'hp' + obj.num);
            card.append(hp);

            if(obj !== this.character){
                var button = $('<button>').addClass('btn btn-attack').attr('id', 'attack' + obj.num).text('Attack');
                card.append(button);
            } 
            
            return card;
        },
        chooseEnemy(num){
            // var random = Math.floor(Math.random()*this.enemies.length);

            // this.currentEnemy = this.enemies[random];
            this.enemies.splice(num, 1);
            this.currentEnemy = this.players[num];
            

            // if(this.currentEnemy.hawkins){
            //     $('#hawkins').empty();
            // } else {
            //     $('#upside-down').empty();
            // }

            // var enemy = this.characterCard(this.currentEnemy);
            // this.appendEl(this.currentEnemy, enemy);

        
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

            // if (this.characterSide){
            //     $('#hawkins').empty();
            // } else {
            //     $('#upside-down').empty();
            // }
            
            $('#hawkins, #upside-down').empty();

            this.enemies.forEach(function(i){
                var char = game.characterCard(i);
                game.appendEl(i, char);
            });
            
            var attacker = this.characterCard(this.character);
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

        game.polaroid(i);
       
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
    $( '.player-select' ).on('click', playerSelectHandler );

    //attack button
    $('#container').on('click', '.btn-attack', function(event){
        var target = event.target;
        var targetId = $(target).attr('id');
        var targetNum = targetId[targetId.length - 1];

        if (!game.enemySelect){

            game.enemyNum = targetId[targetId.length - 1];
            game.chooseEnemy(game.enemyNum);
            game.enemySelect = true;

        } else if (game.enemySelect && game.enemyNum === targetNum){
            game.duel(game.character, game.currentEnemy);
        }
 
    });
 
});