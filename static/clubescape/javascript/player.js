//Lets create and set the physics, sprite, gravity and some other rules for our 'hero'

function player () {
        hero = game.add.sprite(400, 530, 'sprite');
        hero.animations.add('right', [0, 1, 2], 5, true);
        hero.animations.add('jump', [3], 5);
        game.physics.arcade.enable(hero);
        hero.body.velocity.x = 0;
        hero.body.gravity.y = 500;
        hero.body.collideWorldBounds = true;
}