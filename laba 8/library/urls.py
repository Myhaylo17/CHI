from django.urls import path
from . import views

urlpatterns = [

    path('', views.author_list, name='home'),
    path('authors/', views.author_list, name='author_list'),
    path('books/', views.book_list, name='book_list'),
    path('authors/<int:author_id>/books/', views.author_books, name='author_books'),
]