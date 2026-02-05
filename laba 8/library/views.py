from django.shortcuts import render, get_object_or_404
from django.db.models import Count
from .models import Author, Book

def author_list(request):
    # Анотація: додаємо поле books_count до кожного автора
    authors = Author.objects.annotate(books_count=Count('books'))
    return render(request, 'library/authors.html', {'authors': authors})

def book_list(request):
    # Використовуємо select_related, щоб підтягнути дані авторів одним запитом
    books = Book.objects.select_related('author').all().order_by('-published_date')
    return render(request, 'library/books.html', {'books': books})

def author_books(request, author_id):
    author = get_object_or_404(Author, id=author_id)
    books = author.books.all()
    return render(request, 'library/author_books.html', {'author': author, 'books': books})