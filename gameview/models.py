from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from store.models import Game

# Highscore model to save the high scores of a single game
class HighScore(models.Model):
	player = models.ForeignKey(User)
	score = models.IntegerField()
	date = models.DateTimeField(default=timezone.now)
	game = models.ForeignKey(Game)

	# string representation of this object for example when logged to console
	# will only contain its score (eg. makes it more human friendly when debugging)
	def __str__(self):
		return str(self.score)

# Game state model to save game state
class GameState(models.Model):
	player = models.ForeignKey(User)
	game = models.ForeignKey(Game)
	state = models.TextField()
	date = models.DateTimeField(default=timezone.now)
	
