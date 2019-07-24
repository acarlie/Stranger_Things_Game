$( document ).ready(function() {
    var game = {
        characterSelect: false,
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

            this.defeatedEnemiesArr.push(this.currentEnemy);
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

                    this.enemyGenerator($('#antagonists'), this.enemies);
                    
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
        enemyChoiceCard(obj){
            var card = $('<div>').addClass('player player-enemy').attr('id', obj.num).attr('data-index', obj.num);
            var img = $('<img>').addClass('img-fluid img-enemy').attr('src', 'assets/images/' + obj.img + '.jpg');
            var stats = $('<div>').addClass('stats-enemy');
           
            var name = $('<h4>').text(obj.name);
            var hp = $('<p>').text('HP:' + obj.hp).attr('id', 'hp' + obj.num);

            card.append(img);
            stats.append(name, hp);

            var button = $('<button>').addClass('btn btn-attack').attr('id', 'attack' + obj.num).text('Attack');
            stats.append(button);
      
            card.append(stats);
            return card;
        },
        // polaroid(i){
        //     var polaroid = $('<div>').addClass('player player-select player-polaroid').attr('data-index', i);
            
        //     var front = $('<div>').addClass('polaroid-front');
        //     var imgWrap = $('<div>').addClass('img-polaroid-wrap');
        //     var img = $('<img>').addClass('img-fluid img-polaroid').attr('src', 'assets/images/' + game.players[i].img + '.jpg');

        //     var back = $('<div>').addClass('polaroid-back');
        //     var stats = $('<ul>').html('<li><strong>' + game.players[i].name + '</strong></li><li>' + game.players[i].desc + '</li><li>HP: ' + game.players[i].hp + '</li>');
        //     var selectButton = $('<button>').addClass('btn btn-select').text('Select');

        //     polaroid.append(front);
        //     polaroid.append(back);

        //     imgWrap.append(img);
        //     front.append(imgWrap);

        //     back.append(stats, selectButton);

        //     $('#container').append(polaroid);
        // },
        characterCard(obj){
            var card = $('<div>').addClass('player player-game').attr('id', obj.num).attr('data-index', obj.num);
            var stats = $('<div>').addClass('circle-card-stats');
            var statsInner = $('<div>').addClass('stats-inner');
            var img = $('<img>').addClass('img-fluid img-player').attr('src', 'assets/images/' + obj.img + '.jpg');
            var name = $('<h4>').text(obj.name);
            var hp = $('<p>').text('HP:' + obj.hp).attr('id', 'hp' + obj.num);

            card.append(img);
            statsInner.append(name, hp);

            if(obj !== this.character && this.characterSelect){
                var button = $('<button>').addClass('btn btn-attack').attr('id', 'attack' + obj.num).text('Attack');
                statsInner.append(button);
            } else if (!this.characterSelect){
                var selectButton = $('<button>').addClass('btn btn-select').text('Select');
                statsInner.append(selectButton);
            }
            
            stats.append(statsInner);
            card.append(stats);

            return card;
        },
        arrayRemove(arr, value) {

            return arr.filter(function(ele){
                return ele != value;
            });
         
        },
        chooseEnemy(num){
            var temp = this.players[num];
            // console.log(temp);
            this.enemies = this.arrayRemove(this.enemies, temp);
            console.log(this.enemies);
            // this.enemies.splice(num, 1);
            this.currentEnemy = this.players[num];
            
     
            var char = game.enemyChoiceCard(this.currentEnemy);
            $('#antagonists').empty().append(char);
            
            



            

            // if(this.currentEnemy.hawkins){
            //     $('#hawkins').empty();
            // } else {
            //     $('#upside-down').empty();
            // }

            // var enemy = this.characterCard(this.currentEnemy);
            // this.appendEl(this.currentEnemy, enemy);

        
        },
        enemyGenerator(container, enemyArr){
            $(container).empty();
            enemyArr.forEach(function(i){
                var char = game.enemyChoiceCard(i);
                container.append(char);
            });
        },
        init(index){
            this.characterSelect = true;
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
            
            $('#container').empty().addClass('enemy-select').before('<span class="cont"><h2 class="text-stranger text-center">Choose an opponent...</h2></span>');
            var protagContainer = $('<div>').attr('id', 'protagonist');
            var antagContainer = $('<div>').attr('id', 'antagonists');
            $('.text-stranger').each(function(){
                $(this).attr('data-content', this.textContent);
            });
        
            $('body').css('background-image', 'none').css('background-color', '#222');

            var protagonist = game.characterCard(this.character);
            protagContainer.append(protagonist);

            this.enemyGenerator(antagContainer, this.enemies);
            
            $('#container').append(protagContainer, antagContainer);
            
            // var attacker = this.characterCard(this.character);
            // this.appendEl(this.character, attacker);
    
        },

    }

    //load screen
    window.setTimeout(function(){ $('#loader').addClass('hidden'); }, 1000);

    //stranger things text
    $('.text-stranger').each(function(){
        $(this).attr('data-content', this.textContent);
    });

    //generator for player cards
    $('#container').addClass('cont-polaroid');
    $.each(game.players, function(i){
        var player = game.characterCard(game.players[i]);
        $('#container').append(player);
       
    });

    //click event handler for player select cards
    function playerSelectHandler( event ){
        var target = $( event.target );
            if ( target.is( '.btn-select' ) && !game.characterSelect ){
                console.log('clicked');

                var playerIndex = $(this).attr('data-index');
                console.log(playerIndex);
                game.init(playerIndex);
                                
            } 
            
          console.log(event.target);
    }


    //player select button
    $( '.player-game' ).on('click', playerSelectHandler );

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