var coin;
var cursors;
var hero;
var timer;
var bgtile;
var platforms;
var first = true;
var temp;
var score;
var scoreText;
var game_over;
var bkey;



var playState = {



    create: function () {

        game_over = false;
        timer = 0;
        first = true;
        counter = 1;
        valimuisti = 0;
        temp = 0;
        score = 0;





        // Lets add our background to the game
        bgtile = game.add.tileSprite(0, 0, 800, 600, 'background');

        // Making our platforms a group object through some built in Phaser functions
        platforms = game.add.group();
        platforms.enableBody = true;
        platforms.createMultiple(10, 'platforms');

        // And lets do the same for our collectibles
        stars = game.add.group();
        stars.enableBody = true;
        stars.createMultiple(10, 'star');

        // Something to stand on.. THIS NEEDS TO BE EDITED
        var ground = platforms.create(0, game.world.height - 16, 'floor');
        ground.body.immovable = true;
        ground.scale.setTo(150, 1);


        // Just to get our loop up and running
        addObjects();

        // Make player and physics for it
        player();


        // Lets make some monsters
        monsters = game.add.group();
        monsters.enableBody = true;


        // Enabling keyboard to control player
        cursors = game.input.keyboard.createCursorKeys();


        // Lets add a score text for our game (still need to update it later on in the code)
        scoreText = game.add.text(16, 16, 'score: 0', {
            font: '32px Arial',
            fill: '#FFF'
        });
        var save_game = game.add.text(10, 80, 'Press S to save and L to load', {
            font: '20px Arial',
            fill: 'pink'
        });
  var lkey = game.input.keyboard.addKey(Phaser.Keyboard.L);

lkey.onUp.add(function(){
  var message = {};
  message.messageType = "LOAD_REQUEST",
  parent.postMessage(message, "*");
})

                 var skey = game.input.keyboard.addKey(Phaser.Keyboard.S);
        skey.onUp.add(function() {
          var messaged = {};
          messaged.messageType = "SAVE",
          messaged.gameState = {temp: temp, score: score};
          
          parent.postMessage(messaged, "*")
        })

    },

    // *****************************************************************************************************************************************************************************************************************

    update: function (timer) {

        //  Collide the player and the stars with the platforms
        game.physics.arcade.collide(monsters, platforms)
        game.physics.arcade.overlap(hero, monsters, killplayer, null, this);
        game.physics.arcade.overlap(hero, stars, collectstars, null, this);

        game.physics.arcade.collide(hero, platforms);
        bgtile.tilePosition.x -= (1 + (counter * 0.04));
        // player controlling function
        controls();




    },






};