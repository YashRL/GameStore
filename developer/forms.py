from django import forms
from store.models import Category

class NewGameForm(forms.Form):
    game_name = forms.CharField(label='Game name', max_length=200)
    game_price = forms.DecimalField(label='Game price', decimal_places=2, max_value=99.99)
    game_url = forms.URLField(label='Game url')
    game_desc = forms.CharField(label='Game description', max_length=1000)

    # Returns all categories as a queryset
    categories = Category.objects.all()
    category = forms.ModelChoiceField(queryset=categories, to_field_name="name")
