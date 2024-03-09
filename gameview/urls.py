from django.conf.urls import url

from . import views
# The url mapping takes a four digit number that should be mapped to an individual game.
urlpatterns = [
	url(r'^(?P<game_id>[0-9]+)/$', views.index, name='index'),
	url(r'^(?P<game_id>[0-9]+)/score/', views.score),
	url(r'^(?P<game_id>[0-9]+)/scores/', views.scores),
	url(r'^(?P<game_id>[0-9]+)/state/', views.state),
	url(r'^(?P<game_id>[0-9]+)/load/', views.load),
	url(r'^(?P<game_id>[0-9]+)/payment/', views.buy_game),
	url(r'^(?P<game_id>[0-9]+)/success/', views.successful_payment),
	url(r'^(?P<game_id>[0-9]+)/error/', views.error_payment),
	url(r'^(?P<game_id>[0-9]+)/cancel/', views.cancel_payment),
]
