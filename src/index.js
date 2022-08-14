import './css/styles.css';

import "simplelightbox/dist/simple-lightbox.min.css";
import SimpleLightbox from 'simplelightbox';


import { refs } from './js_partials/refs'
import { getPictures, simplelightbox} from './js_partials/getContent'

refs.form.addEventListener('submit', getPictures)


refs.gallery.addEventListener('click', (e) => {
    e.preventDefault()
    if (e.target.nodeName !== "IMG") { return }
    new SimpleLightbox('.photo-card a')
})
