//Defining game screen dimensions etc
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game_div');
 
// Defining game states.
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('instructions', instructionsState);
game.state.add('play', playState);
game.state.add('over', overState);
 
 
// Lets call the boot state!
game.state.start('boot');
 
//And that's all this file does
