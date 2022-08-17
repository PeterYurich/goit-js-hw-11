import './css/styles.css';

import "simplelightbox/dist/simple-lightbox.min.css";


import { refs } from './js_partials/refs'
import { getPictures } from './js_partials/getContent'

refs.form.addEventListener('submit', getPictures)


refs.gallery.addEventListener('click', (e) => {
    e.preventDefault()
    if (e.target.nodeName !== "IMG") { return }
})
