import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { PixabayAPI } from './js/pixabay-api.js';
import { createMarkup } from './js/render-functions.js';

const refs = {
    form: document.querySelector('.form'),
    gallery: document.querySelector('.gallery'),
    loadMore: document.querySelector('.load-more'),
    loader: document.querySelector('.loader')
};

const pixabayAPI = new PixabayAPI();
const lightbox = new SimpleLightbox('.gallery a');

function showToast(message, type = 'error') {
    iziToast.show({
        message,
        messageColor: '#FFFFFF',
        position: 'topRight',
        timeout: 3000,
        close: false,
        backgroundColor: type === 'error' ? '#EF4040' : '#4CAF50'
    });
}

function showLoader() {
    refs.loader.textContent = 'Loading images, please wait...';
    refs.loader.classList.remove('is-hidden');
}

function removeLoader() {
    refs.loader.textContent = '';
    refs.loader.classList.add('is-hidden');
}

async function onSubmit(e) {
    e.preventDefault();
    const searchQuery = e.currentTarget.elements.searchQuery.value.trim();
    if (!searchQuery) {
        showToast('Please enter a search query');
        return;
    }

    pixabayAPI.query = searchQuery;
    pixabayAPI.resetPage();
    refs.gallery.innerHTML = '';
    refs.loadMore.classList.add('is-hidden');
    showLoader();

    try {
        const { hits, totalHits } = await pixabayAPI.fetchImages();
        if (hits.length === 0) {
            showToast('Sorry, there are no images matching your search query. Please try again.');
            return;
        }

        refs.gallery.innerHTML = createMarkup(hits);
        lightbox.refresh();

        showToast(`Hooray! We found ${totalHits} images.`, 'success');

        if (hits.length < totalHits) {
            refs.loadMore.classList.remove('is-hidden');
        }
        
        refs.form.reset();
    } catch (error) {
        showToast('Something went wrong. Please try again.');
    } finally {
        removeLoader();
    }
}

async function onLoadMore() {
    pixabayAPI.incrementPage();
    refs.loadMore.classList.add('is-hidden');
    showLoader();

    try {
        const { hits, totalHits } = await pixabayAPI.fetchImages();
        refs.gallery.insertAdjacentHTML('beforeend', createMarkup(hits));
        lightbox.refresh();

        const totalPages = Math.ceil(totalHits / pixabayAPI.per_page);
        if (pixabayAPI.page >= totalPages) {
            refs.loadMore.classList.add('is-hidden');
            showToast("We're sorry, but you've reached the end of search results.", 'error');
        } else {
            refs.loadMore.classList.remove('is-hidden');
        }

        const { height: cardHeight } = refs.gallery
            .firstElementChild
            .getBoundingClientRect();

        window.scrollBy({
            top: cardHeight * 2,
            behavior: 'smooth',
        });
    } catch (error) {
        showToast('Something went wrong. Please try again.');
    } finally {
        removeLoader();
    }
}

refs.form.addEventListener('submit', onSubmit);
refs.loadMore.addEventListener('click', onLoadMore);
