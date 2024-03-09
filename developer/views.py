from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse, Http404, HttpResponseRedirect
from django.core.urlresolvers import reverse_lazy
from django.views.generic.edit import UpdateView, DeleteView
from .forms import NewGameForm
from store.models import Game, BoughtGames
from django.contrib.auth.decorators import login_required
from django.contrib.auth.decorators import user_passes_test
from django.contrib.auth.models import Group
from django import template
from common.util import user_is_developer

# If user is not logged in and tries to access developer page, user is prompted to log in.
@user_passes_test(user_is_developer, login_url='/', redirect_field_name=None)
def index(request):

    # Own developed games and edit button
    user_id = request.user.id
    developed_games = Game.objects.all().filter(developer_id=user_id)

    for game in developed_games:
      single_game_stats = BoughtGames.objects.all().filter(game = game)
      game.sales = len(single_game_stats)


    # handling form actions
    if request.method == 'POST':
        form = NewGameForm(request.POST)
        if form.is_valid():
            name = form.cleaned_data['game_name']
            price = form.cleaned_data['game_price']
            url = form.cleaned_data['game_url']
            category = form.cleaned_data['category']
            desc = form.cleaned_data['game_desc']
            dev_id = request.user.id
            g = Game(name=name, price=price, url=url, developer_id=dev_id, category=category, description=desc)
            g.save()
            form = NewGameForm()
            return HttpResponseRedirect('/dev')
    else:
        # Insert the NewGameForm
        form = NewGameForm()

    context = {
        'form': form,
        'developed_games': developed_games,
    }

    return render(request, 'developer/index.html', context)

def info(request, pk):
    #get game_id from path and current game
    path = request.META['PATH_INFO']
    game_id = path[10:-1]
    this_game = Game.objects.filter(id = game_id)

    try:
        user_id = request.user.id
        # checks if user has developed current game
        user_is_developer = len(this_game.filter(developer_id=user_id)) > 0
    except:
        raise Http404("Page not found.")
    else:
        if(not user_is_developer):
            # redirect to dev-page
            raise Http404("You don't have the rights to view this games' statistics.")
        else:
            #get current game's stats
            single_game_stats = BoughtGames.objects.all().filter(game = this_game)
            sold_items = len(single_game_stats)

            context = { 'this_game': this_game, 'single_game_stats': single_game_stats, 'sold_items': sold_items }

            return render(request, 'developer/info.html', context)


class GameEdit(UpdateView):
    model = Game
    fields = ['name', 'price', 'url', 'description']

    # Checking if the user has developed the game and has rights to edit it
    def get_initial(self):
        initial = super(GameEdit, self).get_initial()
        try:
            user_id = self.request.user.id
            current_game = self.object
            length = len(Game.objects.all().filter(name=current_game.name).filter(developer_id=user_id)) > 0
        except:
            raise Http404("Page not found or you are not logged in")
        else:
            if(not length):
                raise Http404("You don't have rights to edit this game.")


class GameDelete(DeleteView):
    model = Game
    # Overrides the delete method from the mixin
    def delete(self, request, *args, **kwargs):
      self.object = self.get_object()
      user_id = self.request.user.id
      current_game = self.object
      length = len(Game.objects.all().filter(name=current_game.name).filter(developer_id=user_id)) > 0
      if length:
        return super(GameDelete, self).delete(request, *args, **kwargs)
      else:
        raise Http404("You can't delete this game")
