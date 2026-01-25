import React, { useState, useEffect } from 'react';
import { 
  Container, Grid, Typography, TextField, Button, Card, CardContent, 
  Checkbox, FormControlLabel, Paper, Box, Divider, CssBaseline, CircularProgress 
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { fetchBooks, addBook, toggleReadStatus } from '../redux/booksSlice';
import type { Book } from '../types/types';

const BooksApp: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items: books, status, error } = useAppSelector((state) => state.books);

  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('');
  const [newBook, setNewBook] = useState({ 
    name: '', author: '', genre: '', rating: '', description: '', detailedDescription: '' 
  });

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBooks()); // Завантаження книг при запуску
    }
  }, [status, dispatch]);

  const handleAddBook = (e: React.FormEvent) => {
    e.preventDefault();
    const bookToAdd: Book = {
      id: Date.now().toString(),
      ...newBook,
      rating: Number(newBook.rating) || 0,
      imgUrl: 'https://via.placeholder.com/150',
      read: false
    };
    dispatch(addBook(bookToAdd)); // Відправка дії до Redux
    setNewBook({ name: '', author: '', genre: '', rating: '', description: '', detailedDescription: '' });
  };

  const filteredBooks = books.filter(book => 
    book.name.toLowerCase().includes(filter.toLowerCase()) || 
    book.author.toLowerCase().includes(filter.toLowerCase())
  );

  if (selectedBookId) {
    const book = books.find(b => b.id === selectedBookId);
    if (!book) return null;
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Button onClick={() => setSelectedBookId(null)}>← Назад</Button>
        <Paper sx={{ p: 4, mt: 2 }}>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box component="img" src={book.imgUrl} sx={{ width: '100%', borderRadius: 2 }} />
            </Grid>
            <Grid size={{ xs: 12, md: 8 }}>
              <Typography variant="h4">{book.name}</Typography>
              <Typography variant="body1">{book.detailedDescription}</Typography>
              <FormControlLabel
                control={<Checkbox checked={book.read} onChange={() => dispatch(toggleReadStatus(book.id))} />}
                label="Прочитано"
              />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <CssBaseline />
      <Typography variant="h3" align="center" gutterBottom>Книжкова Лабораторна</Typography>
      
      <TextField fullWidth label="Пошук..." value={filter} onChange={(e) => setFilter(e.target.value)} sx={{ mb: 4 }} />

      <Paper elevation={2} sx={{ p: 3, mb: 5 }}>
        <Box component="form" onSubmit={handleAddBook}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField fullWidth label="Назва" required value={newBook.name} onChange={e => setNewBook({...newBook, name: e.target.value})} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField fullWidth label="Автор" required value={newBook.author} onChange={e => setNewBook({...newBook, author: e.target.value})} />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField fullWidth multiline rows={2} label="Опис" value={newBook.detailedDescription} onChange={e => setNewBook({...newBook, detailedDescription: e.target.value})} />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Button type="submit" variant="contained" fullWidth>Зберегти книгу</Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      {status === 'loading' && <Box sx={{ textAlign: 'center' }}><CircularProgress /></Box>}

      <Grid container spacing={2}>
        {filteredBooks.map(book => (
          <Grid size={{ xs: 12 }} key={book.id}>
            <Card variant="outlined">
              <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="h6">{book.name} {book.read ? '✅' : ''}</Typography>
                  <Typography color="text.secondary">{book.author}</Typography>
                </Box>
                <Button variant="outlined" onClick={() => setSelectedBookId(book.id)}>Деталі</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BooksApp;