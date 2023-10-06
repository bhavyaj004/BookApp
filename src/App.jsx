import React from 'react';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MainPage from './MainPage';
import BookListPage from './BookListPage';
import './App.css'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<MainPage/>} />
        <Route path="/books/:category" element={<BookListPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
