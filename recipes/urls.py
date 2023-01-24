from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('accounts/signup', views.signup, name='signup'),
    path('accounts/login', views.login, name='login'),
    path('accounts/logout', views.logout, name='logout'),
    path('accounts/password/change', views.change_password, name='change_password'),
    path('account_settings', views.account_settings, name='account_settings'),
]