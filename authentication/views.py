from django.shortcuts import render
from django.contrib.auth.views import login
from django.http import HttpResponseRedirect


def login_view(request):
  if request.user.is_authenticated:
    return HttpResponseRedirect('/')
  else:
    return login(request, template_name='login/login.html')