import './css/styles.css';

import Notiflix from "notiflix";
import axios from 'axios';

import "simplelightbox/dist/simple-lightbox.min.css";
import simpleLightbox from 'simplelightbox';


const refs = {
    form: document.querySelector('#search-form'),
    gallery: document.querySelector(".gallery"),
    loadMoreBtn: document.querySelector(".load-more"),
    input: document.querySelector("[name=searchQuery]")
}

refs.input.value = "violet sun flowers summer"

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = "29220368-6467898673c76bc95c006b920";

let currentPage = 0;
const perPage = 40;

function makeCurrentUrlRequest() {
    currentPage += 1;
    const searchRequest = refs.input.value
    return `${BASE_URL}?key=${API_KEY}&q=(${searchRequest})&image_type="photo"&orientation="horizontal"&safesearch="true"&per_page=${perPage}&page=${currentPage}`;

}

const makeMarkup = (acc, item) => {
    return acc + `
    <div class="photo-card">
        <a class="img-link" href="${item.largeImageURL}">
            <img class="image" src="${item.previewURL}" alt="${item.tags}" loading="lazy"/>
        </a>
        <div class="info">
            <p class="info-item">
                <b>Likes:</b> 
                <span class="info-value">${item.likes}</span>
            </p>
            <p class="info-item">
                <b>Views:</b> 
                <span class="info-value">${item.views}</span>
            </p>
            <p class="info-item">
                <b>Comments:</b> 
                <span class="info-value">${item.comments}</span>
            </p>
            <p class="info-item">
                <b>Downloads:</b> 
                <span class="info-value">${item.downloads}</span>
            </p>
        </div>
    </div>
    `
}

const getPictures = async (e) => {
    e.preventDefault()
    refs.gallery.innerHTML = ''

    currentPage = 0;
    const url = makeCurrentUrlRequest()
    const res = await (await axios.get(url)).data

    if (res.total === 0) {
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
        refs.gallery.innerHTML = ''
    }

    Notiflix.Notify.info(`Hooray! We've found ${res.totalHits} images.`)

    const markupStr = await res.hits.reduce(makeMarkup, "")
    refs.gallery.innerHTML = markupStr

    refs.loadMoreBtn.classList.remove("visually-hidden")
}

const getMorePictures = async (e) => {
    const url = makeCurrentUrlRequest()
    const res = await (await axios.get(url)).data

    if (Number(res.total / (currentPage * perPage) <= 1)) {
        Notiflix.Notify.info("Now you can see all the matching results we have")
        refs.loadMoreBtn.classList.add('visually-hidden')
    }

    const markupStr = await res.hits.reduce(makeMarkup, "")

    refs.gallery.insertAdjacentHTML("beforeend", markupStr)
    lightbox.refresh()
}

refs.form.addEventListener('submit', getPictures)
refs.loadMoreBtn.addEventListener('click', getMorePictures)

// lightbox:

refs.gallery.addEventListener('click', (e) => {
    e.preventDefault()
    if (e.target.nodeName !== "IMG") { return }
    let lightbox = new simpleLightbox('.photo-card a');
    lightbox.on('show.simplelightbox');
})

// scroll:

const { height: cardHeight } = document
    .querySelector(".gallery")
    .firstElementChild.getBoundingClientRect();

    // console.log(size)

window.scrollBy({
    top: cardHeight * 2,
    behavior: "smooth",
});