import axios from 'axios';

const BASE_URL = 'https://gutendex.com/';

const api = axios.create({
  baseURL: BASE_URL,
});

const handleApiError = (error) => {
  throw error;
};

// Define functions to make specific API requests

// Fetch books by category
export const fetchBooks = async (page,category) => {
  try {
    const response = await api.get(`/books?page=${page}&topic=${category}&mime_type=image%2F`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Search books by query and category
export const searchBooks = async (query, topic) => {
  try {
    const response = await api.get(`/books?search=${query}&topic=${topic}&mime_type=image%2F`);
    return response.data;
  } catch (error) {
    // Throw the error to propagate it to the caller
    throw error;
  }
};


// Fetch books by filter (general function)
export const fetchBooksByFilter = async (filterKey, filterValue) => {
  try {
    const response = await api.get(`/books?${filterKey}=${filterValue}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Fetch books by ID
export const fetchBooksByIds = (ids) => {
  const idList = Array.isArray(ids) ? ids.join(',') : ids;
  return fetchBooksByFilter('ids', idList);
};

// Fetch books by language
export const fetchBooksByLanguage = (languages) => {
  const languageList = Array.isArray(languages) ? languages.join(',') : languages;
  return fetchBooksByFilter('languages', languageList);
};

// Fetch books by MIME type
export const fetchBooksByMimeType = (mimeType) => {
  return fetchBooksByFilter('mime_type', mimeType);
};

// Fetch books by topic
export const fetchBooksByTopic = (topic) => {
  return fetchBooksByFilter('topic', topic);
};

// You can add more functions for other API endpoints and filters

export default api;
