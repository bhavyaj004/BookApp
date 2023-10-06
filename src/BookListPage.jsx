import React, { useState, useEffect,useCallback } from 'react';
import {  useParams,useNavigate } from 'react-router-dom';
import Book from './Book';
import { fetchBooks,searchBooks } from './api'; // Import the API functions

function BookListPage() {
  const { page, category } = useParams();
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(page || 1);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const debouncedSearch = useCallback(
    debounce((query, category) => {
      // Perform the search API call with debounced query and category
      searchBooks(query, category)
        .then((response) => {
          // Handle the response data and set it in the state
          setSearchResults(response.results);
        })
        .catch((error) => {
          // Handle errors
          console.error('Error searching for books:', error);
        });
    }, 500), 
    [category]
  );

 
  useEffect(() => {
    // Fetch books based on the current page and category
    if (searchQuery) {
      
      setBooks(searchResults);
    } else {
      // If no search query is provided, use the category and pagination
      fetchBooks(currentPage, category)
        .then((response) => {
          // Handle the response data and set it in the state
          setBooks(response.results);
        })
        .catch((error) => {
          // Handle errors
          console.error('Error fetching books:', error);
        });
    }
  }, [currentPage, category, searchQuery, searchResults]);

 const handleBackClick = () =>{
    navigate("/");
  }

  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setCurrentPage(1)
    // Debounce the search API call with the query and category
    debouncedSearch(query, category);
  };

  return (
    <div>
        <div>
        <button onClick={handleBackClick}>
          <span>&#8592;</span> Back
        </button>
      </div>
      <h2>Books in {category} - Page {currentPage}</h2>
      <div>
        <input
          type="text"
          placeholder="Search for books"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        <button onClick={() => setSearchQuery('')}>Clear</button>
      </div>
      <div>
        {books.map((book) => (
          <Book key={book.id} book={book} />
        ))}
      </div>
      <div>
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
          Previous Page
        </button>
        <button onClick={() => setCurrentPage(currentPage + 1)}>Next Page</button>
      </div>
    </div>
  );
}

export default BookListPage;

// Debounce utility function
function debounce(func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(this, args);
      }, wait);
    };
  }