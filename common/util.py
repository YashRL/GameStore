from django.contrib.auth.models import Group
from store.models import Game

# Reason for having two different functions is because djangos
# user_passes_test only supports using one parameter. It's simpler like this.
def user_is_developer(user):
  # Get the group object
  group = Group.objects.get(name='Developer')
  # Returns true or false
  return group in user.groups.all()

def user_is_player(user):
  # Get the group object
  group = Group.objects.get(name='Player')
  # Returns true or false
  return group in user.groups.all()

def correct_developer(user, game):
  # Get all games by the user
  games = Game.objects.all().filter(developer_id=user.id).filter(id=game.id)
  return len(games) == 1
