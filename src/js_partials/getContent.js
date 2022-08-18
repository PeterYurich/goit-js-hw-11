import { makeMarkup } from './cardMarkup'
// import { currentPage, perPage, makeCurrentUrlRequest } from './makeUrlRequest'
import { refs } from './refs'
import { smoothScroll } from './autoscroll'

import Notiflix from 'notiflix'
import axios from 'axios'
import SimpleLightbox from 'simplelightbox'
import _ from 'lodash'

import { refs } from "./refs";

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = "29220368-6467898673c76bc95c006b920";

let currentPage = 0;
const perPage = 40;

function makeCurrentUrlRequest() {
    currentPage += 1;
    const searchRequest = refs.input.value
    return `${BASE_URL}?key=${API_KEY}&q=${searchRequest}&image_type="photo"&orientation="horizontal"&safesearch="true"&per_page=${perPage}&page=${currentPage}`;
}

const  askMorePicture = () => {
    if (scrollY + innerHeight >= document.body.scrollHeight) {
        // _.debounce(, 500 )
        getMorePictures()
    }
}
const askMorePictureDeb = _.debounce(askMorePicture, 400)


const getPictures = async (e) => {
    e.preventDefault()
    refs.gallery.innerHTML = ''

    currentPage = 0;
    const url = makeCurrentUrlRequest()
    try {
        const res = await (await axios.get(url)).data

        if (res.total === 0) {
            Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
            refs.gallery.innerHTML = ''
            return
        }

        const markupStr = await res.hits.reduce(makeMarkup, "")
        refs.gallery.innerHTML = markupStr

        Notiflix.Notify.info(`Hooray! We've found ${res.totalHits} images.`)
        
        if (res.totalHits > perPage) {
            // refs.loadMoreBtn.classList.remove("visually-hidden")
        }

        if (innerHeight <= document.body.scrollHeight) {
            window.addEventListener('scroll', askMorePictureDeb);        }

        new SimpleLightbox('.photo-card a')

    } catch (error) {
        console.log('error is:', error)
    }
}

const getMorePictures = async (e) => {
    const url = makeCurrentUrlRequest()
    try {
        
        const res = await (await axios.get(url)).data

        if (Number(res.total <= (currentPage * perPage))) {
            Notiflix.Notify.info("Now you can see all the matching results we have")
            // refs.loadMoreBtn.classList.add('visually-hidden')
            window.removeEventListener('scroll', askMorePictureDeb)
        }

        const markupStr = await res.hits.reduce(makeMarkup, "")

        refs.gallery.insertAdjacentHTML("beforeend", markupStr)
        smoothScroll()
    } catch (error) {
        console.log('error is:', error)
    }
}

// refs.loadMoreBtn.addEventListener('click', getMorePictures)

export { getPictures, getMorePictures, simplelightbox,}