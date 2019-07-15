$( document ).ready(function() {
    var game = {
        players: {
            eleven: {hawkins: true, hp: 100, attack: 100, counterAttack: 100, basePower: 100},
            hopper: {hawkins: true, hp: 100, attack: 100, counterAttack: 100, basePower: 100},
            jancy: {hawkins: true, hp: 100, attack: 100, counterAttack: 100, basePower: 100},
            mindFlayer: {hawkins: false, hp: 100, attack: 100, counterAttack: 100, basePower: 100},
            demoDog: {hawkins: false, hp: 100, attack: 100, counterAttack: 100, basePower: 100},
            billie: {hawkins: false, hp: 100, attack: 100, counterAttack: 100, basePower: 100}
        },
    }




    $(".text-stranger").each(function(){
        $(this).attr('data-content', this.textContent);
    });

    window.setTimeout(function(){ $("#loader").addClass("hidden"); }, 1000);
    


});