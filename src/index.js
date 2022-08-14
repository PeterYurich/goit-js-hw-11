import './css/styles.css';

import "simplelightbox/dist/simple-lightbox.min.css";
import simpleLightbox from 'simplelightbox';
import _ from 'lodash';

import { refs } from './js_partials/refs'
import { getPictures, getMorePictures } from './js_partials/getContent'


refs.form.addEventListener('submit', getPictures)






refs.gallery.addEventListener('click', (e) => {
    e.preventDefault()
    if (e.target.nodeName !== "IMG") { return }
    new simpleLightbox('.photo-card a');
})
