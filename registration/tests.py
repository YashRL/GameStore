from django.test import TestCase
from .views import signup, logout_view
from .models import Profile
from django.urls import resolve
from django.test.client import Client
from django.contrib.auth.models import User
import string
import random

# Tests creating game objects and assigning categories to them
# test_category_sort tests are games categorized correctly
class ProfileTestCase(TestCase):
# Creating a user and linking it to a Profile
  def setUp(self):
    username = "tester"
    password = "passw123"
    email = "test@tester.com"
    key = ''.join(random.SystemRandom().choice(string.ascii_uppercase + string.digits) for _ in range(25))
    user = User.objects.create(username=username, password=password)
    user_type = 'Developer'
    this_user = Profile.objects.create(user=user, activation_key=key, email=email, user_type=user_type, is_activated=False)

  # Testing that all profile-fields match to given data
  def test_profile_creation(self):
    username = "tester2"
    password = "passw123"
    user_type = "Developer"
    key = ''.join(random.SystemRandom().choice(string.ascii_uppercase + string.digits) for _ in range(25))
    user = User.objects.create(username=username, password=password)
    this_user = Profile.objects.create(user=user, activation_key=key, user_type = user_type, is_activated = False)
    self.assertEqual(this_user.user.username, "tester2")
    self.assertEqual(this_user.user.password, "passw123")
    self.assertEqual(this_user.activation_key, key)
    self.assertEqual(this_user.user_type, "Developer")
    self.assertEqual(this_user.is_activated, False)

  # Signup gets rendered
  def test_signup_view(self):
    found = resolve('/signup/')
    self.assertEqual(found.func, signup)

  # Issue a GET request to front page
  def test_signup_response(self):
    response = self.client.get('/signup/')
    self.assertEqual(response.status_code, 200)
