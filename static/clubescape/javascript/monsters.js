// A function for adding monsters in game. The further you progress, the more monsters..
function addMonsters() {

    if (counter > 4 && counter < 8) {
        monster = monsters.create(0, 530, 'monster');
        monster.animations.add('right', [0, 1, 2, 3, 4, 5, 6, 7, 8], 10, true);
        monster.animations.play('right');
        monster.body.collideWorldBounds = true;
        monster.body.gravity.y = 200;
        monster.body.velocity.x = 100;
        monster.body.bounce.x = 0.8 + Math.random() * 0.2;

    }
    if (counter > 20 && counter < 24) {
        monster = monsters.create(0, 530, 'monster');
        monster.animations.add('right', [0, 1, 2, 3, 4, 5, 6, 7, 8], 10, true);
        monster.animations.play('right');
        monster.body.collideWorldBounds = true;
        monster.body.gravity.y = 200;
        monster.body.velocity.x = 100;
        monster.body.bounce.x = 0.8 + Math.random() * 0.2;

    }
    if (counter > 38 && counter < 41) {
        monster = monsters.create(0, 530, 'monster');
        monster.animations.add('right', [0, 1, 2, 3, 4, 5, 6, 7, 8], 10, true);
        monster.animations.play('right');
        monster.body.collideWorldBounds = true;
        monster.body.gravity.y = 200;
        monster.body.velocity.x = 100;
        monster.body.bounce.x = 0.8 + Math.random() * 0.2;

    }
    if (counter > 58 && counter < 64) {
        monster = monsters.create(0, 530, 'monster');
        monster.animations.add('right', [0, 1, 2, 3, 4, 5, 6, 7, 8], 10, true);
        monster.animations.play('right');
        monster.body.collideWorldBounds = true;
        monster.body.gravity.y = 200;
        monster.body.velocity.x = 100;
        monster.body.bounce.x = 0.8 + Math.random() * 0.2;

    }
}