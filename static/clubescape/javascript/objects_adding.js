var matala;
// This function holds the logic behind randomly generating the platforms so, that there is always a possible action the player can take without losing the game.  
function addObjects() {
    // The function always generates the first platform to a fixed position
    if (first) {
        addPlatform(800, 400);
    }
    // Gives the boundarys where platforms can generate
    if(valimuisti.body.y > 700) {
        valimuisti.body.y = 700;
    }

    // Here we define the bounds in which between the platform should be generated. The platform being generated is always compared to the previous platform created.
    var yla = valimuisti.body.y;
    var ala = 600 - valimuisti.body.y;

    // Randomizing logic
    if (yla > ala) {
        matala = true;
    }
    if (ala > yla) {
        matala = false;
    }

    //The case in which the y value of the previous platform is more than half of the game boundaries height.

    if (matala == false) {
        var random = satu(100, 500);
    }

    // And vice versa
    if (matala == true) {
        if (valimuisti.body.y <= 200) {
            valimuisti.body.y = 300;
        }
        var random = satu((valimuisti.body.y - 200), 500);
    }

    // Just checking this isn't the first time we're running through this code
    if (first == false)

    {
        addPlatform(798, random);
        if ((counter % satu(1, 3)) == 0) {
            // Here we use the function created earlier to randomize the position of the stars      

            addStars(800, random - satu(36, 100));


        }

    }

    first = false;



    // Aaaand looping the platform creation function. Also updating the counter variable, which is used for game speed and updating the score.
    if (game_over == false) {
        timer = game.time.events.add(Phaser.Timer.SECOND * satu(1, 1.2), addObjects, this);
    }

    if (temp < 80) {
        counter = temp;
    }
    temp++;

    // And as an added bonus we add some monsters into the map at this point
    addMonsters();


}
