 // Player movement and controls
window.addEventListener('message', function (message) {
  switch (message.data.messageType) {
    case "LOAD":
      temp = message.data.gameState.temp;
      score = message.data.gameState.score;
      break;
    case "ERROR":
      alert(message.data.info);
      break;
  }
});

 function controls() {
 hero.body.velocity.x = 0;
        if (hero.body.blocked.down || hero.body.touching.down) {
            hero.animations.play('right');
        }
        if (cursors.right.isDown) {
            hero.body.velocity.x = 200;
        }
        if (cursors.left.isDown) {
            hero.body.velocity.x = -200;

        }
        if (cursors.down.isDown) {
            hero.body.velocity.y += 20;
        }

        if (cursors.up.isDown && (hero.body.velocity.y == 0) && (hero.body.blocked.down || hero.body.touching.down)) {
            hero.animations.play('jump');
            hero.body.velocity.y = -500;
        }

        if (game_over == false) {
            scoreText.setText("Score: " + temp * (score + 1));
        }


        if (game_over == true) {
            if (spacekey.isDown) {
                game.state.start('play', true, false);
            }
            if (tabkey.isDown) {
                console.log("B");
                game.state.start('menu', true, false);
            }
        }
 }