$( document ).ready(function() {
    var game = {
        cont: $('#container'),
        message: $('#message'),
        final: $('#final'),
        init(){
            this.strangerText();
            this.cont.addClass('cont-player-select');
            this.message.text('Select a player...');
            this.characterSelect = false;
            this.enemySelect = false;
            this.character = "";
            this.characterSide = "";
            this.currentEnemy = "";
            this.enemyNum = "";
            this.enemies = [];
            this.defeatedEnemiesArr = [];
            this.players = [
                {num: 0, hawkins: true, hp: 80, attack: 50, defense: 25, counterAttack: 40, basePower: 10, name: "Eleven", img: "eleven", desc: ""},
                {num: 1, hawkins: true, hp: 120, attack: 25, defense: 20, counterAttack: 30, basePower: 5, name: "Jim Hopper", img: "hopper", desc: ""},
                {num: 2, hawkins: true, hp: 120, attack: 30, defense: 15, counterAttack: 30, basePower: 6, name: "Jancy", img: "jancy", desc: "A.K.A. Jonathan Byers and Nancy Wheeler"},
                {num: 3, hawkins: false, hp: 150, attack: 40, defense: 15, counterAttack: 40, basePower: 9, name: "The Mind Flayer", img: "mindflayer", desc: ""},
                {num: 4, hawkins: false, hp: 110, attack: 35, defense: 15, counterAttack: 35, basePower: 7, name: "Demogorgon", img: "demogorgon", desc: ""},
                {num: 5, hawkins: false, hp: 100, attack: 35, defense: 10, counterAttack: 35, basePower: 5, name: "Billy", img: "billy", desc: ""}
            ];

            $.each(this.players, function(i){
                var player = game.characterCard(game.players[i]);
                game.cont.append(player);
            });
        },
        reset(){
            this.cont.removeClass('enemy-select');
            this.cont.empty();
            this.final.addClass('hidden');
        },
        start(index){
            this.characterSelect = true;
            this.character = this.players[index];
            this.characterSide = this.players[index].hawkins;

            this.players.forEach(function(i){
                if(game.characterSide !== i.hawkins){
                    game.enemies.push(i);
                }
            });
            
            this.cont.empty().addClass('enemy-select');
            this.message.text('Select an opponent...');


            $('body').css('background-image', 'none').css('background-color', '#222');

            var protagContainer = $('<div>').attr('id', 'protagonist');
            var protagonist = game.playerCard(this.character);
            protagContainer.append(protagonist);


            var antagContainer = $('<div>').attr('id', 'antagonists');
            this.enemyGenerator(antagContainer, this.enemies);
            this.cont.append(protagContainer, antagContainer);
  
        },
        isAlive(p){
            return Boolean(p.hp > 0);
        },
        attack(p1, p2){
            p2.hp = Math.max(0, p2.hp - Math.max(0, p1.attack - p2.defense));
            p1.attack += p1.basePower;
        },
        counterAttack(p1, p2){
            p1.hp = Math.max(0, p1.hp - Math.max(0, p2.counterAttack - p1.defense));
        },
        enemyDefeated(){
            this.message.text('Select an opponent...');
            this.defeatedEnemiesArr.push(this.currentEnemy);
            this.enemySelect = false;
        },
        duel(player1, player2){
      
            if (this.isAlive(player1) && this.isAlive(player2)){

                this.attack(player1, player2);
                this.counterAttack(player1, player2);

                var p1 = player1.num;
                var p2 = player2.num;

                $('#hp'+ p1).text('HP: ' + player1.hp);
                $('#hp'+ p2).text('HP: ' + player2.hp);

                if(this.isAlive(player1) && !this.isAlive(player2) && this.enemies.length > 0){
                    this.enemyDefeated();
                    this.enemyGenerator($('#antagonists'), this.enemies);
                } else if (this.isAlive(player2) && !this.isAlive(player1)){
                    this.finalScreen(false, player1, player2);
                } else if (!this.isAlive(player1) && !this.isAlive(player2)){
                    this.finalScreen(false, player1, player2);
                } else if (this.isAlive(player1) && !this.isAlive(player2) && this.enemies.length === 0){
                    this.finalScreen(true, player1, player2);
                }

            }    
                
        },
        card(obj, className){
            return $('<div>').addClass('player ' + className).attr('id', obj.num).attr('data-index', obj.num);
        },
        img(obj, className, cont){
            var img = $('<img>').addClass('img-fluid ' + className).attr('src', 'assets/images/' + obj.img + '.jpg');
            cont.append(img);
        },
        stats(obj, cont){
            var name = $('<h4>').text(obj.name);
            var hp = $('<p>').text('HP: ' + obj.hp).attr('id', 'hp' + obj.num);
            cont.append(name, hp);
        },
        enemyChoiceCard(obj){
            var card = this.card(obj, 'player-enemy');
            this.img(obj, 'img-enemy', card);

            var stats = $('<div>').addClass('player-enemy-stats');
            this.stats(obj, stats);

            var button = $('<button>').addClass('btn btn-attack').attr('id', 'attack' + obj.num).text('Attack');

            stats.append(button);
            card.append(stats);

            return card;
        },
        characterCard(obj){
            var card = this.card(obj, 'player-game');
            this.img(obj, 'img-player', card);

            var stats = $('<div>').addClass('player-game-stats');
            var statsInner = $('<div>').addClass('stats-inner');
            this.stats(obj, statsInner);
            stats.append(statsInner);

            if(obj !== this.character && this.characterSelect){
                var button = $('<button>').addClass('btn btn-attack').attr('id', 'attack' + obj.num).text('Attack');
                statsInner.append(button);
            } else if (!this.characterSelect){
                var selectButton = $('<button>').addClass('btn btn-select').text('Select').attr('data-id', obj.num);
                statsInner.append(selectButton);
            }

            card.append(stats);

            return card;
        },
        playerCard(obj){
            var card = this.card(obj, 'player-vs');
            this.img(obj, 'img-vs', card);

            var stats = $('<div>').addClass('player-vs-stats');
            this.stats(obj, stats);

            if(obj !== this.character){
                var button = $('<button>').addClass('btn btn-attack').attr('id', 'attack' + obj.num).text('Attack');
                stats.append(button);
            }

            card.append(stats);

            return card;

            // var healthBar = $()

        },
        arrayRemove(arr, value) {

            return arr.filter(function(ele){
                return ele != value;
            });
         
        },
        chooseEnemy(num){
            this.message.text('Attack!');

            var remove = this.players[num];
            this.enemies = this.arrayRemove(this.enemies, remove);
            this.currentEnemy = this.players[num];
            
            var char = game.playerCard(this.currentEnemy);
            $('#antagonists').empty().append(char);
            this.enemySelect = true;

        },
        enemyGenerator(container, enemyArr){
            $(container).empty();
            enemyArr.forEach(function(i){
                var char = game.enemyChoiceCard(i);
                container.append(char);
            });
        },
        finalScreen(win, player, enemy){
            this.final.removeClass('hidden');
            if (win){
                $('#final-text').text('All Enemies Defeated');
            } else {
                $('#final-text').text('Game Over');
                $('#final-message').text(player.name + ' was defeated by ' + enemy.name);
            }
        },
        strangerText(){
            $('.text-stranger').each(function(){
                $(this).attr('data-content', this.textContent);
            });
        },
        playerSelectHandler(event){
            var target = event.target;

            if ( !game.characterSelect ){
                var playerIndex = target.getAttribute('data-id');
                game.start(playerIndex);               
            } 
        },
        attackHandler(event){
            var target = event.target;
            var targetId = $(target).attr('id');
            var targetNum = targetId[targetId.length - 1];
    
            if (!game.enemySelect){
    
                game.enemyNum = targetId[targetId.length - 1];
                game.chooseEnemy(game.enemyNum);
    
            } else if (game.enemySelect && game.enemyNum === targetNum){
                game.duel(game.character, game.currentEnemy);
            }
     
        },
        resetHandler(){
            game.reset();
            game.init();
        }

    }

    //load screen
    window.setTimeout(function(){ $('#loader').addClass('hidden'); }, 1000);

    //game start
    game.init();

    //select button
    $('#container').on('click', '.btn-select', game.playerSelectHandler);

    //attack button
    $('#container').on('click', '.btn-attack', game.attackHandler);

    //reset button
    $('#final').on('click', '#reset', game.resetHandler);

 
});