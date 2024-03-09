
// We made this function just to make randomizing platfroms etc a bit simpler. Phaser has its own inbuilt version of this, but it didn't quite suit our needs.
function satu(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// A few functions for impact with other objects in-game
function collectstars(hero, star) {
    star.kill();
    score += 2;
    coin = game.add.audio('coin');
    coin.play();
}

function killplayer(hero, monster) {
    hero.kill();

    //And lets add listeners for game restart
    spacekey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    tabkey = game.input.keyboard.addKey(Phaser.Keyboard.TAB);



    
    //Game over = stop updating the score at top left corner
    game_over = true;
    //Text styles, on for big and one for small
    var style = {
        font: "65px Arial",
        fill: "#ffffff",
        align: "center"
    };
    // Small
    var style2 = {
        font: "30px Arial",
        fill: "#ffffff",
        align: "center"
    };
    // Final score recorded for use in global scoreboard
    var final_score = temp * (score + 1);
    //And text declaring the score
    var text = game.add.text(game.world.centerX, game.world.centerY, "Game Over! \n Your score was: " + final_score, style);
    // Send high score to iframe parent
    scoreMessage = {
      messageType: "SCORE",
      score: final_score,
    }
    parent.postMessage(scoreMessage, '*')
    // And the text declaring instructions for the player
    var text2 = game.add.text(game.world.centerX, game.world.centerY, "press Space to restart or Tab for menu", style2);
    //Styling etx
    text2.anchor.set(0.5, -3);
    text2.alpha = 0.1;
    text.anchor.set(0.5);
    text.alpha = 0.1;
    //And we used a built in feature in Phaser to fade the text out
    game.add.tween(text).to({
        alpha: 1
    }, 2000, "Linear", true);
    //Same for text2
    game.add.tween(text2).to({
        alpha: 1
    }, 2000, "Linear", true);

}

