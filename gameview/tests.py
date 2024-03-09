from django.test import TestCase
from store.models import Game, Category, BoughtGames
from .views import index, score, successful_payment
from django.urls import resolve
from django.test.client import Client
from django.contrib.auth.models import User


class GameviewTestCase(TestCase):
    def setup(self):
        indie = Category.objects.create(name='Indiee22')
        test_game = Game.objects.create(name="Test-game", price=100, url='https://is.fi', developer_id=2, category=indie)

    # Front page gets rendered
    def test_game_page_view(self):
        indie = Category.objects.create(name='Indieee1')
        test_game = Game.objects.create(name="Test-game", price=100, url='https://is.fi', developer_id=2, category=indie)
        found = resolve('/game/' + str(test_game.id) + '/')
        self.assertEqual(found.func, index)

    # Issue a GET request to front page
    def test_game_page_response(self):
        indie = Category.objects.create(name='Indieeee12')
        test_game = Game.objects.create(name="Test-game", price=100, url='https://is.fi', developer_id=2, category=indie)
        response = self.client.get('/game/' + str(test_game.id) + '/')
        self.assertEqual(response.status_code, 200)
