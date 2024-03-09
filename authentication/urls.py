from django.conf.urls import url
from django.contrib.auth import views as auth_views
from .views import login_view

# At the moment no other implementation than url mappings to auth_views.login and auth_views.logout
urlpatterns = [
	url('login/', login_view, name='login'),
	url('logout/', auth_views.logout, {'next_page': '/'}),
]
