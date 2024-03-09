// And let's get to booting the game up
var bootState = {
 
    // Standard phaser function...
    create: function () {
        // Lets run the physics engine
        game.physics.startSystem(Phaser.Physics.ARCADE);
  
        // And calling the load state
        game.state.start('load');
    }
};

