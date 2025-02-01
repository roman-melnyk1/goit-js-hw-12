import axios from 'axios';

export const fetchImages = async (searchedQuery, page = 1) => {
  const params = new URLSearchParams({
    key: '48414882-2ceb04708685b14a14771b53a',
    q: searchedQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: 15,
  });

  try {
    const response = await axios.get(`https://pixabay.com/api/?${params}`);
    return response.data;
  } catch (error) {
    throw new Error(`HTTP error! Status: ${error.response.status}`);
  }
};


