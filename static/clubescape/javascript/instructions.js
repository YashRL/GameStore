// And let's get to booting the game up
var instructionsState = {

    // Standard phaser function...
    create: function () {

        game.add.tileSprite(0, 0, 800, 600, 'background');
        var instructions_text = game.add.text(320, 30, 'Instructions', {
            font: '40px Arial',
            fill: 'pink'
        });

        var idea = game.add.text(150, 130, 'Escape from the club and collect stars on the way.\n      Watch out for the angry men on the floor!', {
            font: '25px arial',
            fill: 'pink'
        });

        var instructions1 = game.add.text(250, 480, 'Press Tab to go back to menu \n Press Space to start game', {
            font: '25px Arial',
            fill: '#ffffff'
        });

        var instructions = game.add.text(150, 230, 'Use your keyboard arrow keys to play the game\n                      Up - jump\n                      Down - goes faster down\n                      Left - go left\n                      Right - go right', {
            font: '25px Arial',
            fill: 'pink'
        });
        
        var keyboard = game.add.sprite(380, 410, 'keyboard');

        var spacekey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        var tabkey = game.input.keyboard.addKey(Phaser.Keyboard.TAB);
        tabkey.onDown.addOnce(this.menu, this);
        spacekey.onDown.addOnce(this.start, this);


    },

    menu: function () {
        game.state.start('menu');
    },

    start: function () {
        game.state.start('play');
    }
};

