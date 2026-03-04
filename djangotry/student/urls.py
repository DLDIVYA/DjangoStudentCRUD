from django.urls import path
from . import views

urlpatterns = [
    path("", views.say_hello, name="say_hello"),
    path("details/", views.student_creation),
    path("details/<int:id>/", views.student_detail)
]