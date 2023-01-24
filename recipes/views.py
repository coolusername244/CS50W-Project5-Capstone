from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request, "recipes/index.html")

def change_password(request):
    return render(request, "account/password_change.html")

def account_settings(request):
    return render(request, "recipes/account_settings.html")


def signup(request):
    return render(request, "account/signup.html")


def login(request):
    return render(request, "account/login.html")


def logout(request):
    return render(request, "account/logout.html")