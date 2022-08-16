
import { makeMarkup } from './cardMarkup'
import { currentPage, perPage, makeCurrentUrlRequest } from './makeUrlRequest'
import { refs } from './refs'
import { smoothScroll } from './autoscroll'

import Notiflix from 'notiflix'
import axios from 'axios'
import SimpleLightbox from 'simplelightbox'


function askMorePicture() {
    if (scrollY + innerHeight >= document.body.scrollHeight) {
        getMorePictures()
    }
}

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

        // refs.loadMoreBtn.classList.remove("visually-hidden")
        if (innerHeight <= document.body.scrollHeight) {
            window.addEventListener('scroll', askMorePicture);
        }

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
            refs.loadMoreBtn.classList.add('visually-hidden')
            window.removeEventListener('scroll', askMorePicture)
        }

        const markupStr = await res.hits.reduce(makeMarkup, "")

        refs.gallery.insertAdjacentHTML("beforeend", markupStr)
        smoothScroll()
    } catch (error) {
        console.log('error is:', error)
    }
}

export { getPictures, getMorePictures, simplelightbox }