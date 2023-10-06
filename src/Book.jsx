import React from 'react';

function Book({ book }) {
  const { title, authors, formats } = book;

  // Get the first author's name
  const authorName = authors.length > 0 ? authors[0].name : 'Unknown Author';

  // Get the URL of the book's cover image
  const coverImageUrl = formats['image/jpeg'];

  // Define the preferred formats in order
  const preferredFormats = ['text/html', 'application/pdf', 'text/plain'];

  // Function to open the book in the preferred formats
  const openBookInPreferredFormat = () => {
    
  
    // Find the first available format among the preferred formats
    const availableFormat = preferredFormats.find((format) => formats[format]);
  
    if (availableFormat) {
      // Open the book in the available format
      window.open(formats[availableFormat], '_blank');
    } else if (formats['application/octet-stream']) {
      // If only a zip format is available, provide a download link
      window.open(formats['application/octet-stream'], '_blank');
    } else {
      // No viewable or downloadable format available, display an error message
      alert('No viewable version available');
    }
  };
  

  return (
    <div className="book">
      <div className="book-cover">
        {coverImageUrl && <img src={coverImageUrl} alt={`Cover for ${title}`} onClick={openBookInPreferredFormat} />}
      </div>
      <div className="book-info">
        <h3>{title}</h3>
        <p>Author: {authorName}</p>
        <button onClick={openBookInPreferredFormat}>Read</button>
      </div>
    </div>
  );
}

export default Book;
