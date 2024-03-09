from django.conf.urls import url

from . import views

urlpatterns = [
	url(r'^$', views.index, name='index'),
	url(r'info/(?P<pk>[0-9]+)/', views.info, name='info'),
	url(r'edit/(?P<pk>[0-9]+)/', views.GameEdit.as_view(success_url="/dev/"), name='GameEdit'),
	url(r'delete/(?P<pk>[0-9]+)/', views.GameDelete.as_view(success_url="/dev/"), name='GameDelete')
]
