import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { Book } from '../types/types';

interface BooksState {
  items: Book[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: BooksState = {
  items: [],
  status: 'idle',
  error: null,
};

// Асинхронна дія для імітації завантаження книг
export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return [
    { 
        id: '1', 
        name: 'Кобзар', 
        author: 'Тарас Шевченко', 
        genre: 'Поезія', 
        rating: 5, 
        description: 'Збірка поетичних творів.', 
        detailedDescription: 'Кобзар — найважливіша книга в українській літературі.',
        imgUrl: 'https://via.placeholder.com/150', 
        read: false 
    }
  ] as Book[];
});

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<Book>) => {
      state.items.push(action.payload); // Додавання нової книги до стану
    },
    toggleReadStatus: (state, action: PayloadAction<string>) => {
      const book = state.items.find(b => b.id === action.payload);
      if (book) {
        book.read = !book.read; // Зміна статусу "прочитано"
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = 'loading'; // Стан завантаження
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload; // Успішне завантаження
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Помилка'; // Обробка помилок
      });
  },
});

export const { addBook, toggleReadStatus } = booksSlice.actions;
export default booksSlice.reducer;