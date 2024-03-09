// ** Contains javascript for the gameview page ** //

// Adds event listener to window, which will monitor any incoming messages
// from the iFrame
window.addEventListener("message", function (message) {
  var gameframe = $("#gameframe");
  switch (message.data.messageType) {
    // If message type is score, save high score
    case "SCORE":
      saveHighScore(message.data.score);
      break;

    // If message type is save, save game state
    case "SAVE":
      saveGameState(message.data.gameState);
      break;

    // If message type is load request, load game
    case "LOAD_REQUEST":
      requestLoad();
      break;

    // change the size of the iframe according to options received from iFrame
    case "SETTING":
      gameframe.css("height", message.data.options.height + "px");
      gameframe.css("width", message.data.options.width + "px");
      gameframe.css("background-color", "white");
      break;
  }
});

  // Get csrf token. csrf variable is specified in the gameview template.
  var token = $(csrf).val();

/**
 * @param { object }
 *
 * Function changes javascript object to string and sends it to
 * the endpoint "state" to save the game state. See /gameview/views for
 * details.
 */

  function saveGameState(state) {
    var messageAsString = JSON.stringify(state);
    $.ajax({
      type: "POST",
      data: {
        state: messageAsString,
        csrfmiddlewaretoken: token
        },
      url: "state/",
      success: function (result) {
        checkForSaves();
      },
      error: function (err) {
        var iframe = $("#gameframe")[0];
        var message = {};
        message.messageType = "ERROR";
        message.info = "Something went wrong with saving the game.";
        iframe.contentWindow.postMessage(message, "*");
      }
    });
  }

/**
 * @param { int }
 *
 * Function sends score to "score" endpoint. See /gameview/views for details.
 * On success, updates high score list.
 * On error, sends the iframe a message.
 */
  function saveHighScore(score) {
    $.ajax({
      type: "POST",
      data: {
        "score": score,
        "csrfmiddlewaretoken": token
      },
      url: "score/",
      success: function (result) {
        getHighScores();
      },
      error: function (error) {
        var iframe = $("#gameframe")[0];
        var message = {};
        message.messageType = "ERROR";
        message.info = "Something went wrong with submitting the high score.";
        iframe.contentWindow.postMessage(message, "*");
      }
    });
  }

/**
 * Function requests newest save from "load" endpoint.
 * On success, loads the most recent save.
 * On failure, sens a message to the iframe.
 */
  function requestLoad() {
    $.ajax({
      type: "GET",
      url: "load/",
      success: function (result) {
        var gameState = (JSON.parse(result[0].data));
        var iframe = $("#gameframe")[0];
        var message = {};
        message.messageType = "LOAD";
        message.gameState = gameState;
        iframe.contentWindow.postMessage(message, "*");
        },
      error: function(result) {
        var iframe = $("#gameframe")[0];
        var message = {};
        message.messageType = "ERROR";
        message.info = "No saved games found";
        iframe.contentWindow.postMessage(message, "*");
      }
    });
  }

/**
 * Function requests high score list.
 * Appends high scores to score div.
 * On error, displays error message.
 */
  function getHighScores() {
    $.ajax({
      type: "GET",
      url: "scores/",
      success: function(result) {
        $("#scores").empty();
        $.each(result, function(i, n) {
          $("#scores").append(n.player + ": " + n.score + "<br>");
        });
      },
      error: function(error) {
        $("#scores").empty();
        $("#scores").html("<div class='error'> Something went wrong loading the high scores.</div>");
      }
    });
  }

  function checkForSaves() {
    $.ajax({
      type: "GET",
      url: "load/",
      success: function(result) {
        var container = $("#loadgame");
        container.html("<div class='saved'>You have saved games available, click here to load them.</div>");
        container.on("click touch", function() {
          container.empty();
          requestLoad();
        });
      }
    });
  }

// Document ready for retrieving high scores
$(document).ready(function(){
  getHighScores();
  checkForSaves();
});
