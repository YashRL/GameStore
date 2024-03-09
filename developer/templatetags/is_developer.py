from common.util import user_is_developer, correct_developer
from django import template

# Template tag definition
# This template tag can be used in any template to check if
# currently logged in user is a developer. Example syntax:
# {% if user|user_is_developer %}

register = template.Library()
@register.filter(name='user_is_developer')
def user_is_developer_filter(user):
  return user_is_developer(user)

# Checks if user is the owner of the game
@register.filter(name='correct_developer')
def correct_developer_filter(user, game):
  return correct_developer(user, game)