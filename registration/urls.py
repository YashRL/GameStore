from django.conf.urls import url

from . import views

urlpatterns = [
	url(r'^$', views.signup, name='signup'),
	url(r'^activation', views.activate, name='activate')
]
