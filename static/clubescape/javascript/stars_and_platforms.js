var platform;
var valimuisti;
var star;
var counter = 1;
// This function adds a platform to the point x,y. Utilized by the function addManyPlatforms, this is the basis of the mechanism used to generate platforms into the game.
function addPlatform(x, y) {
    platform = platforms.getFirstDead();
    platform.reset(x, y);
    platform.body.velocity.x = -100 - (counter * 4);
    platform.body.immovable = true;
    platform.checkWorldBounds = true;
    platform.outOfBoundsKill = true;
    valimuisti = platform;
}

//Works in the same manner as the addPlatform function, but creates collectible stars.
function addStars(x, y) {
    star = stars.getFirstDead();
    star.reset(x, y);
    star.body.velocity.x = -100 - (counter * 4);
    star.body.immovable = true;
    star.checkWorldBounds = true;
    star.outOfBoundsKill = true;
    star.animations.add('spin', [0, 1, 2, 3, 4, 5], 10, true);
    star.animations.play('spin');
}
