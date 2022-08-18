import './css/styles.css';

import "simplelightbox/dist/simple-lightbox.min.css";


import { refs } from './js_partials/refs'
import { getPictures, getMorePictures } from './js_partials/getContent'


refs.loadMoreBtn.classList.add("visually-hidden")

refs.form.addEventListener('submit', getPictures)


refs.gallery.addEventListener('click', (e) => {
    e.preventDefault()
    if (e.target.nodeName !== "IMG") { return }
})

// let options = {
//     root: refs.gallery,
//     rootMargin: '0px',
//     threshold: 1.0
//     }

// let observer = new IntersectionObserver(getMorePictures, options);

// IntersectionObserver.observe(refs.loadMoreBtn)