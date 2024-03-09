from django.test import TestCase
from .models import Game, Category, BoughtGames
from .views import index
from django.urls import resolve
from django.test.client import Client
from django.contrib.auth.models import User

# Tests creating game objects and assigning categories to them
# test_category_sort tests are games categorized correctly
class GameTestCase(TestCase):
  def setUp(self):
    # Create two categories
    indie = Category.objects.create(name='Indie1')
    action = Category.objects.create(name='Action')

    # Create three games
    dark_room = Game.objects.create(name="Dark room", price=100, url='http://google.com', developer_id=1, category=indie)
    fight_or_flight = Game.objects.create(name="Fight or flight", price=120, url='http://google.com', developer_id=2,category=action)
    action_man = Game.objects.create(name="Action man", price=120, url='http://google.com', developer_id=2, category=action)

    user = User.objects.create(username="bob", email="bob@beatles.com", password="plaintext")

    owned_games = BoughtGames.objects.create(game=action_man, user=user)

  def test_game_creation(self):
    indie = Category.objects.create(name='Indie12')
    blue_water = Game.objects.create(name="Blue water", price=1, url='http://google.com', category=indie)
    self.assertEqual(blue_water.name, "Blue water")
    self.assertEqual(blue_water.price, 1)
    self.assertEqual(blue_water.url, 'http://google.com')
    self.assertEqual(blue_water.developer_id, 0) # Test if developer_id defaults to zero
    self.assertEqual(len(Game.objects.all()), 4)

  def test_category_sort(self):
    action_category = Category.objects.all().filter(name='Action')
    action_games = Game.objects.all().filter(category=action_category)
    # Test passes if action games query set length is equal to two
    self.assertEqual(len(action_games), 2)

  def test_owned_games(self):
    owned_games = BoughtGames.objects.all()
    self.assertEqual(len(owned_games), 1)

  # View tests

  # Front page gets rendered
  def test_front_page_view(self):
    found = resolve('/')
    self.assertEqual(found.func, index)

  # Issue a GET request to front page
  def test_front_page_response(self):
    response = self.client.get('/')
    self.assertEqual(response.status_code, 200)

  # Check all games are passed to game view
  def test_front_page_context(self):
    response = self.client.get('/')
    context = response.context
    games = context['games']
    self.assertEqual(len(games), 3)
