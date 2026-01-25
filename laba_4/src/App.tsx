import { useState, useEffect } from 'react';
import { 
  Container, 
  Grid, 
  Typography, 
  TextField, 
  Button, 
  Card, 
  CardContent, 
  Checkbox, 
  FormControlLabel, 
  Paper,
  Box,
  Divider,
  CssBaseline 
} from '@mui/material';


interface Book {
  id: string;
  name: string;
  author: string;
  genre: string;
  rating: number;
  description: string;
  detailedDescription: string; 
  imgUrl: string;
  read: boolean;
}

const BooksApp = () => {
  
  const [books, setBooks] = useState<Book[]>([
    { 
        id: '1', 
        name: 'Кобзар', 
        author: 'Тарас Шевченко', 
        genre: 'Поезія', 
        rating: 5, 
        description: 'Збірка поетичних творів.', 
        detailedDescription: 'Кобзар — назва збірки поетичних творів Тараса Шевченка. Це найважливіша книга в українській літературі.',
        imgUrl: 'https://via.placeholder.com/150', 
        read: false 
    },

    { 
        id: '2', 
        name: '1984', 
        author: 'Джон Орвел', 
        genre: 'Художня література', 
        rating: 5, 
        description: 'Історія про чоловіка, який працює в уряді.', 
        detailedDescription: 'Один з найкращих витворів мистецтва нашого століття!',
        imgUrl: 'https://via.placeholder.com/150', 
        read: false 
    },
  ]);
  
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('');
  const [newBook, setNewBook] = useState({ 
    name: '', 
    author: '', 
    genre: '', 
    rating: '', 
    description: '',
    detailedDescription: '' 
  });

  useEffect(() => {
    console.log("Додаток готовий");
  }, []);

 
  const handleAddBook = (e: any) => {
    e.preventDefault();
    const bookToAdd: Book = {
      id: Date.now().toString(),
      name: newBook.name,
      author: newBook.author,
      genre: newBook.genre,
      rating: Number(newBook.rating) || 0,
      description: newBook.description,
      detailedDescription: newBook.detailedDescription, 
      imgUrl: 'https://via.placeholder.com/150', 
      read: false
    };
    setBooks([...books, bookToAdd]);
    setNewBook({ name: '', author: '', genre: '', rating: '', description: '', detailedDescription: '' });
  };

  const toggleRead = (id: string) => {
    setBooks(prev => prev.map(b => b.id === id ? { ...b, read: !b.read } : b));
  };

  const filteredBooks = books.filter(book => {
    const s = filter.toLowerCase();
    return book.name.toLowerCase().includes(s) || book.author.toLowerCase().includes(s);
  });

 
  if (selectedBookId) {
    const book = books.find(b => b.id === selectedBookId);
    if (!book) return null;

    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <CssBaseline />
        <Button variant="outlined" onClick={() => setSelectedBookId(null)} sx={{ mb: 2 }}>← Назад</Button>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box component="img" src={book.imgUrl} sx={{ width: '100%', borderRadius: 2 }} />
            </Grid>
            <Grid size={{ xs: 12, md: 8 }}>
              <Typography variant="h4">{book.name}</Typography>
              <Typography variant="h6" color="text.secondary">{book.author}</Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body1"><strong>Короткий опис:</strong> {book.description}</Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                <strong>Детальний опис:</strong>
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', whiteSpace: 'pre-line' }}>
                {book.detailedDescription || 'Детальний опис не вказано'}
              </Typography>
              <Box sx={{ mt: 3 }}>
                <FormControlLabel
                  control={<Checkbox checked={book.read} onChange={() => toggleRead(book.id)} />}
                  label="Прочитано"
                />
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    );
  }

 
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <CssBaseline />
      <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
        Книжкова Лабораторна
      </Typography>

      <TextField 
        fullWidth label="Пошук книги..." variant="outlined" 
        value={filter} onChange={(e: any) => setFilter(e.target.value)} 
        sx={{ mb: 4 }} 
      />

      {/* ФОРМА ДОДАВАННЯ */}
      <Paper elevation={2} sx={{ p: 3, mb: 5, backgroundColor: '#f9f9f9' }}>
        <Typography variant="h6" gutterBottom>Додати нову книгу</Typography>
        <Box component="form" onSubmit={handleAddBook}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField fullWidth label="Назва" required value={newBook.name} onChange={e => setNewBook({...newBook, name: e.target.value})} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField fullWidth label="Автор" required value={newBook.author} onChange={e => setNewBook({...newBook, author: e.target.value})} />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField 
                fullWidth 
                label="Короткий опис" 
                value={newBook.description} 
                onChange={e => setNewBook({...newBook, description: e.target.value})} 
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField 
                fullWidth 
                multiline 
                rows={4} 
                label="Детальний опис (для сторінки деталей)" 
                value={newBook.detailedDescription} 
                onChange={e => setNewBook({...newBook, detailedDescription: e.target.value})} 
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Button type="submit" variant="contained" size="large" fullWidth>
                ДОДАТИ КНИГУ
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      {/* СПИСОК КНИГ */}
      <Grid container spacing={2}>
        {filteredBooks.map(book => (
          <Grid size={{ xs: 12 }} key={book.id}>
            <Card variant="outlined">
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{book.name}</Typography>
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Typography variant="body2">{book.author}</Typography>
                  </Grid>
                  <Grid size={{ xs: 6, md: 2 }}>
                    <Typography variant="body2">⭐ {book.rating}</Typography>
                  </Grid>
                  <Grid size={{ xs: 6, md: 2 }} sx={{ textAlign: 'right' }}>
                    <Button variant="contained" onClick={() => setSelectedBookId(book.id)}>Деталі</Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BooksApp;