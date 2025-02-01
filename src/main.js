import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { fetchImages } from "./js/pixabay-api.js";
import { createGalleryItem } from "./js/render-functions.js";

const form = document.querySelector(".search-form");
const galleryContainer = document.querySelector(".gallery");
const loadMoreBtn = document.querySelector(".load-more");
const loadingMessage = document.querySelector(".loading-message");

let currentPage = 1;
let currentQuery = "";
let lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});

const loader = document.querySelector(".loader-container");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  currentQuery = event.target.query.value.trim();
  currentPage = 1;

  galleryContainer.innerHTML = "";
  loadMoreBtn.style.display = "none";
  loader.classList.remove("loader-off"); 

  if (!currentQuery) {
    loader.classList.add("loader-off"); 
    iziToast.error({
      message: "Please enter a search term.",
      position: "topRight",
    });
    return;
  }

  try {
    const data = await fetchImages(currentQuery, currentPage);

    if (data.hits.length === 0) {
      iziToast.info({
        message: "Sorry, there are no images matching your search query.",
        position: "topRight",
      });
      return;
    }

    renderGallery(data.hits);
    lightbox.refresh();

    if (data.totalHits > 15) {
      loadMoreBtn.style.display = "block";
    }
  } catch (error) {
    iziToast.error({
      message: "Something went wrong. Please try again later.",
      position: "topRight",
    });
  } finally {
    loader.classList.add("loader-off"); // Приховуємо індикатор
  }
});

loadMoreBtn.addEventListener("click", async () => {
  loadMoreBtn.style.display = "none";
  loadingMessage.style.display = "block";

  try {
    currentPage += 1;
    const data = await fetchImages(currentQuery, currentPage);
    renderGallery(data.hits);
    lightbox.refresh();

    const cardHeight = document
      .querySelector(".gallery-item")
      .getBoundingClientRect().height;
    window.scrollBy({
      top: cardHeight * 2,
      behavior: "smooth",
    });

    if (currentPage * 15 >= data.totalHits) {
      iziToast.info({
        message: "You've reached the end of search results.",
        position: "topRight",
      });
    } else {
      loadMoreBtn.style.display = "block";
    }
  } catch (error) {
    iziToast.error({
      message: "Failed to load more images.",
      position: "topRight",
    });
  } finally {
    loadingMessage.style.display = "none";
  }
});

function renderGallery(images) {
  const galleryTemplate = images.map((image) => createGalleryItem(image)).join("");
  galleryContainer.insertAdjacentHTML("beforeend", galleryTemplate);
}