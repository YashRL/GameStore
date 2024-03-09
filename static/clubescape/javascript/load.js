var loadState = {
 
    preload: function () {
        //Let's the player know the games loading
        var loading = game.add.text(200, 200, 'loading, please wait', {
            font: '30px Courier',
            fill: '#fff'
        });
 
        //Next let's load all the assets
        game.load.image('background', 'pictures/background_big.jpg');
        game.load.spritesheet('star', 'pictures/star.png',33,32,6);
        game.load.image('platforms', 'pictures/platform.png');
        game.load.image('floor', 'pictures/floor.png');
        game.load.image('keyboard', 'pictures/keyboard2.png');
        game.load.spritesheet('monster', 'pictures/soldier1.png',64,56,9);
        game.load.audio('daftpunk', 'music/music.wav');
        game.load.audio('coin', 'music/coin.mp3');
        game.load.spritesheet('sprite', 'pictures/sprite2.png', 30, 50, 5);
        //Informing load is complete
    },
 
    create: function () {
        daftpunk = game.add.audio('daftpunk');
        daftpunk.play("", 0, 1, true, true);
        game.state.start('menu');
    }
 
 
 
};