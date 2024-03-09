from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponseRedirect
from django.contrib.auth.models import Group
from django.template.loader import render_to_string
from django.core.mail import send_mail
from django.contrib.auth.models import User
from .models import Profile
import string
import random

from .forms import SignUpForm

def signup(request):
    if not request.user.is_authenticated():
        if request.method == 'POST': #?
            form = SignUpForm(request.POST)

            # Else clause for if form is not valid?
            if form.is_valid():
                # form.save() creates and saves a database object from the data bound to the form
                form.save()

                # Get relevant data from form
                username = form.cleaned_data.get('username')
                raw_password = form.cleaned_data.get('password1')
                user_typ = form.cleaned_data.get('user_type')
                email = form.cleaned_data.get('email')

                # Create a random key to the activation_url
                key = ''.join(random.SystemRandom().choice(string.ascii_uppercase + string.digits) for _ in range(25))

                # Authenticate verifies a set of credentials.
                # It takes credentials as keyword arguments, and
                # checks them against the authentication backend.
                # Returns a User object if the credentials are
                # valid. If authentication fails, returns None.
                user = authenticate(username=username, password=raw_password)
                this_user = Profile.objects.create(user=user, activation_key=key, user_type = user_typ, is_activated = False)
                user.save()

                current_host = request.META.get('HTTP_HOST')
                #Is secure now so doesn't work in localhost any more.
                activation_url = 'https://{current_host}/signup/activation?key={key}&uid={uid}'.format(current_host=current_host, key=key, uid = user.id)
                # Prep the message
                message = render_to_string('registration/email_activation.html', {
                    'name': username,
                    #Send the activation key and the user related to it in URL parameters
                    'activation_url': activation_url,
                })

                send_mail(
                      'Activate your AKAgamestore account',
                      message,
                      # From email
                      'no-reply@akagamestore.com',
                      # To email
                      [email])
                # Login takes a HttpRequest object and a User object as a parameter
                login(request, user)

                # Returns the desired group object
                group = Group.objects.get(name=user_typ)

                # Adds the user to the desired group
                user.groups.add(group)

                # Redirect user to 'front page'
                return redirect('/')

        else:
            # Imported from forms.py
            form = SignUpForm()

        return render(request, 'registration/index.html', {'form': form})
    else:
        # if user is already logged in
        return redirect('/')

def logout_view(request):
    logout(request)

def activate(request):
    # get the key and and the uid from URL parameters
    key = request.GET.get('key', '')
    uid = request.GET.get('uid', '')
    username = 'user.id'
    current_user = Profile.objects.get(user = uid)
    if key == current_user.activation_key:
        current_user.is_activated = True
        current_user.save()

    return HttpResponseRedirect('/')
