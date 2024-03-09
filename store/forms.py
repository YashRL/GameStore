from django import forms

USER_TYPES = (
    ("Developer", ("Developer")),
    ("Player", ("Customer"))
)

class UserTypeForm(forms.Form):
    user_type = forms.ChoiceField(choices=USER_TYPES, required=True)
