import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function MainPage() {
  const [categories, setCategories] = useState(['fiction', 'drama', 'humour','politics','philosophy','history','adventure']);


  return (
    <div>
      <h1>Book App</h1>
      <div>
        {categories.map((category) => (
          <Link to={`/books/${category}`} key={category}>
            <button>{category}</button>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MainPage;
