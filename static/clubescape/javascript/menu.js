var menuState = {
 
    create: function () {
 
 
  game.add.tileSprite(0, 0, 800, 600, 'background');

        var nameLabel = game.add.text(250, 80, 'Club Esc4pe', {
            font: '50px Arial',
            fill: '#ffffff'
        });

        var startLabel = game.add.text(230, 170, 'Press Space to start the game', {
            font: '25px Arial',
            fill: '#ffffff'
        });

        var instructions = game.add.text(250, 210, 'Press Tab for instructions', {
            font: '25px Arial',
            fill: '#ffffff'
        });

        var spacekey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        var tabkey = game.input.keyboard.addKey(Phaser.Keyboard.TAB);
        tabkey.onDown.addOnce(this.instructions, this);
        spacekey.onDown.addOnce(this.start, this);

        var hero = game.add.sprite(370, 300, 'sprite');
        hero.animations.add('right', [0, 1, 2], 5, true);
        hero.animations.play('right');
    },
 
    start: function () {
        game.state.start('play', true, false);
    },
 
    instructions: function () {
        game.state.start('instructions');
    }
 
};