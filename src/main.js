import "simplelightbox/dist/simple-lightbox.min.css";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import iziToast from "izitoast";
import { fetchImages } from './js/pixabay-api.js';
import { createGalleryItem } from './js/render-functions.js';

const form = document.querySelector('.search-form');
const galleryContainer = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const loader = document.querySelector('.loader-container');

let currentPage = 1;
let currentQuery = '';

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  currentQuery = event.currentTarget.elements.query.value.trim();
  currentPage = 1;

  galleryContainer.innerHTML = '';
  loader.style.display = 'block';
  loadMoreBtn.style.display = 'none';

  if (!currentQuery) {
    loader.style.display = 'none';
    iziToast.error({
      title: '',
      message: 'Please complete the form',
      messageColor: '#fafafb',
      icon: 'fas fa-keyboard',
      iconColor: '#fafafb',
      position: 'topRight',
      backgroundColor: '#ef4040',
      color: '#fafafb',
    });
    return;
  }

  try {
    const data = await fetchImages(currentQuery, currentPage);

    if (data.total === 0) {
      iziToast.error({
        title: '',
        message: 'Sorry, there are no images matching your search query. Please try again!',
        messageColor: '#fafafb',
        icon: 'far fa-file-image',
        iconColor: '#fafafb',
        position: 'topRight',
        backgroundColor: '#ef4040',
        color: '#fafafb',
      });
      return;
    }

    renderGallery(data.hits);
    if (data.totalHits > 15) {
      loadMoreBtn.style.display = 'block';
    }
  } catch (err) {
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      messageColor: '#fafafb',
      icon: 'fas fa-exclamation-triangle',
      iconColor: '#fafafb',
      position: 'topRight',
      backgroundColor: '#ef4040',
      color: '#fafafb',
    });
    console.error(err);
  } finally {
    loader.style.display = 'none';
    event.target.reset();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  loader.style.display = 'block';

  try {
    const data = await fetchImages(currentQuery, currentPage);
    renderGallery(data.hits);

    if (data.hits.length < 15) {
      loadMoreBtn.style.display = 'none';
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        messageColor: '#fafafb',
        icon: 'fas fa-info-circle',
        iconColor: '#fafafb',
        position: 'topRight',
        backgroundColor: '#4e75ff',
        color: '#fafafb',
      });
    }
  } catch (err) {
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      messageColor: '#fafafb',
      icon: 'fas fa-exclamation-triangle',
      iconColor: '#fafafb',
      position: 'topRight',
      backgroundColor: '#ef4040',
      color: '#fafafb',
    });
    console.error(err);
  } finally {
    loader.style.display = 'none';
  }
});

function renderGallery(images) {
  const galleryTemplate = images.map(el => createGalleryItem(el)).join('');
  galleryContainer.insertAdjacentHTML('beforeend', galleryTemplate);

  const modal = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captions: true,
    captionDelay: 250,
  });
  modal.refresh();

  if (currentPage > 1) {
    setTimeout(() => {
      const cardHeight = document.querySelector('.gallery-item').getBoundingClientRect().height;
      window.scrollBy({
        top: cardHeight * 2, 
        behavior: 'smooth'
      });
    }, 500); 
  }
}